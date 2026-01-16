import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
// import { getVehicleById } from "../../data/mock"; // Removed
import { Category } from "../../types";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<CategoriesStackParamList>;
type RouteProps = RouteProp<CategoriesStackParamList, "CategorySelection">;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

// Map category IDs to icons
const getCategoryIcon = (id: number): keyof typeof Ionicons.glyphMap => {
    // Simple modulo logic for demo if specific mapping isn't available
    const icons: (keyof typeof Ionicons.glyphMap)[] = [
        "settings-outline",
        "disc-outline",
        "radio-button-on-outline",
        "flashlight-outline",
        "battery-charging-outline",
        "snow-outline",
        "car-sport-outline",
        "cube-outline",
    ];
    return icons[id % icons.length] || "cube-outline";
};

const CategorySelectionScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();
    // params might be different based on previous navigation (HomeScreen uses make/model in one route, BrandSelection in another)
    // Check CustomerNavigator types for truth.
    // Assuming params are { make: string; model: string } based on RootStackParamList
    const { make, model } = route.params as any;
    const displayBrand = make || "غير محدد";

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ApiService.getCategories();
                const data = Array.isArray(response)
                    ? response
                    : response.data || [];
                setCategories(data);
            } catch (error) {
                console.log("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const renderItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.navigate("PartTypeSelection", {
                    category: item,
                })
            }
            className="bg-white rounded-3xl mb-4 shadow-sm border border-gray-100 overflow-hidden"
            style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.1 }}
        >
            <View className="flex-1 items-center justify-center p-4">
                {/* Show actual image if available, otherwise show icon */}
                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }}
                        className="w-20 h-20 rounded-2xl mb-3"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-4">
                        <Ionicons
                            name={getCategoryIcon(item.id)}
                            size={32}
                            color="#0284c7"
                        />
                    </View>
                )}
                <Text className="text-gray-900 font-bold text-lg text-center">
                    {item.name_ar}
                </Text>
                <Text className="text-gray-400 text-xs text-center mt-1">
                    {item.name_en}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
            {/* Header */}
            <View className="px-6 pt-4 pb-4 flex-row items-center justify-between">
                <View>
                    <Text className="text-2xl font-bold text-gray-900 text-right">
                        اختر القسم
                    </Text>
                    <Text className="text-gray-500 text-right mt-1">
                        {displayBrand}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-white p-2 rounded-full shadow-sm"
                >
                    <Ionicons name="arrow-forward" size={24} color="#374151" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0284c7" />
                </View>
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        paddingHorizontal: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default CategorySelectionScreen;
