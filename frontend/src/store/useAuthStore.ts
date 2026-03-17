import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { ILogin, ISignUp } from "../types/types";
import type { AxiosError } from "axios";

interface IUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic?: string;
}

interface AuthState {
  authUser: IUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: ISignUp) => Promise<void>;
  login: (data: ILogin) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", (error as Error).message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: ISignUp) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created succesfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: ILogin) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in succesfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },
}));
