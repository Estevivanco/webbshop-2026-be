import UserRepository from "../repository/UserRepository.js";

export async function getAllUsers(req, res) {
  try {
    const users = await UserRepository.findAll();

    const filteredUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    res.json(filteredUsers);
  } catch (err) {
    console.error("Could not find all users", err);
    res.status(500).json({
      error: "Could not find users",
      message: err.message
    });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await UserRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
  } catch (err) {
    console.error("Could not find profile", err);
    res.status(500).json({
      error: "Error finding user profile",
      message: err.message
    });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserRepository.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error("Error finding user by ID", err);
    res.status(500).json({
      error: "Error finding user",
      message: err.message
    });
  }
}


//TODO: Add more controller functions as needed