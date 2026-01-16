import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 bg-white justify-center items-center px-6">
          <Ionicons name="warning" size={80} color="#ef4444" />
          <Text className="text-2xl font-bold text-gray-900 text-center mt-6 mb-2">
            حدث خطأ غير متوقع
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            نعتذر عن الإزعاج. يمكنك المحاولة مرة أخرى
          </Text>

          {__DEV__ && this.state.error && (
            <ScrollView className="w-full bg-gray-100 p-4 rounded-lg mb-4 max-h-48">
              <Text className="text-red-600 text-xs font-mono">
                {this.state.error.toString()}
              </Text>
              {this.state.errorInfo && (
                <Text className="text-gray-600 text-xs font-mono mt-2">
                  {this.state.errorInfo.componentStack}
                </Text>
              )}
            </ScrollView>
          )}

          <TouchableOpacity
            className="bg-blue-600 px-8 py-4 rounded-xl"
            onPress={this.resetError}
          >
            <Text className="text-white font-bold text-lg">
              المحاولة مرة أخرى
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
