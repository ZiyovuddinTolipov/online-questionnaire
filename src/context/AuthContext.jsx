import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: localStorage.getItem("name"),
        role: localStorage.getItem("role"),
    });
    console.log(user)
    // Tokenni localStorage'dan tekshiramiz
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ name: localStorage.getItem("name"),role:localStorage.getItem("role")}); // Token bo‘lsa, foydalanuvchi mavjud deb belgilaymiz
            
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ name: localStorage.getItem("name"),role:localStorage.getItem("role")}); // Token bo‘lsa, foydalanuvchi mavjud deb belgilaymiz
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Auth contextni ishlatish uchun hook
export const useAuth = () => {
    return useContext(AuthContext);
};
