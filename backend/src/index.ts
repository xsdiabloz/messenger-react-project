import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import cors from "cors";
import path from "path";
import type { Request, Response } from "express";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://messenger-react-project.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
  connectDB();
});
