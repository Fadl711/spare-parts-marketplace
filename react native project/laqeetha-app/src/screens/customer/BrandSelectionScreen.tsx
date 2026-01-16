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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
import { Vehicle } from "../../types";

type NavigationProp = NativeStackNavigationProp<CategoriesStackParamList>;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const BrandSelectionScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    // Load Vehicles from API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await ApiService.getVehicles();
                // Assuming API returns { data: [...] } structure
                const data = response.data || response;
                setVehicles(data);
            } catch (error) {
                console.log(
                    "Failed to load vehicles, falling back to empty or cached"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    // Group vehicles by make to show unique brands
    const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.make))).map(
        (make) => vehicles.find((v) => v.make === make)!
    );

    const renderItem = ({ item }: { item: Vehicle }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.navigate("CategorySelection", {
                    make: item.make,
                    model: item.model,
                })
            }
            className="bg-white rounded-3xl mb-4 shadow-sm border border-gray-100 items-center justify-between overflow-hidden"
            style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.2 }}
        >
            <View className="w-full p-4 items-end">
                {/* Brand Logo Placeholder */}
                <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                    <Text className="text-xs font-bold">
                        {item.make.charAt(0)}
                    </Text>
                </View>
            </View>

            {/* Car Image Placeholder */}
            <View className="items-center justify-center w-full h-32 z-10">
                {/* If vehicle has type property we could use it for icon */}
                <Text className="text-4xl">🚗</Text>
            </View>

            {/* Brand Name */}
            <View className="w-full bg-gray-50 py-3 items-center z-0">
                <Text className="text-gray-900 font-bold text-lg">
                    {item.make}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
            <View className="px-6 pt-6 pb-4">
                <Text className="text-2xl font-bold text-gray-900 text-right">
                    اختر سيارتك
                </Text>
                <Text className="text-gray-500 text-right mt-1">
                    ابحث عن قطع الغيار المناسبة
                </Text>
            </View>

            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0284c7" />
                </View>
            ) : (
                <FlatList
                    data={uniqueBrands}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.make}
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

export default BrandSelectionScreen;
