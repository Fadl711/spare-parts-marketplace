import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ApiService, SellerPartsService } from "../../services/api";
import { Part } from "../../types";

type AddPartRouteProp = RouteProp<{ params: { partId?: string } }, "params">;

const AddPartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AddPartRouteProp>();
    const partId = route.params?.partId;
    const isEditing = !!partId;

    // Form State
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState<"new" | "used">("new");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]); // Strings to numbers if needed

    // Data State
    const [categories, setCategories] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Mock Image State
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        // Fetch initial data
        const initData = async () => {
            try {
                const [catsRes, vehiclesRes] = await Promise.all([
                    ApiService.getCategories(),
                    ApiService.getVehicles(),
                ]);

                const catsData = Array.isArray(catsRes)
                    ? catsRes
                    : catsRes.data || [];
                setCategories(catsData);
                if (catsData.length > 0 && !categoryId) {
                    setCategoryId(catsData[0].id);
                }

                const vehsData = Array.isArray(vehiclesRes)
                    ? vehiclesRes
                    : vehiclesRes.data || [];
                setVehicles(vehsData);
            } catch (e) {
                console.error("Failed to load metadata", e);
                Alert.alert("خطأ", "فشل تحميل البيانات");
            }
        };
        initData();
    }, []);

    useEffect(() => {
        if (isEditing && partId) {
            const fetchPart = async () => {
                try {
                    const response = await SellerPartsService.getPartDetails(
                        Number(partId)
                    );
                    const part = response.data;
                    // part structure dependent on API response. Assuming standard Part interface.
                    if (part) {
                        setTitle(part.title);
                        setPrice(part.price.toString());
                        setDescription(part.description);
                        setCondition(part.status || part.condition || "new");
                        setCategoryId(part.category_id || part.categoryId);
                        // Compatible vehicles handling depends on API return (array of objects or ids)
                        // setSelectedVehicles(part.compatibleVehicleIds);
                        // setImages(part.imageUrls);
                        navigation.setOptions({ title: "تعديل قطعة" });
                    }
                } catch (e) {
                    Alert.alert("خطأ", "فشل تحميل تفاصيل القطعة");
                    navigation.goBack();
                }
            };
            fetchPart();
        }
    }, [partId, isEditing]);

    const handleSave = async () => {
        if (!title || !price || !description || !categoryId) {
            Alert.alert("تنبيه", "يرجى تعبئة جميع الحقول المطلوبة");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category_id", categoryId.toString());
            formData.append("status", condition); // or condition based on backend
            formData.append("quality", "original"); // Default
            formData.append("stock", "1");

            // Handle vehicles
            selectedVehicles.forEach((vid, index) => {
                formData.append(
                    `compatible_vehicles[${index}]`,
                    vid.toString()
                );
            });

            // Handle images - Currently backend might require file uploads.
            // Since we don't have image picker, we can't append 'images[]' easily.
            // We might fail here if images are required.

            if (isEditing) {
                await SellerPartsService.updatePart(Number(partId), {
                    title,
                    description,
                    price,
                    category_id: categoryId,
                    status: condition,
                    // JSON for update usually
                });
                Alert.alert("تم الحفظ", "تم تحديث بيانات القطعة بنجاح", [
                    { text: "حسناً", onPress: () => navigation.goBack() },
                ]);
            } else {
                await SellerPartsService.createPart(formData);
                Alert.alert("تم النشر", "تم إضافة القطعة بنجاح", [
                    { text: "حسناً", onPress: () => navigation.goBack() },
                ]);
            }
        } catch (error: any) {
            console.error("Save part error", error);
            const msg = error.response?.data?.message || "فشل حفظ القطعة";
            Alert.alert("خطأ", msg);
        } finally {
            setLoading(false);
        }
    };

    const toggleVehicle = (vehicleId: number) => {
        if (selectedVehicles.includes(vehicleId)) {
            setSelectedVehicles(
                selectedVehicles.filter((id) => id !== vehicleId)
            );
        } else {
            setSelectedVehicles([...selectedVehicles, vehicleId]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
            {/* Header */}
            <View className="bg-white p-4 flex-row items-center justify-between shadow-sm border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2"
                >
                    <Ionicons name="arrow-forward" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-800">
                    {isEditing ? "تعديل قطعة" : "إضافة قطعة جديدة"}
                </Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Images Section */}
                <View className="mb-6">
                    <Text className="text-right text-gray-700 font-semibold mb-2">
                        صور القطعة
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row"
                    >
                        <TouchableOpacity
                            className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center mr-3"
                            onPress={() =>
                                Alert.alert(
                                    "قريباً",
                                    "سيتم تفعيل رفع الصور في التحديث القادم"
                                )
                            }
                        >
                            <Ionicons name="camera" size={32} color="#9CA3AF" />
                            <Text className="text-xs text-gray-500 mt-1">
                                أضف صورة
                            </Text>
                        </TouchableOpacity>
                        {images.map((url, index) => (
                            <Image
                                key={index}
                                source={{ uri: url }}
                                className="w-24 h-24 rounded-xl mr-3 bg-gray-200"
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Basic Info */}
                <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
                    <Text className="text-right text-lg font-bold text-gray-800 mb-4">
                        معلومات أساسية
                    </Text>

                    <View className="mb-4">
                        <Text className="text-right text-gray-600 mb-1">
                            اسم القطعة *
                        </Text>
                        <TextInput
                            className="bg-gray-50 p-3 rounded-lg text-right border border-gray-200"
                            placeholder="مثال: محرك تويوتا كورولا"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-right text-gray-600 mb-1">
                            السعر (ريال يمني) *
                        </Text>
                        <TextInput
                            className="bg-gray-50 p-3 rounded-lg text-right border border-gray-200"
                            placeholder="0"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-right text-gray-600 mb-1">
                            الحالة
                        </Text>
                        <View className="flex-row justify-end gap-2">
                            <TouchableOpacity
                                onPress={() => setCondition("used")}
                                className={`px-6 py-2 rounded-full border ${
                                    condition === "used"
                                        ? "bg-blue-600 border-blue-600"
                                        : "bg-white border-gray-300"
                                }`}
                            >
                                <Text
                                    className={
                                        condition === "used"
                                            ? "text-white"
                                            : "text-gray-600"
                                    }
                                >
                                    مستعمل
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setCondition("new")}
                                className={`px-6 py-2 rounded-full border ${
                                    condition === "new"
                                        ? "bg-green-600 border-green-600"
                                        : "bg-white border-gray-300"
                                }`}
                            >
                                <Text
                                    className={
                                        condition === "new"
                                            ? "text-white"
                                            : "text-gray-600"
                                    }
                                >
                                    جديد
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Category & Compatibility */}
                <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
                    <Text className="text-right text-lg font-bold text-gray-800 mb-4">
                        التصنيف والتوافق
                    </Text>

                    <View className="mb-4">
                        <Text className="text-right text-gray-600 mb-2">
                            القسم
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row-reverse"
                        >
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => setCategoryId(cat.id)}
                                    className={`ml-2 px-4 py-2 rounded-lg border ${
                                        categoryId === cat.id
                                            ? "bg-purple-100 border-purple-500"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    <Text
                                        className={
                                            categoryId === cat.id
                                                ? "text-purple-700 font-semibold"
                                                : "text-gray-600"
                                        }
                                    >
                                        {cat.name_ar}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="mb-4">
                        <Text className="text-right text-gray-600 mb-2">
                            السيارات المتوافقة
                        </Text>
                        <View className="flex-row flex-wrap justify-end gap-2">
                            {vehicles.slice(0, 15).map((vehicle) => (
                                <TouchableOpacity
                                    key={vehicle.id}
                                    onPress={() => toggleVehicle(vehicle.id)}
                                    className={`px-3 py-1.5 rounded-md border mb-2 ${
                                        selectedVehicles.includes(vehicle.id)
                                            ? "bg-blue-50 border-blue-500"
                                            : "bg-white border-gray-200"
                                    }`}
                                >
                                    <Text
                                        className={`text-xs ${
                                            selectedVehicles.includes(
                                                vehicle.id
                                            )
                                                ? "text-blue-700"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {vehicle.make} {vehicle.model} (
                                        {vehicle.year_from || vehicle.yearFrom}-
                                        {vehicle.year_to || vehicle.yearTo})
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            {vehicles.length > 15 && (
                                <Text className="text-xs text-gray-400 mt-1">
                                    ...و {vehicles.length - 15} آخرين
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View className="bg-white p-4 rounded-xl shadow-sm mb-20">
                    <Text className="text-right text-lg font-bold text-gray-800 mb-4">
                        الوصف والتفاصيل
                    </Text>
                    <TextInput
                        className="bg-gray-50 p-3 rounded-lg text-right border border-gray-200 h-32 text-top"
                        placeholder="اكتب وصفاً دقيقاً للقطعة وحالتها..."
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg">
                <TouchableOpacity
                    className={`py-4 rounded-xl shadow-md ${
                        loading
                            ? "bg-purple-400"
                            : "bg-purple-600 active:bg-purple-700"
                    }`}
                    onPress={handleSave}
                    disabled={loading}
                >
                    <Text className="text-white text-center font-bold text-lg">
                        {loading
                            ? "جاري الحفظ..."
                            : isEditing
                            ? "حفظ التغييرات"
                            : "نشر القطعة"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddPartScreen;
