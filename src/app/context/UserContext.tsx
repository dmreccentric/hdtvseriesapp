"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState("");

  // load username from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) {
      setUsernameState(saved);
    }
  }, []);
  useEffect(() => {
    console.log("UserProvider mounted, username:", username);
  }, [username]);

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem("username", name); // persist
  };

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
