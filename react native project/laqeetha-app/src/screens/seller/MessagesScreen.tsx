import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_CHATS } from '../../data/mock';

const MessagesScreen = () => {
  const renderItem = ({ item }: { item: typeof MOCK_CHATS[0] }) => (
    <TouchableOpacity className="flex-row items-center p-4 bg-white border-b border-gray-100 active:bg-gray-50">
      {/* Avatar */}
      <Image
        source={{ uri: item.avatarUrl }}
        className="w-12 h-12 rounded-full bg-gray-200"
      />
      
      {/* Content */}
      <View className="flex-1 mr-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-gray-900 font-bold text-base text-right flex-1 ml-2">
            {item.buyerName}
          </Text>
          <Text className="text-gray-500 text-xs">
            {item.time}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 text-sm text-right flex-1 ml-2" numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View className="bg-purple-600 w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="p-4 border-b border-gray-200 bg-white">
        <Text className="text-xl font-bold text-gray-800 text-right">الرسائل</Text>
      </View>

      <FlatList
        data={MOCK_CHATS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg">لا توجد رسائل</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
