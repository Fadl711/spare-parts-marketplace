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

  // All hooks MUST be before any early returns!
  // Normalize images to string URLs
  const imageUrls: string[] = React.useMemo(() => {
    if (!part) return [];
    if (part.image_urls && part.image_urls.length > 0) return part.image_urls;
    if (part.imageUrls && part.imageUrls.length > 0) return part.imageUrls;
    if (part.images && part.images.length > 0)
      return part.images.map((img) => img.url);
    return [];
  }, [part]);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const response = await ApiService.getPartDetails(partId);
        // Handle different response structures gracefully
        const data = response.data || response;
        console.log("Part details loaded:", data);
        setPart(data);
      } catch (error) {
        console.error("Failed to load part details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartDetails();
  }, [partId]);

  // Early returns AFTER all hooks
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!part) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500 text-lg">القطعة غير موجودة</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-4 p-4"
        >
          <Text className="text-blue-600">عودة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Safe access helpers
  const seller = part.seller || {};
  const category = part.category;
  const compatibleVehicles = part.vehicles || [];

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return (numPrice || 0).toLocaleString("ar-YE") + " ر.ي";
  };

  const handleCall = () => {
    // Handle both phone (string) and phones (array) formats
    const phoneNumber =
      seller.phones && seller.phones.length > 0
        ? seller.phones[0]
        : seller.phone;

    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleWhatsApp = () => {
    const whatsappNumber = seller.whatsapp;
    if (whatsappNumber) {
      const message = encodeURIComponent(`مرحباً، أنا مهتم بـ: ${part.title}`);
      // Remove non-numeric characters
      const phone = whatsappNumber.replace(/[^0-9]/g, "");
      Linking.openURL(`https://wa.me/${phone}?text=${message}`);
    } else {
      // Fallback to using phone number for WhatsApp
      const phoneNumber =
        seller.phones && seller.phones.length > 0
          ? seller.phones[0]
          : seller.phone;

      if (phoneNumber) {
        const message = encodeURIComponent(
          `مرحباً، أنا مهتم بـ: ${part.title}`
        );
        const phone = phoneNumber.replace(/[^0-9]/g, "");
        Linking.openURL(`https://wa.me/${phone}?text=${message}`);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View className="bg-white relative">
          {imageUrls.length > 0 ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const index = Math.round(
                    e.nativeEvent.contentOffset.x / width
                  );
                  setActiveImageIndex(index);
                }}
              >
                {imageUrls.map((url: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={{ width, height: 300 }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>

              {/* Indicators */}
              {imageUrls.length > 1 && (
                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                  {imageUrls.map((_: any, index: number) => (
                    <View
                      key={index}
                      className={`w-2 h-2 rounded-full mx-1 ${
                        index === activeImageIndex ? "bg-blue-600" : "bg-white"
                      }`}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View
              style={{ width, height: 300 }}
              className="bg-gray-100 items-center justify-center"
            >
              <Ionicons name="image-outline" size={64} color="#ccc" />
              <Text className="text-gray-400 mt-2">لا توجد صور</Text>
            </View>
          )}

          {/* Back Button Overlay */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-4 left-4 bg-white/80 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Part Info */}
        <View className="bg-white mt-2 px-6 py-5">
          <Text className="text-gray-900 text-2xl font-bold mb-3 text-right">
            {part.title || "بدون عنوان"}
          </Text>
          <Text className="text-blue-600 text-3xl font-bold mb-4 text-right">
            {formatPrice(part.price)}
          </Text>

          {/* Description */}
          <Text className="text-gray-700 text-base leading-6 mb-4 text-right">
            {part.description || "لا يوجد وصف"}
          </Text>

          {/* Badges */}
          <View className="flex-row flex-wrap mb-4 justify-end">
            <View
              className={`px-4 py-2 rounded-full ml-2 mb-2 ${
                part.condition === "new" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <Text
                className={`font-semibold ${
                  part.condition === "new" || part.status === "new"
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {part.condition === "new" || part.status === "new"
                  ? "✨ جديد"
                  : "🔧 مستعمل"}
              </Text>
            </View>

            <View
              className={`px-4 py-2 rounded-full ml-2 mb-2 ${
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
            {category && category.name_ar && (
              <View className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-700">{category.name_ar}</Text>
                <Text className="text-gray-500">الفئة</Text>
              </View>
            )}
            <View className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-gray-700">{part.views || 0} مشاهدة</Text>
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
            <View className="flex-row flex-wrap justify-end">
              {compatibleVehicles.map((vehicle, index) => {
                // Handle both string and object formats
                const isString = typeof vehicle === "string";
                const displayText = isString
                  ? vehicle
                  : `${vehicle.make} ${vehicle.model}`;
                const yearText = isString
                  ? null
                  : `${vehicle.year_from} - ${vehicle.year_to}`;

                return (
                  <View
                    key={isString ? index : vehicle.id}
                    className="bg-blue-50 px-4 py-2 rounded-lg ml-2 mb-2"
                  >
                    <Text className="text-blue-800 font-semibold text-center">
                      {displayText}
                    </Text>
                    {yearText && (
                      <Text className="text-blue-600 text-xs text-center">
                        {yearText}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Seller Info */}
        {seller && seller.store_name && (
          <View className="bg-white mt-2 px-6 py-5 mb-24">
            <Text className="text-gray-900 text-xl font-bold mb-4 text-right">
              معلومات البائع
            </Text>
            <View className="bg-gray-50 rounded-2xl p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  {seller.is_approved && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10b981"
                    />
                  )}
                </View>
                <Text className="text-gray-900 text-lg font-bold">
                  {seller.store_name}
                </Text>
              </View>

              <View className="flex-row items-center justify-end mb-2">
                <View className="flex-row items-center mr-4">
                  <Text className="text-gray-600 text-sm ml-1">
                    ({seller.total_parts || 0})
                  </Text>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text className="text-gray-700 font-semibold ml-1">
                    {seller.rating ? seller.rating.toFixed(1) : "5.0"}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Text className="text-gray-600 text-sm mr-1">
                    {seller.location?.city || "غير محدد"}
                  </Text>
                  <Ionicons name="location" size={16} color="#6b7280" />
                </View>
              </View>
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
          <Text className="text-white font-bold ml-2">اتصال</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-emerald-500 flex-1 py-3 rounded-xl flex-row items-center justify-center"
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text className="text-white font-bold ml-2">واتساب</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PartDetailsScreen;
