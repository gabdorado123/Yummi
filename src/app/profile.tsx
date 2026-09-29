import { Camera, ChevronRight, FolderHeart, Grid, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'uploads' | 'collections' | 'remixes'>('uploads');

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      
      {/* Top Navigation / Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-white font-bold text-2xl">@chef_gab</Text>
        <TouchableOpacity onPress={() => Alert.alert('Settings', 'Profile settings are coming soon.')} className="bg-white/10 p-2 rounded-full">
          <Settings color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Stats Section */}
        <View className="px-6 mt-2 mb-8 flex-row items-center">
          <View className="w-20 h-20 bg-surface rounded-full border-2 border-primary items-center justify-center mr-6">
            <Text className="text-primary font-bold text-3xl">G</Text>
            {/* If using an image: <Image source={{ uri: 'url' }} className="w-full h-full rounded-full" /> */}
          </View>
          
          <View className="flex-1 flex-row justify-between">
            <View className="items-center">
              <Text className="text-white font-bold text-xl">14</Text>
              <Text className="text-gray-400 text-xs">Recipes</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-xl">2.1k</Text>
              <Text className="text-gray-400 text-xs">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-xl">184</Text>
              <Text className="text-gray-400 text-xs">Following</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 flex-row space-x-3 mb-8">
          <TouchableOpacity onPress={() => Alert.alert('Edit Profile', 'Profile editing is coming soon.')} className="flex-1 bg-primary py-3 rounded-xl items-center">
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Share Profile', 'Profile sharing is coming soon.')} className="flex-1 bg-surface border border-white/10 py-3 rounded-xl items-center">
            <Text className="text-white font-bold">Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Segmented Control Tabs */}
        <View className="flex-row border-b border-white/10 mb-4">
          <TouchableOpacity 
            onPress={() => setActiveTab('uploads')}
            className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'uploads' ? 'border-primary' : 'border-transparent'}`}
          >
            <Grid color={activeTab === 'uploads' ? '#FF5722' : 'gray'} size={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveTab('collections')}
            className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'collections' ? 'border-primary' : 'border-transparent'}`}
          >
            <FolderHeart color={activeTab === 'collections' ? '#FF5722' : 'gray'} size={24} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('remixes')}
            className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'remixes' ? 'border-primary' : 'border-transparent'}`}
          >
            <Camera color={activeTab === 'remixes' ? '#FF5722' : 'gray'} size={24} />
          </TouchableOpacity>
        </View>

        {/* Tab Content Rendering */}
        <View className="px-1">
          
          {/* UPLOADS TAB */}
          {activeTab === 'uploads' && (
            <View className="flex-row flex-wrap">
              {[1, 2, 3, 4].map((item) => (
                <View key={item} className="w-1/3 p-1">
                  <View className="bg-surface aspect-[3/4] rounded-lg items-center justify-center border border-white/5">
                    <Text className="text-gray-600 text-xs">Video {item}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* COLLECTIONS TAB */}
          {activeTab === 'collections' && (
            <View className="px-5">
              <TouchableOpacity onPress={() => Alert.alert('Quick Dinners', 'Collection details are coming soon.')} className="bg-surface flex-row items-center justify-between p-4 rounded-2xl mb-3 border border-white/10">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">🔥</Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold text-lg mb-1">Quick Dinners</Text>
                    <Text className="text-gray-400 text-xs">12 recipes saved</Text>
                  </View>
                </View>
                <ChevronRight color="gray" size={20} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Alert.alert('Vegan Prep', 'Collection details are coming soon.')} className="bg-surface flex-row items-center justify-between p-4 rounded-2xl border border-white/10">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-primary/20 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">🌱</Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold text-lg mb-1">Vegan Prep</Text>
                    <Text className="text-gray-400 text-xs">8 recipes saved</Text>
                  </View>
                </View>
                <ChevronRight color="gray" size={20} />
              </TouchableOpacity>
            </View>
          )}

          {/* REMIXES TAB */}
          {activeTab === 'remixes' && (
            <View className="px-5 py-10 items-center justify-center">
              <Camera color="gray" size={48} className="mb-4 opacity-50" />
              <Text className="text-white font-bold text-lg mb-2">No remixes yet</Text>
              <Text className="text-gray-400 text-center text-sm">
                When you cook someone else&apos;s recipe and post a photo, it will appear here.
              </Text>
            </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
}