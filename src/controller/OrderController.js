import OrderRepository from "../repository/OrderRepository.js";
import ProductRepository from "../repository/ProductRepository.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const itemsWithPrice = await Promise.all(
      items.map(async (item) => {
        const product = await ProductRepository.getProductById(item.product);
        if (!product) throw new Error(`Product ${item.product} not found.`);
        return {
          product: item.product,
          size: item.size,
          unitPrice: product.price,
        };
      }),
    );

    const order = await OrderRepository.create({
      user: req.user.userId,
      items: itemsWithPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderRepository.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const order = await OrderRepository.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  try {
    const order = await OrderRepository.updateStatus(
      req.params.id,
      orderStatus,
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    if (
      req.user.role !== "admin" &&
      req.params.userId !== req.user.userId.toString()
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    const orders = await OrderRepository.findByUser(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
