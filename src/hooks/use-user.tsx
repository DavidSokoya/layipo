
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { UserProfile, PublicUserProfile } from '@/lib/types';
import { useToast } from './use-toast';

const USER_STORAGE_KEY = 'jci-go-user-profile';

type UserContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  saveUser: (userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections' | 'points' | 'unlockedBadges'>) => void;
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
                if (typeof parsedUser.points === 'undefined') parsedUser.points = 0;
                if (!parsedUser.unlockedBadges) parsedUser.unlockedBadges = [];
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Failed to parse user data from localStorage', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveUser = React.useCallback((userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections' | 'points' | 'unlockedBadges'>) => {
        try {
            const newUser: UserProfile = {
                ...userData,
                bookmarkedEventIds: [],
                connections: [],
                points: 10, // Start with some points
                unlockedBadges: ['early-bird'], // Give them one badge for signing up
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
        if (typeof window !== 'undefined' && 'Notification' in window) {
            // Check if we are about to ADD a bookmark
            if (!user?.bookmarkedEventIds.includes(eventId)) {
                if (Notification.permission === 'default') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            toast({
                                title: 'Notifications Enabled',
                                description: 'You\'ll now get reminders for bookmarked events.',
                            });
                        }
                    });
                }
            }
        }

        setUser(currentUser => {
            if (!currentUser) return null;
            const isBookmarking = !currentUser.bookmarkedEventIds.includes(eventId);
            const newBookmarks = isBookmarking
                ? [...currentUser.bookmarkedEventIds, eventId]
                : currentUser.bookmarkedEventIds.filter(id => id !== eventId);
            
            // Add/remove points for bookmarking
            const newPoints = isBookmarking ? currentUser.points + 2 : currentUser.points - 2;

            const updatedUser = { ...currentUser, bookmarkedEventIds: newBookmarks, points: newPoints };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, [user, toast]);

    const addConnection = React.useCallback((connection: PublicUserProfile) => {
        setUser(currentUser => {
            if (!currentUser) {
                toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to add connections.' });
                return null;
            }
            if(currentUser.whatsappNumber === connection.whatsappNumber) {
                toast({ title: "It's You!", description: "You can't connect with yourself." });
                return currentUser;
            }
            if (currentUser.connections.some(c => c.whatsappNumber === connection.whatsappNumber)) {
                toast({ title: 'Already Connected', description: `You are already connected with ${connection.name}.` });
                return currentUser;
            }

            const newConnection = { ...connection, connectedAt: new Date().toISOString() };
            const newConnections = [...currentUser.connections, newConnection];
            
            // Add points for new connection
            const newPoints = currentUser.points + 5;
            const updatedBadges = [...currentUser.unlockedBadges];

            // Unlock badge if condition met
            if (newConnections.length >= 5 && !updatedBadges.includes('social-butterfly')) {
                updatedBadges.push('social-butterfly');
                 toast({
                    title: 'Badge Unlocked!',
                    description: 'You earned the "Social Butterfly" badge!',
                });
            }

            const updatedUser = { ...currentUser, connections: newConnections, points: newPoints, unlockedBadges: updatedBadges };
            window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            toast({ title: 'Connection Made!', description: `You are now connected with ${connection.name}.` });
            return updatedUser;
        });
    }, [toast]);

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
