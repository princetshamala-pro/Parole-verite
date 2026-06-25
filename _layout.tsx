import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BibleProvider } from "@/lib/bible-context";
import { QuizProvider } from "@/lib/quiz-context";
import { BookmarksProvider } from "@/lib/bookmarks-context";
import { AIChatProvider } from "@/lib/ai-chat-context";
import { SubscriptionProvider } from "@/lib/subscription-context";
import { AdminProvider } from "@/lib/admin-context";

export default function RootLayout() {
  return (
    <AdminProvider>
      <SubscriptionProvider>
        <BibleProvider>
          <QuizProvider>
            <BookmarksProvider>
              <AIChatProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="scripture" options={{ headerShown: false }} />
                  <Stack.Screen name="quiz-list" options={{ headerShown: false }} />
                  <Stack.Screen name="quiz-play" options={{ headerShown: false }} />
                  <Stack.Screen name="quiz-results" options={{ headerShown: false }} />
                  <Stack.Screen name="ai-chat" options={{ headerShown: false }} />
                  <Stack.Screen name="bookmarks" options={{ headerShown: false }} />
                  <Stack.Screen name="subscription" options={{ headerShown: false }} />
                  <Stack.Screen name="admin-login" options={{ headerShown: false }} />
                  <Stack.Screen name="admin-dashboard" options={{ headerShown: false }} />
                  <Stack.Screen name="admin-sermons" options={{ headerShown: false }} />
                </Stack>
                <StatusBar barStyle="dark-content" />
              </AIChatProvider>
            </BookmarksProvider>
          </QuizProvider>
        </BibleProvider>
      </SubscriptionProvider>
    </AdminProvider>
  );
}
