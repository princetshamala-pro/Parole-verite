import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bibleBooks, bibleVerses, Verse } from "./bible-data";

interface BibleContextType {
  books: typeof bibleBooks;
  selectedBook: string;
  selectedChapter: number;
  verses: Verse[];
  bookmarks: string[];
  fontSize: number;
  setSelectedBook: (book: string) => void;
  setSelectedChapter: (chapter: number) => void;
  addBookmark: (reference: string) => void;
  removeBookmark: (reference: string) => void;
  isBookmarked: (reference: string) => boolean;
  setFontSize: (size: number) => void;
  searchVerses: (query: string) => Verse[];
}

const BibleContext = createContext<BibleContextType | undefined>(undefined);

export function BibleProvider({ children }: { children: React.ReactNode }) {
  const [selectedBook, setSelectedBook] = useState("Genèse");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(16);

  // Charger les marque-pages au démarrage
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const saved = await AsyncStorage.getItem("bible_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des marque-pages:", error);
    }
  };

  const saveBookmarks = async (newBookmarks: string[]) => {
    try {
      await AsyncStorage.setItem("bible_bookmarks", JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des marque-pages:", error);
    }
  };

  const addBookmark = (reference: string) => {
    const updated = [...bookmarks, reference];
    saveBookmarks(updated);
  };

  const removeBookmark = (reference: string) => {
    const updated = bookmarks.filter(b => b !== reference);
    saveBookmarks(updated);
  };

  const isBookmarked = (reference: string) => {
    return bookmarks.includes(reference);
  };

  const getVerses = (): Verse[] => {
    return bibleVerses[selectedBook] || [];
  };

  const searchVerses = (query: string): Verse[] => {
    const results: Verse[] = [];
    const lowerQuery = query.toLowerCase();
    
    Object.values(bibleVerses).forEach(verses => {
      verses.forEach(verse => {
        if (verse.text.toLowerCase().includes(lowerQuery)) {
          results.push(verse);
        }
      });
    });
    
    return results;
  };

  const value: BibleContextType = {
    books: bibleBooks,
    selectedBook,
    selectedChapter,
    verses: getVerses(),
    bookmarks,
    fontSize,
    setSelectedBook,
    setSelectedChapter,
    addBookmark,
    removeBookmark,
    isBookmarked,
    setFontSize,
    searchVerses,
  };

  return <BibleContext.Provider value={value}>{children}</BibleContext.Provider>;
}

export function useBible() {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error("useBible must be used within BibleProvider");
  }
  return context;
}
