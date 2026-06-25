import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSubscription } from "@/lib/subscription-context";

export function AdBanner() {
  const { isPremium } = useSubscription();

  // Ne pas afficher les pubs si l'utilisateur est abonné
  if (isPremium) {
    return null;
  }

  return (
    <View className="bg-gray-100 py-3 px-4 border-t" style={{ borderColor: "#E0D5C7" }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <MaterialIcons name="ads-click" size={18} color="#6B1D2B" />
          <View className="flex-1">
            <Text className="text-xs font-semibold" style={{ color: "#2C2C2C" }}>
              Passez à Premium
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              Supprimez les publicités
            </Text>
          </View>
        </View>
        <Pressable className="px-3 py-1 rounded-full" style={{ backgroundColor: "#6B1D2B" }}>
          <Text className="text-xs font-bold text-white">Essayer</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Bannière AdMob simulée pour démonstration
export function AdBannerPlaceholder() {
  const { isPremium } = useSubscription();

  if (isPremium) {
    return null;
  }

  return (
    <View className="bg-gray-200 py-12 items-center justify-center border-t" style={{ borderColor: "#E0D5C7" }}>
      <MaterialIcons name="image" size={32} color="#999" />
      <Text className="text-xs mt-2 text-gray-500">Espace publicitaire</Text>
    </View>
  );
}
