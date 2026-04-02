import Order from "../models/Order.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const order = await Order.create({
      user: req.user.userId, // comes from authenticate middleware
      items,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id
export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Users can only view their own orders
    if (req.user.role !== "admin" && order.user.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Not authorized." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/user/:userId
export const getOrdersByUser = async (req, res) => {
  try {
    // Users can only view their own orders
    if (req.user.role !== "admin" && req.params.userId !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Not authorized." });
    }

    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product", "name price");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};