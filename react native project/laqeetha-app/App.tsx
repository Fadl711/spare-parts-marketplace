import React, { useEffect } from "react";
import { I18nManager, Platform } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import "./global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  useEffect(() => {
    // Enable RTL layout for Arabic
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);

      // On Android, we need to reload the app for RTL to take effect
      if (Platform.OS === "android") {
        // Note: In production, you might want to show a dialog to the user
        // asking them to restart the app, rather than forcing a reload
        console.warn("Please restart the app for RTL to take effect");
      }
    }
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ErrorBoundary>
          <AppNavigator />
        </ErrorBoundary>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
