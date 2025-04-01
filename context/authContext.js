
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
            const response = await signInWithEmailAndPassword(auth, email, password)
            return {success: true}
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = 'Insira um e-mail válido';
            if (msg.includes('(auth/weak-password)')) msg = 'A senha deve ter pelo menos 6 caracteres';
            if (msg.includes('(auth/invalid-credential)')) msg = 'Senha incorreta, confira sua senha';
            return { success: false, msg: msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }

        } catch (e) {
            return { success: false, msg: e.message, error: e }
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
            });

            return { success: true, data: response?.user }
        } catch (e) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = 'Insira um e-mail válido';
            if (msg.includes('(auth/weak-password)')) msg = 'A senha deve ter pelo menos 6 caracteres';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'E-mail já cadastrado faça login';
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