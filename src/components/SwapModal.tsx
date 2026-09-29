import { Sparkles, X } from 'lucide-react-native';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CONSTRAINTS = [
  'Dairy-free', 'Gluten-free', 'Vegan', 'Vegetarian', 
  'Nut-free', 'Low-carb', 'Keto', 'No pork'
];

type SwapRequest = {
  target: string;
  constraint: string;
  customReason: string;
};

type SwapModalProps = {
  visible: boolean;
  onClose: () => void;
  ingredients: string[];
  onSubmit: (request: SwapRequest) => void;
};

export default function SwapModal({ visible, onClose, ingredients, onSubmit }: SwapModalProps) {
  const insets = useSafeAreaInsets();
  
  // State to hold the user's mapping choices
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedConstraint, setSelectedConstraint] = useState('');
  const [manualReason, setManualReason] = useState('');

  const handleSwapRequest = () => {
    // Package the data for the AI prompt
    const swapData = {
      target: selectedIngredient,
      constraint: selectedConstraint,
      customReason: manualReason
    };
    onSubmit(swapData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Dark Overlay - tapping it closes the modal */}
      <TouchableOpacity 
        className="flex-1 bg-black/80 justify-end" 
        activeOpacity={1} 
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // Prevent tap events on the modal itself from closing it
          className="w-full"
        >
          <TouchableOpacity activeOpacity={1}>
            <View 
              className="bg-surface rounded-t-3xl border-t border-white/10 px-6 pt-6"
              style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 32 }}
            >
              
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white font-bold text-xl flex-row items-center">
                  Swap an ingredient
                </Text>
                <TouchableOpacity onPress={onClose} className="p-2 bg-white/10 rounded-full">
                  <X color="white" size={20} />
                </TouchableOpacity>
              </View>

              {/* Step 1: Target Ingredient */}
              <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-3">
                Which One?
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                className="mb-6"
              >
                {ingredients.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedIngredient(item)}
                    className={`px-4 py-2 rounded-full border mr-3 ${
                      selectedIngredient === item 
                        ? 'border-primary bg-primary/20' 
                        : 'border-white/20 bg-transparent'
                    }`}
                  >
                    <Text className={`font-semibold ${selectedIngredient === item ? 'text-primary' : 'text-gray-300'}`}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Step 2: Constraint Toggles */}
              <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-3">
                Because...
              </Text>
              <View className="flex-row flex-wrap mb-4">
                {CONSTRAINTS.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedConstraint(item);
                      setManualReason(''); // Clear manual if picking a preset
                    }}
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

              {/* Step 3: Manual Override */}
              <Text className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-2">
                Or describe it
              </Text>
              <TextInput
                className="bg-background text-white p-4 rounded-xl border border-white/10 mb-8 font-medium"
                placeholder="e.g. I ran out of it"
                placeholderTextColor="gray"
                value={manualReason}
                onChangeText={(text) => {
                  setManualReason(text);
                  setSelectedConstraint(''); // Clear preset if typing manually
                }}
              />

              {/* Action Button */}
              <TouchableOpacity 
                onPress={handleSwapRequest}
                disabled={!selectedIngredient || (!selectedConstraint && !manualReason)}
                className={`flex-row justify-center items-center py-4 rounded-xl ${
                  !selectedIngredient || (!selectedConstraint && !manualReason)
                    ? 'bg-white/10'
                    : 'bg-primary'
                }`}
              >
                <Sparkles color={(!selectedIngredient || (!selectedConstraint && !manualReason)) ? 'gray' : 'white'} size={20} />
                <Text className={`font-bold text-lg ml-2 ${(!selectedIngredient || (!selectedConstraint && !manualReason)) ? 'text-gray-500' : 'text-white'}`}>
                  Find a swap
                </Text>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}