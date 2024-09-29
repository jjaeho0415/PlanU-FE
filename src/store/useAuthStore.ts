import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState{
    isLogin: boolean;
    accessToken: string;
    refreshToken: string;
    setIsLogin: (isLogin: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
}

const useAuthStore = create<AuthState>(
    persist(
        (set) => ({
            isLogin: false,
            accessToken: "",
            refreshToken: "",
            setIsLogin: (isLogin) => set({ isLogin }),
            setAccessToken: (accessToken) => set({ accessToken }),
            setRefreshToken: (refreshToken) => set({ refreshToken }),
        }),
        { name: "auth-storage" },
    ) as (set: (fn: (state: AuthState) => AuthState) => void) => AuthState,
);

export default useAuthStore