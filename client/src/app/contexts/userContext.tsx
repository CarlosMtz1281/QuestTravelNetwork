'use client';

import React from "react";
import auth from "../../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

interface User { 
  email: string;
  name: string;
  lastName: string;
  nacionality: string;
  age: number;
  userKey: string;
}

// Define the UserContext type
interface UserContextType {
  user: FirebaseUser | null;  // Firebase's User type or null
  userData: User; // User data from the API
  signInWithGoogle: () => Promise<void>; // Function to sign in
  handleLogout: () => Promise<void>; // Function to sign out
}

// Create the UserContext
const UserContext = React.createContext<UserContextType | undefined>(undefined);

// Fetch the user from Firebase and redirect if needed
const url = "http://localhost:5002/validateUser";

// Create a provider to wrap your app
export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [userData, setUserData] = React.useState<User>({} as User);

  React.useEffect(() => {
    const fetchUserData = async (email: string) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            email,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.email ?? "");
        // Redirigir el usuario al dashboard si este esta en la pagina de login o la intenta acceder
        if (pathname === "/login") {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    });


    return () => unsuscribe();
  }, []);

  React.useEffect(() => {
    if (userData) {
      console.log("User is logged in", userData);
    }
  }, [userData]);  

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
    <UserContext.Provider value={{ user, userData, signInWithGoogle, handleLogout }}>
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