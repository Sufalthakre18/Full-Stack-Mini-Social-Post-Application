import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    res.status(201).json({
      message: "Account created successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id, user.username),
    });

  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    res.status(500).json({
      error: "Server error",
    });
  }
};

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
