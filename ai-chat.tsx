import { ScrollView, Text, View, Pressable, TextInput, FlatList, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAIChat } from "@/lib/ai-chat-context";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AIChatScreen() {
  const router = useRouter();
  const { messages, questionsRemaining, canAskQuestion, addMessage, clearChat, decrementQuestions } = useAIChat();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !canAskQuestion()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputText,
      timestamp: new Date().toLocaleString("fr-FR"),
    };

    addMessage(userMessage);
    setInputText("");
    decrementQuestions();
    setLoading(true);

    // Simuler une réponse IA (à remplacer par l'API OpenAI)
    setTimeout(() => {
      const aiResponses = [
        "Selon la Bible, cette question est abordée dans plusieurs passages. Consultez la Médiathèque pour plus de détails.",
        "C'est une excellente question biblique! La réponse se trouve dans les Écritures saintes.",
        "Dieu nous enseigne à travers sa Parole. Continuez à explorer la Bible pour approfondir votre compréhension.",
        "Cette vérité biblique est fondamentale pour notre foi. Réfléchissez à ce que cela signifie pour vous.",
        "La sagesse divine nous guide à travers ces enseignements. Cherchez et vous trouverez.",
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleString("fr-FR"),
      };

      addMessage(aiMessage);
      setLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View className={`px-4 py-3 ${item.role === "user" ? "items-end" : "items-start"}`}>
      <View
        className="rounded-lg px-4 py-3 max-w-xs"
        style={{
          backgroundColor: item.role === "user" ? "#6B1D2B" : "#F5F0E8",
        }}
      >
        <Text
          className="text-sm"
          style={{
            color: item.role === "user" ? "#FFFFFF" : "#2C2C2C",
          }}
        >
          {item.content}
        </Text>
        <Text
          className="text-xs mt-1"
          style={{
            color: item.role === "user" ? "#C9A84C" : "#7A7A7A",
          }}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Pressable onPress={() => router.back()} className="p-2">
                <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
              </Pressable>
              <View>
                <Text className="text-lg font-bold" style={{ color: "#2C2C2C" }}>
                  Assistant IA
                </Text>
                <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                  Chat biblique
                </Text>
              </View>
            </View>
            <Pressable onPress={clearChat} className="p-2">
              <MaterialIcons name="delete" size={20} color="#6B1D2B" />
            </Pressable>
          </View>

          {/* Compteur de questions */}
          <View className="flex-row items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#F5F0E8" }}>
            <MaterialIcons name="help" size={16} color="#6B1D2B" />
            <Text className="text-xs font-semibold" style={{ color: "#2C2C2C" }}>
              {questionsRemaining === -1 ? "Illimité" : `${questionsRemaining} question${questionsRemaining !== 1 ? "s" : ""} restante${questionsRemaining !== 1 ? "s" : ""} aujourd'hui`}
            </Text>
          </View>
        </View>

        {/* Messages */}
        {messages.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <MaterialIcons name="chat" size={48} color="#C9A84C" />
            <Text className="text-lg font-bold mt-4 text-center" style={{ color: "#2C2C2C" }}>
              Bienvenue!
            </Text>
            <Text className="text-sm text-center mt-2" style={{ color: "#7A7A7A" }}>
              Posez vos questions sur la Bible et recevez des réponses bibliques.
            </Text>
            <Text className="text-xs text-center mt-4" style={{ color: "#6B1D2B" }}>
              Vous avez {questionsRemaining} questions disponibles aujourd'hui.
            </Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 16 }}
            scrollEnabled={true}
          />
        )}

        {/* Input */}
        <View className="px-4 py-4 border-t" style={{ borderColor: "#E0D5C7" }}>
          {!canAskQuestion() && (
            <View className="mb-3 p-3 rounded-lg" style={{ backgroundColor: "#FFE0B2" }}>
              <Text className="text-xs text-center" style={{ color: "#E65100" }}>
                Vous avez utilisé vos 5 questions pour aujourd'hui. Revenez demain!
              </Text>
            </View>
          )}

          <View className="flex-row items-center gap-2">
            <TextInput
              placeholder="Posez votre question..."
              value={inputText}
              onChangeText={setInputText}
              editable={canAskQuestion() && !loading}
              className="flex-1 px-4 py-3 rounded-lg border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E0D5C7",
                color: "#2C2C2C",
              }}
              placeholderTextColor="#7A7A7A"
              multiline
              maxLength={500}
            />
            <Pressable
              onPress={handleSendMessage}
              disabled={!inputText.trim() || !canAskQuestion() || loading}
              className="p-3 rounded-lg items-center justify-center"
              style={{
                backgroundColor: inputText.trim() && canAskQuestion() && !loading ? "#6B1D2B" : "#E0D5C7",
              }}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <MaterialIcons name="send" size={20} color="#FFFFFF" />
              )}
            </Pressable>
          </View>

          <Text className="text-xs text-center mt-2" style={{ color: "#7A7A7A" }}>
            Max 500 caractères
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
