import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Bookmark {
  id: string;
  type: "verse" | "article" | "quiz";
  title: string;
  reference: string;
  date: string;
  content?: string;
}

export interface Note {
  id: string;
  bookmarkId: string;
  content: string;
  date: string;
  lastModified: string;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  notes: Note[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (reference: string) => boolean;
  getBookmarkById: (id: string) => Bookmark | undefined;
  addNote: (note: Note) => void;
  updateNote: (id: string, content: string) => void;
  removeNote: (id: string) => void;
  getNotesByBookmark: (bookmarkId: string) => Note[];
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Charger les marque-pages et notes au démarrage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedBookmarks, savedNotes] = await Promise.all([
        AsyncStorage.getItem("bookmarks"),
        AsyncStorage.getItem("notes"),
      ]);

      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  const saveBookmarks = async (newBookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des marque-pages:", error);
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des notes:", error);
    }
  };

  const addBookmark = (bookmark: Bookmark) => {
    const updated = [...bookmarks, bookmark];
    saveBookmarks(updated);
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    saveBookmarks(updated);
    // Supprimer aussi les notes associées
    const updatedNotes = notes.filter(n => n.bookmarkId !== id);
    saveNotes(updatedNotes);
  };

  const isBookmarked = (reference: string) => {
    return bookmarks.some(b => b.reference === reference);
  };

  const getBookmarkById = (id: string) => {
    return bookmarks.find(b => b.id === id);
  };

  const addNote = (note: Note) => {
    const updated = [...notes, note];
    saveNotes(updated);
  };

  const updateNote = (id: string, content: string) => {
    const updated = notes.map(n =>
      n.id === id
        ? { ...n, content, lastModified: new Date().toLocaleString("fr-FR") }
        : n
    );
    saveNotes(updated);
  };

  const removeNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const getNotesByBookmark = (bookmarkId: string) => {
    return notes.filter(n => n.bookmarkId === bookmarkId);
  };

  const value: BookmarksContextType = {
    bookmarks,
    notes,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkById,
    addNote,
    updateNote,
    removeNote,
    getNotesByBookmark,
  };

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarksProvider");
  }
  return context;
}
