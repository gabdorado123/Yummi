import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, type Href } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Bookmark, BookOpen, ChefHat, Heart, ListPlus, MessageCircle, Pause, Play } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

export default function FeedItem({ item, isActive, onAddToList }: { item: any; isActive: boolean; onAddToList: () => void }) {  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom + 75;
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const player = useVideoPlayer(item.videoUrl, (p) => {
    p.loop = true;
    p.muted = true;
  });

  useEffect(() => {
    if (isActive && !isPaused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, isPaused, player]);

 return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }} className="relative bg-black">
      <VideoView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        player={player}
        contentFit="cover"
        nativeControls={false}
      />

      <TouchableOpacity
        accessibilityLabel={isPaused ? 'Play video' : 'Pause video'}
        onPress={() => setIsPaused((paused) => !paused)}
        className="absolute top-28 right-4 z-20 w-11 h-11 rounded-full bg-black/45 border border-white/20 items-center justify-center"
      >
        {isPaused ? <Play color="white" size={18} fill="white" /> : <Pause color="white" size={18} />}
      </TouchableOpacity>

      {/* Gradient Scrim */}
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.92)']}
        locations={[0, 0.35, 0.95]}
        className="absolute top-0 bottom-0 left-0 right-0"
      />

      {/* Floating Right Actions */}
      <View className="absolute right-4 bottom-32 items-center flex-col z-10">
        <TouchableOpacity onPress={() => setIsFollowing((following) => !following)} className="items-center mb-6">
          <View className="w-12 h-12 bg-primary/80 rounded-full border-2 border-white items-center justify-center">
            <Text className="text-white font-extrabold text-lg">M</Text>
          </View>
          <View className="absolute -bottom-2 bg-primary rounded-full w-5 h-5 items-center justify-center border-2 border-black">
            <Text className="text-white text-xs font-bold">{isFollowing ? '✓' : '+'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLiked((liked) => !liked)} className="items-center mb-5 w-12">
          <View className="w-11 h-11 rounded-full bg-black/35 items-center justify-center">
            <Heart color={isLiked ? '#FF5722' : 'white'} fill={isLiked ? '#FF5722' : 'transparent'} size={24} />
          </View>
          <Text className="text-white text-xs font-semibold mt-1">{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center mb-5 w-12">
          <View className="w-11 h-11 rounded-full bg-black/35 items-center justify-center">
            <MessageCircle color="white" size={24} />
          </View>
          <Text className="text-white text-xs font-semibold mt-1">{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSaved((saved) => !saved)} className="items-center mb-5 w-12">
          <View className="w-11 h-11 rounded-full bg-black/35 items-center justify-center">
            <Bookmark color={isSaved ? '#FF5722' : 'white'} fill={isSaved ? '#FF5722' : 'transparent'} size={24} />
          </View>
          <Text className="text-white text-[10px] font-semibold mt-1">{isSaved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center w-12" onPress={onAddToList}>
          <View className="w-11 h-11 rounded-full bg-black/35 items-center justify-center">
            <ListPlus color="white" size={24} />
          </View>
          <Text className="text-white text-[10px] font-semibold mt-1">List</Text>
        </TouchableOpacity>
        
      </View>

      {/* Recipe Info & Dual Action Buttons */}
      <View 
        className="absolute left-4 right-20 z-10" 
        style={{ bottom: bottomOffset }}
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-white font-bold text-sm mr-2">{item.handle}</Text>
          <TouchableOpacity onPress={() => setIsFollowing((following) => !following)} className="border border-white/40 bg-black/25 px-3 py-1 rounded-full">
            <Text className="text-white text-[10px] font-bold">{isFollowing ? 'Following' : '+ Follow'}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-white font-extrabold text-2xl mb-1">{item.title}</Text>
        <Text className="text-gray-300 text-xs mb-3" numberOfLines={2}>{item.description}</Text>

        {/* Recipe Meta Badges */}
        <View className="flex-row items-center flex-wrap mb-4">
          <View className="bg-black/35 border border-white/10 rounded-full px-2.5 py-1 mr-2 mb-1">
            <Text className="text-gray-100 text-[11px] font-semibold">{item.time || '35min'}</Text>
          </View>
          <View className="bg-black/35 border border-white/10 rounded-full px-2.5 py-1 mr-2 mb-1">
            <Text className="text-gray-100 text-[11px] font-semibold">{item.calories || '380 kcal'}</Text>
          </View>
          <View className="bg-black/35 border border-white/10 rounded-full px-2.5 py-1 mb-1">
            <Text className="text-gray-100 text-[11px] font-semibold">{item.cuisine || 'Spanish'}</Text>
          </View>
        </View>

        {/* Dual Buttons: "Cook this" & "Recipe" */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity 
            onPress={() => router.push(`/cook/${item.id}`)}
            className="flex-1 bg-primary py-3 rounded-xl flex-row items-center justify-center mr-2"
          >
            <ChefHat color="white" size={18} />
            <Text className="text-white font-bold text-sm ml-2">Cook this</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push(`/recipe/${item.id}` as Href)}
            className="flex-1 bg-surface/90 border border-white/20 py-3 rounded-xl flex-row items-center justify-center"
          >
            <BookOpen color="white" size={18} />
            <Text className="text-white font-bold text-sm ml-2">Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}