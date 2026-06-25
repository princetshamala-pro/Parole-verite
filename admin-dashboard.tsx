import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAdmin } from "@/lib/admin-context";
import { useRouter } from "expo-router";

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { logout } = useAdmin();

  const menuItems = [
    {
      id: "sermons",
      title: "Prédications",
      description: "Gérer les prédications",
      icon: "mic",
      color: "#6B1D2B",
      route: "/admin-sermons",
    },
    {
      id: "teachings",
      title: "Enseignements",
      description: "Gérer les enseignements",
      icon: "school",
      color: "#8B6F47",
      route: "/admin-teachings",
    },
    {
      id: "quizzes",
      title: "Quiz",
      description: "Gérer les quiz bibliques",
      icon: "quiz",
      color: "#4CAF50",
      route: "/admin-quizzes",
    },
    {
      id: "announcements",
      title: "Annonces",
      description: "Créer des annonces du jour",
      icon: "notifications-active",
      color: "#2196F3",
      route: "/admin-announcements",
    },
    {
      id: "users",
      title: "Utilisateurs",
      description: "Voir les statistiques",
      icon: "people",
      color: "#FF9800",
      route: "/admin-users",
    },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/(tabs)");
  };

  const renderMenuItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(item.route)}
      className="mx-4 mb-3 p-4 rounded-lg flex-row items-center border"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}
    >
      <View className="w-12 h-12 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: item.color }}>
        <MaterialIcons name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
          {item.title}
        </Text>
        <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
          {item.description}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#C9A84C" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4 border-b flex-row justify-between items-center" style={{ borderColor: "#E0D5C7" }}>
          <View>
            <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
              Admin Panel
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
              Gestion du contenu
            </Text>
          </View>
          <Pressable onPress={handleLogout} className="p-2">
            <MaterialIcons name="logout" size={24} color="#F44336" />
          </Pressable>
        </View>

        {/* Stats rapides */}
        <View className="mx-4 mt-6 flex-row gap-3">
          <View className="flex-1 p-4 rounded-lg" style={{ backgroundColor: "#E3F2FD" }}>
            <Text className="text-2xl font-bold" style={{ color: "#1976D2" }}>
              42
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#1565C0" }}>
              Prédications
            </Text>
          </View>
          <View className="flex-1 p-4 rounded-lg" style={{ backgroundColor: "#F3E5F5" }}>
            <Text className="text-2xl font-bold" style={{ color: "#7B1FA2" }}>
              28
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#6A1B9A" }}>
              Enseignements
            </Text>
          </View>
          <View className="flex-1 p-4 rounded-lg" style={{ backgroundColor: "#E8F5E9" }}>
            <Text className="text-2xl font-bold" style={{ color: "#388E3C" }}>
              10
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#2E7D32" }}>
              Quiz
            </Text>
          </View>
        </View>

        {/* Menu principal */}
        <View className="mt-8">
          <Text className="text-lg font-bold mx-4 mb-4" style={{ color: "#2C2C2C" }}>
            Gestion du Contenu
          </Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>

        {/* Actions rapides */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-bold mb-4" style={{ color: "#2C2C2C" }}>
            Actions
          </Text>
          <Pressable className="p-4 rounded-lg mb-3 flex-row items-center border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
            <MaterialIcons name="backup" size={20} color="#6B1D2B" />
            <Text className="ml-3 text-sm font-semibold" style={{ color: "#2C2C2C" }}>
              Sauvegarder les données
            </Text>
          </Pressable>

          <Pressable className="p-4 rounded-lg flex-row items-center border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
            <MaterialIcons name="settings" size={20} color="#6B1D2B" />
            <Text className="ml-3 text-sm font-semibold" style={{ color: "#2C2C2C" }}>
              Paramètres
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="mx-4 mt-8 p-4 rounded-lg" style={{ backgroundColor: "#F5F0E8" }}>
          <Text className="text-xs text-center" style={{ color: "#7A7A7A" }}>
            Parole & Vérité Admin v1.0 • Tous les changements sont sauvegardés automatiquement
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
