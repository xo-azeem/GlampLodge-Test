import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import authService, { UserProfile, AuthError } from '../services/authService';

interface UseAuthReturn {
  // State
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userRole: string | null;
  loading: boolean;
  error: string | null;

  // Methods
  signInWithEmail: (email: string, password: string) => Promise<User>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  updateUserProfile: (uid: string, updates: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setUserProfile(authService.getUserProfile());
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthAction = async <T,>(
    action: () => Promise<T>,
    loadingState: boolean = true
  ): Promise<T> => {
    try {
      setError(null);
      if (loadingState) setLoading(true);
      
      const result = await action();
      return result;
    } catch (error: any) {
      const authError = error as AuthError;
      setError(authError.message);
      throw error;
    } finally {
      if (loadingState) setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    return handleAuthAction(() => authService.signInWithEmail(email, password));
  };

  const signUpWithEmail = async (
    email: string, 
    password: string, 
    displayName: string
  ): Promise<User> => {
    return handleAuthAction(() => authService.signUpWithEmail(email, password, displayName));
  };

  const signInWithGoogle = async (): Promise<User> => {
    return handleAuthAction(() => authService.signInWithGoogle());
  };

  const signOut = async (): Promise<void> => {
    return handleAuthAction(() => authService.signOut());
  };

  const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
    return handleAuthAction(() => authService.updateUserProfile(uid, updates), false);
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    // State
    user,
    userProfile,
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
    userRole: authService.getUserRole(),
    loading,
    error,

    // Methods
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateUserProfile,
    clearError
  };
};