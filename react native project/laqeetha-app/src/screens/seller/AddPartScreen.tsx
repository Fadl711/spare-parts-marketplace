import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MOCK_CATEGORIES, MOCK_VEHICLES, addPart, getPartById, updatePart } from '../../data/mock';
import { Part } from '../../types';

type AddPartRouteProp = RouteProp<{ params: { partId?: string } }, 'params'>;

const AddPartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddPartRouteProp>();
  const partId = route.params?.partId;
  const isEditing = !!partId;

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('new');
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  
  // Mock Image State
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing && partId) {
      const part = getPartById(partId);
      if (part) {
        setTitle(part.title);
        setPrice(part.price.toString());
        setDescription(part.description);
        setCondition(part.condition);
        setCategoryId(part.categoryId);
        setSelectedVehicles(part.compatibleVehicleIds);
        setImages(part.imageUrls);
        navigation.setOptions({ title: 'تعديل قطعة' });
      }
    }
  }, [partId, isEditing]);

  const handleSave = () => {
    if (!title || !price || !description) {
      Alert.alert('تنبيه', 'يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }

    const partData: Part = {
      id: isEditing ? partId! : `p${Date.now()}`,
      title,
      description,
      price: Number(price),
      condition,
      quality: 'original', // Default for now
      categoryId,
      sellerId: 's1', // Current user
      compatibleVehicleIds: selectedVehicles,
      imageUrls: images.length > 0 ? images : ['https://picsum.photos/400/300'],
      stock: 1,
      views: 0,
      createdAt: isEditing ? getPartById(partId!)!.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEditing) {
      updatePart(partData);
      Alert.alert('تم الحفظ', 'تم تحديث بيانات القطعة بنجاح', [
        { text: 'حسناً', onPress: () => navigation.goBack() }
      ]);
    } else {
      addPart(partData);
      Alert.alert('تم النشر', 'تم إضافة القطعة بنجاح', [
        { text: 'حسناً', onPress: () => navigation.goBack() }
      ]);
    }
  };

  const toggleVehicle = (vehicleId: string) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    } else {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      {/* Header */}
      <View className="bg-white p-4 flex-row items-center justify-between shadow-sm border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-forward" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          {isEditing ? 'تعديل قطعة' : 'إضافة قطعة جديدة'}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Images Section */}
        <View className="mb-6">
          <Text className="text-right text-gray-700 font-semibold mb-2">صور القطعة</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <TouchableOpacity 
              className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center mr-3"
              onPress={() => Alert.alert('قريباً', 'سيتم تفعيل رفع الصور قريباً')}
            >
              <Ionicons name="camera" size={32} color="#9CA3AF" />
              <Text className="text-xs text-gray-500 mt-1">أضف صورة</Text>
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
          <Text className="text-right text-lg font-bold text-gray-800 mb-4">معلومات أساسية</Text>
          
          <View className="mb-4">
            <Text className="text-right text-gray-600 mb-1">اسم القطعة *</Text>
            <TextInput
              className="bg-gray-50 p-3 rounded-lg text-right border border-gray-200"
              placeholder="مثال: محرك تويوتا كورولا"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-4">
            <Text className="text-right text-gray-600 mb-1">السعر (ريال يمني) *</Text>
            <TextInput
              className="bg-gray-50 p-3 rounded-lg text-right border border-gray-200"
              placeholder="0"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View className="mb-4">
            <Text className="text-right text-gray-600 mb-1">الحالة</Text>
            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                onPress={() => setCondition('used')}
                className={`px-6 py-2 rounded-full border ${
                  condition === 'used' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                }`}
              >
                <Text className={condition === 'used' ? 'text-white' : 'text-gray-600'}>مستعمل</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCondition('new')}
                className={`px-6 py-2 rounded-full border ${
                  condition === 'new' ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'
                }`}
              >
                <Text className={condition === 'new' ? 'text-white' : 'text-gray-600'}>جديد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Category & Compatibility */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <Text className="text-right text-lg font-bold text-gray-800 mb-4">التصنيف والتوافق</Text>
          
          <View className="mb-4">
            <Text className="text-right text-gray-600 mb-2">القسم</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row-reverse">
              {MOCK_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategoryId(cat.id)}
                  className={`ml-2 px-4 py-2 rounded-lg border ${
                    categoryId === cat.id ? 'bg-purple-100 border-purple-500' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Text className={categoryId === cat.id ? 'text-purple-700 font-semibold' : 'text-gray-600'}>
                    {cat.nameAr}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="text-right text-gray-600 mb-2">السيارات المتوافقة</Text>
            <View className="flex-row flex-wrap justify-end gap-2">
              {MOCK_VEHICLES.map((vehicle) => (
                <TouchableOpacity
                  key={vehicle.id}
                  onPress={() => toggleVehicle(vehicle.id)}
                  className={`px-3 py-1.5 rounded-md border mb-2 ${
                    selectedVehicles.includes(vehicle.id) 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-xs ${
                    selectedVehicles.includes(vehicle.id) ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {vehicle.make} {vehicle.model} ({vehicle.yearFrom}-{vehicle.yearTo})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-20">
          <Text className="text-right text-lg font-bold text-gray-800 mb-4">الوصف والتفاصيل</Text>
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
          className="bg-purple-600 py-4 rounded-xl shadow-md active:bg-purple-700"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isEditing ? 'حفظ التغييرات' : 'نشر القطعة'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddPartScreen;
