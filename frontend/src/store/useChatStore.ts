import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuthStore, type IUser } from "./useAuthStore";

interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface ISendMessageData {
  text?: string;
  image?: string | null;
}

interface ChatState {
  users: IUser[];
  selectedUser: IUser | null;
  messages: IMessage[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  subscribeToMessage: () => void;
  unsubscribeToMessage: () => void;
  sendMessage: (messageData: ISendMessageData) => Promise<void>;
  setSelectedUser: (selectedUser: IUser | null) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  users: [],
  selectedUser: null,
  messages: [],
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off();
  },

  sendMessage: async (messageData: ISendMessageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData,
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  setSelectedUser: async (selectedUser: IUser | null) => set({ selectedUser }),
}));
