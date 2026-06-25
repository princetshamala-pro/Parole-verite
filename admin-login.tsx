import { ScrollView, Text, View, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAdmin } from "@/lib/admin-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AdminLoginScreen() {
  const router = useRouter();
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert("Erreur", "Veuillez entrer le mot de passe");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (login(password)) {
        setLoading(false);
        router.replace("/admin-dashboard");
      } else {
        setLoading(false);
        Alert.alert("Erreur", "Mot de passe incorrect");
        setPassword("");
      }
    }, 500);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-6 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row items-center gap-2">
            <Pressable onPress={() => router.back()} className="p-2">
              <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
            </Pressable>
            <View>
              <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
                Administration
              </Text>
              <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
                Connexion sécurisée
              </Text>
            </View>
          </View>
        </View>

        {/* Logo/Icon */}
        <View className="items-center py-12">
          <View className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: "#6B1D2B" }}>
            <MaterialIcons name="admin-panel-settings" size={40} color="#C9A84C" />
          </View>
          <Text className="text-xl font-bold mt-4" style={{ color: "#2C2C2C" }}>
            Panneau Admin
          </Text>
          <Text className="text-xs text-center mt-2" style={{ color: "#7A7A7A" }}>
            Accès réservé aux administrateurs
          </Text>
        </View>

        {/* Formulaire */}
        <View className="mx-6 gap-4">
          {/* Champ mot de passe */}
          <View>
            <Text className="text-sm font-semibold mb-2" style={{ color: "#2C2C2C" }}>
              Mot de passe
            </Text>
            <View className="flex-row items-center px-4 py-3 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
              <MaterialIcons name="lock" size={20} color="#6B1D2B" />
              <TextInput
                placeholder="Entrez le mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 ml-3 text-sm"
                style={{ color: "#2C2C2C" }}
                placeholderTextColor="#7A7A7A"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#7A7A7A" />
              </Pressable>
            </View>
          </View>

          {/* Bouton de connexion */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className="py-3 px-4 rounded-lg items-center mt-4"
            style={{ backgroundColor: loading ? "#999" : "#6B1D2B" }}
          >
            <Text className="text-sm font-bold text-white">
              {loading ? "Connexion..." : "Se connecter"}
            </Text>
          </Pressable>
        </View>

        {/* Message de sécurité */}
        <View className="mx-6 mt-8 p-4 rounded-lg" style={{ backgroundColor: "#FFF3E0" }}>
          <View className="flex-row items-start gap-2">
            <MaterialIcons name="info" size={18} color="#E65100" />
            <Text className="text-xs flex-1" style={{ color: "#E65100" }}>
              Cet accès est réservé aux administrateurs. Ne partagez pas votre mot de passe.
            </Text>
          </View>
        </View>

        {/* Aide */}
        <View className="mx-6 mt-6 p-4 rounded-lg border" style={{ backgroundColor: "#F5F0E8", borderColor: "#E0D5C7" }}>
          <Text className="text-xs font-semibold mb-2" style={{ color: "#2C2C2C" }}>
            Besoin d'aide?
          </Text>
          <Text className="text-xs" style={{ color: "#7A7A7A" }}>
            Contactez le support administrateur si vous avez oublié votre mot de passe.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
