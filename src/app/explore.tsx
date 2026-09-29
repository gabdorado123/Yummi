import { Flame, RefreshCcw, Search, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SUGGESTIONS = [
  'quick spicy chicken', 
  'light summer dinner', 
  'high-protein lunch', 
  'cozy 20 minute pasta'
];

const TRENDING_TAGS = ['#15MinuteMeals', '#AirFryer', '#Vegan', '#MealPrep'];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resultsSearched, setResultsSearched] = useState(false);

  const handleSemanticSearch = (query: string) => {
    Keyboard.dismiss();
    setSearchText(query);
    setIsLoading(true);
    setHasError(false);
    setResultsSearched(false);

    // Mocking an AI network request
    setTimeout(() => {
      // Simulating a random API failure to demonstrate the fallback UI
      if (Math.random() < 0.2) {
        setHasError(true);
      } else {
        setResultsSearched(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-white font-bold text-3xl mb-1">Explore</Text>
          <Text className="text-gray-400 text-sm">Ask Yummi for a dish</Text>
        </View>

        {/* Semantic Search Bar */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center bg-surface border border-white/10 rounded-2xl px-4 py-1">
            <Sparkles color="#FF5722" size={20} />
            <TextInput
              className="flex-1 text-white font-medium p-3 ml-2"
              placeholder="e.g. something light and spicy for tonight"
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSemanticSearch(searchText)}
              returnKeyType="search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => handleSemanticSearch(searchText)} className="bg-primary/20 p-2 rounded-xl">
                <Search color="#FF5722" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* AI Loading State */}
        {isLoading && (
          <View className="px-6 py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#FF5722" />
            <Text className="text-primary font-semibold mt-4">Reading the whole kitchen...</Text>
          </View>
        )}

        {/* Graceful Error State */}
        {hasError && !isLoading && (
          <View className="px-6 py-10 items-center justify-center bg-surface mx-6 rounded-2xl border border-white/10">
            <Text className="text-white font-bold text-lg mb-2">Our chef is catching their breath.</Text>
            <Text className="text-gray-400 text-center mb-6">
              The AI endpoint timed out. Please try your search again.
            </Text>
            <TouchableOpacity 
              onPress={() => handleSemanticSearch(searchText)}
              className="flex-row items-center bg-primary px-6 py-3 rounded-xl"
            >
              <RefreshCcw color="white" size={18} />
              <Text className="text-white font-bold ml-2">Retry Search</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Default View: Suggestions & Trending */}
        {!isLoading && !hasError && !resultsSearched && (
          <View>
            <View className="px-6 mb-8">
              <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-4">
                Try Asking For
              </Text>
              <View className="flex-row flex-wrap">
                {SUGGESTIONS.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSemanticSearch(item)}
                    className="bg-surface border border-white/10 px-4 py-2 rounded-full mr-2 mb-3"
                  >
                    <Text className="text-gray-300 font-medium">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="px-6">
              <View className="flex-row items-center mb-4">
                <Flame color="#FF5722" size={18} />
                <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase ml-2">
                  Trending Communities
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                {TRENDING_TAGS.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-surface border border-white/10 w-32 h-32 rounded-2xl mr-4 items-center justify-center"
                  >
                    <Text className="text-white font-bold text-lg">{tag}</Text>
                    <Text className="text-gray-500 text-xs mt-2">12k posts</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Search Results State */}
        {!isLoading && !hasError && resultsSearched && (
          <View className="px-6">
            <Text className="text-white font-bold text-xl mb-4">AI Matches for &quot;{searchText}&quot;</Text>
            {/* Grid of recipe result cards would go here */}
            <View className="bg-surface h-48 rounded-2xl border border-white/10 items-center justify-center mb-4">
              <Text className="text-gray-500">Recipe Card Mockup</Text>
            </View>
            <View className="bg-surface h-48 rounded-2xl border border-white/10 items-center justify-center">
              <Text className="text-gray-500">Recipe Card Mockup</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}