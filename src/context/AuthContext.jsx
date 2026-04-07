import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token } : null;
    });

    async function login(email, password) {
        const { data } = await api.post("/api/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser({ token: data.token });
    }

    async function register(name, email, password) {
        await api.post("/api/auth/register", { name, email, password });
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);