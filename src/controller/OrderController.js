import OrderRepository from "../repository/OrderRepository.js";
import ProductRepository from "../repository/ProductRepository.js";
import UserRepository from "../repository/UserRepository.js"
import { sendOrderCancellation, sendOrderConfirmation, sendOrderRecieved } from "../utils/email.js";

export async function createOrder(req, res) {
  const { items } = req.body;

  try {
    const itemsWithPrice = await Promise.all(
      items.map(async (item) => {
        const product = await ProductRepository.getProductById(item.product);
        if (!product) throw new Error(`Product ${item.product} not found.`);

        const sizeCheck = product.sizes.find((s) => s.size === item.size);
        if (!sizeCheck)
          throw new Error(`Size ${item.size} not avalible for ${product.name}`);
        if (sizeCheck.stock === 0)
          throw new Error(
            `Size ${item.size} is out of stock for ${product.name}`,
          );

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

    await Promise.all(
      itemsWithPrice.map((item) =>
        ProductRepository.decrementStock(item.product, item.size),
      ),
    );

    const populatedOrder = await OrderRepository.findById(order._id)
    const user = await UserRepository.findById(req.user.userId)
    await sendOrderRecieved(populatedOrder, user)

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await OrderRepository.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneOrder(req, res) {
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
}

export async function getOrderTracking(req, res) {
  try {
    const order = await OrderRepository.findById(req.params.id)

    if(!order) {
      return res.status(404).json({ message: "Order not found."})
    }

    res.status(200).json({
      orderId: order._id,
      orderStatus: order.status,
      updatedAt: order.updatedAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export async function updateOrderStatus(req, res) {
  const { orderStatus } = req.body;

  try {
    const order = await OrderRepository.updateStatus(
      req.params.id,
      orderStatus,
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (orderStatus === "Confirmed") {
      const user = UserRepository.findById(order.user._id)
      await sendOrderConfirmation(order, user)
    }

    if (orderStatus === "Cancelled") {
      const user = UserRepository.findById(order.user._id)
      await sendOrderCancellation(order, user)

    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrdersByUser(req, res) {
  const orders = await OrderRepository.findByUser(req.params.userId);
  res.status(200).json(orders);
}

export async function deleteOrder(req, res) {
  const order = await OrderRepository.delete(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(204).send()
}
