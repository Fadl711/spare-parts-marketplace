import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-4 mt-4">
          <View className="mb-6">
            <Text className="text-gray-500 font-semibold mb-3 text-right">
              الحساب
            </Text>
          </View>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                معلومات المتجر
              </Text>
              <Ionicons name="storefront-outline" size={24} color="#0284c7" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                تغيير كلمة المرور
              </Text>
              <Ionicons name="lock-closed-outline" size={24} color="#0284c7" />
            </View>
          </TouchableOpacity>

          <View className="mt-6 mb-3">
            <Text className="text-gray-500 font-semibold mb-3 text-right">
              التنبيهات
            </Text>
          </View>

          <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#0284c7' }}
              thumbColor="#ffffff"
            />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                تفعيل الإشعارات
              </Text>
              <Ionicons name="notifications-outline" size={24} color="#6b7280" />
            </View>
          </View>

          <View className="mt-6 mb-3">
            <Text className="text-gray-500 font-semibold mb-3 text-right">
              الاشتراك
            </Text>
          </View>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                الباقات المتاحة
              </Text>
              <Ionicons name="diamond-outline" size={24} color="#f59e0b" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                فواتير الدفع
              </Text>
              <Ionicons name="receipt-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <View className="mt-6 mb-3">
            <Text className="text-gray-500 font-semibold mb-3 text-right">
              عام
            </Text>
          </View>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                سياسة الخصوصية
              </Text>
              <Ionicons name="shield-checkmark-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-semibold text-base mr-3">
                الدعم الفني
              </Text>
              <Ionicons name="help-circle-outline" size={24} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 mt-6 flex-row items-center justify-between">
            <Ionicons name="chevron-back" size={20} color="#dc2626" />
            <View className="flex-row items-center">
              <Text className="text-red-600 font-semibold text-base mr-3">
                تسجيل الخروج
              </Text>
              <Ionicons name="log-out-outline" size={24} color="#dc2626" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
