# 📡 API Reference - Quick Guide

## Base URL

```
http://192.168.8.124:8000/api/v1
```

**ملاحظة:** غيّر الـ IP حسب جهازك

---

## 🔓 Authentication

### Customer Login

```http
POST /customer/login
Content-Type: application/json

{
  "phone": "0777777777",
  "password": "password"
}
```

**Response:**

```json
{
  "token": "1|xxxxx",
  "customer": {
    "id": 1,
    "name": "Test Customer",
    "phone": "0777777777",
    "city": "Sanaa"
  }
}
```

### Customer Register

```http
POST /customer/register
Content-Type: application/json

{
  "name": "Ahmed Ali",
  "phone": "0777777777",
  "password": "password",
  "password_confirmation": "password",
  "city": "Sanaa"
}
```

---

## 📦 Core Data

### Get Categories

```http
GET /categories
```

**Response:**

```json
[
  {
    "id": 1,
    "name_ar": "محرك",
    "name_en": "Engine",
    "image_url": "https://...",
    "subcategories_count": 5
  }
]
```

### Get Subcategories

```http
GET /categories/{id}/subcategories
```

### Get Standard Parts

```http
GET /subcategories/{id}/standard-parts
```

### Get Vehicles

```http
GET /vehicles
```

**Response:**

```json
[
  {
    "id": 1,
    "make": "Toyota",
    "model": "Corolla",
    "year_from": 2015,
    "year_to": 2020,
    "full_name": "Toyota Corolla 2015-2020"
  }
]
```

---

## 🔍 Search & Browse

### Search Parts

```http
GET /search?q={query}
```

**Parameters:**

- `q` - نص البحث

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "فلتر زيت",
      "extra_name": "Toyota Original",
      "price": 1500,
      "status": "new",
      "quality": "original",
      "image": "https://...",
      "seller": {
        "store_name": "قطع غيار الأمين",
        "city": "صنعاء"
      }
    }
  ],
  "meta": {
    "total": 50,
    "per_page": 20,
    "current_page": 1
  }
}
```

### Get Search Suggestions

```http
GET /search/suggestions?q={query}
```

**Response:**

```json
{
  "suggestions": ["فلتر زيت", "فلتر هواء", "فلتر بنزين"]
}
```

### Get Available Filters

```http
GET /search/filters
```

**Response:**

```json
{
  "categories": [...],
  "makes": ["Toyota", "Honda", "Nissan"],
  "cities": ["صنعاء", "عدن", "تعز"],
  "status": ["new", "used", "renewed"],
  "quality": ["original", "commercial", "chinese", "other"],
  "price_range": {
    "min": 100,
    "max": 50000
  }
}
```

---

## 🛍️ Products

### Get All Parts

```http
GET /parts
```

**Query Parameters:**

```
?page=1                    # الصفحة
&per_page=20              # عدد العناصر
&category_id=1            # فلترة حسب الفئة
&vehicle_id=5             # فلترة حسب السيارة
&status=new               # فلترة حسب الحالة
&quality=original         # فلترة حسب الجودة
&city=صنعاء               # فلترة حسب المدينة
&min_price=1000           # الحد الأدنى للسعر
&max_price=5000           # الحد الأقصى للسعر
&sort_by=price            # الترتيب (price, created_at)
&sort_order=asc           # الاتجاه (asc, desc)
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "standard_part": {
        "id": 42,
        "name_ar": "فلتر زيت",
        "name_en": "Oil Filter"
      },
      "extra_name": "Toyota Original",
      "price": 1500,
      "status": "new",
      "quality": "original",
      "description": "فلتر زيت أصلي من الوكالة",
      "images": [
        {
          "id": 1,
          "image_path": "/storage/parts/image1.jpg",
          "url": "http://192.168.8.124:8000/storage/parts/image1.jpg"
        }
      ],
      "seller": {
        "id": 5,
        "store_name": "قطع غيار الأمين",
        "city": "صنعاء",
        "phone": "0771234567",
        "whatsapp_link": "https://wa.me/967771234567"
      },
      "vehicles": [
        {
          "id": 15,
          "make": "Toyota",
          "model": "Corolla",
          "year_from": 2015,
          "year_to": 2020
        }
      ],
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "per_page": 20,
    "current_page": 1,
    "last_page": 8
  }
}
```

### Get Part Details

```http
GET /parts/{id}
```

**Response:** نفس بنية المنتج أعلاه لكن بدون array

---

## 🏪 Sellers

### Get Seller Reviews

```http
GET /sellers/{sellerId}/reviews
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "customer_name": "أحمد علي",
      "rating": 5,
      "comment": "بائع ممتاز والقطعة أصلية",
      "created_at": "2026-01-10T14:20:00Z"
    }
  ],
  "average_rating": 4.5,
  "total_reviews": 25
}
```

---

## ⭐ Favorites (يتطلب مصادقة)

### Get Favorites

```http
GET /customer/favorites
Authorization: Bearer {token}
```

### Add to Favorites

```http
POST /customer/favorites
Authorization: Bearer {token}
Content-Type: application/json

{
  "part_id": 1
}
```

### Remove from Favorites

```http
DELETE /customer/favorites/{id}
Authorization: Bearer {token}
```

### Check if Favorite

```http
GET /customer/favorites/check/{partId}
Authorization: Bearer {token}
```

**Response:**

```json
{
  "is_favorite": true,
  "favorite_id": 5
}
```

---

## 📱 للاستخدام في React Native

### Setup Axios

```javascript
import axios from "axios";

const API_BASE_URL = "http://192.168.8.124:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### Example Usage

#### Get Categories

```javascript
const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
```

#### Search Parts

```javascript
const searchParts = async (query, filters = {}) => {
  try {
    const params = {
      q: query,
      ...filters,
    };
    const response = await api.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Error searching parts:", error);
    throw error;
  }
};
```

#### Get Part Details

```javascript
const getPartDetails = async (partId) => {
  try {
    const response = await api.get(`/parts/${partId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching part details:", error);
    throw error;
  }
};
```

#### Add to Favorites

```javascript
const addToFavorites = async (partId) => {
  try {
    const response = await api.post("/customer/favorites", {
      part_id: partId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};
```

---

## 🔄 Pagination

جميع الـ endpoints التي تعيد قوائم تدعم الـ pagination:

```javascript
const loadMore = async (page) => {
  const response = await api.get("/parts", {
    params: {
      page: page,
      per_page: 20,
    },
  });
  return response.data;
};
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "message": "رسالة الخطأ",
  "errors": {
    "field_name": ["تفاصيل الخطأ"]
  }
}
```

### Handle Errors in React Native

```javascript
try {
  const response = await api.get("/parts");
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.log("Error:", error.response.data.message);
    console.log("Status:", error.response.status);
  } else if (error.request) {
    // Request made but no response
    console.log("Network Error");
  } else {
    // Something else happened
    console.log("Error:", error.message);
  }
}
```

---

## 📝 Notes

1. **Authentication:**

   - استخدم Bearer Token في الـ header
   - احفظ الـ token في AsyncStorage

2. **Images:**

   - الصور تُعاد كـ full URL
   - استخدم `react-native-fast-image` للأداء الأفضل

3. **Pagination:**

   - استخدم `meta.last_page` لمعرفة آخر صفحة
   - استخدم Infinite Scroll أو Pagination

4. **Caching:**

   - احفظ البيانات محلياً للأداء الأفضل
   - استخدم `react-query` أو `SWR`

5. **Error Handling:**
   - تعامل مع جميع حالات الأخطاء
   - اعرض رسائل واضحة للمستخدم

---

**للمزيد من التفاصيل، راجع:**

- `routes/api.php` - تعريف الـ routes
- `app/Http/Controllers/Api/` - الـ Controllers
