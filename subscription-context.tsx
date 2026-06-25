import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SubscriptionState {
  isSubscribed: boolean;
  subscriptionDate: string | null;
  expirationDate: string | null;
  plan: "free" | "premium";
}

interface SubscriptionContextType {
  subscription: SubscriptionState;
  isSubscribed: boolean;
  isPremium: boolean;
  subscribe: (months: number) => void;
  unsubscribe: () => void;
  getSubscriptionStatus: () => string;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionState>({
    isSubscribed: false,
    subscriptionDate: null,
    expirationDate: null,
    plan: "free",
  });

  // Charger l'état de l'abonnement au démarrage
  useEffect(() => {
    loadSubscriptionState();
  }, []);

  // Vérifier l'expiration de l'abonnement
  useEffect(() => {
    const checkExpiration = () => {
      if (subscription.expirationDate) {
        const expirationDate = new Date(subscription.expirationDate);
        const now = new Date();
        if (now > expirationDate) {
          unsubscribe();
        }
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 60000); // Vérifier chaque minute
    return () => clearInterval(interval);
  }, [subscription.expirationDate]);

  const loadSubscriptionState = async () => {
    try {
      const saved = await AsyncStorage.getItem("subscription_state");
      if (saved) {
        setSubscription(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'abonnement:", error);
    }
  };

  const saveSubscriptionState = async (newState: SubscriptionState) => {
    try {
      await AsyncStorage.setItem("subscription_state", JSON.stringify(newState));
      setSubscription(newState);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'abonnement:", error);
    }
  };

  const subscribe = (months: number) => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + months * 30 * 24 * 60 * 60 * 1000);

    const newState: SubscriptionState = {
      isSubscribed: true,
      subscriptionDate: now.toISOString(),
      expirationDate: expirationDate.toISOString(),
      plan: "premium",
    };

    saveSubscriptionState(newState);
  };

  const unsubscribe = () => {
    const newState: SubscriptionState = {
      isSubscribed: false,
      subscriptionDate: null,
      expirationDate: null,
      plan: "free",
    };

    saveSubscriptionState(newState);
  };

  const getSubscriptionStatus = () => {
    if (!subscription.isSubscribed) {
      return "Gratuit";
    }

    if (subscription.expirationDate) {
      const expirationDate = new Date(subscription.expirationDate);
      const now = new Date();
      const daysRemaining = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysRemaining > 0) {
        return `Premium - ${daysRemaining} jour${daysRemaining > 1 ? "s" : ""} restant${daysRemaining > 1 ? "s" : ""}`;
      }
    }

    return "Abonnement expiré";
  };

  const value: SubscriptionContextType = {
    subscription,
    isSubscribed: subscription.isSubscribed,
    isPremium: subscription.plan === "premium",
    subscribe,
    unsubscribe,
    getSubscriptionStatus,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
}
