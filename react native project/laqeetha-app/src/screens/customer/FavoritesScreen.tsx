import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="heart-outline" size={100} color="#d1d5db" />
        <Text className="text-gray-700 text-2xl font-bold mt-6 text-center">
          لا توجد مفضلات بعد
        </Text>
        <Text className="text-gray-500 text-center mt-3 leading-6">
          احفظ القطع المفضلة لديك هنا{'\n'}
          للوصول السريع إليها لاحقاً
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
