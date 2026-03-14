import { type Request, type Response } from "express";

const signup = (req: Request, res: Response) => {
  res.send("signup-route");
};

const login = (req: Request, res: Response) => {
  res.send("login-route");
};

const logout = (req: Request, res: Response) => {
  res.send("logout-route");
};

export { signup, login, logout };
