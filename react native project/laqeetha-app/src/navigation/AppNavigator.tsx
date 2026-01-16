import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CustomerNavigator from './CustomerNavigator';
import SellerNavigator from './SellerNavigator';
import { View, Text, TouchableOpacity } from 'react-native';

export type AppView = 'customer' | 'seller';

const AppNavigator = () => {
  const [currentView, setCurrentView] = useState<AppView>('customer');
  const [showSwitcher, setShowSwitcher] = useState(true);

  // Simple view switcher for development
  if (showSwitcher) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
          لَقِيتَها
        </Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          Taris - Spare Parts Marketplace
        </Text>
        
        <View className="w-full max-w-sm">
          <TouchableOpacity
            className="bg-blue-600 py-4 px-6 rounded-xl mb-4 shadow-lg"
            onPress={() => {
              setCurrentView('customer');
              setShowSwitcher(false);
            }}
          >
            <Text className="text-white text-xl font-semibold text-center">
              دخول كمشتري 🛒
            </Text>
            <Text className="text-blue-100 text-sm text-center mt-1">
              Customer View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-600 py-4 px-6 rounded-xl shadow-lg"
            onPress={() => {
              setCurrentView('seller');
              setShowSwitcher(false);
            }}
          >
            <Text className="text-white text-xl font-semibold text-center">
              دخول كبائع 🏪
            </Text>
            <Text className="text-purple-100 text-sm text-center mt-1">
              Seller View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {currentView === 'customer' ? <CustomerNavigator /> : <SellerNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
