import axios from "axios";

const api = axios.create({
    baseURL: "https://proapi-arwk.onrender.com",  
});

// Interceptor: añade el JWT en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor: si el token expira, redirige al login
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default api;