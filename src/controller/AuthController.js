import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokens.js";

export async function register(req, res) {
  try {
    const { email, password, firstName, lastName, location } = req.body;
    
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await UserRepository.create({ 
      email, 
      passwordHash: password, 
      firstName, 
      lastName, 
      location 
    });

    const accessToken = generateAccessToken(user._id, user.role, user.firstName);
    const refreshToken = generateRefreshToken(user._id, user.role, user.firstName);

    res.status(201).json({
      user: { 
        id: user._id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        location: user.location 
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await UserRepository.findEmailWithPassword(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    res.json({
      user: { 
        id: user._id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        location: user.location,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await UserRepository.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    
    res.json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Refresh token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Token refresh failed" });
  }
}

export async function logout(req, res) {
  // For stateless JWT, logout is handled on client by deleting tokens
  res.status(200).json({ message: "Logged out successfully" });
}
