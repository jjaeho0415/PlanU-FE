import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  username: string;
  setUsername: (name: string) => void;
  setIsLogin: (isLogin: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: "",
      username: "",

      setUsername: (username) => set({ username }),
      setIsLogin: (isLogin) => set({ isLogin }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () => {
        set({ isLogin: false, accessToken: "" });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
