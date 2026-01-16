import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ApiService, OrdersService } from "../../services/api"; // Access OrdersService
import { Part } from "../../types";

// Define Order Type based on API resource
interface Order {
    id: number;
    part: Part;
    status: string;
    delivery_address: string;
    created_at: string;
    total_price: number;
}

const OrdersScreen = () => {
    const navigation = useNavigation<any>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            // Assuming OrdersService.getOrders returns { data: Order[] } or similar
            const response = await OrdersService.getOrders();
            const data = Array.isArray(response)
                ? response
                : response.data || [];
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // Optionally show alert
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100";
            case "pending":
                return "text-yellow-600 bg-yellow-100";
            case "cancelled":
                return "text-red-600 bg-red-100";
            case "processing":
                return "text-blue-600 bg-blue-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "مكتمل";
            case "pending":
                return "قيد الانتظار";
            case "cancelled":
                return "ملغي";
            case "processing":
                return "قيد التنفيذ";
            default:
                return status;
        }
    };

    const renderOrderItem = ({ item }: { item: Order }) => (
        <TouchableOpacity
            className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
            onPress={() => {
                // Navigate to Order Details if implemented, or Part Details
                if (item.part?.id) {
                    navigation.navigate("PartDetails", {
                        partId: item.part.id,
                    });
                }
            }}
        >
            <View className="flex-row">
                <Image
                    source={{
                        uri:
                            item.part?.images && item.part.images.length > 0
                                ? item.part.images[0].url
                                : "https://via.placeholder.com/150",
                    }}
                    className="w-20 h-20 rounded-lg bg-gray-200"
                />
                <View className="flex-1 mr-3 items-end">
                    <View className="flex-row justify-between w-full mb-1">
                        <Text className="text-gray-500 text-xs">
                            #{item.id}
                        </Text>
                        <Text
                            className="text-gray-800 font-bold text-right flex-1 ml-2"
                            numberOfLines={1}
                        >
                            {item.part?.title || "قطعة غير متوفرة"}
                        </Text>
                    </View>

                    <View
                        className={`px-2 py-1 rounded-md mb-2 ${
                            getStatusColor(item.status).split(" ")[1]
                        }`}
                    >
                        <Text
                            className={`text-xs font-semibold ${
                                getStatusColor(item.status).split(" ")[0]
                            }`}
                        >
                            {getStatusText(item.status)}
                        </Text>
                    </View>

                    <Text className="text-blue-600 font-bold">
                        {item.total_price?.toLocaleString() ||
                            item.part?.price?.toLocaleString()}{" "}
                        ر.ي
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                        {new Date(item.created_at).toLocaleDateString("ar-SA")}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
            <View className="px-4 py-3 bg-white border-b border-gray-100 flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2"
                >
                    <Ionicons name="arrow-forward" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800 flex-1 text-center mr-8">
                    طلباتي
                </Text>
            </View>

            {loading && !refreshing ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0284c7" />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0284c7"]}
                        />
                    }
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-20">
                            <Ionicons
                                name="receipt-outline"
                                size={64}
                                color="#d1d5db"
                            />
                            <Text className="text-gray-500 mt-4 text-lg font-semibold">
                                لا توجد طلبات حتى الآن
                            </Text>
                            <Text className="text-gray-400 text-center mt-2 px-8">
                                يمكنك تصفح القطع وطلب ما تحتاجه لسيارتك
                            </Text>
                            <TouchableOpacity
                                className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
                                onPress={() => navigation.navigate("Home")}
                            >
                                <Text className="text-white font-bold">
                                    تصفح المنتجات
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default OrdersScreen;
