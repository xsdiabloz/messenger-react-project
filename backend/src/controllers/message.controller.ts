import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import type { Request, Response } from "express";
import type { QueryFilter } from "mongoose";

const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    } as QueryFilter<typeof Message>);
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res
        .status(400)
        .json({ error: "Message must contain text or an image" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const recieverSocketId = getReceiverSocketId(receiverId as string);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getUsersForSidebar, getMessages, sendMessage };
