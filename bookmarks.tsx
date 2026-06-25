import { ScrollView, Text, View, Pressable, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useBookmarks } from "@/lib/bookmarks-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, removeBookmark, getNotesByBookmark } = useBookmarks();
  const [filter, setFilter] = useState<"all" | "verse" | "article" | "quiz">("all");

  const filteredBookmarks = bookmarks.filter(b => filter === "all" || b.type === filter);

  const handleDeleteBookmark = (id: string) => {
    Alert.alert("Supprimer le marque-page", "Êtes-vous sûr?", [
      { text: "Annuler", onPress: () => {} },
      {
        text: "Supprimer",
        onPress: () => removeBookmark(id),
        style: "destructive",
      },
    ]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "verse":
        return "book";
      case "article":
        return "article";
      case "quiz":
        return "quiz";
      default:
        return "bookmark";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "verse":
        return "Verset";
      case "article":
        return "Article";
      case "quiz":
        return "Quiz";
      default:
        return "Marque-page";
    }
  };

  const renderBookmark = ({ item }: { item: any }) => {
    const itemNotes = getNotesByBookmark(item.id);

    return (
      <Pressable className="mx-4 mb-3 p-4 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
              <View className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: "#F5F0E8" }}>
                <MaterialIcons name={getIcon(item.type)} size={16} color="#6B1D2B" />
              </View>
              <Text className="text-xs font-semibold" style={{ color: "#6B1D2B" }}>
                {getTypeLabel(item.type)}
              </Text>
            </View>
            <Text className="text-sm font-bold mb-1" style={{ color: "#2C2C2C" }}>
              {item.title}
            </Text>
            <Text className="text-xs mb-2" style={{ color: "#7A7A7A" }}>
              {item.reference}
            </Text>
            {itemNotes.length > 0 && (
              <Text className="text-xs" style={{ color: "#C9A84C" }}>
                📝 {itemNotes.length} note{itemNotes.length > 1 ? "s" : ""}
              </Text>
            )}
            <Text className="text-xs mt-2" style={{ color: "#7A7A7A" }}>
              {item.date}
            </Text>
          </View>

          <Pressable onPress={() => handleDeleteBookmark(item.id)} className="p-2">
            <MaterialIcons name="close" size={20} color="#F44336" />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      {/* Header */}
      <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
        <View className="flex-row items-center gap-2 mb-3">
          <Pressable onPress={() => router.back()} className="p-2">
            <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
          </Pressable>
          <View>
            <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
              Marque-pages
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
              {filteredBookmarks.length} élément{filteredBookmarks.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* Filtres */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          {["all", "verse", "article", "quiz"].map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f as any)}
              className="px-4 py-2 rounded-full border"
              style={{
                backgroundColor: filter === f ? "#6B1D2B" : "#FFFFFF",
                borderColor: "#E0D5C7",
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{
                  color: filter === f ? "#FFFFFF" : "#2C2C2C",
                }}
              >
                {f === "all" ? "Tous" : f === "verse" ? "Versets" : f === "article" ? "Articles" : "Quiz"}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Liste des marque-pages */}
      {filteredBookmarks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <MaterialIcons name="bookmark-outline" size={48} color="#C9A84C" />
          <Text className="text-lg font-bold mt-4 text-center" style={{ color: "#2C2C2C" }}>
            Aucun marque-page
          </Text>
          <Text className="text-sm text-center mt-2" style={{ color: "#7A7A7A" }}>
            Sauvegardez vos versets, articles et quiz favoris pour y accéder rapidement.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookmarks}
          renderItem={renderBookmark}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 20 }}
          scrollEnabled={true}
        />
      )}
    </SafeAreaView>
  );
}
