# 🤖 AI Prompts - Customer Frontend Development

## 📋 Project Context Prompt

```
أنا أعمل على مشروع "لَقِيتَها" - منصة لبيع قطع غيار السيارات في اليمن.

**معلومات المشروع:**
- Laravel 12.39.0 Backend
- React Native (Expo) Mobile App
- قاعدة بيانات MySQL
- النظام يدعم العربية (RTL)

**ما تم إنجازه:**
✅ لوحة تحكم البائع (Filament) - مكتملة
✅ API للبيانات الأساسية - جاهز
✅ نظام المصادقة - جاهز
✅ قاعدة البيانات - جاهزة

**ما أريد العمل عليه:**
واجهة العميل (Customer Frontend) في تطبيق React Native

**الملفات المهمة:**
- Backend: `d:\laragon\www\spare-parts-marketplace`
- Mobile App: `d:\laragon\www\spare-parts-marketplace\mobile-app`
- API Routes: `routes/api.php`
- Models: `app/Models/`

**المتطلبات:**
- واجهة عربية جميلة (RTL)
- نظام بحث متقدم
- عرض المنتجات بشكل جذاب
- تصفية حسب الفئات والسيارات
- التواصل المباشر مع البائع (WhatsApp/Call)
```

---

## 🎯 Specific Task Prompts

### 1. Understanding the Project Structure

```
أحتاج فهم بنية المشروع الحالي:

**المطلوب:**
1. اشرح لي بنية قاعدة البيانات الحالية
2. ما هي الـ Models الموجودة وعلاقاتها؟
3. ما هي الـ API Endpoints المتاحة؟
4. كيف يعمل نظام المصادقة؟

**الملفات للمراجعة:**
- `database/migrations/`
- `app/Models/`
- `routes/api.php`
- `config/auth.php`

اعطني ملخص شامل بالعربية.
```

### 2. Setting Up Customer Frontend

```
أريد إعداد واجهة العميل في React Native:

**المتطلبات:**
1. إنشاء/تحديث الـ Navigation للعملاء
2. إعداد الـ API Client (Axios)
3. إنشاء Context للبيانات المشتركة
4. إعداد نظام الـ Theming (ألوان، خطوط عربية)

**المواصفات:**
- اللغة: العربية (RTL)
- الخط: Tajawal أو Cairo
- الألوان: أزرق وأخضر (حسب التصميم)
- الأيقونات: من @expo/vector-icons

**الملفات المطلوبة:**
- `mobile-app/src/navigation/CustomerNavigator.js`
- `mobile-app/src/services/api.js`
- `mobile-app/src/contexts/`
- `mobile-app/src/theme/`

ابدأ بإنشاء البنية الأساسية.
```

### 3. Home Screen Development

```
أريد تطوير الشاشة الرئيسية للعميل:

**المكونات المطلوبة:**
1. **Header:**
   - شريط بحث
   - أيقونة الإشعارات
   - أيقونة المفضلة

2. **Hero Section:**
   - Banner ترويجي (Carousel)
   - صور جذابة

3. **Categories Section:**
   - عرض الفئات الرئيسية
   - أيقونات مخصصة
   - Horizontal Scroll

4. **Featured Products:**
   - المنتجات المميزة
   - Grid Layout
   - صورة، اسم، سعر، حالة

5. **Shop by Brand:**
   - ماركات السيارات
   - Horizontal Scroll

**API Endpoints:**
- `GET /api/v1/categories`
- `GET /api/v1/parts?featured=true`
- `GET /api/v1/vehicles`

**التصميم:**
- Modern, Clean
- استخدام Shadows و Gradients
- Smooth Animations

أنشئ الشاشة بكود كامل وجاهز للاستخدام.
```

### 4. Search & Filter System

```
أريد نظام بحث وفلترة متقدم:

**الميزات المطلوبة:**

1. **Search Bar:**
   - بحث نصي في اسم القطعة
   - اقتراحات تلقائية (Autocomplete)
   - تاريخ البحث (Recent Searches)

2. **Filters:**
   - حسب الفئة (Category)
   - حسب السيارة (Make, Model, Year)
   - حسب الحالة (جديد/مستعمل/مجدد)
   - حسب الجودة (أصلي/تجاري/صيني)
   - حسب نطاق السعر (Price Range)
   - حسب المدينة (City)

3. **Sorting:**
   - الأحدث
   - الأقل سعراً
   - الأعلى سعراً
   - الأكثر مشاهدة

**API Endpoints:**
- `GET /api/v1/search?q={query}`
- `GET /api/v1/search/suggestions?q={query}`
- `GET /api/v1/parts?filters={json}`

**UI Components:**
- Modal للفلاتر
- Chips للفلاتر المختارة
- Clear All button

أنشئ:
1. `SearchScreen.js`
2. `FilterModal.js`
3. `SearchBar.js` component
4. `useSearch.js` custom hook
```

### 5. Product Listing & Details

```
أريد شاشات عرض المنتجات:

**1. Products List Screen:**
- Grid Layout (2 columns)
- Product Card:
  - صورة
  - اسم القطعة
  - السعر
  - Badge للحالة
  - Badge للجودة
  - أيقونة المفضلة
  - اسم البائع
  - المدينة
- Infinite Scroll / Pagination
- Pull to Refresh

**2. Product Details Screen:**
- Image Gallery (Swiper)
- اسم القطعة
- السعر (كبير وواضح)
- الحالة والجودة (Badges)
- الوصف الكامل
- السيارات المتوافقة (List)
- معلومات البائع:
  - اسم المتجر
  - الموقع
  - ساعات العمل
  - أزرار الاتصال (Call, WhatsApp)
- منتجات مشابهة

**API Endpoints:**
- `GET /api/v1/parts`
- `GET /api/v1/parts/{id}`
- `GET /api/v1/sellers/{id}/reviews`

**Components:**
- `ProductCard.js`
- `ProductListScreen.js`
- `ProductDetailsScreen.js`
- `ImageGallery.js`
- `SellerInfo.js`

أنشئ الشاشات كاملة مع التصميم.
```

### 6. Categories & Browse

```
أريد نظام تصفح حسب الفئات:

**الهيكل:**
1. Categories Screen (الفئات الرئيسية)
2. Subcategories Screen (الفئات الفرعية)
3. Standard Parts Screen (أنواع القطع)
4. Products by Part Screen (المنتجات)

**المثال:**
محرك → قطع المحرك → فلتر زيت → [قائمة منتجات فلتر الزيت]

**التصميم:**
- Grid Cards مع أيقونات
- عدد المنتجات في كل فئة
- Breadcrumb للتنقل
- Back navigation

**API:**
- `GET /api/v1/categories`
- `GET /api/v1/categories/{id}/subcategories`
- `GET /api/v1/subcategories/{id}/standard-parts`
- `GET /api/v1/parts?standard_part_id={id}`

أنشئ نظام التصفح الهرمي كاملاً.
```

### 7. Vehicle-Based Browse

```
أريد نظام تصفح حسب السيارة:

**الخطوات:**
1. اختر الماركة (Make) - مثال: Toyota
2. اختر الموديل (Model) - مثال: Corolla
3. اختر السنة (Year Range) - مثال: 2015-2020
4. عرض القطع المتوافقة

**UI:**
- Step-by-step wizard
- صور للسيارات
- بحث سريع
- حفظ السيارة المفضلة

**API:**
- `GET /api/v1/vehicles/makes`
- `GET /api/v1/vehicles/models?make={make}`
- `GET /api/v1/vehicles/years?make={make}&model={model}`
- `GET /api/v1/parts?vehicle_id={id}`

**Components:**
- `VehicleSelector.js`
- `MakesList.js`
- `ModelsList.js`
- `YearSelector.js`

أنشئ نظام اختيار السيارة التفاعلي.
```

### 8. Contact & Communication

````
أريد نظام التواصل مع البائع:

**الميزات:**
1. **Call Button:**
   - فتح تطبيق الهاتف مباشرة
   - عرض رقم الهاتف

2. **WhatsApp Button:**
   - فتح WhatsApp
   - رسالة جاهزة مع تفاصيل المنتج

3. **Seller Profile:**
   - معلومات المتجر
   - الموقع على الخريطة
   - ساعات العمل
   - التقييمات

**Implementation:**
```javascript
// WhatsApp
const message = `مرحباً، أنا مهتم بـ ${partName} بسعر ${price} ريال`;
Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`);

// Call
Linking.openURL(`tel:${phone}`);
````

**Components:**

- `ContactButtons.js`
- `SellerProfile.js`
- `MapView.js` (للموقع)

أنشئ نظام التواصل الكامل.

```

### 9. Favorites System

```

أريد نظام المفضلة (Wishlist):

**الميزات:**

1. إضافة/إزالة من المفضلة
2. شاشة عرض المفضلة
3. حفظ محلي (AsyncStorage)
4. مزامنة مع الخادم (اختياري)

**UI:**

- أيقونة قلب في Product Card
- شاشة Favorites منفصلة
- Empty State جميل
- Swipe to Delete

**Storage:**

```javascript
// Local Storage
await AsyncStorage.setItem("favorites", JSON.stringify(favorites));

// API (Optional)
POST / api / v1 / customer / favorites;
DELETE / api / v1 / customer / favorites / { id };
```

**Components:**

- `FavoriteButton.js`
- `FavoritesScreen.js`
- `useFavorites.js` hook

أنشئ نظام المفضلة الكامل.

```

### 10. Performance & UX

```

أريد تحسين الأداء وتجربة المستخدم:

**المطلوب:**

1. **Loading States:**

   - Skeleton Screens
   - Shimmer Effect
   - Loading Indicators

2. **Error Handling:**

   - Error Boundaries
   - Retry Mechanism
   - Offline Mode

3. **Caching:**

   - Cache API responses
   - Image Caching
   - Optimistic Updates

4. **Animations:**

   - Smooth Transitions
   - Micro-interactions
   - Pull to Refresh

5. **Accessibility:**
   - RTL Support
   - Font Scaling
   - Screen Reader Support

**Libraries:**

- `react-native-fast-image` للصور
- `@react-native-async-storage/async-storage`
- `react-native-reanimated`

أنشئ utility functions وcomponents للتحسينات.

```

---

## 🎨 Design System Prompt

```

أريد إنشاء Design System متكامل:

**المطلوب:**

1. **Colors:**

```javascript
export const colors = {
  primary: "#2563EB", // أزرق
  secondary: "#10B981", // أخضر
  accent: "#F59E0B", // برتقالي
  background: "#F9FAFB",
  surface: "#FFFFFF",
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
  status: {
    new: "#10B981",
    used: "#F59E0B",
    renewed: "#8B5CF6",
  },
  quality: {
    original: "#10B981",
    commercial: "#3B82F6",
    chinese: "#F59E0B",
    other: "#6B7280",
  },
};
```

2. **Typography:**

- استخدام خط Tajawal
- أحجام موحدة
- أوزان محددة

3. **Spacing:**

- نظام 4px base
- Consistent margins/paddings

4. **Components:**

- Button
- Card
- Input
- Badge
- Chip

أنشئ ملف `theme.js` كامل.

```

---

## 📱 Testing Prompt

```

أريد إضافة اختبارات للكود:

**أنواع الاختبارات:**

1. **Unit Tests:**

   - Utility functions
   - Custom hooks
   - API calls

2. **Component Tests:**

   - Rendering
   - User interactions
   - Props validation

3. **Integration Tests:**
   - Navigation flow
   - API integration
   - State management

**Tools:**

- Jest
- React Native Testing Library
- Mock Service Worker

أنشئ اختبارات لـ:

- `SearchBar.test.js`
- `ProductCard.test.js`
- `useSearch.test.js`

```

---

## 🚀 Deployment Prompt

```

أريد تجهيز التطبيق للنشر:

**المطلوب:**

1. **Build Configuration:**

   - app.json setup
   - Environment variables
   - App icons & Splash screen

2. **Optimization:**

   - Bundle size reduction
   - Code splitting
   - Asset optimization

3. **Testing:**

   - Test on real devices
   - Performance profiling
   - Memory leaks check

4. **Documentation:**
   - README.md
   - API documentation
   - User guide

أعطني خطة كاملة للنشر.

```

---

## 💡 Best Practices Reminder

```

عند العمل على المشروع، تذكر:

✅ استخدم TypeScript للـ type safety
✅ اتبع naming conventions
✅ اكتب كود قابل لإعادة الاستخدام
✅ استخدم custom hooks
✅ أضف comments بالعربية
✅ اختبر على أجهزة مختلفة
✅ راجع الكود قبل الـ commit
✅ اتبع Git flow

❌ لا تكرر الكود
❌ لا تهمل Error Handling
❌ لا تنسى Loading States
❌ لا تتجاهل Performance

```

---

**ملاحظة:** هذه الـ Prompts مصممة للاستخدام مع أي AI Assistant (ChatGPT, Claude, Gemini, etc.)
```
