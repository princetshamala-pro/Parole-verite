import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuiz } from "@/lib/quiz-context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function QuizPlayScreen() {
  const router = useRouter();
  const { currentQuiz, currentQuestionIndex, selectedAnswers, setCurrentQuestionIndex, selectAnswer, saveScore, resetQuiz } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState(false);

  // Chronomètre
  useEffect(() => {
    if (!answered && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleNextQuestion();
    }
  }, [timeLeft, answered]);

  if (!currentQuiz) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text style={{ color: "#2C2C2C" }}>Aucun quiz sélectionné</Text>
      </SafeAreaView>
    );
  }

  const question = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSelectAnswer = (answerIndex: number) => {
    selectAnswer(answerIndex);
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculer le score
      let score = 0;
      currentQuiz.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          score++;
        }
      });
      saveScore(currentQuiz.id, score, currentQuiz.questions.length);
      router.push({
        pathname: "/quiz-results",
        params: {
          score: score,
          total: currentQuiz.questions.length,
          quizId: currentQuiz.id,
        },
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
      setAnswered(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header avec progression */}
        <View className="px-4 py-4 border-b" style={{ borderColor: "#E0D5C7" }}>
          <View className="flex-row justify-between items-center mb-3">
            <Pressable onPress={() => router.back()} className="p-2">
              <MaterialIcons name="close" size={24} color="#6B1D2B" />
            </Pressable>
            <Text className="text-sm font-bold" style={{ color: "#2C2C2C" }}>
              {currentQuestionIndex + 1} / {currentQuiz.questions.length}
            </Text>
            <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: timeLeft < 5 ? "#F44336" : "#C9A84C" }}>
              <Text className="text-xs font-bold text-white">{timeLeft}s</Text>
            </View>
          </View>

          {/* Barre de progression */}
          <View className="h-1 bg-gray-300 rounded-full overflow-hidden">
            <View
              className="h-full"
              style={{
                width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`,
                backgroundColor: "#6B1D2B",
              }}
            />
          </View>
        </View>

        {/* Question */}
        <View className="px-4 py-6">
          <Text className="text-lg font-bold mb-6" style={{ color: "#2C2C2C" }}>
            {question.question}
          </Text>

          {/* Options */}
          <View className="gap-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === question.correctAnswer;
              let bgColor = "#FFFFFF";
              let borderColor = "#E0D5C7";
              let textColor = "#2C2C2C";

              if (answered) {
                if (isCorrectOption) {
                  bgColor = "#4CAF50";
                  borderColor = "#4CAF50";
                  textColor = "#FFFFFF";
                } else if (isSelected && !isCorrect) {
                  bgColor = "#F44336";
                  borderColor = "#F44336";
                  textColor = "#FFFFFF";
                }
              } else if (isSelected) {
                bgColor = "#C9A84C";
                borderColor = "#6B1D2B";
                textColor = "#FFFFFF";
              }

              return (
                <Pressable
                  key={idx}
                  onPress={() => !answered && handleSelectAnswer(idx)}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 2,
                  }}
                  disabled={answered}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="w-6 h-6 rounded-full items-center justify-center border"
                      style={{
                        backgroundColor: isSelected ? textColor : "transparent",
                        borderColor: textColor,
                      }}
                    >
                      {isSelected && <Text style={{ color: bgColor, fontSize: 12, fontWeight: "bold" }}>✓</Text>}
                    </View>
                    <Text style={{ color: textColor, fontSize: 14, fontWeight: "500" }}>
                      {option}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Explication (après réponse) */}
          {answered && (
            <View className="mt-6 p-4 rounded-lg" style={{ backgroundColor: isCorrect ? "#E8F5E9" : "#FFEBEE" }}>
              <Text className="text-sm font-bold mb-2" style={{ color: isCorrect ? "#2E7D32" : "#C62828" }}>
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </Text>
              <Text className="text-xs" style={{ color: isCorrect ? "#2E7D32" : "#C62828" }}>
                {question.explanation}
              </Text>
            </View>
          )}
        </View>

        {/* Bouton Suivant */}
        {answered && (
          <View className="px-4 mt-6">
            <Pressable
              onPress={handleNextQuestion}
              className="py-3 px-4 rounded-lg items-center"
              style={{ backgroundColor: "#6B1D2B" }}
            >
              <Text className="text-sm font-bold text-white">
                {isLastQuestion ? "Voir les résultats" : "Question suivante"}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
