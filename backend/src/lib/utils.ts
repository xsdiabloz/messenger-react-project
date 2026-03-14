import jwt from "jsonwebtoken";
import { type Response } from "express";
import type { Types } from "mongoose";

export const generateToken = (
  userId: string | Types.ObjectId,
  res: Response,
) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env file");
  }

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //xss attack defense
    sameSite: "strict", //csrf attack defense
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
