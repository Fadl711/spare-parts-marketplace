import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerHomeStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
import { Part } from "../../types";

type NavigationProp = NativeStackNavigationProp<CustomerHomeStackParamList>;

const PartCard = ({ part, onPress }: { part: Part; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 flex-row overflow-hidden mx-4"
    >
        <Image
            source={{
                uri:
                    part.images && part.images.length > 0
                        ? part.images[0].url
                        : // @ts-ignore
                        part.imageUrls && part.imageUrls.length > 0
                        ? part.imageUrls[0]
                        : "https://via.placeholder.com/150",
            }}
            className="w-32 h-32"
            resizeMode="cover"
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
                            part.status === "new"
                                ? "text-green-700"
                                : "text-yellow-700"
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

const FavoritesScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [favorites, setFavorites] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadFavorites = async () => {
        try {
            const response = await ApiService.getFavorites();
            // Favorites API returns { data: [...] } structure
            // Adjust based on actual response structure
            const parts = response.data.map((fav: any) => fav.part || fav);
            setFavorites(parts);
        } catch (error) {
            console.log("Error loading favorites");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadFavorites();
    };

    if (loading && !refreshing) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0284c7" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-row justify-between items-center px-4 py-4 bg-white border-b border-gray-100 mb-2">
                <Text className="text-xl font-bold text-gray-800">المفضلة</Text>
                <Ionicons name="heart" size={24} color="#ef4444" />
            </View>

            {favorites.length === 0 ? (
                <View className="flex-1 items-center justify-center px-6">
                    <Ionicons name="heart-outline" size={80} color="#d1d5db" />
                    <Text className="text-gray-700 text-xl font-bold mt-6 text-center">
                        قائمة المفضلة فارغة
                    </Text>
                    <Text className="text-gray-500 text-center mt-2 mb-8">
                        تصفح المنتجات واضغط على القلب لحفظها هنا
                    </Text>
                    <TouchableOpacity
                        className="bg-blue-600 px-6 py-3 rounded-xl"
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text className="text-white font-bold">
                            تصفح المنتجات
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PartCard
                            part={item}
                            onPress={() =>
                                navigation.navigate("PartDetails", {
                                    partId: item.id,
                                })
                            }
                        />
                    )}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0284c7"]}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default FavoritesScreen;
