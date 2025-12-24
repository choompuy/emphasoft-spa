import { create } from "zustand";

type AuthState = {
    token: string | null;
    isAuth: boolean;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    isAuth: !!localStorage.getItem("token"),

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token, isAuth: true });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null, isAuth: false });
    },
}));
