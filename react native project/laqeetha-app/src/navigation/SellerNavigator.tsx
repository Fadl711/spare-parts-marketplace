import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Seller Screens
import DashboardScreen from '../screens/seller/DashboardScreen';
import ProductsScreen from '../screens/seller/ProductsScreen';
import MessagesScreen from '../screens/seller/MessagesScreen';
import SettingsScreen from '../screens/seller/SettingsScreen';
import AddPartScreen from '../screens/seller/AddPartScreen';

// Stack Navigator Types
export type SellerStackParamList = {
  SellerTabs: undefined;
  AddPart: { partId?: string };
};

const Stack = createNativeStackNavigator<SellerStackParamList>();
const Tab = createBottomTabNavigator();

const SellerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9333ea', // Purple-600
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'System', // Use system font for now
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'لوحة التحكم',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarLabel: 'منتجاتي',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'الرسائل',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'الإعدادات',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SellerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellerTabs" component={SellerTabNavigator} />
      <Stack.Screen 
        name="AddPart" 
        component={AddPartScreen}
        options={{
          presentation: 'modal', // Show as modal
          animation: 'slide_from_bottom'
        }}
      />
    </Stack.Navigator>
  );
};

export default SellerNavigator;
