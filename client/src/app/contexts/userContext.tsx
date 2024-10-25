'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "../../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

interface User { 
  email: string;
  name: string;
  lastName: string;
  nacionality: string;
  age: number;
  userKey: string;
}

interface UserContextType {
  user: FirebaseUser | null;
  userData: User | null;
  signInWithGoogle: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userData, setUserData] = useState<User | null>(() => {
    const storedUserData = sessionStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const fetchUserData = async (email: string) => {
    try {
      const response = await fetch("http://localhost:5002/validateUser", {
          method: "GET",
          headers: { email },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json();
      setUserData(data.data);
      sessionStorage.setItem("userData", JSON.stringify(data.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        sessionStorage.setItem("user", JSON.stringify(currentUser));
        fetchUserData(currentUser.email ?? "");
        if (pathname === "/login") router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      sessionStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const response = await signInWithPopup(auth, provider);
      setUser(response.user);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      await fetchUserData(response.user.email ?? "");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during Google sign-in", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, userData, signInWithGoogle, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
