import { ScrollView, Text, View, Pressable, FlatList, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useBible } from "@/lib/bible-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ScriptureScreen() {
  const router = useRouter();
  const { books, selectedBook, selectedChapter, verses, bookmarks, fontSize, setSelectedBook, setSelectedChapter, addBookmark, removeBookmark, isBookmarked, setFontSize, searchVerses } = useBible();
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showChapterSelector, setShowChapterSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const currentBook = books.find(b => b.name === selectedBook);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setSearchResults(searchVerses(query));
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectVerse = (verse: any) => {
    setSelectedBook(verse.book);
    setSelectedChapter(verse.chapter);
    setShowSearch(false);
    setSearchQuery("");
  };

  const currentReference = `${selectedBook} ${selectedChapter}`;
  const isMarked = isBookmarked(currentReference);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      {/* Header */}
      <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
        <View className="flex-row justify-between items-center mb-4">
          <Pressable onPress={() => router.back()} className="p-2">
            <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
          </Pressable>
          <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
            Écriture Sainte
          </Text>
          <Pressable onPress={() => setShowSearch(!showSearch)} className="p-2">
            <MaterialIcons name="search" size={24} color="#6B1D2B" />
          </Pressable>
        </View>

        {/* Barre de recherche */}
        {showSearch && (
          <TextInput
            placeholder="Chercher un verset..."
            value={searchQuery}
            onChangeText={handleSearch}
            className="px-3 py-2 rounded-lg border mb-3"
            style={{ borderColor: "#E0D5C7", backgroundColor: "#FFFFFF" }}
            placeholderTextColor="#7A7A7A"
          />
        )}

        {/* Sélecteur Livre et Chapitre */}
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => setShowBookSelector(true)}
            className="flex-1 px-3 py-2 rounded-lg border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}
          >
            <Text className="text-xs font-semibold" style={{ color: "#7A7A7A" }}>
              Livre
            </Text>
            <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
              {selectedBook}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setShowChapterSelector(true)}
            className="px-4 py-2 rounded-lg border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}
          >
            <Text className="text-xs font-semibold" style={{ color: "#7A7A7A" }}>
              Chapitre
            </Text>
            <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
              {selectedChapter}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => isMarked ? removeBookmark(currentReference) : addBookmark(currentReference)}
            className="px-3 py-2 rounded-lg items-center justify-center"
            style={{ backgroundColor: isMarked ? "#C9A84C" : "#F5F0E8" }}
          >
            <MaterialIcons name={isMarked ? "bookmark" : "bookmark-border"} size={20} color={isMarked ? "#FFFFFF" : "#6B1D2B"} />
          </Pressable>
        </View>
      </View>

      {/* Résultats de recherche */}
      {showSearch && searchResults.length > 0 && (
        <View className="max-h-64 border-b" style={{ borderColor: "#E0D5C7" }}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectVerse(item)}
                className="px-4 py-3 border-b"
                style={{ borderColor: "#E0D5C7" }}
              >
                <Text className="text-xs font-semibold" style={{ color: "#6B1D2B" }}>
                  {item.book} {item.chapter}:{item.verse}
                </Text>
                <Text className="text-xs mt-1" style={{ color: "#2C2C2C" }} numberOfLines={2}>
                  {item.text}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item, idx) => `${item.book}-${item.chapter}-${item.verse}-${idx}`}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Contenu des versets */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {verses.length > 0 ? (
          verses.map((verse, idx) => (
            <Pressable
              key={idx}
              className="px-4 py-4 border-b"
              style={{ borderColor: "#E0D5C7" }}
              onLongPress={() => {
                const ref = `${verse.book} ${verse.chapter}:${verse.verse}`;
                isBookmarked(ref) ? removeBookmark(ref) : addBookmark(ref);
              }}
            >
              <Text className="text-xs font-semibold" style={{ color: "#6B1D2B" }}>
                {verse.book} {verse.chapter}:{verse.verse}
              </Text>
              <Text
                className="mt-2 leading-relaxed"
                style={{ color: "#2C2C2C", fontSize: fontSize }}
              >
                {verse.text}
              </Text>
            </Pressable>
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Text style={{ color: "#7A7A7A" }}>Aucun verset disponible</Text>
          </View>
        )}
      </ScrollView>

      {/* Contrôles de taille de police */}
      <View className="px-4 py-3 border-t flex-row justify-center gap-4" style={{ borderColor: "#E0D5C7" }}>
        <Pressable
          onPress={() => setFontSize(Math.max(12, fontSize - 2))}
          className="px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#F5F0E8" }}
        >
          <Text style={{ color: "#2C2C2C" }}>A-</Text>
        </Pressable>
        <Text style={{ color: "#7A7A7A", paddingVertical: 8 }}>
          {fontSize}px
        </Text>
        <Pressable
          onPress={() => setFontSize(Math.min(24, fontSize + 2))}
          className="px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#F5F0E8" }}
        >
          <Text style={{ color: "#2C2C2C" }}>A+</Text>
        </Pressable>
      </View>

      {/* Modal Sélecteur de Livre */}
      <Modal visible={showBookSelector} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1 bg-background">
          <View className="px-4 py-4 border-b flex-row justify-between items-center" style={{ borderColor: "#E0D5C7" }}>
            <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
              Sélectionner un livre
            </Text>
            <Pressable onPress={() => setShowBookSelector(false)}>
              <MaterialIcons name="close" size={24} color="#6B1D2B" />
            </Pressable>
          </View>

          <FlatList
            data={books}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedBook(item.name);
                  setSelectedChapter(1);
                  setShowBookSelector(false);
                }}
                className="px-4 py-3 border-b flex-row justify-between items-center"
                style={{ borderColor: "#E0D5C7" }}
              >
                <View>
                  <Text className="font-semibold" style={{ color: selectedBook === item.name ? "#6B1D2B" : "#2C2C2C" }}>
                    {item.name}
                  </Text>
                  <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                    {item.chapters} chapitres
                  </Text>
                </View>
                {selectedBook === item.name && <MaterialIcons name="check" size={20} color="#6B1D2B" />}
              </Pressable>
            )}
            keyExtractor={(item) => item.name}
          />
        </SafeAreaView>
      </Modal>

      {/* Modal Sélecteur de Chapitre */}
      <Modal visible={showChapterSelector} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1 bg-background">
          <View className="px-4 py-4 border-b flex-row justify-between items-center" style={{ borderColor: "#E0D5C7" }}>
            <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
              Chapitre de {selectedBook}
            </Text>
            <Pressable onPress={() => setShowChapterSelector(false)}>
              <MaterialIcons name="close" size={24} color="#6B1D2B" />
            </Pressable>
          </View>

          <FlatList
            data={Array.from({ length: currentBook?.chapters || 1 }, (_, i) => i + 1)}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedChapter(item);
                  setShowChapterSelector(false);
                }}
                className="px-4 py-3 border-b"
                style={{ borderColor: "#E0D5C7" }}
              >
                <Text
                  className="font-semibold"
                  style={{ color: selectedChapter === item ? "#6B1D2B" : "#2C2C2C" }}
                >
                  Chapitre {item}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item) => `chapter-${item}`}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
