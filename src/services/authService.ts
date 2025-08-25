import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from '../../firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'customer';
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthError {
  code: string;
  message: string;
}

class AuthService {
  private static instance: AuthService;
  private authStateListeners: Set<(user: User | null) => void> = new Set();
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;

  private constructor() {
    this.initializeAuthStateListener();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeAuthStateListener(): void {
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;
      
      if (user) {
        await this.loadUserProfile(user);
      } else {
        this.userProfile = null;
      }

      // Notify all listeners
      this.authStateListeners.forEach(listener => listener(user));
    });
  }

  private async loadUserProfile(user: User): Promise<void> {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Convert Firestore timestamps to Date objects
        const createdAt = userData.createdAt?.toDate ? userData.createdAt.toDate() : userData.createdAt;
        const lastLogin = userData.lastLogin?.toDate ? userData.lastLogin.toDate() : userData.lastLogin;
        
        this.userProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || 'Unknown User',
          role: userData.role || 'customer',
          createdAt: createdAt || new Date(),
          lastLogin: lastLogin || new Date()
        };

        // Only update last login if it's been more than 1 hour since last update
        if (lastLogin) {
          const now = new Date();
          const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
          
          if (lastLogin.getTime() < oneHourAgo.getTime()) {
            await this.updateLastLogin(user.uid);
          }
        } else {
          // If no lastLogin, update it
          await this.updateLastLogin(user.uid);
        }
      } else {
        // Create user profile if it doesn't exist
        await this.createUserProfile(user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  private async createUserProfile(user: User, additionalData?: Partial<UserProfile>): Promise<void> {
    const now = serverTimestamp();
    const currentDate = new Date();
    
    const userProfileData = {
      email: user.email!,
      displayName: user.displayName || additionalData?.displayName || 'Unknown User',
      role: this.determineUserRole(user.email!),
      createdAt: now,
      lastLogin: now,
      ...additionalData
    };

    await setDoc(doc(db, 'users', user.uid), userProfileData);

    // Set local userProfile with current date for immediate use
    this.userProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || additionalData?.displayName || 'Unknown User',
      role: this.determineUserRole(user.email!),
      createdAt: currentDate,
      lastLogin: currentDate
    };
  }

  private determineUserRole(email: string): 'admin' | 'customer' {
    // Get admin emails from environment variables only
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    return adminEmails.includes(email) ? 'admin' : 'customer';
  }

  private async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLogin: serverTimestamp()
      });
      
      // Update local userProfile with current date
      if (this.userProfile) {
        this.userProfile.lastLogin = new Date();
      }
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authStateListeners.add(callback);
    
    // Immediately call with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.authStateListeners.delete(callback);
    };
  }

  public async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw this.formatAuthError(error);
    }
  }

  public async signUpWithEmail(
    email: string, 
    password: string, 
    displayName: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName });

      // Create user profile in Firestore
      await this.createUserProfile(user, { displayName });

      return user;
    } catch (error: any) {
      throw this.formatAuthError(error);
    }
  }

  public async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if user profile exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        await this.createUserProfile(user);
      } else {
        await this.updateLastLogin(user.uid);
      }

      return user;
    } catch (error: any) {
      throw this.formatAuthError(error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.formatAuthError(error);
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public isAdmin(): boolean {
    return this.userProfile?.role === 'admin';
  }

  public getUserRole(): string | null {
    return this.userProfile?.role || null;
  }

  public async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      // Update in Firestore
      await updateDoc(doc(db, 'users', uid), updates);
      
      // If updating displayName, also update Firebase Auth
      if (updates.displayName && this.currentUser) {
        await updateProfile(this.currentUser, { displayName: updates.displayName });
      }
      
      // Update local userProfile
      if (this.userProfile) {
        this.userProfile = { ...this.userProfile, ...updates };
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  private formatAuthError(error: any): AuthError {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.'
    };

    return {
      code: error.code || 'auth/unknown',
      message: errorMessages[error.code] || error.message || 'An unexpected error occurred.'
    };
  }
}

export default AuthService.getInstance();