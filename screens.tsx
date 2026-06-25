import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const historyItems = [
  { id: "1", title: "Psaumes de Consolation", date: "Aujourd'hui 14:32", icon: "📖" },
  { id: "2", title: "Vie de Jésus - Quiz", date: "Aujourd'hui 12:15", icon: "❓" },
  { id: "3", title: "Prières Puissantes", date: "Hier 18:45", icon: "🙏" },
  { id: "4", title: "Versets d'Espérance", date: "Hier 10:20", icon: "✨" },
  { id: "5", title: "Enseignement: Pardon", date: "22 juin 09:10", icon: "🧑‍🏫" },
];

export default function ScreensScreen() {
  const renderHistoryItem = ({ item }: { item: any }) => (
    <Pressable className="flex-row items-center px-5 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
      <Text className="text-2xl mr-4">{item.icon}</Text>
      <View className="flex-1">
        <Text className="text-sm font-semibold" style={{ color: "#2C2C2C" }}>
          {item.title}
        </Text>
        <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
          {item.date}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#7A7A7A" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 py-5 border-b" style={{ borderColor: "#E0D5C7" }}>
          <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
            Historique
          </Text>
          <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
            Vos pages consultées récemment
          </Text>
        </View>

        {/* Historique */}
        <FlatList
          data={historyItems}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Bouton Effacer */}
        <View className="px-5 py-4 border-t" style={{ borderColor: "#E0D5C7" }}>
          <Pressable className="py-3 px-4 rounded-lg items-center" style={{ backgroundColor: "#F44336" }}>
            <Text className="text-sm font-bold text-white">Effacer l'historique</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
