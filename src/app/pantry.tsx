import { router } from 'expo-router';
import { ChefHat, Plus, ScanLine, Sparkles, X } from 'lucide-react-native';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CONSTRAINTS = [
  'No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 
  'High-protein', 'Low-carb', 'Comfort', 'Light & fresh'
];

const TIME_LIMITS = ['15 min', '30 min', '45 min', '60 min'];

export default function PantryScreen() {
  const insets = useSafeAreaInsets();
  
  // States
  const [activeIngredients, setActiveIngredients] = useState<string[]>(['Half a cabbage', '2 eggs']);
  const [manualInput, setManualInput] = useState('');
  const [selectedConstraint, setSelectedConstraint] = useState('No restrictions');
  const [selectedTime, setSelectedTime] = useState('30 min');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealResult, setMealResult] = useState<any>(null);

  const handleAddIngredient = () => {
    if (manualInput.trim()) {
      setActiveIngredients([...activeIngredients, manualInput.trim()]);
      setManualInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...activeIngredients];
    newIngredients.splice(index, 1);
    setActiveIngredients(newIngredients);
  };

  const generateMeal = () => {
    setIsGenerating(true);
    setMealResult(null);

    // Simulate AI generation based on constraints and ingredients
    setTimeout(() => {
      setIsGenerating(false);
      setMealResult({
        title: "Charred Cabbage & Egg Stir-fry",
        description: "A lightning-fast, high-protein bowl using exactly what you have.",
        macros: "320 kcal • 18g Protein",
      });
    }, 2500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background" 
      style={{ paddingTop: insets.top }}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="px-6 pt-6 pb-2">
          <View className="flex-row items-center mb-1">
            <Sparkles color="#FF5722" size={20} />
            <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase ml-2">
              AI Kitchen
            </Text>
          </View>
          <Text className="text-white font-bold text-3xl leading-tight">
            Open the fridge.{'\n'}Yummi writes dinner.
          </Text>
        </View>

        {/* 1. THE FRIDGE SCANNER */}
        <View className="px-6 mt-6">
          <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-3">
            1. Your Fridge
          </Text>
          
          {/* Scanner Viewfinder Mockup */}
          <TouchableOpacity onPress={() => Alert.alert('Scan shelf', 'Camera scanning will be available soon. You can add ingredients manually below.')} className="w-full h-40 bg-surface rounded-2xl border-2 border-white/10 overflow-hidden mb-4 items-center justify-center relative">
            <ScanLine color="gray" size={48} className="mb-2 opacity-50" />
            <Text className="text-white font-bold">Tap to scan shelf</Text>
            <Text className="text-gray-500 text-xs mt-1">Point camera at your ingredients</Text>
            
            {/* Viewfinder Corners */}
            <View className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <View className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary" />
            <View className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary" />
            <View className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary" />
          </TouchableOpacity>

          {/* Manual Input & Active Ingredients */}
          <View className="flex-row items-center bg-surface border border-white/10 rounded-xl px-4 py-1 mb-4">
            <TextInput
              className="flex-1 text-white font-medium p-3"
              placeholder="Or type what you have..."
              placeholderTextColor="gray"
              value={manualInput}
              onChangeText={setManualInput}
              onSubmitEditing={handleAddIngredient}
            />
            <TouchableOpacity onPress={handleAddIngredient} className="bg-white/10 p-2 rounded-full">
              <Plus color="white" size={20} />
            </TouchableOpacity>
          </View>

          {/* Ingredient Chips */}
          <View className="flex-row flex-wrap mb-6">
            {activeIngredients.map((item, index) => (
              <View key={index} className="flex-row items-center bg-primary/20 border border-primary/50 px-3 py-2 rounded-full mr-2 mb-2">
                <Text className="text-white font-semibold mr-2">{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                  <X color="white" size={14} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* 2. YOUR LIMITS */}
        <View className="px-6">
          <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-3">
            2. Your Limits
          </Text>
          
          <View className="flex-row flex-wrap mb-4">
            {CONSTRAINTS.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedConstraint(item)}
                className={`px-4 py-2 rounded-full border mr-2 mb-3 ${
                  selectedConstraint === item 
                    ? 'border-primary bg-primary/20' 
                    : 'border-white/20 bg-transparent'
                }`}
              >
                <Text className={`font-semibold ${selectedConstraint === item ? 'text-primary' : 'text-gray-300'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Limits */}
          <View className="flex-row flex-wrap mb-8">
            {TIME_LIMITS.map((time, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-full border mr-2 mb-3 ${
                  selectedTime === time 
                    ? 'border-white bg-white/20' 
                    : 'border-white/10 bg-surface'
                }`}
              >
                <Text className={`font-semibold ${selectedTime === time ? 'text-white' : 'text-gray-400'}`}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Generate Button */}
          <TouchableOpacity 
            onPress={generateMeal}
            disabled={activeIngredients.length === 0 || isGenerating}
            className={`flex-row justify-center items-center py-4 rounded-xl mb-8 ${
              activeIngredients.length === 0 ? 'bg-white/10' : 'bg-primary'
            }`}
          >
            {isGenerating ? (
              <Text className="text-white font-bold text-lg">Thinking...</Text>
            ) : (
              <>
                <ChefHat color={activeIngredients.length === 0 ? 'gray' : 'white'} size={20} />
                <Text className={`font-bold text-lg ml-2 ${activeIngredients.length === 0 ? 'text-gray-500' : 'text-white'}`}>
                  Find me a meal
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* 3. AI RESULT STATE */}
        {mealResult && (
          <View className="px-6 mb-8">
            <View className="bg-surface border border-primary/50 rounded-2xl p-6 relative overflow-hidden">
              <View className="absolute top-0 right-0 bg-primary/20 px-3 py-1 rounded-bl-xl">
                <Text className="text-primary text-xs font-bold">✨ AI Generated</Text>
              </View>
              
              <Text className="text-white font-bold text-2xl mb-2 mt-2">{mealResult.title}</Text>
              <Text className="text-gray-300 text-sm mb-4">{mealResult.description}</Text>
              
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-gray-400 font-semibold text-sm">{mealResult.macros}</Text>
                <TouchableOpacity onPress={() => router.push('/cook/1')} className="bg-primary px-4 py-2 rounded-full">
                  <Text className="text-white font-bold text-sm">Cook This</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}