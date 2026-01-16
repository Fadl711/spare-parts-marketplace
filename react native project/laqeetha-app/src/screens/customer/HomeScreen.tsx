import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerHomeStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
import { Vehicle, Category, Part } from "../../types";

type NavigationProp = NativeStackNavigationProp<CustomerHomeStackParamList>;

// --- Local Components (if not found separately) ---

const Header = () => (
  <View className="flex-row justify-between items-center mb-4">
    <View>
      <Text className="text-gray-400 text-xs font-Cairo">مرحباً بك 👋</Text>
      <Text className="text-gray-800 text-lg font-bold font-Cairo">
        في لقيتها لقطع الغيار
      </Text>
    </View>
    <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
      <Ionicons name="notifications-outline" size={24} color="#374151" />
    </TouchableOpacity>
  </View>
);

const PartCard = ({ part, onPress }: { part: Part; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 flex-row overflow-hidden"
  >
    {/* Debug Text - Removed */}

    <Image
      source={{
        uri:
          part.image_urls && part.image_urls.length > 0
            ? part.image_urls[0]
            : part.images && part.images.length > 0
            ? part.images[0].url
            : part.imageUrls && part.imageUrls.length > 0
            ? part.imageUrls[0]
            : "https://via.placeholder.com/150",
      }}
      style={{ width: 100, height: 100 }} // Explicit style
      className="w-32 h-32"
      resizeMode="cover"
      onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
    />
    <View className="flex-1 p-3 justify-between">
      <View>
        <Text
          className="text-gray-800 font-bold text-base text-right"
          numberOfLines={2}
        >
          {part.title}
        </Text>
        <Text className="text-gray-500 text-xs text-right mt-1">
          {part.seller?.store_name}
        </Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <View
          className={`px-2 py-1 rounded-md ${
            part.status === "new" ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <Text
            className={`text-xs ${
              part.status === "new" ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {part.status === "new" ? "جديد" : "مستعمل"}
          </Text>
        </View>
        <Text className="text-blue-600 font-bold text-lg">
          {part.price.toLocaleString()} ر.ي
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  // Casting to any to allow cross-stack navigation without complex typing
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredParts, setFeaturedParts] = useState<Part[]>([]);
  const [makes, setMakes] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [categoriesRes, partsRes, makesRes] = await Promise.all([
        ApiService.getCategories(),
        ApiService.getFeaturedParts(),
        ApiService.getMakes(),
      ]);

      // Handle various response structures
      setCategories(
        Array.isArray(categoriesRes) ? categoriesRes : categoriesRes.data || []
      );
      setFeaturedParts(
        Array.isArray(partsRes) ? partsRes : partsRes.data || []
      );
      setMakes(Array.isArray(makesRes) ? makesRes : makesRes.data || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0284c7"]}
          />
        }
      >
        <View className="pt-4">
          <Header />
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          className="flex-row items-center bg-white p-3 rounded-xl border border-gray-200 mb-6"
          onPress={() => navigation.navigate("SearchResults", { filters: {} })}
        >
          <Ionicons name="search" size={24} color="#9ca3af" />
          <Text className="text-gray-400 ml-2 text-right flex-1 font-Cairo">
            ابحث عن قطعة غيار...
          </Text>
        </TouchableOpacity>

        {/* Brands Section */}
        {makes.length > 0 && (
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CategoriesStack", {
                    screen: "BrandSelection",
                  })
                }
              >
                <Text className="text-blue-600 font-Cairo">عرض الكل</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-gray-800 font-Cairo">
                تصفح حسب الماركة
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {/* Ensure direction is correct for map */}
              {makes.slice(0, 10).map((brand, index) => (
                <TouchableOpacity
                  key={index}
                  className="items-center mr-4"
                  onPress={() =>
                    navigation.navigate("CategoriesStack", {
                      screen: "CategorySelection",
                      params: {
                        make: brand.label || brand.make, // Handle different API responses
                        model: "",
                      },
                    })
                  }
                >
                  <View className="w-16 h-16 bg-white rounded-full items-center justify-center border border-gray-100 mb-2">
                    <Text className="text-xl font-bold text-gray-700">
                      {(brand.label || brand.make || "?").charAt(0)}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-600 font-Cairo">
                    {brand.label || brand.make}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800 font-Cairo">
              الأقسام الرئيسية
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="w-[48%] bg-white p-4 rounded-xl border border-gray-100 mb-4 items-center"
                onPress={() =>
                  navigation.navigate("CategoriesStack", {
                    screen: "PartTypeSelection",
                    params: {
                      category,
                    },
                  })
                }
              >
                <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
                  <Ionicons name="apps" size={24} color="#0284c7" />
                </View>
                <Text className="text-gray-800 font-bold font-Cairo text-center">
                  {category.name_ar}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800 font-Cairo">
              أحدث القطع المضافة
            </Text>
          </View>
          {featuredParts.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-gray-400">لا توجد قطع مضافة حديثاً</Text>
            </View>
          ) : (
            featuredParts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onPress={() =>
                  navigation.navigate("PartDetails", {
                    partId: part.id,
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
