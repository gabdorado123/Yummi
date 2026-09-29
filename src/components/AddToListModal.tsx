import { LinearGradient } from 'expo-linear-gradient';
import { Check, ShoppingBasket, X } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Recipe = {
  title: string;
  ingredientCount?: number;
};

type AddToListModalProps = {
  visible: boolean;
  onClose: () => void;
  recipe: Recipe | null;
};

export default function AddToListModal({ visible, onClose, recipe }: AddToListModalProps) {
  const [step, setStep] = useState<'select' | 'success'>('select');
  const [selectedList, setSelectedList] = useState('GAb');
  const [newListName, setNewListName] = useState('');

  // Reset state when closing
  const handleClose = () => {
    setTimeout(() => setStep('select'), 300);
    onClose();
  };

  const handleAddIngredients = () => {
    // In a real app, you would dispatch to your global state or backend here
    setStep('success');
  };

  if (!recipe) return null;

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={handleClose}>
      <TouchableOpacity 
        className="flex-1 bg-black/80 justify-center items-center px-4" 
        activeOpacity={1} 
        onPress={handleClose}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full max-w-md">
          <TouchableOpacity activeOpacity={1}>
            <View className="bg-[#161616] rounded-3xl p-6 border border-white/10 w-full">
              
              {/* Header */}
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <ShoppingBasket color="#4CAF50" size={20} className="mr-2" />
                  <Text className="text-white font-bold text-lg">Add ingredients to a list</Text>
                </View>
                <TouchableOpacity onPress={handleClose} className="p-1">
                  <X color="gray" size={20} />
                </TouchableOpacity>
              </View>

              {step === 'select' ? (
                <>
                  <Text className="text-gray-400 text-sm mb-6">
                    {recipe.title} • {recipe.ingredientCount || 10} ingredients
                  </Text>

                  {/* Existing List Option */}
                  <TouchableOpacity 
                    onPress={() => setSelectedList('GAb')}
                    className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 border ${
                      selectedList === 'GAb' ? 'bg-white/10 border-white/20' : 'bg-surface border-white/5'
                    }`}
                  >
                    <View>
                      <Text className="text-white font-bold text-base mb-1">GAb</Text>
                      <Text className="text-gray-400 text-xs">11 items</Text>
                    </View>
                    {selectedList === 'GAb' && <Check color="white" size={20} />}
                  </TouchableOpacity>

                  {/* New List Input */}
                  <View className="flex-row items-center bg-black/50 border border-white/10 rounded-2xl px-4 py-1 mb-6">
                    <TextInput
                      className="flex-1 text-white font-medium p-3"
                      placeholder="New list name"
                      placeholderTextColor="gray"
                      value={newListName}
                      onChangeText={setNewListName}
                    />
                    <TouchableOpacity
                      disabled={!newListName.trim()}
                      onPress={() => {
                        setSelectedList(newListName.trim());
                        setNewListName('');
                      }}
                    >
                      <Text className={`font-bold ${newListName.trim() ? 'text-primary' : 'text-gray-600'}`}>Create</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Action Button */}
                  <TouchableOpacity onPress={handleAddIngredients}>
                    <LinearGradient
                      colors={['#FF9800', '#F44336']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="py-4 rounded-xl items-center"
                    >
                      <Text className="text-white font-bold text-lg">Add ingredients</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                /* SUCCESS STATE */
                <View className="py-4">
                  <View className="flex-row items-center mb-6">
                    <View className="bg-[#4CAF50] rounded-full p-1 mr-3">
                      <Check color="black" size={16} strokeWidth={3} />
                    </View>
                    <Text className="text-white font-medium text-base">
                      {recipe.ingredientCount || 10} ingredients added.
                    </Text>
                  </View>
                  
                  <TouchableOpacity onPress={handleClose} className="bg-white py-4 rounded-xl items-center">
                    <Text className="text-black font-bold text-lg">Done</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}