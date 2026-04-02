import User from "../models/User.js";

class UserRepository {

  async findById(id){
    return await User.findById(id)
  }

  async findByEmail(email){
    return await User.findOne({email: email})
  }

  async findEmailWithPassword(email){
    return await User.findOne({email: email}).select('+passwordHash')
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async update(id, data) {
    return User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id) {
    return User.findByIdAndDelete(id)
  }

  async recordLogin(id) {
    return User.findByIdAndUpdate(id, { $set: { lastLoginAt: new Date() } });
  }

  async deactivate(id) {
    return User.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
  }

  async reactivate(id) {
    return User.findByIdAndUpdate(id, { $set: { isActive: true } }, { new: true });
  }

  async setRole(id, role) {
    return User.findByIdAndUpdate(id, { $set: { role } }, { new: true });
  }

    async findAll({ role, isActive, limit = 50, skip = 0} = {}) {
    const filter = {};
    if (role     !== undefined) filter.role     = role;
    if (isActive !== undefined) filter.isActive = isActive;
    return User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
}
}

export default new UserRepository();