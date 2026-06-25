import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useSubscription } from "@/lib/subscription-context";
import { useRouter } from "expo-router";

export default function SubscriptionScreen() {
  const router = useRouter();
  const { isSubscribed, subscribe, getSubscriptionStatus } = useSubscription();

  const handleSubscribe = () => {
    // Simuler l'achat via Google Play Billing
    subscribe(1); // 1 mois d'abonnement
    router.back();
  };

  const benefits = [
    { icon: "block", title: "Pas de publicités", description: "Profitez d'une expérience sans interruption" },
    { icon: "unlimited", title: "IA illimitée", description: "Posez autant de questions que vous voulez" },
    { icon: "lock-open", title: "Contenu exclusif", description: "Accès à des articles et quiz premium" },
    { icon: "download", title: "Lecture hors-ligne", description: "Téléchargez la Bible et les articles" },
    { icon: "star", title: "Priorité support", description: "Assistance prioritaire 24/7" },
    { icon: "sync", title: "Synchronisation", description: "Synchronisez vos données sur tous les appareils" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row items-center gap-2">
            <Pressable onPress={() => router.back()} className="p-2">
              <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
            </Pressable>
            <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
              {isSubscribed ? "Mon Abonnement" : "Passer à Premium"}
            </Text>
          </View>
        </View>

        {/* Status actuel */}
        {isSubscribed && (
          <View className="mx-4 mt-6 p-4 rounded-lg" style={{ backgroundColor: "#E8F5E9" }}>
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text className="text-sm font-bold" style={{ color: "#2E7D32" }}>
                {getSubscriptionStatus()}
              </Text>
            </View>
            <Text className="text-xs" style={{ color: "#2E7D32" }}>
              Merci d'avoir choisi Parole & Vérité Premium!
            </Text>
          </View>
        )}

        {/* Hero Section */}
        <View className="mx-4 mt-6 p-6 rounded-xl" style={{ backgroundColor: "#6B1D2B" }}>
          <Text className="text-3xl font-bold text-white mb-2">Premium</Text>
          <Text className="text-lg font-bold text-white mb-4">3,99€</Text>
          <Text className="text-sm text-white mb-4">
            par mois • Annulation possible à tout moment
          </Text>
          <Pressable
            onPress={handleSubscribe}
            disabled={isSubscribed}
            className="py-3 px-4 rounded-lg items-center"
            style={{ backgroundColor: isSubscribed ? "#999" : "#C9A84C" }}
          >
            <Text className="text-sm font-bold" style={{ color: isSubscribed ? "#666" : "#FFFFFF" }}>
              {isSubscribed ? "Vous êtes abonné" : "Commencer l'essai gratuit"}
            </Text>
          </Pressable>
          <Text className="text-xs text-center mt-3" style={{ color: "#C9A84C" }}>
            Essai gratuit 7 jours, puis 3,99€/mois
          </Text>
        </View>

        {/* Avantages */}
        <View className="mx-4 mt-8">
          <Text className="text-lg font-bold mb-4" style={{ color: "#2C2C2C" }}>
            Avantages Premium
          </Text>

          {benefits.map((benefit, idx) => (
            <View key={idx} className="flex-row items-start gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: "#F5F0E8" }}>
              <View className="w-8 h-8 rounded-lg items-center justify-center" style={{ backgroundColor: "#C9A84C" }}>
                <MaterialIcons name={benefit.icon as any} size={16} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
                  {benefit.title}
                </Text>
                <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
                  {benefit.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* FAQ */}
        <View className="mx-4 mt-8 mb-6">
          <Text className="text-lg font-bold mb-4" style={{ color: "#2C2C2C" }}>
            Questions Fréquentes
          </Text>

          <View className="p-4 rounded-lg mb-3" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", borderWidth: 1 }}>
            <Text className="text-sm font-bold mb-2" style={{ color: "#2C2C2C" }}>
              Puis-je annuler mon abonnement?
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              Oui, vous pouvez annuler à tout moment depuis les paramètres de votre compte Google Play.
            </Text>
          </View>

          <View className="p-4 rounded-lg mb-3" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", borderWidth: 1 }}>
            <Text className="text-sm font-bold mb-2" style={{ color: "#2C2C2C" }}>
              Y a-t-il une période d'essai?
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              Oui, 7 jours gratuits pour tester tous les avantages Premium.
            </Text>
          </View>

          <View className="p-4 rounded-lg" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7", borderWidth: 1 }}>
            <Text className="text-sm font-bold mb-2" style={{ color: "#2C2C2C" }}>
              Puis-je utiliser Premium sur plusieurs appareils?
            </Text>
            <Text className="text-xs" style={{ color: "#7A7A7A" }}>
              Oui, votre abonnement est lié à votre compte Google et fonctionne sur tous vos appareils.
            </Text>
          </View>
        </View>

        {/* Conditions */}
        <View className="mx-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: "#F5F0E8" }}>
          <Text className="text-xs text-center" style={{ color: "#7A7A7A" }}>
            En vous abonnant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
