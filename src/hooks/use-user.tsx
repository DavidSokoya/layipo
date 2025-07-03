
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { UserProfile, PublicUserProfile } from '@/lib/types';
import { useToast } from './use-toast';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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
    const isInitialLoad = React.useRef(true);

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

    React.useEffect(() => {
        // Prevent persisting the initial state on first load
        if (isLoading || isInitialLoad.current) {
            if(!isLoading) {
                 isInitialLoad.current = false;
            }
            return;
        }

        if (user) {
            try {
                // Persist to localStorage for fast initial loads
                window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                
                // Persist to Firestore for cloud sync and leaderboard
                const persistToFirestore = async () => {
                    await setDoc(doc(db, 'users', user.whatsappNumber), user, { merge: true });
                };
                persistToFirestore();

            } catch (error) {
                console.error('Failed to persist user data', error);
                toast({
                    variant: 'destructive',
                    title: 'Sync Error',
                    description: 'Could not sync your data with the cloud.',
                });
            }
        }
    }, [user, isLoading]);

    const saveUser = React.useCallback((userData: Omit<UserProfile, 'bookmarkedEventIds' | 'connections' | 'points' | 'unlockedBadges'>) => {
        const newUser: UserProfile = {
            ...userData,
            bookmarkedEventIds: [],
            connections: [],
            points: 10, // Start with some points
            unlockedBadges: ['early-bird'], // Give them one badge for signing up
        };
        setUser(newUser); // This triggers the useEffect to persist data
        toast({ title: 'Badge Created!', description: 'Welcome to LAYIPO 25!' });
        router.push('/');
    }, [router, toast]);

    const updateUser = React.useCallback((updatedData: Partial<UserProfile>) => {
        setUser(currentUser => {
            if (!currentUser) {
                console.error("User not found for update");
                return null;
            }
            return { ...currentUser, ...updatedData };
        });
    }, []);

    const toggleBookmark = React.useCallback((eventId: string) => {
        const isCurrentlyBookmarked = user?.bookmarkedEventIds.includes(eventId) || false;

        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (!isCurrentlyBookmarked) {
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
            
            const newPoints = isBookmarking ? currentUser.points + 2 : Math.max(0, currentUser.points - 2);

            return { ...currentUser, bookmarkedEventIds: newBookmarks, points: newPoints };
        });

        toast({
            title: !isCurrentlyBookmarked ? 'Event Bookmarked!' : 'Bookmark Removed',
        });
    }, [user, toast]);

    const addConnection = React.useCallback((connection: PublicUserProfile) => {
        if (!user) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to add connections.' });
            return;
        }
        if(user.whatsappNumber === connection.whatsappNumber) {
            toast({ title: "It's You!", description: "You can't connect with yourself." });
            return;
        }
        if (user.connections.some(c => c.whatsappNumber === connection.whatsappNumber)) {
            toast({ title: 'Already Connected', description: `You are already connected with ${connection.name}.` });
            return;
        }
        
        const wasSocialButterfly = user.unlockedBadges.includes('social-butterfly');

        setUser(currentUser => {
            if (!currentUser) return null;

            const newConnection = { ...connection, connectedAt: new Date().toISOString() };
            const newConnections = [...currentUser.connections, newConnection];
            const newPoints = currentUser.points + 5;
            const updatedBadges = [...currentUser.unlockedBadges];

            if (newConnections.length >= 5 && !wasSocialButterfly) {
                updatedBadges.push('social-butterfly');
            }

            return { ...currentUser, connections: newConnections, points: newPoints, unlockedBadges: updatedBadges };
        });
        
        toast({ title: 'Connection Made!', description: `You are now connected with ${connection.name}.` });
        
        if (user.connections.length + 1 >= 5 && !wasSocialButterfly) {
             setTimeout(() => {
                toast({
                    title: 'Badge Unlocked!',
                    description: 'You earned the "Social Butterfly" badge!',
                });
             }, 500);
        }
    }, [user, toast]);

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
