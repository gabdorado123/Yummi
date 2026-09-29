import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CreateGroupModal from '../../components/CreateGroupModal';

export default function ListsScreen() {
  const insets = useSafeAreaInsets();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [lists, setLists] = useState([{ name: 'GAb', picked: 0, total: 11 }]);
  
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top + 24 }}>
      <ScrollView className="px-5">
        
        {/* Header Row */}
        <View className="flex-row justify-between items-start mb-8">
          <View className="flex-1 pr-4">
            <Text className="text-white font-extrabold text-3xl mb-1 tracking-tight">Shared grocery lists</Text>
            <Text className="text-gray-400 text-sm">Export any recipe&apos;s ingredients, then shop it together.</Text>
          </View>
          
          <TouchableOpacity accessibilityLabel="Create grocery list" onPress={() => setCreateModalVisible(true)}>
            <LinearGradient
              colors={['#FF9800', '#F44336']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center px-4 py-2.5 rounded-xl"
            >
              <Plus color="black" size={16} strokeWidth={3} />
              <Text className="text-black font-bold ml-1">New list</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {lists.map((list) => {
          const progress = list.total > 0 ? list.picked / list.total : 0;
          return (
            <TouchableOpacity key={list.name} className="bg-[#161616] rounded-3xl p-5 border border-white/10 mb-3">
              <Text className="text-white font-bold text-xl mb-1">{list.name}</Text>
              <Text className="text-gray-400 text-sm mb-4">{list.picked}/{list.total} picked up</Text>
              <View className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <View className="h-full bg-primary rounded-full" style={{ width: `${progress * 100}%` }} />
              </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
      <CreateGroupModal
        visible={isCreateModalVisible}
        title="New grocery list"
        placeholder="List name"
        submitLabel="Create list"
        onClose={() => setCreateModalVisible(false)}
        onSubmit={(name) => setLists((current) => [...current, { name, picked: 0, total: 0 }])}
      />
    </View>
  );
}