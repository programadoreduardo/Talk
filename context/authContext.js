import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // Simulando uma mudança de autenticação após 3 segundos
        setTimeout(() => {
            setIsAuthenticated(false);
        }, 3000);
    }, []);

    const login = async (email, password) => {
        try {
            // Lógica de login
        } catch (e) {
            console.error(e);
        }
    };

    const logout = async () => {
        try {
            // Lógica de logout
        } catch (e) {
            console.error(e);
        }
    };

    const register = async (email, password, useInteropClassName, profileUrl) => {
        try {
            // Lógica de registro
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
};