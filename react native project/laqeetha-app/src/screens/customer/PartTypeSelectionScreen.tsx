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
// import { getVehicleById } from "../../data/mock"; // Removed
import { Ionicons } from "@expo/vector-icons";
import { ApiService } from "../../services/api";
import { PartType } from "../../types";

type NavigationProp = NativeStackNavigationProp<CategoriesStackParamList>;
type RouteProps = RouteProp<CategoriesStackParamList, "PartTypeSelection">;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 3; // 3 columns

const PartTypeSelectionScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();
    const { category } = route.params;

    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [loading, setLoading] = useState(true);

    // Still need vehicle info if available in context or previous params, but let's simplify for now
    // Assuming this screen is filtered by category only mostly

    useEffect(() => {
        const fetchPartTypes = async () => {
            try {
                const response = await ApiService.getPartTypes(
                    category.id.toString()
                );
                const data = Array.isArray(response)
                    ? response
                    : response.data || [];
                setPartTypes(data);
            } catch (error) {
                console.log("Failed to load part types");
            } finally {
                setLoading(false);
            }
        };
        fetchPartTypes();
    }, [category.id]);

    const renderItem = ({ item }: { item: PartType }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.navigate("SearchResults", {
                    filters: {
                        // Pass partial filters, user can refine later
                        partName: item.name_ar,
                        // We might want to pass other IDs if available
                    },
                })
            }
            className="bg-white rounded-2xl mb-3 shadow-sm border border-gray-100 items-center overflow-hidden"
            style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.3 }}
        >
            <View className="w-full h-2/3 bg-gray-50 items-center justify-center p-2">
                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                ) : (
                    <Ionicons
                        name="hardware-chip-outline"
                        size={32}
                        color="#9ca3af"
                    />
                )}
            </View>

            <View className="flex-1 items-center justify-center p-1">
                <Text
                    className="text-gray-900 font-bold text-xs text-center"
                    numberOfLines={2}
                >
                    {item.name_ar}
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
                        {category.name_ar}
                    </Text>
                    <Text className="text-gray-500 text-right mt-1">
                        اختر القطعة
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
                    data={partTypes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 8,
                        paddingHorizontal: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20">
                            <Text className="text-gray-400">
                                لا توجد قطع في هذا القسم حالياً
                            </Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default PartTypeSelectionScreen;
