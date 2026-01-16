import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
    CustomerHomeStackParamList,
    CategoriesStackParamList,
} from "../../navigation/CustomerNavigator";
// import { searchParts } from "../../data/mock";
import { Part } from "../../types";
import { ApiService } from "../../services/api";

type SearchResultsScreenNavigationProp = NativeStackNavigationProp<
    CustomerHomeStackParamList & CategoriesStackParamList,
    "SearchResults"
>;

type SearchResultsScreenRouteProp = RouteProp<
    CustomerHomeStackParamList & CategoriesStackParamList,
    "SearchResults"
>;

// Removed type Props as navigation and route will be handled by hooks

const SearchResultsScreen = () => {
    const navigation = useNavigation<SearchResultsScreenNavigationProp>();
    const route = useRoute<SearchResultsScreenRouteProp>();
    const { filters } = route.params;

    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilterModal, setShowFilterModal] = useState(false); // Not used yet, but added as per instruction

    useEffect(() => {
        const fetchParts = async () => {
            setLoading(true);
            try {
                const response = await ApiService.searchParts(filters);
                const data = response.data || response; // Assuming response might be direct data or an object with a 'data' property
                setParts(data);
            } catch (error) {
                console.error("Search failed:", error); // Changed console.log to console.error
                setParts([]); // Clear parts on error
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [filters]);

    const formatPrice = (price: number): string => {
        return price.toLocaleString("ar-YE") + " ر.ي";
    };

    const renderPartCard = ({ item }: { item: Part }) => {
        // Renamed to renderPartCard to match original code's usage
        const seller = item.seller;

        return (
            <TouchableOpacity
                className="bg-white rounded-2xl shadow-md mb-4 mx-4 overflow-hidden"
                onPress={() =>
                    navigation.navigate("PartDetails", { partId: item.id })
                }
            >
                {/* Image */}
                <Image
                    source={{
                        uri:
                            item.image_urls && item.image_urls.length > 0
                                ? item.image_urls[0]
                                : item.images && item.images.length > 0
                                ? item.images[0].url
                                : item.imageUrls && item.imageUrls.length > 0
                                ? item.imageUrls[0]
                                : "https://via.placeholder.com/150",
                    }}
                    className="w-full h-48"
                    resizeMode="cover"
                />

                {/* Content */}
                <View className="p-4">
                    {/* Title */}
                    <Text className="text-gray-900 text-lg font-bold mb-2 text-right">
                        {item.title}
                    </Text>

                    {/* Price */}
                    <Text className="text-blue-600 text-2xl font-bold mb-3 text-right">
                        {formatPrice(item.price)}
                    </Text>

                    {/* Badges */}
                    <View className="flex-row flex-wrap mb-3 justify-end">
                        <View
                            className={`px-3 py-1 rounded-full ml-2 mb-2 ${
                                item.condition === "new" ||
                                item.status === "new"
                                    ? "bg-green-100"
                                    : "bg-yellow-100"
                            }`}
                        >
                            <Text
                                className={`text-xs font-semibold ${
                                    item.condition === "new" ||
                                    item.status === "new"
                                        ? "text-green-700"
                                        : "text-yellow-700"
                                }`}
                            >
                                {item.condition === "new" ||
                                item.status === "new"
                                    ? "✨ جديد"
                                    : "🔧 مستعمل"}
                            </Text>
                        </View>
                        <View
                            className={`px-3 py-1 rounded-full ml-2 mb-2 ${
                                item.quality === "original"
                                    ? "bg-blue-100"
                                    : "bg-purple-100"
                            }`}
                        >
                            <Text
                                className={`text-xs font-semibold ${
                                    item.quality === "original"
                                        ? "text-blue-700"
                                        : "text-purple-700"
                                }`}
                            >
                                {item.quality === "original"
                                    ? "🏆 أصلي"
                                    : "💼 تجاري"}
                            </Text>
                        </View>
                    </View>

                    {/* Seller Info */}
                    {seller && (
                        <View className="border-t border-gray-200 pt-3 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="location"
                                    size={14}
                                    color="#6b7280"
                                />
                                <Text className="text-gray-600 text-xs mr-1">
                                    {seller.location?.city || "غير محدد"}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#f59e0b"
                                />
                                <Text className="text-gray-600 text-xs mr-1">
                                    {seller.rating || "5.0"}
                                </Text>
                                <Text className="text-gray-800 font-semibold text-sm mr-2">
                                    {seller.store_name}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header Info */}
            <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-white shadow-sm">
                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                    className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
                >
                    <Ionicons
                        name="options-outline"
                        size={20}
                        color="#374151"
                    />
                    <Text className="ml-2 text-gray-700 font-medium text-sm">
                        تصفية
                    </Text>
                </TouchableOpacity>
                <Text className="text-gray-500 text-sm">
                    {loading ? "جاري البحث..." : `${parts.length} نتيجة`}
                </Text>
            </View>

            {/* Active Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row direction-rtl "
                contentContainerStyle={{ flexDirection: "row-reverse" }}
            >
                {filters.make && (
                    <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 ml-2">
                        <Text className="text-blue-800 text-xs font-medium">
                            {filters.make}
                        </Text>
                    </View>
                )}
                {filters.model && (
                    <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 ml-2">
                        <Text className="text-blue-800 text-xs font-medium">
                            {filters.model}
                        </Text>
                    </View>
                )}
                {filters.partName && (
                    <View className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 ml-2">
                        <Text className="text-blue-800 text-xs font-medium">
                            {filters.partName}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Results List */}
            <FlatList
                data={parts}
                renderItem={renderPartCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !loading ? (
                        <View className="flex-1 items-center justify-center mt-20">
                            <Ionicons
                                name="search-outline"
                                size={64}
                                color="#d1d5db"
                            />
                            <Text className="text-gray-500 mt-4 text-lg">
                                عذراً، لم يتم العثور على قطع مطابقة
                            </Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
};
export default SearchResultsScreen;
