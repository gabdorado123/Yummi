import { router, usePathname, type Href } from 'expo-router';
import { Bookmark, Home, Plus, Refrigerator, ShoppingBasket } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomNavProps = {
  state: {
    index: number;
    routes: { name: string }[];
  };
  navigation: {
    navigate: (routeName: string) => void;
  };
};

export default function BottomNav({ navigation }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const currentRoute = pathname === '/' ? 'index' : pathname.slice(1);

  const navigateTo = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View 
      className="absolute bottom-0 w-full bg-[#111111]/95 border-t border-white/10 flex-row justify-between items-center px-3 pt-2"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : 14 }}
    >
      <TouchableOpacity accessibilityLabel="Feed" onPress={() => navigateTo('index')} className="items-center justify-center flex-1 h-12">
        <View className={`w-10 h-8 rounded-full items-center justify-center ${currentRoute === 'index' ? 'bg-primary/15' : ''}`}>
          <Home color={currentRoute === 'index' ? '#FF5722' : '#9CA3AF'} size={21} />
        </View>
        <Text className={`text-[10px] mt-0.5 ${currentRoute === 'index' ? 'text-primary font-bold' : 'text-gray-400'}`}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity accessibilityLabel="Pantry" onPress={() => router.push('/pantry' as Href)} className="items-center justify-center flex-1 h-12">
        <View className="w-10 h-8 rounded-full items-center justify-center">
          <Refrigerator color="#9CA3AF" size={21} />
        </View>
        <Text className="text-[10px] mt-0.5 text-gray-400">Pantry</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        accessibilityLabel="Create recipe"
        onPress={() => router.push('/create' as Href)} 
        className="items-center justify-center bg-primary h-12 w-12 rounded-full -mt-5 border-4 border-[#0F0F0F] shadow-lg"
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>

      <TouchableOpacity accessibilityLabel="Saved recipes" onPress={() => navigateTo('saved')} className="items-center justify-center flex-1 h-12">
        <View className={`w-10 h-8 rounded-full items-center justify-center ${currentRoute === 'saved' ? 'bg-primary/15' : ''}`}>
          <Bookmark color={currentRoute === 'saved' ? '#FF5722' : '#9CA3AF'} size={21} />
        </View>
        <Text className={`text-[10px] mt-0.5 ${currentRoute === 'saved' ? 'text-primary font-bold' : 'text-gray-400'}`}>Saved</Text>
      </TouchableOpacity>

      <TouchableOpacity accessibilityLabel="Grocery lists" onPress={() => navigateTo('lists')} className="items-center justify-center flex-1 h-12">
        <View className={`w-10 h-8 rounded-full items-center justify-center ${currentRoute === 'lists' ? 'bg-primary/15' : ''}`}>
          <ShoppingBasket color={currentRoute === 'lists' ? '#FF5722' : '#9CA3AF'} size={21} />
        </View>
        <Text className={`text-[10px] mt-0.5 ${currentRoute === 'lists' ? 'text-primary font-bold' : 'text-gray-400'}`}>Lists</Text>
      </TouchableOpacity>
    </View>
  );
}