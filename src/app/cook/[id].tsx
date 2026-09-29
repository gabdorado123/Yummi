import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ChevronLeft, ChevronRight, Mic, MicOff, Replace, Timer } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MOCK_STEP = {
  stepNumber: 3,
  totalSteps: 8,
  title: "Puree the mango",
  instruction: "Blend the mango with the lime juice until completely smooth. Add a splash of water if it's too thick to pour.",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  hasTimer: false,
};

export default function RecipeExecution() {
  const insets = useSafeAreaInsets();
  const [isListening, setIsListening] = useState(true);
  const [isVideoCollapsed, setIsVideoCollapsed] = useState(false);

  const toggleVideo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsVideoCollapsed(!isVideoCollapsed);
  };

const player = useVideoPlayer(MOCK_STEP.videoUrl, (player) => {
  player.loop = true;
  player.muted = true;
  player.play();
});

  return (
    <View className="flex-1 bg-background">
      
      {/* Top Header / Progress */}
      <View style={{ paddingTop: insets.top + 16 }} className="px-6 flex-row justify-between items-center bg-surface pb-4 z-10">
        <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase">
          Step {MOCK_STEP.stepNumber} of {MOCK_STEP.totalSteps}
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-white/10 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">Exit</Text>
        </TouchableOpacity>
      </View>

      {/* Collapsible Media Player */}
      {!isVideoCollapsed && (
  <View className="h-1/3 w-full bg-black relative">
    <VideoView
      style={{ width: '100%', height: '100%' }}
      player={player}
      contentFit="cover"
      nativeControls={false}
    />
  </View>
)}

      {/* Instruction Card */}
      <ScrollView className="flex-1 px-6 pt-8 pb-32" showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={toggleVideo} className="self-start mb-6">
          <Text className="text-primary font-semibold text-sm">
            {isVideoCollapsed ? "Show Video" : "Hide Video"}
          </Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-3xl mb-4 leading-tight">
          {MOCK_STEP.title}
        </Text>
        
        {/* Large 24pt Typography for Distance Reading */}
        <Text className="text-gray-300 text-2xl leading-10 font-medium">
          {MOCK_STEP.instruction}
        </Text>

        {/* Dynamic Swap & Timer Controls */}
        <View className="flex-row mt-10 space-x-4">
          <TouchableOpacity onPress={() => Alert.alert('Swap Ingredient', 'Ingredient swaps are coming soon.')} className="flex-row items-center bg-surface border border-white/10 px-5 py-3 rounded-xl">
            <Replace color="white" size={20} />
            <Text className="text-white font-semibold ml-2">Swap Ingredient</Text>
          </TouchableOpacity>

          {MOCK_STEP.hasTimer && (
            <TouchableOpacity className="flex-row items-center bg-surface border border-white/10 px-5 py-3 rounded-xl">
              <Timer color="white" size={20} />
              <Text className="text-white font-semibold ml-2">Start Timer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Bottom Control Bar */}
      <View 
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 24 }}
        className="absolute bottom-0 w-full bg-surface border-t border-white/10 px-6 pt-6 flex-row justify-between items-center"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-3 bg-white/10 rounded-full">
          <ChevronLeft color="white" size={28} />
        </TouchableOpacity>

        {/* AI Sous-Chef Indicator */}
        <TouchableOpacity 
          onPress={() => setIsListening(!isListening)}
          className={`flex-row items-center px-6 py-3 rounded-full border-2 ${
            isListening ? 'border-primary bg-primary/20' : 'border-gray-500 bg-transparent'
          }`}
        >
          {isListening ? <Mic color="#FF5722" size={24} /> : <MicOff color="gray" size={24} />}
          <Text className={`font-bold ml-2 ${isListening ? 'text-primary' : 'text-gray-500'}`}>
            {isListening ? 'Listening...' : 'Mic Off'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Next Step', 'You are on the final step.')} className="p-3 bg-primary rounded-full">
          <ChevronRight color="white" size={28} />
        </TouchableOpacity>
      </View>

    </View>
  );
}