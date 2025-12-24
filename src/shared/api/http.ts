import axios from "axios";
import { useAuthStore } from "../../app/store";

const URL = import.meta.env.VITE_API_URL || "";

export const http = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});
