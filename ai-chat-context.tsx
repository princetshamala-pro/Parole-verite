import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSubscription } from "./subscription-context";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIChatContextType {
  messages: ChatMessage[];
  questionsRemaining: number;
  questionsUsedToday: number;
  lastResetDate: string;
  addMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  decrementQuestions: () => void;
  canAskQuestion: () => boolean;
  resetDailyQuestions: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

const DAILY_QUESTIONS_LIMIT = 5;

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const { isPremium } = useSubscription();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionsUsedToday, setQuestionsUsedToday] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());

  // Charger les données au démarrage
  useEffect(() => {
    loadChatData();
  }, []);

  // Vérifier si on doit réinitialiser les questions quotidiennes
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== lastResetDate) {
      resetDailyQuestions();
    }
  }, [lastResetDate]);

  const loadChatData = async () => {
    try {
      const [savedMessages, savedQuestionsUsed, savedDate] = await Promise.all([
        AsyncStorage.getItem("chat_messages"),
        AsyncStorage.getItem("questions_used_today"),
        AsyncStorage.getItem("last_reset_date"),
      ]);

      if (savedMessages) setMessages(JSON.parse(savedMessages));
      if (savedQuestionsUsed) setQuestionsUsedToday(parseInt(savedQuestionsUsed));
      if (savedDate) setLastResetDate(savedDate);
    } catch (error) {
      console.error("Erreur lors du chargement du chat:", error);
    }
  };

  const saveMessages = async (newMessages: ChatMessage[]) => {
    try {
      await AsyncStorage.setItem("chat_messages", JSON.stringify(newMessages));
      setMessages(newMessages);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du chat:", error);
    }
  };

  const saveQuestionsUsed = async (count: number) => {
    try {
      await AsyncStorage.setItem("questions_used_today", count.toString());
      setQuestionsUsedToday(count);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des questions:", error);
    }
  };

  const addMessage = (message: ChatMessage) => {
    const updated = [...messages, message];
    saveMessages(updated);
  };

  const clearChat = async () => {
    try {
      await AsyncStorage.removeItem("chat_messages");
      setMessages([]);
    } catch (error) {
      console.error("Erreur lors de la suppression du chat:", error);
    }
  };

  const decrementQuestions = () => {
    const newCount = questionsUsedToday + 1;
    saveQuestionsUsed(newCount);
  };

  const canAskQuestion = () => {
    // Les abonnés Premium peuvent poser des questions illimitées
    if (isPremium) return true;
    return questionsUsedToday < DAILY_QUESTIONS_LIMIT;
  };

  const resetDailyQuestions = async () => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem("last_reset_date", today);
      await AsyncStorage.setItem("questions_used_today", "0");
      setLastResetDate(today);
      setQuestionsUsedToday(0);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
    }
  };

  const value: AIChatContextType = {
    messages,
    questionsRemaining: isPremium ? -1 : DAILY_QUESTIONS_LIMIT - questionsUsedToday,
    questionsUsedToday,
    lastResetDate,
    addMessage,
    clearChat,
    decrementQuestions,
    canAskQuestion,
    resetDailyQuestions,
  };

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error("useAIChat must be used within AIChatProvider");
  }
  return context;
}
