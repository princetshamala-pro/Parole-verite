import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ADMIN_PASSWORD = "admin123"; // À changer en production

interface AdminContextType {
  isAdminLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Vérifier si l'admin est déjà connecté au démarrage
  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem("admin_logged_in");
      if (saved === "true") {
        setIsAdminLoggedIn(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du statut admin:", error);
    }
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      AsyncStorage.setItem("admin_logged_in", "true");
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("admin_logged_in");
      setIsAdminLoggedIn(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const value: AdminContextType = {
    isAdminLoggedIn,
    login,
    logout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
