import axios from "axios";

const isProd = process.env.NODE_ENV === 'production';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || (isProd ? 'https://edu-chatpilot-backend.onrender.com/api' : 'http://localhost:5000/api');
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

console.log("API Configured for:", BASE_URL);

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
