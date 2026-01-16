# 🚀 دليل التشغيل - Laqeetha App

## 📋 المتطلبات

### Backend (Laravel):

```bash
cd c:\laragon\www\spare-parts-marketplace
php artisan serve
# سيعمل على: http://127.0.0.1:8000
```

### Frontend (React Native):

```bash
cd "c:\laragon\www\spare-parts-marketplace\react native project\laqeetha-app"
npm install
npm start
```

---

## 🔧 الإعداد الأولي

### 1. Backend Setup

```bash
# 1. تشغيل Migrations
php artisan migrate

# 2. تشغيل Seeders (لإنشاء بيانات تجريبية)
php artisan db:seed

# 3. تشغيل السيرفر
php artisan serve
```

**تأكد من:**

-   MySQL يعمل
-   ملف `.env` معدل بشكل صحيح
-   Part بـ ID=1 موجود (تم إنشاؤه في Seeder)

### 2. Frontend Setup

```bash
cd "c:\laragon\www\spare-parts-marketplace\react native project\laqeetha-app"

# 1. تثبيت المكتبات
npm install

# 2. تشغيل المشروع
npm start

# 3. في نافذة جديدة:
# للتشغيل على Android:
npm run android

# للتشغيل على iOS:
npm run ios

# للتشغيل في المتصفح:
npm run web
```

---

## 📱 تشغيل على الهاتف الحقيقي

### إذا تستخدم هاتف حقيقي:

**1. اعرف IP الجهاز:**

```bash
# Windows:
ipconfig
# ابحث عن: IPv4 Address (مثال: 192.168.1.5)

# Mac/Linux:
ifconfig
```

**2. عدل ملف API:**

افتح: `src/services/api.ts`

غير السطر 6-8 إلى:

```typescript
const BASE_URL = "http://192.168.1.X:8000/api/v1";
// استبدل X برقم IP جهازك
```

**3. شغل Backend على جميع الشبكات:**

```bash
php artisan serve --host=0.0.0.0
```

---

## 🧪 اختبار الـ API

### 1. من Terminal:

```bash
cd c:\laragon\www\spare-parts-marketplace
php test_api.php
```

### 2. من Postman/Insomnia:

```
GET http://127.0.0.1:8000/api/v1/parts
GET http://127.0.0.1:8000/api/v1/categories
GET http://127.0.0.1:8000/api/v1/vehicles
```

---

## 📚 الـ Endpoints المتاحة

### Public (بدون تسجيل دخول):

-   `GET /api/v1/parts` - قائمة القطع
-   `GET /api/v1/parts/{id}` - تفاصيل قطعة
-   `GET /api/v1/search` - بحث متقدم
-   `GET /api/v1/categories` - الفئات
-   `GET /api/v1/vehicles` - المركبات
-   `GET /api/v1/sellers/{id}/reviews` - تقييمات البائع

### Customer (يحتاج تسجيل دخول):

-   `POST /api/v1/customer/login`
-   `POST /api/v1/customer/register`
-   `GET /api/v1/customer/favorites`
-   `POST /api/v1/customer/favorites`
-   `GET /api/v1/customer/orders`
-   `POST /api/v1/customer/orders`

### Seller (يحتاج تسجيل دخول):

-   `POST /api/v1/seller/login`
-   `POST /api/v1/seller/register`
-   `GET /api/v1/seller/parts`
-   `POST /api/v1/seller/parts`
-   `PUT /api/v1/seller/parts/{id}`
-   `DELETE /api/v1/seller/parts/{id}`

### Messaging (يحتاج تسجيل دخول):

-   `GET /api/v1/conversations`
-   `GET /api/v1/conversations/{id}/messages`
-   `POST /api/v1/messages`

راجع `API_DOCUMENTATION.md` للتفاصيل الكاملة.

---

## ⚠️ حل المشاكل الشائعة

### مشكلة 1: "Network Error" في التطبيق

**الحل:**

1. تأكد أن Backend يعمل: `php artisan serve`
2. تأكد من IP Address صحيح في `api.ts`
3. إذا على Android Emulator، استخدم: `10.0.2.2`
4. إذا على هاتف حقيقي، استخدم IP الجهاز: `192.168.1.X`

### مشكلة 2: "Cannot find module" بعد git pull

**الحل:**

```bash
cd "c:\laragon\www\spare-parts-marketplace\react native project\laqeetha-app"
npm install
```

### مشكلة 3: Port 8000 مستخدم

**الحل:**

```bash
php artisan serve --port=8001
# ثم عدل BASE_URL في api.ts
```

### مشكلة 4: Part ID=1 not found

**الحل:**

```bash
php artisan db:seed
# أو
php artisan migrate:fresh --seed
```

---

## 📁 الهيكل الجديد

```
spare-parts-marketplace/
├── app/                          # Laravel Backend
│   ├── Http/Controllers/Api/V1/
│   │   ├── Auth/                 ✓
│   │   ├── Admin/                ✓
│   │   ├── Customer/             ✓
│   │   ├── Seller/               ✓
│   │   ├── MarketplaceController ✓
│   │   ├── SearchController      ✓
│   │   ├── MessagingController   ✓
│   │   └── ReviewController      ✓
│   ├── Resources/                ✓
│   └── Middleware/               ✓
├── routes/api.php                ✓ (50+ endpoints)
└── react native project/
    └── laqeetha-app/             # React Native Frontend
        ├── src/
        │   ├── screens/
        │   │   ├── customer/     ✓ (9 screens)
        │   │   └── seller/       ✓ (5 screens)
        │   ├── services/
        │   │   └── api.ts        ✓ (جميع الـ APIs)
        │   ├── types/
        │   │   └── index.ts      ✓ (جميع الـ Types)
        │   └── navigation/       ✓
        └── package.json          ✓
```

---

## ✅ Checklist قبل العمل

-   [ ] Backend يعمل: `http://127.0.0.1:8000`
-   [ ] Database جاهزة (migrate + seed)
-   [ ] Part ID=1 موجود
-   [ ] Frontend يعمل: `npm start`
-   [ ] التطبيق يفتح على الهاتف/Emulator
-   [ ] API calls تعمل بنجاح

---

## 🎯 الخطوات التالية للتطوير

1. **ربط الشاشات بالـ API:**

    - HomeScreen → MarketplaceService.getParts()
    - SearchResultsScreen → SearchService.search()
    - PartDetailsScreen → MarketplaceService.getPartDetails()
    - FavoritesScreen → FavoritesService.getFavorites()
    - ChatScreen → MessagingService

2. **إضافة State Management:**

    - Context API / Redux
    - حفظ الـ Auth Token
    - Cache للبيانات

3. **تحسينات UI/UX:**

    - Loading states
    - Error handling
    - Pull to refresh
    - Infinite scroll

4. **Features إضافية:**
    - Push notifications
    - Image upload
    - Maps integration
    - Payment gateway

---

**🚀 جاهز للبدء!**
