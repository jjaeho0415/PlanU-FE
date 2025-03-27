import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  username: string;
  setUsername: (name: string) => void;
  setIsLogin: (isLogin: boolean) => void;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: "",
      username: "",

      setUsername: (username) => set({ username }),
      setIsLogin: (isLogin) => set({ isLogin }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    { name: "auth-storage" },
  ) as (set: (fn: (state: AuthState) => AuthState) => void) => AuthState,
);

export default useAuthStore;
