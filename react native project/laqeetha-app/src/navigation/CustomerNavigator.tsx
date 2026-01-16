import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Customer Screens
import HomeScreen from "../screens/customer/HomeScreen";
import SearchResultsScreen from "../screens/customer/SearchResultsScreen";
import PartDetailsScreen from "../screens/customer/PartDetailsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import BrandSelectionScreen from "../screens/customer/BrandSelectionScreen";
import CategorySelectionScreen from "../screens/customer/CategorySelectionScreen";
import PartTypeSelectionScreen from "../screens/customer/PartTypeSelectionScreen";
import ChatScreen from "../screens/customer/ChatScreen";
import { SafeAreaView } from "react-native-safe-area-context";

// Stack Navigator Types
export type CustomerHomeStackParamList = {
  Home: undefined;
  SearchResults: {
    filters: {
      vehicleType?: "car" | "truck";
      make?: string;
      model?: string;
      partName?: string;
      condition?: "new" | "used";
      quality?: "original" | "commercial";
    };
  };
  PartDetails: {
    partId: string;
  };
  Chat: {
    sellerId: string;
    partId?: string;
  };
};

export type CategoriesStackParamList = {
  BrandSelection: undefined;
  CategorySelection: {
    brandId: string;
    brandName: string;
  };
  PartTypeSelection: {
    brandId: string;
    categoryId: string;
    categoryName: string;
  };
  SearchResults: {
    filters: {
      vehicleType?: "car" | "truck";
      make?: string;
      model?: string;
      partName?: string;
    };
  };
  PartDetails: {
    partId: string;
  };
  Chat: {
    sellerId: string;
    partId?: string;
  };
};

// Tab Navigator Types
export type CustomerTabParamList = {
  HomeStack: undefined;
  CategoriesStack: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const HomeStack = createNativeStackNavigator<CustomerHomeStackParamList>();
const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();
const Tab = createBottomTabNavigator<CustomerTabParamList>();

// Home Stack Navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          headerShown: true,
          title: "نتائج البحث",
          headerTitleAlign: "center",
        }}
      />
      <HomeStack.Screen
        name="PartDetails"
        component={PartDetailsScreen}
        options={{
          headerShown: true,
          title: "تفاصيل القطعة",
          headerTitleAlign: "center",
        }}
      />
      <HomeStack.Screen name="Chat" component={ChatScreen} />
    </HomeStack.Navigator>
  );
};

// Categories Stack Navigator
const CategoriesStackNavigator = () => {
  return (
    <CategoriesStack.Navigator
      initialRouteName="BrandSelection"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <CategoriesStack.Screen
        name="BrandSelection"
        component={BrandSelectionScreen}
      />
      <CategoriesStack.Screen
        name="CategorySelection"
        component={CategorySelectionScreen}
      />
      <CategoriesStack.Screen
        name="PartTypeSelection"
        component={PartTypeSelectionScreen}
      />
      <CategoriesStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          headerShown: true,
          title: "نتائج البحث",
          headerTitleAlign: "center",
        }}
      />
      <CategoriesStack.Screen
        name="PartDetails"
        component={PartDetailsScreen}
        options={{
          headerShown: true,
          title: "تفاصيل القطعة",
          headerTitleAlign: "center",
        }}
      />
      <CategoriesStack.Screen name="Chat" component={ChatScreen} />
    </CategoriesStack.Navigator>
  );
};

// Customer Bottom Tab Navigator
const CustomerNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0284c7",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            title: "الرئيسية",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CategoriesStack"
          component={CategoriesStackNavigator}
          options={{
            title: "الفئات",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: "المفضلة",
            headerShown: true,
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "الحساب",
            headerShown: true,
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default CustomerNavigator;
