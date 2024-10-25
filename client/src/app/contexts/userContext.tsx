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

  // Initialize state from session storage
  const [initialUser, setInitialUser] = useState<FirebaseUser | null>(null);
  const [initialUserData, setInitialUserData] = useState<User | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInitialUser(JSON.parse(sessionStorage.getItem("user") || "null"));
      setInitialUserData(JSON.parse(sessionStorage.getItem("userData") || "null"));
    }
  }, []);


  const fetchUserData = async (email: string) => {
    try {
      const response = await fetch("https://quest-travel-network.vercel.app/validateUser", {
        method: "GET",
        headers: { email },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUserData(data.data);
      sessionStorage.setItem("userData", JSON.stringify(data.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    if (!user && initialUser) {
      // Set the stored user if available
      setUser(initialUser);
    }

    if (!userData && initialUserData) {
      // Set the stored userData if available
      setUserData(initialUserData);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        sessionStorage.setItem("user", JSON.stringify(currentUser));

        // Fetch user data only if it's not in session storage
        if (!initialUserData && pathname !== "/login" || pathname !== "/") {
          fetchUserData(currentUser.email ?? "");
        }

        if (pathname === "/login") {
          router.push("/dashboard/home");
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  useEffect(() => {
    // Update sessionStorage whenever userData changes
    if (userData) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    console.log("User:", user);
    console.log("UserData:", userData);
  });

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
