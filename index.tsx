import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSubscription } from "@/lib/subscription-context";

export default function HomeScreen() {
  const router = useRouter();
  const { isSubscribed } = useSubscription();
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header avec notifications */}
        <View className="flex-row justify-between items-center px-5 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View>
            <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
              Parole & Vérité
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              {dateStr}
            </Text>
          </View>
          <Pressable className="p-2">
            <MaterialIcons name="notifications" size={24} color="#6B1D2B" />
          </Pressable>
        </View>

        {/* Méditation du jour */}
        <View className="mx-5 mt-6 p-5 rounded-xl" style={{ backgroundColor: "#6B1D2B" }}>
          <Text className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
            MÉDITATION DU JOUR
          </Text>
          <Text className="text-lg font-bold text-white mt-3">
            "Demandez et vous recevrez"
          </Text>
          <Text className="text-sm text-white mt-2 leading-relaxed">
            Matthieu 7:7 - Demandez, et l'on vous donnera; cherchez, et vous trouverez; frappez, et l'on vous ouvrira.
          </Text>
          <Text className="text-xs mt-3" style={{ color: "#C9A84C" }}>
            Réfléchissez à cette promesse aujourd'hui...
          </Text>
        </View>

        {/* Annonce du jour */}
        <View className="mx-5 mt-5 p-4 rounded-lg border" style={{ backgroundColor: "#F5F0E8", borderColor: "#C9A84C" }}>
          <View className="flex-row items-center gap-2 mb-2">
            <MaterialIcons name="info" size={18} color="#6B1D2B" />
            <Text className="text-sm font-semibold" style={{ color: "#6B1D2B" }}>
              Annonce du jour
            </Text>
          </View>
          <Text className="text-xs" style={{ color: "#2C2C2C" }}>
            Nouveau contenu ajouté: "Les Paraboles de Jésus" - Découvrez 12 paraboles essentielles.
          </Text>
        </View>

        {/* Barre de recherche + Boutons rapides */}
        <View className="mx-5 mt-5 gap-3">
          <Pressable className="flex-row items-center px-4 py-3 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
            <MaterialIcons name="search" size={20} color="#7A7A7A" />
            <Text className="ml-2 flex-1 text-sm" style={{ color: "#7A7A7A" }}>
              Rechercher...
            </Text>
          </Pressable>

          {/* Boutons rapides */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.push("/bookmarks")}
              className="flex-1 flex-row items-center justify-center px-3 py-3 rounded-lg border"
              style={{ backgroundColor: "#F5F0E8", borderColor: "#E0D5C7" }}
            >
              <MaterialIcons name="bookmark" size={18} color="#6B1D2B" />
              <Text className="ml-2 text-xs font-semibold" style={{ color: "#6B1D2B" }}>
                Marque-pages
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/ai-chat")}
              className="flex-1 flex-row items-center justify-center px-3 py-3 rounded-lg border"
              style={{ backgroundColor: "#F5F0E8", borderColor: "#E0D5C7" }}
            >
              <MaterialIcons name="chat" size={18} color="#6B1D2B" />
              <Text className="ml-2 text-xs font-semibold" style={{ color: "#6B1D2B" }}>
                Chat IA
              </Text>
            </Pressable>
          </View>

          {/* Bouton Premium */}
          {!isSubscribed && (
            <Pressable
              onPress={() => router.push("/subscription")}
              className="mt-1 flex-row items-center justify-center px-4 py-3 rounded-lg"
              style={{ backgroundColor: "#C9A84C" }}
            >
              <MaterialIcons name="star" size={18} color="#FFFFFF" />
              <Text className="ml-2 text-xs font-semibold text-white">
                Passer a Premium
              </Text>
            </Pressable>
          )}

          {/* Bouton Admin */}
          <Pressable
            onPress={() => router.push("/admin-login")}
            className="mt-3 flex-row items-center justify-center px-4 py-3 rounded-lg border"
            style={{ backgroundColor: "#F5F0E8", borderColor: "#E0D5C7" }}
          >
            <MaterialIcons name="admin-panel-settings" size={18} color="#6B1D2B" />
            <Text className="ml-2 text-xs font-semibold" style={{ color: "#6B1D2B" }}>
              Admin
            </Text>
          </Pressable>
        </View>

        {/* Quiz du jour en vedette */}
        <View className="mx-5 mt-6">
          <Text className="text-lg font-bold mb-3" style={{ color: "#2C2C2C" }}>
            Quiz du Jour
          </Text>
          <Pressable onPress={() => router.push("/quiz-list")} className="p-4 rounded-lg" style={{ backgroundColor: "#C9A84C" }}>
            <Text className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
              Vie de Jésus
            </Text>
            <Text className="text-xs mt-1" style={{ color: "#F5F0E8" }}>
              10 questions • Chronomètre 20s
            </Text>
            <Text className="text-lg font-bold mt-2" style={{ color: "#FFFFFF" }}>
              Commencer →
            </Text>
          </Pressable>
        </View>

        {/* Contenu populaire */}
        <View className="mx-5 mt-6">
          <Text className="text-lg font-bold mb-3" style={{ color: "#2C2C2C" }}>
            Les Plus Lus
          </Text>
          {["Psaumes de Consolation", "Prières Puissantes", "Versets d'Espérance"].map((item, idx) => (
            <Pressable key={idx} className="p-3 mb-2 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
              <Text className="text-sm font-semibold" style={{ color: "#2C2C2C" }}>
                {item}
              </Text>
              <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
                Consulté {Math.floor(Math.random() * 1000) + 100} fois
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
