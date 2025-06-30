'use client';
import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, PublicUserProfile } from '@/lib/data';

const USER_STORAGE_KEY = 'jci-go-user-profile';

export function useUser() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(USER_STORAGE_KEY);
            if (item) {
                const parsedUser = JSON.parse(item);
                // Ensure new fields exist for users from older versions
                if (!parsedUser.bookmarkedEventIds) {
                    parsedUser.bookmarkedEventIds = [];
                }
                if (!parsedUser.connections) {
                    parsedUser.connections = [];
                }
                if (parsedUser.points) {
                    delete parsedUser.points; // remove old points system
                }
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage', error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const updateUser = useCallback((updatedData: Partial<UserProfile>) => {
        if (!user) return null;
        try {
            const newData = { ...user, ...updatedData };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newData));
            setUser(newData);
            return newData;
        } catch (error) {
            console.error('Failed to update user data in localStorage', error);
            return null;
        }
    }, [user]);

    const saveUser = useCallback((userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections'>) => {
        try {
            const newUser: UserProfile = {
                ...userData,
                bookmarkedEventIds: [],
                connections: [],
            };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Failed to save user data to localStorage', error);
        }
    }, []);
    
    const toggleBookmark = useCallback((eventId: string) => {
        if (!user) return;
        
        const newBookmarks = user.bookmarkedEventIds.includes(eventId)
            ? user.bookmarkedEventIds.filter(id => id !== eventId)
            : [...user.bookmarkedEventIds, eventId];
        
        updateUser({ bookmarkedEventIds: newBookmarks });
    }, [user, updateUser]);

    const addConnection = useCallback((connection: PublicUserProfile) => {
        if (!user || user.connections.some(c => c.whatsappNumber === connection.whatsappNumber)) {
            return; // Don't add if connection already exists
        }
        const newConnections = [...user.connections, connection];
        updateUser({ connections: newConnections });
    }, [user, updateUser]);
    
    return { user, saveUser, isLoading, updateUser, toggleBookmark, addConnection };
}
