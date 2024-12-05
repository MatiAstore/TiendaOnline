import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
        const [auth, setAuth] = useState({
            isAuthenticated: false,
            token: null,
        });

        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const token = localStorage.getItem("authToken");
            if (token) {
                setAuth({
                    isAuthenticated: true,
                    token: token,
                });
            }
            setLoading(false); // Finaliza la carga
        }, []);
    
        const login = (token) => {
            localStorage.setItem("authToken", token);
            setAuth({ isAuthenticated: true, token });
        };
    
        const logout = () => {
            localStorage.removeItem("authToken");
            setAuth({ isAuthenticated: false, token: null });
            navigate("/login");
        };
    
        return (
            <AuthContext.Provider value={{ auth, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
};
