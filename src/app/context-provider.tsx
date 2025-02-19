"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "./theme-provider";
import { AccountResType } from "@/lib/schemas/account";
import { TooltipProvider } from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
interface IContextProvider {
  children: ReactNode;
}

export type User = AccountResType["data"];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  RefreshUser: (user: User | null) => void;
  isAuthenticated: boolean;
  gameid: string | null;
  setGameid: (gameid: string | null) => void;
}>({
  user: null,
  setUser: () => {},
  RefreshUser: () => {},
  isAuthenticated: false,
  gameid: null,
  setGameid: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

const ContextProvider = ({ children }: IContextProvider) => {
  const [user, setUserState] = useState<User | null>(() => {
    return null;
  });

  const [gameid, setGameidState] = useState<string | null>(() => {
    return null;
  });

  const DynamicHeader = dynamic(() => import("../app/app-header"), {
    loading: () => <p></p>,
  });

  const isAuthenticated = Boolean(user);

  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setUserState]
  );

  const setGameid = useCallback(
    (game: string | null) => {
      setGameidState(game);
      localStorage.setItem("gameid", JSON.stringify(game));
    },
    [setGameidState]
  );

  const RefreshUser = useCallback(
    async (user: User | null) => {
      if (user) {
        const res = await fetch(
          `http://localhost:5041/api/User/GetUser/${user.id}`
        );
        const rs = await res.json();
        setUserState(rs);
        localStorage.setItem("user", JSON.stringify(rs));
      }
    },
    [setUserState]
  );

  useEffect(() => {
    const _user = localStorage.getItem("user");
    const _gameid = localStorage.getItem("gameid");

    setUserState(_user ? JSON.parse(_user) : null);
    setGameidState(_gameid ? JSON.parse(_gameid) : null);
  }, [setUserState]);

  return (
    <AppContext.Provider
      value={{
        user,
        gameid,
        setUser,
        isAuthenticated,
        RefreshUser,
        setGameid,
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <DynamicHeader />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default ContextProvider;
