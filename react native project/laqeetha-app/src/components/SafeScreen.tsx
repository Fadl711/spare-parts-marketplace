import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SafeScreenProps {
  children: ReactNode;
  screenName?: string;
}

export const SafeScreen: React.FC<SafeScreenProps> = ({
  children,
  screenName = "الصفحة",
}) => {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Ionicons name="alert-circle" size={60} color="#ef4444" />
        <Text className="text-xl font-bold text-gray-900 text-center mt-4">
          حدث خطأ في {screenName}
        </Text>
        <Text className="text-gray-600 text-center mt-2 mb-6">
          نعتذر عن الإزعاج
        </Text>
        <TouchableOpacity
          className="bg-purple-600 px-8 py-3 rounded-xl"
          onPress={() => setError(null)}
        >
          <Text className="text-white font-bold">حاول مرة أخرى</Text>
        </TouchableOpacity>
      </View>
    );
  }

  try {
    return <>{children}</>;
  } catch (err: any) {
    setError(err);
    return null;
  }
};
