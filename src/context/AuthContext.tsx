import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, IUpdatePost2 } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

// Define initial values for user and post states
export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export const INITIAL_USER2: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export const INITIAL_POST: IUpdatePost2 = {
  postId: "",
  caption: "",
};

// Define initial state for the context
const INITIAL_STATE: IContextType = {
  user: INITIAL_USER,
  user2: INITIAL_USER2,
  Postt: INITIAL_POST,
  isLoading: false,
  isAuthenticated: false,
  setPost: () => { },
  setUser: () => { },
  setUser2: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false,
};

// Define context type
type IContextType = {
  user: IUser;
  user2: IUser;
  Postt: IUpdatePost2;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setUser2: React.Dispatch<React.SetStateAction<IUser>>;
  setPost: React.Dispatch<React.SetStateAction<IUpdatePost2>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  CreatingPost: (desc: string, img: string) => Promise<void>;
};

// Create context
const AuthContext = createContext<IContextType>(INITIAL_STATE);

// Define AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [user2, setUser2] = useState<IUser>(INITIAL_USER2);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Postt, setPost] = useState<IUpdatePost2>(INITIAL_POST);

  // Function to check if user is authenticated
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      // Call API to check if user is authenticated
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to run on component mount to check authentication status
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (cookieFallback === "[]" || cookieFallback === null) {
      navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  // Context value object
  const value = {
    user,
    user2,
    Postt,
    login,
    setUser,
    setUser2,
    setPost,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    CreatingPost,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to access context
export const useUserContext = () => useContext(AuthContext);
