
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  signInAnonymously,
  User as AuthUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import type { UserProfile, PublicUserProfile } from '@/lib/types';
import { useToast } from './use-toast';
import { db, auth } from '@/lib/firebase';

type UserContextType = {
  user: UserProfile | null;
  authUser: AuthUser | null;
  isLoading: boolean;
  saveUser: (
    userData: Omit<
      UserProfile,
      'uid' | 'bookmarkedEventIds' | 'connections' | 'points' | 'unlockedBadges'
    >
  ) => Promise<void>;
  updateUser: (updatedData: Partial<Omit<UserProfile, 'uid'>>) => Promise<void>;
  toggleBookmark: (eventId: string) => Promise<void>;
  addConnection: (connection: PublicUserProfile) => Promise<void>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [authUser, setAuthUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentAuthUser) => {
      if (currentAuthUser) {
        setAuthUser(currentAuthUser);
        const userDocRef = doc(db, 'users', currentAuthUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as UserProfile);
        } else {
          setUser(null);
        }
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
           toast({
            variant: 'destructive',
            title: 'Authentication Failed',
            description: 'Could not connect to the service. Please check your internet connection and try again.',
          });
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const updateUser = React.useCallback(
    async (updatedData: Partial<Omit<UserProfile, 'uid'>>) => {
      if (!authUser || !user) {
        throw new Error('User not authenticated or profile not loaded.');
      }

      const newProfile: UserProfile = { ...user, ...updatedData };
      setUser(newProfile); // Optimistic update

      try {
        const userDocRef = doc(db, 'users', authUser.uid);
        await setDoc(userDocRef, newProfile, { merge: true });
      } catch (error) {
        console.error('Failed to update user profile:', error);
        setUser(user); // Rollback optimistic update
        toast({
          variant: 'destructive',
          title: 'Sync Error',
          description: 'Could not save your changes to the cloud.',
        });
        throw error; // Re-throw error to be caught by calling function
      }
    },
    [authUser, user, toast]
  );

  const saveUser = React.useCallback(
    async (
      userData: Omit<
        UserProfile,
        'uid' | 'bookmarkedEventIds' | 'connections' | 'points' | 'unlockedBadges'
      >
    ) => {
      if (!authUser) {
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: 'Could not create your profile. Please try again.',
        });
        return;
      }
      const newUser: UserProfile = {
        uid: authUser.uid,
        ...userData,
        bookmarkedEventIds: [],
        connections: [],
        points: 10,
        unlockedBadges: ['early-bird'],
      };

      try {
        const userDocRef = doc(db, 'users', authUser.uid);
        await setDoc(userDocRef, newUser);
        setUser(newUser);
        toast({
          title: 'Badge Created!',
          description: 'Welcome to LAYIPO 25!',
        });
        router.push('/');
      } catch (error) {
        console.error('Failed to save user profile:', error);
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: 'Could not save your profile. Please try again.',
        });
        throw error;
      }
    },
    [authUser, router, toast]
  );

  const toggleBookmark = React.useCallback(
    async (eventId: string) => {
      if (!user) return;

      const isCurrentlyBookmarked = user.bookmarkedEventIds.includes(eventId);

      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (!isCurrentlyBookmarked && Notification.permission === 'default') {
          Notification.requestPermission();
        }
      }

      const newBookmarks = isCurrentlyBookmarked
        ? user.bookmarkedEventIds.filter((id) => id !== eventId)
        : [...user.bookmarkedEventIds, eventId];

      const newPoints = isCurrentlyBookmarked
        ? user.points - 2
        : user.points + 2;

      try {
        await updateUser({ bookmarkedEventIds: newBookmarks, points: Math.max(0, newPoints) });
        toast({
          title: !isCurrentlyBookmarked ? 'Event Bookmarked!' : 'Bookmark Removed',
        });
      } catch (error) {
        console.error("Failed to toggle bookmark:", error);
      }
    },
    [user, updateUser, toast]
  );

  const addConnection = React.useCallback(
    async (connection: PublicUserProfile) => {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'You must be logged in to add connections.',
        });
        return;
      }
      if (user.whatsappNumber === connection.whatsappNumber) {
        toast({ title: "It's You!", description: "You can't connect with yourself." });
        return;
      }
      if (user.connections.some((c) => c.whatsappNumber === connection.whatsappNumber)) {
        toast({
          title: 'Already Connected',
          description: `You are already connected with ${connection.name}.`,
        });
        return;
      }
      
      const newConnection = { ...connection, connectedAt: new Date().toISOString() };
      const newConnections = [...user.connections, newConnection];
      const newPoints = user.points + 5;
      const updatedBadges = [...user.unlockedBadges];
      
      const wasSocialButterfly = user.unlockedBadges.includes('social-butterfly');
      const shouldUnlockBadge = newConnections.length >= 5 && !wasSocialButterfly;

      if (shouldUnlockBadge) {
        updatedBadges.push('social-butterfly');
      }
      
      try {
        await updateUser({ connections: newConnections, points: newPoints, unlockedBadges: updatedBadges });
        toast({
          title: 'Connection Made!',
          description: `You are now connected with ${connection.name}.`,
        });
        if(shouldUnlockBadge) {
          setTimeout(() => {
            toast({
              title: 'Badge Unlocked!',
              description: 'You earned the "Social Butterfly" badge!',
            });
          }, 500);
        }
      } catch (error) {
         console.error("Failed to add connection:", error);
      }
    },
    [user, updateUser, toast]
  );

  const value = { user, authUser, isLoading, saveUser, updateUser, toggleBookmark, addConnection };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
