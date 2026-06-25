import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuiz } from "@/lib/quiz-context";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function QuizResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { quizzes, resetQuiz } = useQuiz();

  const score = parseInt(params.score as string) || 0;
  const total = parseInt(params.total as string) || 10;
  const quizId = params.quizId as string;
  const percentage = Math.round((score / total) * 100);
  const quiz = quizzes.find(q => q.id === quizId);

  let feedback = "";
  let feedbackColor = "";
  let icon = "";

  if (percentage >= 90) {
    feedback = "Excellent! 🎉";
    feedbackColor = "#4CAF50";
    icon = "star";
  } else if (percentage >= 70) {
    feedback = "Bien joué! 👏";
    feedbackColor = "#2196F3";
    icon = "thumb-up";
  } else if (percentage >= 50) {
    feedback = "Pas mal! 💪";
    feedbackColor = "#FF9800";
    icon = "trending-up";
  } else {
    feedback = "Continuez vos efforts! 📚";
    feedbackColor = "#F44336";
    icon = "info";
  }

  const handleRetry = () => {
    resetQuiz();
    router.push("/quiz-play");
  };

  const handleBackToList = () => {
    resetQuiz();
    router.push("/quiz-list");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row items-center gap-2">
            <Pressable onPress={handleBackToList} className="p-2">
              <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
            </Pressable>
            <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
              Résultats
            </Text>
          </View>
        </View>

        {/* Score Circle */}
        <View className="items-center py-10">
          <View
            className="w-40 h-40 rounded-full items-center justify-center mb-6"
            style={{ backgroundColor: feedbackColor }}
          >
            <Text className="text-5xl font-bold text-white">{percentage}%</Text>
            <Text className="text-sm text-white mt-2">
              {score}/{total}
            </Text>
          </View>

          {/* Feedback */}
          <View className="flex-row items-center gap-2 mb-4">
            <MaterialIcons name={icon} size={24} color={feedbackColor} />
            <Text className="text-2xl font-bold" style={{ color: feedbackColor }}>
              {feedback}
            </Text>
          </View>

          {/* Quiz Title */}
          {quiz && (
            <Text className="text-lg font-semibold text-center" style={{ color: "#2C2C2C" }}>
              {quiz.title}
            </Text>
          )}
        </View>

        {/* Détails */}
        <View className="mx-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: "#F5F0E8" }}>
          <View className="flex-row justify-between mb-3">
            <Text style={{ color: "#7A7A7A" }}>Bonnes réponses</Text>
            <Text className="font-bold" style={{ color: "#2C2C2C" }}>
              {score}/{total}
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text style={{ color: "#7A7A7A" }}>Mauvaises réponses</Text>
            <Text className="font-bold" style={{ color: "#2C2C2C" }}>
              {total - score}/{total}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: "#7A7A7A" }}>Taux de réussite</Text>
            <Text className="font-bold" style={{ color: feedbackColor }}>
              {percentage}%
            </Text>
          </View>
        </View>

        {/* Messages de motivation */}
        <View className="mx-4 mb-6 p-4 rounded-lg border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}>
          {percentage >= 90 && (
            <Text className="text-sm text-center" style={{ color: "#2C2C2C" }}>
              Vous maîtrisez très bien ce sujet! Continuez à explorer d'autres quiz.
            </Text>
          )}
          {percentage >= 70 && percentage < 90 && (
            <Text className="text-sm text-center" style={{ color: "#2C2C2C" }}>
              Vous avez une bonne compréhension. Réessayez pour améliorer votre score!
            </Text>
          )}
          {percentage >= 50 && percentage < 70 && (
            <Text className="text-sm text-center" style={{ color: "#2C2C2C" }}>
              Vous progressez! Relisez les explications et réessayez.
            </Text>
          )}
          {percentage < 50 && (
            <Text className="text-sm text-center" style={{ color: "#2C2C2C" }}>
              Ne vous découragez pas! Consultez la Bible et réessayez pour améliorer vos connaissances.
            </Text>
          )}
        </View>

        {/* Boutons */}
        <View className="mx-4 gap-3">
          <Pressable
            onPress={handleRetry}
            className="py-3 px-4 rounded-lg items-center"
            style={{ backgroundColor: "#6B1D2B" }}
          >
            <Text className="text-sm font-bold text-white">Réessayer</Text>
          </Pressable>

          <Pressable
            onPress={handleBackToList}
            className="py-3 px-4 rounded-lg items-center border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#6B1D2B", borderWidth: 2 }}
          >
            <Text className="text-sm font-bold" style={{ color: "#6B1D2B" }}>
              Retour aux quiz
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
