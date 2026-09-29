import { useCallback, useState } from 'react';
import { FlatList, View, type ViewToken } from 'react-native';
import AddToListModal from '../../components/AddToListModal';
import FeedHeader from '../../components/FeedHeader';
import FeedItem from '../../components/FeedItem';

// Update mock data to include ingredient counts for the modal
const MOCK_FEED = [
  {
    id: '1',
    handle: '@mika.eats',
    title: 'Lemongrass Chicken with Herb Salad',
    description: 'Charred, sticky, and piled with herbs — the antidote to a dull weeknight.',
    time: '35min',
    servings: '2 servings',
    calories: '480 kcal',
    cuisine: 'Asian',
    ingredientCount: 11,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: '8.1k',
    comments: '340',
  },
  {
    id: '2',
    handle: '@theo.cooks',
    title: 'Miso Glazed Salmon Rice Bowl',
    description: 'Sticky, caramelised salmon over rice — the glaze does all the work.',
    time: '25min',
    servings: '2 servings',
    calories: '510 kcal',
    cuisine: 'Japanese',
    ingredientCount: 10,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: '11.2k',
    comments: '831',
  },
];

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };

export default function HomeFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Modal State
  const [isListModalVisible, setListModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  const openListModal = (recipe: any) => {
    setSelectedRecipe(recipe);
    setListModalVisible(true);
  };

  return (
    <View className="flex-1 bg-black">
      <FeedHeader />
      
      <FlatList
        data={MOCK_FEED}
        renderItem={({ item, index }) => (
          <FeedItem 
            item={item} 
            isActive={index === activeIndex} 
            onAddToList={() => openListModal(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
      />

      {/* Render the Modal */}
      <AddToListModal 
        visible={isListModalVisible} 
        onClose={() => setListModalVisible(false)} 
        recipe={selectedRecipe} 
      />
    </View>
  );
}