import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="recipe/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="cook/[id]" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="explore" options={{ presentation: 'modal' }} />
          <Stack.Screen name="profile" options={{ presentation: 'card' }} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}