import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  setIsLogin: (isLogin: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: "",

      setIsLogin: (isLogin) => set({ isLogin }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () =>
        set(() => {
          return { isLogin: false, accessToken: "" };
        }),
    }),
    {
      name: "auth-storage",
      // 상태가 비워지면 로컬스토리지에서도 제거
      onRehydrateStorage: () => (state) => {
        state?.clearAuth && localStorage.removeItem("auth-storage");
      },
    },
  ) as (set: (fn: (state: AuthState) => AuthState) => void) => AuthState,
);

export default useAuthStore;
