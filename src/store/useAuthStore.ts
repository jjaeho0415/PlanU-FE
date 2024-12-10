import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  setIsLogin: (isLogin: boolean) => void;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: "",

      setIsLogin: (isLogin) => set({ isLogin }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    { name: "auth-storage" },
  ) as (set: (fn: (state: AuthState) => AuthState) => void) => AuthState,
);

export default useAuthStore;
