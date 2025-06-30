
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { UserProfile, PublicUserProfile } from '@/lib/types';
import { useToast } from './use-toast';

const USER_STORAGE_KEY = 'jci-go-user-profile';

type UserContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  saveUser: (userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections'>) => void;
  updateUser: (updatedData: Partial<UserProfile>) => void;
  toggleBookmark: (eventId: string) => void;
  addConnection: (connection: PublicUserProfile) => void;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();
    const { toast } = useToast();

    React.useEffect(() => {
        try {
            const item = window.localStorage.getItem(USER_STORAGE_KEY);
            if (item) {
                const parsedUser = JSON.parse(item);
                if (!parsedUser.bookmarkedEventIds) parsedUser.bookmarkedEventIds = [];
                if (!parsedUser.connections) parsedUser.connections = [];
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveUser = React.useCallback((userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections'>) => {
        try {
            const newUser: UserProfile = {
                ...userData,
                bookmarkedEventIds: [],
                connections: [],
            };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            setUser(newUser);
            toast({ title: 'Badge Created!', description: 'Welcome to LAYIPO 25!' });
            router.push('/');
        } catch (error) {
            console.error('Failed to save user data to localStorage', error);
            toast({
                variant: 'destructive',
                title: 'Something went wrong',
                description: 'Could not save your profile. Please try again.',
            });
            throw error;
        }
    }, [router, toast]);

    const updateUser = React.useCallback((updatedData: Partial<UserProfile>) => {
        setUser(currentUser => {
            if (!currentUser) {
                console.error("User not found for update");
                return null;
            }
            try {
                const newData = { ...currentUser, ...updatedData };
                window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newData));
                return newData;
            } catch (error) {
                console.error('Failed to update user data in localStorage', error);
                throw error;
            }
        });
    }, []);

    const toggleBookmark = React.useCallback((eventId: string) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const newBookmarks = currentUser.bookmarkedEventIds.includes(eventId)
                ? currentUser.bookmarkedEventIds.filter(id => id !== eventId)
                : [...currentUser.bookmarkedEventIds, eventId];
            
            const updatedUser = { ...currentUser, bookmarkedEventIds: newBookmarks };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);

    const addConnection = React.useCallback((connection: PublicUserProfile) => {
        setUser(currentUser => {
            if (!currentUser || currentUser.connections.some(c => c.whatsappNumber === connection.whatsappNumber)) {
                return currentUser;
            }
            const newConnections = [...currentUser.connections, connection];
            const updatedUser = { ...currentUser, connections: newConnections };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);

    const value = { user, isLoading, saveUser, updateUser, toggleBookmark, addConnection };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
