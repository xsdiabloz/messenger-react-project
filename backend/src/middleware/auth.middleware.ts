import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";
import type { Request, Response } from "express";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protectRoute = async (req: Request, res: Response, next: any) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectroute middleware: ", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
