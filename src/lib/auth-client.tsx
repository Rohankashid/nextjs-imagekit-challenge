"use client";

import {ReactNode, createContext, useContext, useEffect, useState} from "react";

import {
  User,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {auth, googleProvider} from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: {
    email: (credentials: {email: string; password: string}) => Promise<void>;
    social: (options: {
      provider: string;
      callbackURL?: string;
    }) => Promise<void>;
  };
  signUp: {
    email: (credentials: {email: string; password: string}) => Promise<void>;
  };
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInSocial = async ({
    provider,
  }: {
    provider: string;
    callbackURL?: string;
  }) => {
    if (provider === "google") {
      await signInWithPopup(auth, googleProvider);
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  };

  const signOutUser = async () => {
    await firebaseSignOut(auth);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn: {
      email: signInEmail,
      social: signInSocial,
    },
    signUp: {
      email: signUpEmail,
    },
    signOut: signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return {
    data: context.user ? {user: context.user} : null,
    isPending: context.loading,
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export auth functions for direct use
export const signIn = {
  email: async (
    {email, password}: {email: string; password: string},
    p0: {onRequest: () => void; onResponse: () => void}
  ) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  social: async (
    {provider}: {provider: string; callbackURL?: string},
    p0: {onRequest: () => void; onResponse: () => void}
  ) => {
    if (provider === "google") {
      await signInWithPopup(auth, googleProvider);
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  },
};

export const signUp = {
  email: async ({email, password}: {email: string; password: string}) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
