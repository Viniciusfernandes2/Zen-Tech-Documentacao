import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  isVisitante: boolean;
  token: string | null;
  userName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
  entrarComoVisitante: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("@Auth:token"));
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem("@Auth:userName"));
  const [isVisitante, setIsVisitante] = useState<boolean>(() => localStorage.getItem("@Auth:visitante") === "true");

  useEffect(() => {
    if (token) {
      localStorage.setItem("@Auth:token", token);
      localStorage.setItem("@Auth:userName", userName || "");
      localStorage.removeItem("@Auth:visitante");
      setIsVisitante(false);
    } else {
      localStorage.removeItem("@Auth:token");
      localStorage.removeItem("@Auth:userName");
      setUserName(null);
    }
  }, [token, userName]);

  useEffect(() => {
    if (isVisitante) {
      localStorage.setItem("@Auth:visitante", "true");
      localStorage.removeItem("@Auth:token");
      localStorage.removeItem("@Auth:userName");
      setToken(null);
      setUserName(null);
    } else {
      localStorage.removeItem("@Auth:visitante");
    }
  }, [isVisitante]);

  function login(newToken: string, name: string) {
    setToken(newToken);
    setUserName(name);
  }

  function logout() {
    setToken(null);
    setUserName(null);
    setIsVisitante(false);
  }

  function entrarComoVisitante() {
    setIsVisitante(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !isVisitante,
        isVisitante,
        token,
        userName,
        login,
        logout,
        entrarComoVisitante,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
