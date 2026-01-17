import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

// Navigators
import CustomerNavigator from "./CustomerNavigator";

// Define Root Stack Param List
export type RootStackParamList = {
  CustomerApp: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="CustomerApp" component={CustomerNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
