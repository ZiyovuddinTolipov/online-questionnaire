import axios from "axios";

// API bazaviy URL
const BASE_URL = "https://employmentsystem1.pythonanywhere.com/"; // O'zgartiring

// Axios instance yaratish
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 soniya timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// 🔹 REQUEST INTERCEPTOR (Har bir so‘rov oldidan token qo‘shish)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Tokenni localStorage dan olish
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Tokenni qo‘shish
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔹 RESPONSE INTERCEPTOR (Xatoliklarni boshqarish)
api.interceptors.response.use(
    (response) => response, // Agar so‘rov muvaffaqiyatli bo‘lsa, response qaytariladi
    (error) => {
        if (error.response) {
            // ❌ Agar token muddati tugagan bo‘lsa → Logout qilish
            if (error.response.status === 401) {
                console.warn("Sessiya tugadi! Foydalanuvchi tizimdan chiqariladi.");
                localStorage.removeItem("token");
                window.location.href = "/login"; // Login sahifasiga yo'naltirish
            }
        }
        return Promise.reject(error);
    }
);

// API Service (Asosiy metodlar)
const ApiService = {
    get: (url, params = {}) => api.get('/auth/login/', { params }),

    post: (url, data, config = {}) => api.post(url, data, config),

    put: (url, data, config = {}) => api.put(url, data, config),

    delete: (url, config = {}) => api.delete(url, config),
};

export default ApiService;
