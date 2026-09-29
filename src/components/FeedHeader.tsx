import { useRouter } from 'expo-router';
import { Search, User } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FeedHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [feedType, setFeedType] = useState<'forYou' | 'following'>('forYou');

  return (
    <View 
      style={{ paddingTop: insets.top + 8 }}
      className="absolute top-0 left-0 right-0 z-20 px-4 pb-3 flex-row items-center justify-between"
    >
      {/* Brand Logo */}
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-2 shadow-sm">
          <Text className="text-white font-extrabold text-sm">Y</Text>
        </View>
        <Text className="text-white font-extrabold text-xl tracking-tight">Yummi</Text>
      </View>

      {/* For You / Following Pill Toggle */}
      <View className="flex-row bg-black/60 rounded-full p-1 border border-white/10">
        <TouchableOpacity
          onPress={() => setFeedType('forYou')}
          className={`px-3 py-1 rounded-full ${feedType === 'forYou' ? 'bg-white' : 'bg-transparent'}`}
        >
          <Text className={`text-xs font-bold ${feedType === 'forYou' ? 'text-black' : 'text-gray-300'}`}>
            For You
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFeedType('following')}
          className={`px-3 py-1 rounded-full ${feedType === 'following' ? 'bg-white' : 'bg-transparent'}`}
        >
          <Text className={`text-xs font-bold ${feedType === 'following' ? 'text-black' : 'text-gray-300'}`}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* Upper Right Action Buttons */}
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity 
          onPress={() => router.push('/explore')}
          className="w-9 h-9 rounded-full bg-black/50 border border-white/10 items-center justify-center"
        >
          <Search color="white" size={18} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/profile')}
          className="w-9 h-9 rounded-full bg-black/50 border border-white/10 items-center justify-center ml-2"
        >
          <User color="white" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}