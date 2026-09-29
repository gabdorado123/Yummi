import { router } from 'expo-router';
import { Camera, CheckCircle2, ChevronLeft, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react-native';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  
  // App States: 'input' -> 'parsing' -> 'review'
  const [uploadState, setUploadState] = useState<'input' | 'parsing' | 'review'>('input');
  const [rawText, setRawText] = useState('');
  
  // Mocking the AI's structured JSON output
  const [parsedRecipe, setParsedRecipe] = useState<any>(null);

  const handleAIParsing = () => {
    Keyboard.dismiss();
    if (!rawText.trim()) return;
    
    setUploadState('parsing');

    // Simulate AI processing delay
    setTimeout(() => {
      setParsedRecipe({
        title: "Spicy Garlic Noodles",
        ingredients: ["2 packs ramen noodles", "3 cloves garlic, minced", "2 tbsp soy sauce", "1 tbsp chili oil"],
        steps: [
          "Boil the noodles until al dente.",
          "Sauté garlic in chili oil until fragrant.",
          "Toss noodles with soy sauce and garlic oil."
        ]
      });
      setUploadState('review');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background" 
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="px-6 py-4 border-b border-white/10 flex-row items-center justify-between">
        {uploadState === 'review' ? (
          <TouchableOpacity onPress={() => setUploadState('input')} className="flex-row items-center">
            <ChevronLeft color="white" size={24} />
            <Text className="text-white ml-1 font-semibold">Back</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-white font-bold text-2xl">New Recipe</Text>
        )}
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-400 font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* STATE 1: INPUT */}
        {uploadState === 'input' && (
          <View className="px-6 pt-6">
            {/* Media Upload Area */}
            <TouchableOpacity onPress={() => Alert.alert('Media upload', 'Media upload will be available soon.')} className="w-full h-48 bg-surface border-2 border-dashed border-white/20 rounded-2xl items-center justify-center mb-8">
              <View className="flex-row space-x-4 mb-3">
                <View className="bg-white/10 p-3 rounded-full">
                  <Camera color="white" size={24} />
                </View>
                <View className="bg-white/10 p-3 rounded-full">
                  <ImageIcon color="white" size={24} />
                </View>
              </View>
              <Text className="text-white font-bold">Upload Video or Photo</Text>
              <Text className="text-gray-500 text-xs mt-1">MP4, MOV, or JPEG</Text>
            </TouchableOpacity>

            {/* AI Text Input */}
            <View className="flex-row items-center mb-4">
              <Sparkles color="#FF5722" size={20} />
              <Text className="text-white font-bold text-lg ml-2">AI Recipe Formatter</Text>
            </View>
            <Text className="text-gray-400 text-sm mb-4">
              Paste your messy notes, a website link, or a voice transcript. Our AI will structure it instantly.
            </Text>

            <TextInput
              className="bg-surface text-white p-4 rounded-xl border border-white/10 h-40 font-medium mb-6"
              placeholder="e.g. boil 2 packs of ramen. fry 3 cloves of garlic in some chili oil. mix it all together with 2 spoons of soy sauce..."
              placeholderTextColor="gray"
              multiline
              textAlignVertical="top"
              value={rawText}
              onChangeText={setRawText}
            />

            <TouchableOpacity 
              onPress={handleAIParsing}
              disabled={!rawText.trim()}
              className={`flex-row items-center justify-center py-4 rounded-xl ${
                !rawText.trim() ? 'bg-white/10' : 'bg-primary'
              }`}
            >
              <Wand2 color={!rawText.trim() ? 'gray' : 'white'} size={20} />
              <Text className={`font-bold text-lg ml-2 ${!rawText.trim() ? 'text-gray-500' : 'text-white'}`}>
                Format Recipe
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STATE 2: PARSING (LOADING) */}
        {uploadState === 'parsing' && (
          <View className="px-6 py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#FF5722" />
            <Text className="text-primary font-bold text-lg mt-6 mb-2">Structuring your recipe...</Text>
            <Text className="text-gray-400 text-center">
              Extracting ingredients and organizing steps.
            </Text>
          </View>
        )}

        {/* STATE 3: REVIEW & PUBLISH */}
        {uploadState === 'review' && parsedRecipe && (
          <View className="px-6 pt-6">
            <View className="flex-row items-center justify-center mb-8">
              <CheckCircle2 color="#4CAF50" size={24} />
              <Text className="text-white font-bold text-lg ml-2">Formatted Successfully</Text>
            </View>

            {/* Title */}
            <TextInput
              className="text-white font-bold text-3xl mb-6 border-b border-white/10 pb-2"
              value={parsedRecipe.title}
              onChangeText={(title) => setParsedRecipe({ ...parsedRecipe, title })}
            />

            {/* Ingredients Preview */}
            <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-4">
              Ingredients
            </Text>
            <View className="bg-surface rounded-2xl p-4 mb-6 border border-white/10">
              {parsedRecipe.ingredients.map((item: string, index: number) => (
                <View key={index} className="flex-row items-center mb-3 last:mb-0">
                  <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <Text className="text-white text-base">{item}</Text>
                </View>
              ))}
            </View>

            {/* Steps Preview */}
            <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-4">
              Steps
            </Text>
            <View className="bg-surface rounded-2xl p-4 mb-8 border border-white/10">
              {parsedRecipe.steps.map((step: string, index: number) => (
                <View key={index} className="mb-4 last:mb-0">
                  <Text className="text-primary font-bold text-xs mb-1">STEP {index + 1}</Text>
                  <Text className="text-gray-300 text-base leading-6">{step}</Text>
                </View>
              ))}
            </View>

            {/* Final Publish CTA */}
            <TouchableOpacity onPress={() => router.replace('/')} className="bg-primary py-4 rounded-xl items-center">
              <Text className="text-white font-bold text-lg">Publish to Feed</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}