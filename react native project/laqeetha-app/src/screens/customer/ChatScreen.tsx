import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  CustomerHomeStackParamList,
  CategoriesStackParamList,
} from "../../navigation/CustomerNavigator";
import { Ionicons } from "@expo/vector-icons";
import { getSellerById } from "../../data/mock";

type ChatScreenNavigationProp = NativeStackNavigationProp<
  CustomerHomeStackParamList & CategoriesStackParamList,
  "Chat"
>;

type ChatScreenRouteProp = RouteProp<
  CustomerHomeStackParamList & CategoriesStackParamList,
  "Chat"
>;

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const route = useRoute<ChatScreenRouteProp>();
  const { sellerId, partId } = route.params;
  const seller = getSellerById(sellerId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "السلام عليكم، هل القطعة موجودة؟",
      sender: "me",
      time: "10:30 ص",
    },
    {
      id: "2",
      text: "وعليكم السلام، نعم موجودة يا غالي",
      sender: "other",
      time: "10:32 ص",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "me",
        time: new Date().toLocaleTimeString("ar-YE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View
        className={`flex-row mb-4 ${isMe ? "justify-start" : "justify-end"}`} // Reversed for RTL
      >
        <View
          className={`px-4 py-3 rounded-2xl max-w-[80%] ${
            isMe ? "bg-blue-600 rounded-br-none" : "bg-gray-200 rounded-bl-none"
          }`}
        >
          <Text
            className={`text-base ${isMe ? "text-white" : "text-gray-800"}`}
          >
            {item.text}
          </Text>
          <Text
            className={`text-xs mt-1 text-left ${
              isMe ? "text-blue-200" : "text-gray-500"
            }`}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 justify-between">
        <View className="flex-row items-center">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 ml-2"
          >
            <Ionicons name="arrow-forward" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <View className="items-end mr-3">
            <Text className="text-gray-900 font-bold text-base">
              {seller?.storeName || "البائع"}
            </Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="text-gray-500 text-xs">متصل الآن</Text>
            </View>
          </View>
          <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center overflow-hidden">
            <Ionicons name="person" size={20} color="#9ca3af" />
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={[...messages].reverse()} // Reverse to show latest at bottom if inverted
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        inverted
        className="flex-1 bg-gray-50"
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="flex-row items-center p-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSend}
            className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mr-2 shadow-sm"
          >
            <Ionicons
              name="send"
              size={20}
              color="white"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-right text-gray-800"
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#9ca3af"
            multiline
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
