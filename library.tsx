import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const categories = [
  { id: "1", title: "Jésus-Christ", icon: "✝️" },
  { id: "2", title: "Écriture", icon: "📜" },
  { id: "3", title: "Référence", icon: "📖" },
  { id: "4", title: "Enseignement", icon: "🧑‍🏫" },
  { id: "5", title: "Musique", icon: "🎵" },
  { id: "6", title: "Principes", icon: "⚖️" },
  { id: "7", title: "Histoires", icon: "📚" },
  { id: "8", title: "Étude", icon: "🔍" },
];

export default function LibraryScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === "2") {
      router.push("/scripture");
    }
  };

  const renderCategory = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => handleCategoryPress(item.id)}
      className="flex-1 mx-1 mb-6 items-center"
    >
      <View
        className="w-full aspect-square rounded-lg items-center justify-center mb-2 bg-surface border"
        style={{ borderColor: "#E0D5C7" }}
      >
        <Text className="text-5xl">{item.icon}</Text>
      </View>
      <Text className="text-xs font-semibold text-center" style={{ color: "#2C2C2C" }}>
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Verset du jour avec dégradé */}
        <LinearGradient
          colors={["#6B1D2B", "#C9A84C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="mx-5 mt-5 p-5 rounded-lg"
        >
          <Text className="text-xs font-semibold text-white">VERSET DU JOUR</Text>
          <Text className="text-lg font-bold text-white mt-3">
            "Je suis la lumière du monde"
          </Text>
          <Text className="text-sm text-white mt-2">Jean 8:12</Text>
        </LinearGradient>

        {/* En-tête Médiathèque */}
        <View className="px-5 py-5">
          <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
            Médiathèque
          </Text>
          <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
            Explorez 8 catégories bibliques
          </Text>
        </View>

        {/* Grille 2x4 */}
        <View className="px-5">
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
