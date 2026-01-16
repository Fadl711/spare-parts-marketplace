import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SellerStackParamList } from "../../navigation/SellerNavigator";
import { SellerPartsService } from "../../services/api";
import { Part } from "../../types";

type NavigationProp = NativeStackNavigationProp<SellerStackParamList>;

const ProductsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [products, setProducts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchParts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await SellerPartsService.getParts();
            // Ensure we handle paginated response structure safely
            const partsData = Array.isArray(response)
                ? response
                : response.data || [];
            setProducts(partsData);
        } catch (error) {
            console.error("Error fetching seller parts:", error);
            Alert.alert("خطأ", "فشل تحميل المنتجات");
        } finally {
            setLoading(false);
        }
    }, []);

    // Refresh data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchParts();
        }, [fetchParts])
    );

    const handleDelete = (id: number) => {
        Alert.alert("حذف المنتج", "هل أنت متأكد من رغبتك في حذف هذا المنتج؟", [
            { text: "إلغاء", style: "cancel" },
            {
                text: "حذف",
                style: "destructive",
                onPress: async () => {
                    try {
                        await SellerPartsService.deletePart(id);
                        fetchParts(); // Refresh list
                        Alert.alert("نجح", "تم حذف المنتج بنجاح");
                    } catch (error) {
                        console.error("Delete error:", error);
                        Alert.alert("خطأ", "فشل حذف المنتج");
                    }
                },
            },
        ]);
    };

    const handleEdit = (id: number) => {
        navigation.navigate("AddPart", { partId: id.toString() });
    };

    const renderItem = ({ item }: { item: Part }) => (
        <View className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100">
            <View className="flex-row p-3">
                {/* Actions */}
                <View className="justify-between pl-3 border-l border-gray-100 ml-3">
                    <TouchableOpacity
                        onPress={() => handleEdit(item.id)}
                        className="bg-blue-50 p-2 rounded-lg"
                    >
                        <Ionicons
                            name="create-outline"
                            size={20}
                            color="#2563eb"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        className="bg-red-50 p-2 rounded-lg"
                    >
                        <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#dc2626"
                        />
                    </TouchableOpacity>
                </View>

                {/* Info */}
                <View className="flex-1 items-end pr-3">
                    <Text
                        className="text-gray-900 font-bold text-base mb-1 text-right"
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <Text className="text-purple-600 font-bold text-lg mb-1">
                        {item.price.toLocaleString()} ر.ي
                    </Text>
                    <View className="flex-row items-center justify-end gap-2">
                        <View
                            className={`px-2 py-0.5 rounded text-xs ${
                                item.status === "new"
                                    ? "bg-green-100"
                                    : "bg-orange-100"
                            }`}
                        >
                            <Text
                                className={`${
                                    item.status === "new"
                                        ? "text-green-700"
                                        : "text-orange-700"
                                } text-xs`}
                            >
                                {item.status === "new" ? "جديد" : "مستعمل"}
                            </Text>
                        </View>
                        <Text className="text-gray-400 text-xs">
                            {new Date(item.created_at).toLocaleDateString(
                                "ar-EG"
                            )}
                        </Text>
                    </View>
                </View>

                {/* Image */}
                <Image
                    source={{
                        uri:
                            item.images && item.images.length > 0
                                ? item.images[0].url
                                : item.imageUrls?.[0] ||
                                  "https://via.placeholder.com/150",
                    }}
                    className="w-24 h-24 rounded-lg bg-gray-200"
                    resizeMode="cover"
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
            <View className="p-4 border-b border-gray-200 bg-white flex-row justify-between items-center">
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddPart", {})}
                    className="bg-purple-600 px-4 py-2 rounded-lg flex-row items-center"
                >
                    <Ionicons name="add" size={20} color="white" />
                    <Text className="text-white font-bold ml-1">إضافة</Text>
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-800">
                    منتجاتي ({products.length})
                </Text>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#9333ea" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-20">
                            <Ionicons
                                name="cube-outline"
                                size={64}
                                color="#9ca3af"
                            />
                            <Text className="text-gray-500 text-lg mt-4 font-semibold">
                                لا توجد منتجات حالياً
                            </Text>
                            <Text className="text-gray-400 text-center mt-2 px-10">
                                قم بإضافة قطع الغيار الخاصة بك لتظهر للمشترين
                            </Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default ProductsScreen;
