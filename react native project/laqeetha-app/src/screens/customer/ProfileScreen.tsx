import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-blue-600 px-6 py-8 items-center">
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#0284c7" />
          </View>
          <Text className="text-white text-2xl font-bold">مستخدم ضيف</Text>
          <Text className="text-blue-100 mt-1">سجل الدخول للحصول على مزايا أكثر</Text>
        </View>

        <View className="px-4 mt-6">
          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                سجل الدخول
              </Text>
              <Ionicons name="log-in-outline" size={24} color="#0284c7" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                إنشاء حساب
              </Text>
              <Ionicons name="person-add-outline" size={24} color="#0284c7" />
            </View>
          </TouchableOpacity>

          <View className="mt-6 mb-3">
            <Text className="text-gray-500 font-semibold mb-3 text-right">
              الإعدادات
            </Text>
          </View>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                اللغة
              </Text>
              <Ionicons name="language-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                من نحن
              </Text>
              <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                اتصل بنا
              </Text>
              <Ionicons name="mail-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
