import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import type { Request, Response } from "express";

export const protectRoute = (req: Request, res: Response, next) => {};
