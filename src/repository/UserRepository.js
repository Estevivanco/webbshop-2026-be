import User from "../models/User.js";

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default new UserRepository();