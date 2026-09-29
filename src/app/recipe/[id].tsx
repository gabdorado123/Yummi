import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bookmark, ChefHat, ChevronLeft, ListChecks } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Top Bar */}
      <View className="px-4 py-3 flex-row items-center justify-between border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <ChevronLeft color="white" size={26} />
        </TouchableOpacity>
        <Text className="text-white font-bold text-base">Recipe Details</Text>
        <View className="w-8" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header Info */}
        <View className="px-6 pt-4">
          <Text className="text-gray-400 font-semibold text-xs mb-1">@sam.ellis.cooks</Text>
          <Text className="text-white font-extrabold text-3xl mb-2">Smoky Paprika Chickpea Stew</Text>
          <Text className="text-gray-300 text-sm mb-5">
            One pot, deeply savory, and it only gets better tomorrow.
          </Text>

          {/* Quick Actions */}
          <View className="flex-row items-center space-x-2 mb-6">
            <TouchableOpacity 
              onPress={() => router.push(`/cook/${id}`)}
              className="bg-primary flex-row items-center px-4 py-3 rounded-xl mr-2"
            >
              <ChefHat color="white" size={18} />
              <Text className="text-white font-bold ml-2 text-xs">Start cooking mode</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-white/10 flex-row items-center px-3 py-3 rounded-xl mr-2">
              <Bookmark color="white" size={16} />
              <Text className="text-white font-semibold ml-1.5 text-xs">Saved</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/list')}
              className="bg-surface border border-white/10 flex-row items-center px-3 py-3 rounded-xl"
            >
              <ListChecks color="white" size={16} />
              <Text className="text-white font-semibold ml-1.5 text-xs">Grocery list</Text>
            </TouchableOpacity>
          </View>

          {/* Nutrition Row */}
          <View className="flex-row justify-between bg-surface border border-white/10 rounded-2xl p-4 mb-6">
            <View className="items-center">
              <Text className="text-white font-extrabold text-lg">380</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold">Kcal</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-extrabold text-lg">16g</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold">Protein</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-extrabold text-lg">44g</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold">Carbs</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-extrabold text-lg">14g</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold">Fat</Text>
            </View>
          </View>

          {/* Ingredients */}
          <Text className="text-white font-bold text-xl mb-3">Ingredients</Text>
          <View className="bg-surface rounded-2xl p-4 border border-white/10 mb-6">
            {['3 tbsp olive oil', '1 yellow onion, finely diced', '4 cloves garlic, sliced', '2 tsp smoked paprika', '2 cans chickpeas, drained', '400g crushed tomatoes'].map((item, idx) => (
              <View key={idx} className="flex-row items-center py-2 border-b border-white/5 last:border-b-0">
                <View className="w-2 h-2 rounded-full bg-primary mr-3" />
                <Text className="text-gray-200 text-sm font-medium">{item}</Text>
              </View>
            ))}
          </View>

          {/* Method */}
          <Text className="text-white font-bold text-xl mb-3">Method</Text>
          <View className="space-y-4">
            <View className="bg-surface p-4 rounded-2xl border border-white/10 mb-3">
              <Text className="text-primary font-bold text-xs mb-1">STEP 1 • BLOOM THE SPICES</Text>
              <Text className="text-gray-200 text-sm leading-5">Warm the olive oil in a heavy pot over medium heat. Add the onion with salt and cook for 6 minutes.</Text>
            </View>
            <View className="bg-surface p-4 rounded-2xl border border-white/10">
              <Text className="text-primary font-bold text-xs mb-1">STEP 2 • BUILD THE BASE</Text>
              <Text className="text-gray-200 text-sm leading-5">Tip in the crushed tomatoes and vegetable stock, scraping up anything stuck to the bottom.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}