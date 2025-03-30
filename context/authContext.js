import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
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

    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('response.user :', response?.user)

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid,
                createdAt: new Date()
            }); // <-- Note que não há vírgula aqui

            return { success: true, data: response?.user }
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = 'Insira um e-mail válido';
            if (msg.includes('(auth/weak-password)')) msg = 'A senha deve ter pelo menos 6 caracteres';
            return { success: false, msg };
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