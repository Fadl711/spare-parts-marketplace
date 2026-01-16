import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { AuthService } from "../services/api";

const LoginScreen = () => {
    // Correctly calling the hook at the top level
    const { login, register, loading: authLoading } = useAuth();

    const [userType, setUserType] = useState<"customer" | "seller">("customer");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    // Login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Register form
    const [name, setName] = useState(""); // Acts as owner_name for seller
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // Seller specific
    const [storeName, setStoreName] = useState("");
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation();

    // Helper to extract error messages
    const getErrorMessage = (error: any) => {
        if (error.response) {
            const data = error.response.data;
            if (data.errors) {
                // Return first error from validation array
                const firstErrorKey = Object.keys(data.errors)[0];
                if (firstErrorKey && data.errors[firstErrorKey].length > 0) {
                    return data.errors[firstErrorKey][0];
                }
            }
            return data.message || "حدث خطأ غير متوقع.";
        }
        return error.message || "فشل الاتصال بالخادم. تحقق من الإنترنت.";
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("خطأ", "الرجاء إدخال البريد الإلكتروني وكلمة المرور");
            return;
        }

        try {
            setLoading(true);
            // Use unified login from AuthContext for both customer and seller
            await login(email, password, userType);

            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                // If can't go back, maybe navigating from a deeply nested state or initial launch
                // But usually goBack is correct for a modal.
            }
        } catch (error: any) {
            console.error("Login error:", error);
            const message = getErrorMessage(error);
            Alert.alert("فشل تسجيل الدخول", message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        // Basic validation
        if (!name || !email || !password || !passwordConfirm || !phone) {
            Alert.alert("خطأ", "الرجاء ملء جميع الحقول المطلوبة");
            return;
        }

        if (password !== passwordConfirm) {
            Alert.alert("خطأ", "كلمة المرور غير متطابقة");
            return;
        }

        if (password.length < 8) {
            Alert.alert("خطأ", "كلمة المرور يجب أن تكون 8 أحرف على الأقل");
            return;
        }

        if (userType === "seller") {
            if (!storeName || !city || !district || !address) {
                Alert.alert("خطأ", "الرجاء ملء بيانات المتجر والعنوان");
                return;
            }
        }

        try {
            setLoading(true);

            if (userType === "customer") {
                await register(
                    {
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirm,
                        phone,
                        city,
                    },
                    "customer"
                );
            } else {
                await register(
                    {
                        store_name: storeName,
                        owner_name: name,
                        phone,
                        email,
                        password,
                        password_confirmation: passwordConfirm,
                        city,
                        district,
                        address,
                    },
                    "seller"
                );
            }

            Alert.alert("نجح!", "تم إنشاء الحساب بنجاح", [
                {
                    text: "موافق",
                    // For seller, usually requires approval, check backend logic.
                    // Assuming direct login or "wait for approval" based on backend.
                    onPress: () =>
                        navigation.canGoBack() && navigation.goBack(),
                },
            ]);
        } catch (error: any) {
            console.error("Register error:", error);
            const message = getErrorMessage(error);
            Alert.alert("فشل إنشاء الحساب", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                >
                    {/* Header */}
                    <View className="px-6 pt-8 pb-6">
                        <Text className="text-4xl font-bold text-gray-900 text-right mb-2">
                            {isLogin ? "مرحباً بعودتك 👋" : "حساب جديد 🎉"}
                        </Text>
                        <Text className="text-gray-500 text-right mb-6">
                            {isLogin
                                ? "سجل دخولك للمتابعة"
                                : "أنشئ حساباً للبدء"}
                        </Text>

                        {/* Type Switcher */}
                        <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
                            <TouchableOpacity
                                className={`flex-1 py-3 rounded-lg ${
                                    userType === "seller"
                                        ? "bg-white shadow-sm"
                                        : ""
                                }`}
                                onPress={() => setUserType("seller")}
                            >
                                <Text
                                    className={`text-center font-bold ${
                                        userType === "seller"
                                            ? "text-purple-600"
                                            : "text-gray-500"
                                    }`}
                                >
                                    بائع 🏪
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`flex-1 py-3 rounded-lg ${
                                    userType === "customer"
                                        ? "bg-white shadow-sm"
                                        : ""
                                }`}
                                onPress={() => setUserType("customer")}
                            >
                                <Text
                                    className={`text-center font-bold ${
                                        userType === "customer"
                                            ? "text-blue-600"
                                            : "text-gray-500"
                                    }`}
                                >
                                    مشتري 🛒
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View className="px-6">
                        {!isLogin && (
                            <>
                                {userType === "seller" && (
                                    <View className="mb-4">
                                        <Text className="text-gray-700 text-right mb-2 font-medium">
                                            اسم المتجر
                                        </Text>
                                        <TextInput
                                            className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                            placeholder="اسم ورشتك أو محلك"
                                            value={storeName}
                                            onChangeText={setStoreName}
                                            textAlign="right"
                                        />
                                    </View>
                                )}

                                <View className="mb-4">
                                    <Text className="text-gray-700 text-right mb-2 font-medium">
                                        {userType === "seller"
                                            ? "اسم المالك"
                                            : "الاسم الكامل"}
                                    </Text>
                                    <TextInput
                                        className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                        placeholder="أدخل اسمك الكامل"
                                        value={name}
                                        onChangeText={setName}
                                        textAlign="right"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="text-gray-700 text-right mb-2 font-medium">
                                        رقم الجوال
                                    </Text>
                                    <TextInput
                                        className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                        placeholder="07XXXXXXXX"
                                        value={phone}
                                        onChangeText={setPhone}
                                        keyboardType="phone-pad"
                                        textAlign="right"
                                    />
                                </View>

                                {/* Common City for both but simpler to just show */}
                                <View className="mb-4">
                                    <Text className="text-gray-700 text-right mb-2 font-medium">
                                        المدينة
                                    </Text>
                                    <TextInput
                                        className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                        placeholder="صنعاء، عدن، تعز..."
                                        value={city}
                                        onChangeText={setCity}
                                        textAlign="right"
                                    />
                                </View>

                                {userType === "seller" && (
                                    <>
                                        <View className="mb-4">
                                            <Text className="text-gray-700 text-right mb-2 font-medium">
                                                المديرية
                                            </Text>
                                            <TextInput
                                                className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                                placeholder="المديرية"
                                                value={district}
                                                onChangeText={setDistrict}
                                                textAlign="right"
                                            />
                                        </View>
                                        <View className="mb-4">
                                            <Text className="text-gray-700 text-right mb-2 font-medium">
                                                العنوان التفصيلي
                                            </Text>
                                            <TextInput
                                                className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                                placeholder="الشارع، جوار معلم معروف..."
                                                value={address}
                                                onChangeText={setAddress}
                                                textAlign="right"
                                            />
                                        </View>
                                    </>
                                )}
                            </>
                        )}

                        <View className="mb-4">
                            <Text className="text-gray-700 text-right mb-2 font-medium">
                                البريد الإلكتروني
                            </Text>
                            <TextInput
                                className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                placeholder={
                                    userType === "customer"
                                        ? "test@customer.com"
                                        : "test@seller.com"
                                }
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textAlign="right"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 text-right mb-2 font-medium">
                                كلمة المرور
                            </Text>
                            <View className="relative">
                                <TextInput
                                    className="bg-gray-50 px-4 py-3 rounded-xl text-right pr-12"
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    textAlign="right"
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute left-4 top-3"
                                >
                                    <Ionicons
                                        name={
                                            showPassword
                                                ? "eye-off-outline"
                                                : "eye-outline"
                                        }
                                        size={22}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {!isLogin && (
                            <View className="mb-4">
                                <Text className="text-gray-700 text-right mb-2 font-medium">
                                    تأكيد كلمة المرور
                                </Text>
                                <TextInput
                                    className="bg-gray-50 px-4 py-3 rounded-xl text-right"
                                    placeholder="••••••••"
                                    value={passwordConfirm}
                                    onChangeText={setPasswordConfirm}
                                    secureTextEntry={!showPassword}
                                    textAlign="right"
                                />
                            </View>
                        )}

                        {isLogin && (
                            <TouchableOpacity className="self-end mb-6">
                                <Text className="text-blue-600 font-medium">
                                    نسيت كلمة المرور؟
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Submit Button */}
                        <TouchableOpacity
                            className={`py-4 rounded-xl items-center mt-2 ${
                                loading
                                    ? "bg-blue-400"
                                    : userType === "seller"
                                    ? "bg-purple-600"
                                    : "bg-blue-600"
                            }`}
                            onPress={isLogin ? handleLogin : handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white font-bold text-lg">
                                    {isLogin
                                        ? `تسجيل دخول ${
                                              userType === "customer"
                                                  ? "مشتري"
                                                  : "بائع"
                                          }`
                                        : "إنشاء الحساب"}
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Toggle Login/Register */}
                        <View className="flex-row items-center justify-center mt-6 mb-8">
                            <TouchableOpacity
                                onPress={() => setIsLogin(!isLogin)}
                            >
                                <Text
                                    className={`font-bold ${
                                        userType === "seller"
                                            ? "text-purple-600"
                                            : "text-blue-600"
                                    }`}
                                >
                                    {isLogin
                                        ? "إنشاء حساب جديد"
                                        : "تسجيل الدخول"}
                                </Text>
                            </TouchableOpacity>
                            <Text className="text-gray-600 ml-2">
                                {isLogin
                                    ? "ليس لديك حساب؟"
                                    : "لديك حساب بالفعل؟"}
                            </Text>
                        </View>
                    </View>

                    {/* Testing Credentials */}
                    <View className="px-6 pb-8">
                        <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <Text className="text-yellow-800 font-bold text-right mb-2">
                                🔑 بيانات تجريبية:
                            </Text>
                            {userType === "customer" ? (
                                <>
                                    <Text className="text-yellow-700 text-right text-sm">
                                        Customer: test@customer.com
                                    </Text>
                                    <Text className="text-yellow-700 text-right text-sm">
                                        Pass: password
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text className="text-yellow-700 text-right text-sm">
                                        Seller: test@seller.com
                                    </Text>
                                    <Text className="text-yellow-700 text-right text-sm">
                                        Pass: password
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
