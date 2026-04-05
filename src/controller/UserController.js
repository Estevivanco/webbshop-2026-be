import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcrypt";
//* USER
//alla kan se.
//kräver inlogg
//visa mig "min profil"
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
export async function updateProfile(req, res) {
  try {
    const userId = req.userId;
    const { password, passwordHash, role, ...updates } = req.body;

    if (password || passwordHash) {
      return res.status(400).json({ 
        error: "Use the change password endpoint to update your password" 
      });
    }
    if (role) {
      return res.status(403).json({ 
        error: "You cannot change your own role" 
      });
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await UserRepository.update(userId, updates);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ 
      error: "Error updating profile",
      message: err.message 
    });
  }
}
export async function deleteProfile(req, res) {
  try {
    const userId = req.userId; // from token
    
    const user = await UserRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deactivatedUser = await UserRepository.deactivate(userId);
    res.json({ message: "Account deactivated successfully. Contact support to reactivate.", user: deactivatedUser });
  } catch (err) {
    console.error("Error deactivating profile:", err);
    res.status(500).json({
      error: "Could not deactivate account",
      message: err.message
    });
  }
}
export async function changePassword(req,res){
  try{
    const{currentPassword, newPassword} = req.body
    const user = await UserRepository.findByIdWithPassword(req.userId)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash)

    if(!isValid){
      return res.status(401).json({error: "Current password is incorrect"})
    }

    await UserRepository.updatePassword(req.userId, newPassword)
    res.status(200).json({ message: "Password updated successfully" })
  } catch(err){
        res.status(500).json({ 
        error: "Error updating password",
        message: err.message
       });
  }
}
//* ADMIN
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
//Endast admin ska se. Id källa från URL. 
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
export async function updateUser(req,res){
  try{
    const {password, ...updateData} = req.body

    const user = await UserRepository.update(req.params.id, updateData)

    if(!user){
      return res.status(404).json({error: "User not found"})
    }
    res.json(user)
  } catch(err){
      console.error("Error updating user", err)
      res.status(500).json({
        error: "Error finding user",
        message: err.message
      })
  }

}
export async function reactivateUser(req, res) {
  try {
    const user = await UserRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({ error: "User is already active" });
    }

    const reactivatedUser = await UserRepository.reactivate(req.params.id);
    res.json({ message: "User reactivated successfully", user: reactivatedUser });
  } catch (err) {
    console.error("Error reactivating user:", err);
    res.status(500).json({
      error: "Could not reactivate user",
      message: err.message
    });
  }
}
export async function deactivateUser(req, res) {
  try {
    const user = await UserRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() === req.userId) {
      return res.status(400).json({ error: "Cannot deactivate your own account" });
    }

    const deactivatedUser = await UserRepository.deactivate(req.params.id);
    res.json({ message: "User deactivated successfully", user: deactivatedUser });
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).json({
      error: "Could not deactivate user",
      message: err.message
    });
  }
}
export async function makeAdmin(req, res) {
  try {
    const user = await UserRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ error: "User is already an admin" });
    }

    const updatedUser = await UserRepository.setRole(req.params.id, "admin");
    res.json({ message: "User promoted to admin", user: updatedUser });
  } catch (err) {
    console.error("Error making user admin:", err);
    res.status(500).json({
      error: "Could not make admin",
      message: err.message
    });
  }
}

export async function permanentDeleteUser(req, res) {
  try {
    const user = await UserRepository.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() === req.userId) {
      return res.status(400).json({ error: "Cannot permanently delete your own account" });
    }

    await UserRepository.delete(req.params.id);
    res.json({ message: "User permanently deleted" });
  } catch (err) {
    console.error("Error permanently deleting user:", err);
    res.status(500).json({
      error: "Could not permanently delete user",
      message: err.message
    });
  }
}


//TODO: Add more controller functions as needed