import { useAuth } from '@/hooks/useAuth';
import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react'

export default function MainLayout() {
    const { isAuthenticated } = useAuth();  
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated === 'undefined') return;
        const inApp = segments[0] === 'tabs';
        if (isAuthenticated && !inApp) {
            router.replace('home')
        } else if (isAuthenticated === false) {
            router.replace('signIn')
        }
    }, [isAuthenticated]);

    return (
        <Slot />
    )
}