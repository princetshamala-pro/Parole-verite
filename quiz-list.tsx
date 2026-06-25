import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuiz } from "@/lib/quiz-context";
import { useRouter } from "expo-router";

export default function QuizListScreen() {
  const router = useRouter();
  const { quizzes, setCurrentQuiz, getAverageScore, getQuizScores } = useQuiz();

  const handleStartQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      router.push("/quiz-play");
    }
  };

  const renderQuizCard = ({ item }: { item: any }) => {
    const avgScore = getAverageScore(item.id);
    const scores = getQuizScores(item.id);
    const lastScore = scores.length > 0 ? scores[scores.length - 1] : null;

    return (
      <Pressable
        onPress={() => handleStartQuiz(item.id)}
        className="mx-4 mb-4 p-4 rounded-lg border"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D5C7" }}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-2xl">{item.icon}</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
                  {item.title}
                </Text>
                <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                  {item.questions.length} questions
                </Text>
              </View>
            </View>
            <Text className="text-xs mb-3" style={{ color: "#7A7A7A" }}>
              {item.description}
            </Text>

            {/* Stats */}
            <View className="flex-row gap-4">
              {scores.length > 0 && (
                <View>
                  <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                    Meilleur score
                  </Text>
                  <Text className="text-sm font-bold" style={{ color: "#6B1D2B" }}>
                    {avgScore}%
                  </Text>
                </View>
              )}
              {lastScore && (
                <View>
                  <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                    Dernier essai
                  </Text>
                  <Text className="text-sm font-bold" style={{ color: "#C9A84C" }}>
                    {lastScore.percentage}%
                  </Text>
                </View>
              )}
              <View>
                <Text className="text-xs" style={{ color: "#7A7A7A" }}>
                  Tentatives
                </Text>
                <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
                  {scores.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Bouton Commencer */}
          <Pressable
            className="ml-4 px-3 py-2 rounded-lg items-center justify-center"
            style={{ backgroundColor: "#6B1D2B" }}
          >
            <MaterialIcons name="play-arrow" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row items-center gap-2 mb-2">
            <Pressable onPress={() => router.back()} className="p-2">
              <MaterialIcons name="arrow-back" size={24} color="#6B1D2B" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-2xl font-bold" style={{ color: "#2C2C2C" }}>
                Quiz Bibliques
              </Text>
              <Text className="text-xs mt-1" style={{ color: "#7A7A7A" }}>
                10 quiz • 100 questions
              </Text>
            </View>
          </View>
        </View>

        {/* Liste des quiz */}
        <FlatList
          data={quizzes}
          renderItem={renderQuizCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingVertical: 16 }}
        />

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
