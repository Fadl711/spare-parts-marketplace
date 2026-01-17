import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CustomerHomeStackParamList } from "../../navigation/CustomerNavigator";
import { ApiService } from "../../services/api";
import { Part } from "../../types";
import { Ionicons } from "@expo/vector-icons";

type PartDetailsScreenNavigationProp = NativeStackNavigationProp<
  CustomerHomeStackParamList,
  "PartDetails"
>;

type PartDetailsScreenRouteProp = RouteProp<
  CustomerHomeStackParamList,
  "PartDetails"
>;

type Props = {
  navigation: PartDetailsScreenNavigationProp;
  route: PartDetailsScreenRouteProp;
};

const { width } = Dimensions.get("window");

const PartDetailsScreen = ({ navigation, route }: Props) => {
  const { partId } = route.params;
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Normalize images to string URLs
  const imageUrls: string[] = useMemo(() => {
    if (!part) return [];
    if (part.image_urls && part.image_urls.length > 0) return part.image_urls;
    if (part.imageUrls && part.imageUrls.length > 0) return part.imageUrls;
    if (part.images && part.images.length > 0)
      return part.images.map((img) => img.url);
    return [];
  }, [part]);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const response = await ApiService.getPartDetails(partId);
        // Handle different response structures gracefully
        const data = response.data || response;
        setPart(data);
      } catch (error) {
        console.error("Failed to load part details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartDetails();
  }, [partId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!part) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ color: "#6b7280", fontSize: 18 }}>
          القطعة غير موجودة
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 16, padding: 16 }}
        >
          <Text style={{ color: "#2563eb" }}>عودة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Safe access helpers
  const seller = part.seller || {};
  const category = part.category;
  const compatibleVehicles = part.vehicles || [];

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return (numPrice || 0).toLocaleString("ar-YE") + " ر.ي";
  };

  const handleCall = () => {
    // Try explicit phone field first, then phones array
    const phoneNumber =
      seller.phone ||
      (seller.phones && seller.phones.length > 0 ? seller.phones[0] : null);

    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      // alert("رقم الهاتف غير متوفر");
    }
  };

  const handleWhatsApp = () => {
    const whatsappNumber =
      seller.whatsapp ||
      seller.phone ||
      (seller.phones && seller.phones.length > 0 ? seller.phones[0] : null);

    if (whatsappNumber) {
      const message = encodeURIComponent(`مرحباً، أنا مهتم بـ: ${part.title}`);
      // Remove non-numeric characters for the link
      const phone = whatsappNumber.replace(/[^0-9]/g, "");

      const url = `whatsapp://send?phone=${phone}&text=${message}`;

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(`https://wa.me/${phone}?text=${message}`);
        }
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={{ backgroundColor: "white", position: "relative" }}>
          {imageUrls.length > 0 ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const index = Math.round(
                    e.nativeEvent.contentOffset.x / width
                  );
                  setActiveImageIndex(index);
                }}
              >
                {imageUrls.map((url: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    style={{ width, height: 300 }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>

              {/* Indicators */}
              {imageUrls.length > 1 && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 0,
                    right: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {imageUrls.map((_: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor:
                          index === activeImageIndex ? "#2563eb" : "white",
                      }}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View
              style={{
                width,
                height: 300,
                backgroundColor: "#f3f4f6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="image-outline" size={64} color="#ccc" />
              <Text style={{ color: "#9ca3af", marginTop: 8 }}>
                لا توجد صور
              </Text>
            </View>
          )}

          {/* Back Button Overlay */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: Platform.OS === "ios" ? 16 : 16,
              left: 16,
              backgroundColor: "rgba(255,255,255,0.8)",
              padding: 8,
              borderRadius: 9999,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Part Info */}
        <View
          style={{
            backgroundColor: "white",
            marginTop: 8,
            paddingHorizontal: 24,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: "#111827",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 12,
              textAlign: "right",
            }}
          >
            {part.title || "بدون عنوان"}
          </Text>
          <Text
            style={{
              color: "#2563eb",
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "right",
            }}
          >
            {formatPrice(part.price)}
          </Text>

          {/* Description */}
          <Text
            style={{
              color: "#374151",
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 16,
              textAlign: "right",
            }}
          >
            {part.description || "لا يوجد وصف"}
          </Text>

          {/* Badges */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 16,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 9999,
                marginLeft: 8,
                marginBottom: 8,
                backgroundColor:
                  part.condition === "new" ? "#dcfce7" : "#fef9c3",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color:
                    part.condition === "new" || part.status === "new"
                      ? "#15803d"
                      : "#a16207",
                }}
              >
                {part.condition === "new" || part.status === "new"
                  ? "✨ جديد"
                  : "🔧 مستعمل"}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 9999,
                marginLeft: 8,
                marginBottom: 8,
                backgroundColor:
                  part.quality === "original" ? "#dbeafe" : "#f3e8ff",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: part.quality === "original" ? "#1d4ed8" : "#7e22ce",
                }}
              >
                {part.quality === "original" ? "🏆 أصلي" : "💼 تجاري"}
              </Text>
            </View>
          </View>
        </View>

        {/* Specifications */}
        <View
          style={{
            backgroundColor: "white",
            marginTop: 8,
            paddingHorizontal: 24,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: "#111827",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "right",
            }}
          >
            المواصفات
          </Text>
          <View>
            {part.partNumber && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f3f4f6",
                }}
              >
                <Text style={{ color: "#374151" }}>{part.partNumber}</Text>
                <Text style={{ color: "#6b7280" }}>رقم القطعة</Text>
              </View>
            )}
            {category && category.name_ar && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f3f4f6",
                }}
              >
                <Text style={{ color: "#374151" }}>{category.name_ar}</Text>
                <Text style={{ color: "#6b7280" }}>الفئة</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#f3f4f6",
              }}
            >
              <Text style={{ color: "#374151" }}>{part.views || 0} مشاهدة</Text>
              <Text style={{ color: "#6b7280" }}>المشاهدات</Text>
            </View>
          </View>
        </View>

        {/* Compatible Vehicles */}
        {compatibleVehicles.length > 0 && (
          <View
            style={{
              backgroundColor: "white",
              marginTop: 8,
              paddingHorizontal: 24,
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                color: "#111827",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
                textAlign: "right",
              }}
            >
              مناسب لـ
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {compatibleVehicles.map((vehicle, index) => {
                // Handle both string and object formats
                const isString = typeof vehicle === "string";
                const displayText = isString
                  ? vehicle
                  : `${vehicle.make} ${vehicle.model}`;
                const yearText = isString
                  ? null
                  : `${vehicle.year_from} - ${vehicle.year_to}`;

                return (
                  <View
                    key={isString ? index : vehicle.id}
                    style={{
                      backgroundColor: "#eff6ff",
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 8,
                      marginLeft: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1e40af",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {displayText}
                    </Text>
                    {yearText && (
                      <Text
                        style={{
                          color: "#2563eb",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {yearText}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Seller Info */}
        {seller && seller.store_name && (
          <View
            style={{
              backgroundColor: "white",
              marginTop: 8,
              paddingHorizontal: 24,
              paddingVertical: 20,
              marginBottom: 96,
            }}
          >
            <Text
              style={{
                color: "#111827",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
                textAlign: "right",
              }}
            >
              معلومات البائع
            </Text>
            <View
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {seller.is_approved && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10b981"
                    />
                  )}
                </View>
                <Text
                  style={{ color: "#111827", fontSize: 18, fontWeight: "bold" }}
                >
                  {seller.store_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Text
                    style={{ color: "#4b5563", fontSize: 14, marginLeft: 4 }}
                  >
                    ({seller.total_parts || 0})
                  </Text>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text
                    style={{
                      color: "#374151",
                      fontWeight: "600",
                      marginLeft: 4,
                    }}
                  >
                    {seller.rating ? seller.rating.toFixed(1) : "5.0"}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ color: "#4b5563", fontSize: 14, marginRight: 4 }}
                  >
                    {seller.location?.city || "غير محدد"}
                  </Text>
                  <Ionicons name="location" size={16} color="#6b7280" />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Action Bar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#16a34a",
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleCall}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 8 }}>
            اتصال
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#10b981",
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 8 }}>
            واتساب
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PartDetailsScreen;
