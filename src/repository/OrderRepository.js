import Order from "../models/Order.js";

class OrderRepository {
  async create(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  async findAll() {
    return await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");
  }

  async findById(id) {
    return await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price");
  }

  async findByUser(userId) {
    return await Order.find({ user: userId })
      .populate("items.product", "name price");
  }

  async updateStatus(id, orderStatus) {
    return await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );
  }
}

export default new OrderRepository();