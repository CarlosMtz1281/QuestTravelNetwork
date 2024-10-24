'use client';

import React from "react";
import auth from "../../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

// Define the UserContext type
interface UserContextType {
  user: FirebaseUser | null;  // Firebase's User type or null
  signInWithGoogle: () => Promise<void>; // Function to sign in
  handleLogout: () => Promise<void>; // Function to sign out
}

// Create the UserContext
const UserContext = React.createContext<UserContextType | undefined>(undefined);

// Create a provider to wrap your app
export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  React.useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });

    return () => unsuscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, signInWithGoogle, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};