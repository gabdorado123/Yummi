import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CreateGroupModal from '../../components/CreateGroupModal';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [collections, setCollections] = useState([{ name: 'Gab', recipeCount: 1 }]);
  
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 24 }}>
      <ScrollView className="px-5">
        
        {/* Header Row */}
        <View className="flex-row justify-between items-start mb-8">
          <View className="flex-1 pr-4">
            <Text className="text-white font-extrabold text-3xl mb-1 tracking-tight">Your kitchen shelf</Text>
            <Text className="text-gray-400 text-sm">Collections you&apos;ve curated from the feed.</Text>
          </View>
          
          <TouchableOpacity accessibilityLabel="Create collection" onPress={() => setCreateModalVisible(true)}>
            <LinearGradient
              colors={['#FF9800', '#F44336']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center px-4 py-2.5 rounded-xl"
            >
              <Plus color="black" size={16} strokeWidth={3} />
              <Text className="text-black font-bold ml-1">New collection</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {collections.map((collection) => (
          <TouchableOpacity key={collection.name} className="bg-[#161616] rounded-3xl p-3 flex-row items-center border border-white/10 mb-3">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=200&auto=format&fit=crop' }}
              className="w-16 h-16 rounded-2xl mr-4"
            />
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">{collection.name}</Text>
              <Text className="text-gray-400 text-sm">{collection.recipeCount} recipe{collection.recipeCount === 1 ? '' : 's'}</Text>
            </View>
            <ChevronDown color="#9CA3AF" size={20} className="mr-3" />
          </TouchableOpacity>
        ))}

      </ScrollView>
      <CreateGroupModal
        visible={isCreateModalVisible}
        title="New collection"
        placeholder="Collection name"
        submitLabel="Create collection"
        onClose={() => setCreateModalVisible(false)}
        onSubmit={(name) => setCollections((current) => [...current, { name, recipeCount: 0 }])}
      />
    </View>
  );
}