import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerHomeStackParamList } from '../../navigation/CustomerNavigator';
import { MOCK_VEHICLES, MOCK_CATEGORIES, MOCK_PARTS } from '../../data/mock';

type NavigationProp = NativeStackNavigationProp<CustomerHomeStackParamList>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderHeader = () => (
    <View className="bg-white px-4 pb-4 pt-2">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <TouchableOpacity className="bg-gray-50 p-2 rounded-full ml-3">
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-50 p-2 rounded-full">
            <Ionicons name="cart-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-gray-500 text-xs text-right">مرحباً بك 👋</Text>
          <Text className="text-gray-900 font-bold text-lg text-right">ابحث عن قطع غيارك</Text>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SearchResults', { filters: {} })}
        className="bg-gray-100 flex-row items-center px-4 py-3 rounded-xl"
      >
        <Ionicons name="search" size={20} color="#9ca3af" />
        <Text className="text-gray-400 ml-2 text-right flex-1">ابحث عن قطعة، رقم، أو سيارة...</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeroBanner = () => (
    <View className="px-4 mt-4">
      <View className="bg-blue-600 rounded-2xl p-5 overflow-hidden relative h-40 justify-center">
        <View className="z-10 w-2/3">
          <Text className="text-white font-bold text-2xl mb-2 text-right">عروض نهاية العام</Text>
          <Text className="text-blue-100 text-right mb-3">خصم يصل إلى 50% على قطع الغيار الأصلية</Text>
          <TouchableOpacity className="bg-white self-end px-4 py-2 rounded-lg">
            <Text className="text-blue-600 font-bold text-xs">تسوق الآن</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={{ uri: 'https://www.pngmart.com/files/22/Car-Engine-PNG-Transparent.png' }}
          className="absolute -left-4 w-40 h-40 opacity-90"
          resizeMode="contain"
        />
      </View>
    </View>
  );

  const renderBrands = () => {
    // Unique brands
    const uniqueBrands = Array.from(new Set(MOCK_VEHICLES.map(v => v.make)))
      .map(make => MOCK_VEHICLES.find(v => v.make === make)!);

    return (
      <View className="mt-6">
        <View className="flex-row justify-between items-center px-4 mb-3">
          <TouchableOpacity>
            <Text className="text-blue-600 text-xs font-bold">عرض الكل</Text>
          </TouchableOpacity>
          <Text className="text-gray-900 font-bold text-lg">تسوق حسب الماركة</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, flexDirection: 'row-reverse' }}>
          {uniqueBrands.map((brand) => (
            <TouchableOpacity 
              key={brand.id}
              className="items-center mr-4 ml-2"
              onPress={() => navigation.navigate('SearchResults', { filters: { make: brand.make } })}
            >
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 mb-2">
                <Image source={{ uri: brand.logoUrl }} className="w-10 h-10" resizeMode="contain" />
              </View>
              <Text className="text-gray-700 text-xs font-medium">{brand.make}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderCategories = () => (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <TouchableOpacity>
          <Text className="text-blue-600 text-xs font-bold">عرض الكل</Text>
        </TouchableOpacity>
        <Text className="text-gray-900 font-bold text-lg">الأقسام الشائعة</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, flexDirection: 'row-reverse' }}>
        {MOCK_CATEGORIES.slice(0, 5).map((cat) => (
          <TouchableOpacity 
            key={cat.id}
            className="mr-3 ml-1 w-28"
            onPress={() => navigation.navigate('SearchResults', { filters: {} })} // Ideally filter by category
          >
            <View className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 h-28 justify-between items-center">
              <Image source={{ uri: cat.imageUrl }} className="w-16 h-16" resizeMode="contain" />
              <Text className="text-gray-800 text-xs font-bold text-center mt-2">{cat.nameAr}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedProducts = () => (
    <View className="mt-6 mb-8 px-4">
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity>
          <Text className="text-blue-600 text-xs font-bold">عرض الكل</Text>
        </TouchableOpacity>
        <Text className="text-gray-900 font-bold text-lg">وصل حديثاً</Text>
      </View>
      
      <View className="flex-row flex-wrap justify-between" style={{ direction: 'rtl' }}>
        {MOCK_PARTS.slice(0, 4).map((part) => (
          <TouchableOpacity 
            key={part.id}
            className="bg-white w-[48%] rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
            onPress={() => navigation.navigate('PartDetails', { partId: part.id })}
          >
            <Image 
              source={{ uri: part.imageUrls[0] }} 
              className="w-full h-32 bg-gray-50" 
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-gray-900 font-bold text-sm text-right mb-1" numberOfLines={1}>{part.title}</Text>
              <Text className="text-purple-600 font-bold text-base text-right">{part.price.toLocaleString()} ر.ي</Text>
              <View className="flex-row justify-end mt-2">
                <View className={`px-2 py-0.5 rounded text-[10px] ${part.condition === 'new' ? 'bg-green-100' : 'bg-orange-100'}`}>
                  <Text className={`${part.condition === 'new' ? 'text-green-700' : 'text-orange-700'} text-[10px]`}>
                    {part.condition === 'new' ? 'جديد' : 'مستعمل'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderHeroBanner()}
        {renderBrands()}
        {renderCategories()}
        {renderFeaturedProducts()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
