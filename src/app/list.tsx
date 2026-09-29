import { useRouter } from 'expo-router';
import { Check, ChevronLeft, MoreHorizontal, Plus, UserPlus, Users } from 'lucide-react-native';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data structured by aisle/category
const INITIAL_LIST = {
  produce: [
    { id: '1', name: '1 yellow onion', checked: false },
    { id: '2', name: '4 cloves garlic', checked: true },
    { id: '3', name: '2 handfuls baby spinach', checked: false },
    { id: '4', name: '1 lemon', checked: false },
  ],
  protein: [
    { id: '5', name: '2 cans chickpeas', checked: false },
  ],
  pantry: [
    { id: '6', name: '3 tbsp olive oil', checked: true },
    { id: '7', name: '400g crushed tomatoes', checked: false },
    { id: '8', name: '300 ml vegetable stock', checked: false },
  ]
};

export default function GroceryListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [listData, setListData] = useState(INITIAL_LIST);
  const [newItem, setNewItem] = useState('');

  // Toggle item checked state
  const toggleItem = (category: keyof typeof listData, id: string) => {
    setListData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const renderCategory = (title: string, categoryKey: keyof typeof listData) => {
    const items = listData[categoryKey];
    if (items.length === 0) return null;

    return (
      <View className="mb-6">
        <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-3 px-6">
          {title}
        </Text>
        <View className="bg-surface mx-6 rounded-2xl border border-white/10 overflow-hidden">
          {items.map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              onPress={() => toggleItem(categoryKey, item.id)}
              className={`flex-row items-center px-4 py-4 ${
                index !== items.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <View className={`w-6 h-6 rounded border flex-items-center justify-center mr-4 ${
                item.checked ? 'bg-primary border-primary' : 'border-gray-500 bg-transparent'
              }`}>
                {item.checked && <Check color="white" size={16} />}
              </View>
              <Text className={`text-base font-medium ${item.checked ? 'text-gray-500 line-through' : 'text-white'}`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background" 
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-white/10">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeft color="white" size={24} />
          <Text className="text-white ml-1 font-semibold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white/10 p-2 rounded-full">
          <MoreHorizontal color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Title & Collaboration Avatars */}
        <View className="px-6 pt-6 mb-8">
          <Text className="text-white font-bold text-3xl mb-4">Household Groceries</Text>
          
          <View className="flex-row items-center bg-surface self-start py-2 px-3 rounded-full border border-white/10">
            <Users color="gray" size={16} className="mr-2" />
            <Text className="text-gray-300 text-sm font-semibold mr-3">Shared with 2 others</Text>
            <View className="flex-row -space-x-2">
              <View className="w-6 h-6 rounded-full bg-blue-500 border border-surface items-center justify-center">
                <Text className="text-[10px] text-white font-bold">M</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-emerald-500 border border-surface items-center justify-center">
                <Text className="text-[10px] text-white font-bold">S</Text>
              </View>
              <TouchableOpacity className="w-6 h-6 rounded-full bg-white/20 border border-surface items-center justify-center">
                <UserPlus color="white" size={12} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories */}
        {renderCategory('Produce', 'produce')}
        {renderCategory('Protein', 'protein')}
        {renderCategory('Pantry', 'pantry')}

        {/* Add Custom Item */}
        <View className="px-6 mt-4">
          <View className="flex-row items-center bg-surface border border-white/10 rounded-xl px-4 py-2">
            <TextInput
              className="flex-1 text-white font-medium p-3"
              placeholder="Add an item..."
              placeholderTextColor="gray"
              value={newItem}
              onChangeText={setNewItem}
            />
            <TouchableOpacity 
              disabled={!newItem.trim()}
              className={`p-2 rounded-xl ${!newItem.trim() ? 'bg-white/5' : 'bg-primary'}`}
            >
              <Plus color={!newItem.trim() ? 'gray' : 'white'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}