'use client';
import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/data';

const USER_STORAGE_KEY = 'jci-go-user-profile';

export function useUser() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(USER_STORAGE_KEY);
            if (item) {
                setUser(JSON.parse(item));
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage', error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const updateUser = useCallback((updatedData: Partial<UserProfile>) => {
        try {
            const currentData = JSON.parse(window.localStorage.getItem(USER_STORAGE_KEY) || '{}');
            const newData = { ...currentData, ...updatedData };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newData));
            setUser(newData);
            return newData;
        } catch (error) {
            console.error('Failed to update user data in localStorage', error);
            return null;
        }
    }, []);

    const saveUser = useCallback((userData: UserProfile) => {
        try {
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Failed to save user data to localStorage', error);
        }
    }, []);

    const updatePoints = useCallback((pointsToAdd: number) => {
        if (!user) return;
        
        const newPoints = (user.points || 0) + pointsToAdd;
        updateUser({ points: newPoints });
    }, [user, updateUser]);
    
    return { user, saveUser, isLoading, updateUser, updatePoints };
}
