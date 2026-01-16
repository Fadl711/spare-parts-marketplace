import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SellerStackParamList } from "../../navigation/SellerNavigator";
import { SafeScreen } from "../../components/SafeScreen";

type NavigationProp = NativeStackNavigationProp<SellerStackParamList>;

const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Using seller s1 stats as example
  const stats = {
    totalViews: 0,
    totalCalls: 0,
    totalChats: 0,
    activeListings: 0,
  }; // Placeholder until API integration

  return (
    <SafeScreen screenName="لوحة التحكم">
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView className="flex-1">
          {/* Subscription Banner */}
          <View className="bg-yellow-500 mx-4 mt-4 rounded-2xl p-5 shadow-lg">
            <View className="flex-row items-center justify-between">
              <Ionicons name="trophy" size={40} color="#fff" />
              <View className="flex-1 mr-4">
                <Text className="text-white text-xl font-bold text-right">
                  اشتراكك الذهبي نشط 🥇
                </Text>
                <Text className="text-yellow-100 text-sm mt-1 text-right">
                  متبقي 23 يوم
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="px-4 mt-6">
            <Text className="text-gray-800 text-xl font-bold mb-4 text-right">
              إحصائيات اليوم
            </Text>

            <View className="flex-row justify-between mb-4">
              {/* Views */}
              <View className="bg-white rounded-2xl p-5 flex-1 mr-2 shadow-sm">
                <View className="items-center">
                  <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                    <Ionicons name="eye" size={24} color="#0284c7" />
                  </View>
                  <Text className="text-gray-500 text-sm mb-1">المشاهدات</Text>
                  <Text className="text-gray-900 text-2xl font-bold">
                    {stats.totalViews.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Calls */}
              <View className="bg-white rounded-2xl p-5 flex-1 ml-2 shadow-sm">
                <View className="items-center">
                  <View className="bg-green-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                    <Ionicons name="call" size={24} color="#16a34a" />
                  </View>
                  <Text className="text-gray-500 text-sm mb-1">الاتصالات</Text>
                  <Text className="text-gray-900 text-2xl font-bold">
                    {stats.totalCalls}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              {/* Chats */}
              <View className="bg-white rounded-2xl p-5 flex-1 mr-2 shadow-sm">
                <View className="items-center">
                  <View className="bg-purple-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                    <Ionicons name="chatbubbles" size={24} color="#9333ea" />
                  </View>
                  <Text className="text-gray-500 text-sm mb-1">الدردشات</Text>
                  <Text className="text-gray-900 text-2xl font-bold">
                    {stats.totalChats}
                  </Text>
                </View>
              </View>

              {/* Active Listings */}
              <View className="bg-white rounded-2xl p-5 flex-1 ml-2 shadow-sm">
                <View className="items-center">
                  <View className="bg-orange-100 w-12 h-12 rounded-full items-center justify-center mb-3">
                    <Ionicons name="pricetags" size={24} color="#ea580c" />
                  </View>
                  <Text className="text-gray-500 text-sm mb-1">
                    منتجات نشطة
                  </Text>
                  <Text className="text-gray-900 text-2xl font-bold">
                    {stats.activeListings}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="px-4 mt-4">
            <Text className="text-gray-800 text-xl font-bold mb-4 text-right">
              إجراءات سريعة
            </Text>

            <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm">
              <Ionicons name="chevron-back" size={20} color="#9ca3af" />
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold text-base mr-3">
                  إدارة المنتجات
                </Text>
                <Ionicons name="layers-outline" size={24} color="#0284c7" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm">
              <Ionicons name="chevron-back" size={20} color="#9ca3af" />
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold text-base mr-3">
                  تقارير شاملة
                </Text>
                <Ionicons name="bar-chart-outline" size={24} color="#9333ea" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm">
              <Ionicons name="chevron-back" size={20} color="#9ca3af" />
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold text-base mr-3">
                  ترقية الاشتراك
                </Text>
                <Ionicons name="diamond-outline" size={24} color="#f59e0b" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View className="px-4 mt-4 mb-24">
            <View className="bg-purple-50 rounded-2xl p-5">
              <View className="flex-row items-center mb-3">
                <Ionicons name="bulb" size={24} color="#9333ea" />
                <Text className="text-purple-900 font-bold text-lg mr-2">
                  نصيحة اليوم
                </Text>
              </View>
              <Text className="text-purple-800 text-right leading-6">
                أضف صوراً واضحة ومتعددة لمنتجاتك لزيادة فرص البيع بنسبة 60%!
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-purple-600 w-14 h-14 rounded-full items-center justify-center shadow-lg active:bg-purple-700"
          onPress={() => navigation.navigate("AddPart", {})}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeScreen>
  );
};

export default DashboardScreen;
