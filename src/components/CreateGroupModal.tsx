import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CreateGroupModalProps = {
  visible: boolean;
  title: string;
  placeholder: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export default function CreateGroupModal({
  visible,
  title,
  placeholder,
  submitLabel,
  onClose,
  onSubmit,
}: CreateGroupModalProps) {
  const [name, setName] = useState('');

  const handleClose = () => {
    setName('');
    onClose();
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onSubmit(trimmedName);
    handleClose();
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={handleClose}>
      <TouchableOpacity className="flex-1 bg-black/80 justify-center px-5" activeOpacity={1} onPress={handleClose}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableOpacity activeOpacity={1}>
            <View className="bg-[#191919] rounded-3xl border border-white/10 p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-white font-extrabold text-xl">{title}</Text>
                <TouchableOpacity accessibilityLabel="Close" onPress={handleClose} className="w-9 h-9 rounded-full bg-white/10 items-center justify-center">
                  <X color="#D1D5DB" size={18} />
                </TouchableOpacity>
              </View>

              <TextInput
                autoFocus
                value={name}
                onChangeText={setName}
                placeholder={placeholder}
                placeholderTextColor="#6B7280"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                className="bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white mb-5"
              />

              <TouchableOpacity disabled={!name.trim()} onPress={handleSubmit} activeOpacity={0.85}>
                <LinearGradient
                  colors={name.trim() ? ['#FF9800', '#F44336'] : ['#3F3F46', '#27272A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-4 rounded-2xl items-center"
                >
                  <Text className={`font-extrabold text-base ${name.trim() ? 'text-black' : 'text-gray-500'}`}>
                    {submitLabel}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}
