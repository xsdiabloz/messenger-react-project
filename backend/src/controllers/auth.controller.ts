import { type Request, type Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The password must be at least 6 symbols" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "The email are already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        fullName: newUser.fullName,
        _id: newUser._id,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(401).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", (error as Error).message);
  }
};

const login = (req: Request, res: Response) => {
  res.send("login-route");
};

const logout = (req: Request, res: Response) => {
  res.send("logout-route");
};

export { signup, login, logout };
