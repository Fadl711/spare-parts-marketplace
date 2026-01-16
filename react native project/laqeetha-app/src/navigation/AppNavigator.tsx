import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";

// Navigators
import CustomerNavigator from "./CustomerNavigator";
import SellerNavigator from "./SellerNavigator";

// Screens
import LoginScreen from "../screens/LoginScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";

// Define Root Stack Param List
export type RootStackParamList = {
    CustomerApp: undefined;
    SellerApp: undefined;
    Login: undefined;
    Orders: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#2563eb" />
                <Text className="text-gray-500 mt-4 text-base">
                    جاري التحميل...
                </Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated && user?.type === "seller" ? (
                    <RootStack.Screen
                        name="SellerApp"
                        component={SellerNavigator}
                    />
                ) : (
                    // Customer or Guest
                    <RootStack.Screen
                        name="CustomerApp"
                        component={CustomerNavigator}
                    />
                )}
                {/* Login Screen available globally as a modal/stack item */}
                <RootStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ presentation: "fullScreenModal" }}
                />
                <RootStack.Screen
                    name="Orders"
                    component={OrdersScreen}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
