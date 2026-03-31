import UserRepository from "../repository/UserRepository.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await UserRepository.createUser({ name, email, password });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
}

//TODO: Add more controller functions as needed