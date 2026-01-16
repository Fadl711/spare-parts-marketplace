import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CustomerHomeStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
import { Part } from "../../types";
import { Ionicons } from "@expo/vector-icons";

type PartDetailsScreenNavigationProp = NativeStackNavigationProp<
  CustomerHomeStackParamList,
  "PartDetails"
>;

type PartDetailsScreenRouteProp = RouteProp<
  CustomerHomeStackParamList,
  "PartDetails"
>;

type Props = {
  navigation: PartDetailsScreenNavigationProp;
  route: PartDetailsScreenRouteProp;
};

const { width } = Dimensions.get("window");

const PartDetailsScreen = ({ navigation, route }: Props) => {
  const { partId } = route.params;
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const response = await ApiService.getPartDetails(partId);
        const data = response.data || response;
        setPart(data);
      } catch (error) {
        console.log("Failed to load part details");
      } finally {
        setLoading(false);
      }
    };
    fetchPartDetails();
  }, [partId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!part) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-lg">القطعة غير موجودة</Text>
      </View>
    );
  }

  const seller = part.seller;
  const category = part.category;
  const compatibleVehicles = part.vehicles || [];

  const formatPrice = (price: number): string => {
    return price.toLocaleString("ar-YE") + " ر.ي";
  };

  const handleCall = () => {
    if (seller) {
      Linking.openURL(`tel:${seller.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (seller) {
      const message = encodeURIComponent(`مرحباً، أنا مهتم بـ: ${part.title}`);
      Linking.openURL(
        `https://wa.me/${seller.whatsapp.replace(
          /[^0-9]/g,
          ""
        )}?text=${message}`
      );
    }
  };

  /* Removed Chat Functionality as per request */

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View className="bg-white">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
          >
            {part.imageUrls.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={{ width, height: 300 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {/* Image Indicators */}
          {part.imageUrls.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
              {part.imageUrls.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === activeImageIndex ? "bg-blue-600" : "bg-white"
                  }`}
                />
              ))}
            </View>
          )}
        </View>

        {/* Part Info */}
        <View className="bg-white mt-2 px-6 py-5">
          <Text className="text-gray-900 text-2xl font-bold mb-3 text-right">
            {part.title}
          </Text>
          <Text className="text-blue-600 text-3xl font-bold mb-4 text-right">
            {formatPrice(part.price)}
          </Text>

          {/* Description */}
          <Text className="text-gray-700 text-base leading-6 mb-4 text-right">
            {part.description}
          </Text>

          {/* Badges */}
          <View className="flex-row flex-wrap mb-4">
            <View
              className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                part.condition === "new" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <Text
                className={`font-semibold ${
                  part.condition === "new"
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {part.condition === "new" ? "✨ جديد" : "🔧 مستعمل"}
              </Text>
            </View>
            <View
              className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                part.quality === "original" ? "bg-blue-100" : "bg-purple-100"
              }`}
            >
              <Text
                className={`font-semibold ${
                  part.quality === "original"
                    ? "text-blue-700"
                    : "text-purple-700"
                }`}
              >
                {part.quality === "original" ? "🏆 أصلي" : "💼 تجاري"}
              </Text>
            </View>
            {part.stock > 0 && (
              <View className="px-4 py-2 rounded-full bg-emerald-100 mr-2 mb-2">
                <Text className="font-semibold text-emerald-700">
                  ✅ متوفر ({part.stock})
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Specifications */}
        <View className="bg-white mt-2 px-6 py-5">
          <Text className="text-gray-900 text-xl font-bold mb-4 text-right">
            المواصفات
          </Text>
          <View className="space-y-3">
            {part.partNumber && (
              <View className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-700">{part.partNumber}</Text>
                <Text className="text-gray-500">رقم القطعة</Text>
              </View>
            )}
            {category && (
              <View className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-700">{category.nameAr}</Text>
                <Text className="text-gray-500">الفئة</Text>
              </View>
            )}
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-gray-700">{part.views} مشاهدة</Text>
              <Text className="text-gray-500">المشاهدات</Text>
            </View>
          </View>
        </View>

        {/* Compatible Vehicles */}
        {compatibleVehicles.length > 0 && (
          <View className="bg-white mt-2 px-6 py-5">
            <Text className="text-gray-900 text-xl font-bold mb-4 text-right">
              مناسب لـ
            </Text>
            <View className="flex-row flex-wrap">
              {compatibleVehicles.map((vehicle) => (
                <View
                  key={vehicle!.id}
                  className="bg-blue-50 px-4 py-2 rounded-lg mr-2 mb-2"
                >
                  <Text className="text-blue-800 font-semibold">
                    {vehicle!.make} {vehicle!.model}
                  </Text>
                  <Text className="text-blue-600 text-xs">
                    {vehicle!.yearFrom} - {vehicle!.yearTo}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Seller Info */}
        {seller && (
          <View className="bg-white mt-2 px-6 py-5 mb-24">
            <Text className="text-gray-900 text-xl font-bold mb-4 text-right">
              معلومات البائع
            </Text>
            <View className="bg-gray-50 rounded-2xl p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  {seller.verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10b981"
                    />
                  )}
                </View>
                <Text className="text-gray-900 text-lg font-bold">
                  {seller.storeName}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="location" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm mr-1">
                    {seller.location.city} - {seller.location.district}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-600 text-sm mr-1">
                    ({seller.totalReviews})
                  </Text>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text className="text-gray-700 font-semibold mr-1">
                    {seller.rating}
                  </Text>
                </View>
              </View>

              {seller.subscriptionTier &&
                seller.subscriptionTier !== "free" && (
                  <View className="mt-2">
                    <View
                      className={`px-3 py-1 rounded-full self-start ${
                        seller.subscriptionTier === "platinum"
                          ? "bg-purple-100"
                          : seller.subscriptionTier === "gold"
                          ? "bg-yellow-100"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          seller.subscriptionTier === "platinum"
                            ? "text-purple-700"
                            : seller.subscriptionTier === "gold"
                            ? "text-yellow-700"
                            : "text-gray-700"
                        }`}
                      >
                        {seller.subscriptionTier === "platinum"
                          ? "💎 بائع بلاتيني"
                          : seller.subscriptionTier === "gold"
                          ? "🥇 بائع ذهبي"
                          : "🥈 بائع فضي"}
                      </Text>
                    </View>
                  </View>
                )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex-row justify-between">
        <TouchableOpacity
          className="bg-green-600 flex-1 py-3 rounded-xl mr-2 flex-row items-center justify-center"
          onPress={handleCall}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text className="text-white font-bold mr-2">اتصال</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-emerald-500 flex-1 py-3 rounded-xl flex-row items-center justify-center"
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text className="text-white font-bold mr-2">واتساب</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PartDetailsScreen;
