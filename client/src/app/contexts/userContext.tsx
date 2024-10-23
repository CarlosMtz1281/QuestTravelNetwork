import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import appFirebase from "../../../config";
import { getAuth, GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from "firebase/auth";

// Define the UserContext type
interface UserContextType {
  user: FirebaseUser | null;  // Firebase's User type or null
  signInWithGoogle: () => Promise<void>; // Function to sign in
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider to wrap your app
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const auth = getAuth(appFirebase);
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });

    return () => unsuscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(appFirebase);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};