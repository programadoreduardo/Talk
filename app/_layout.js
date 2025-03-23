import React, { useEffect } from 'react';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { Slot, useRouter, useSegments } from 'expo-router';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está autenticado ou não
        if (typeof isAuthenticated === 'undefined') return;
        const inApp = segments[0] === '(app)';
        if (isAuthenticated && !inApp) {
            // Redireciona para a página inicial
            router.replace('home');
        } else if (!isAuthenticated) {
            // Redireciona para a página de login
            router.replace('signIn');
        }
    }, [isAuthenticated]);

    return <Slot />;
};

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    );
}