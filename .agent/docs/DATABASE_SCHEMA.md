# 📊 Database Schema - Quick Reference

## نظرة عامة على قاعدة البيانات

---

## 🗂️ الجداول الرئيسية

### 1. categories (الفئات الرئيسية)

```sql
- id
- name_ar          # اسم الفئة بالعربية (مثال: محرك)
- name_en          # اسم الفئة بالإنجليزية (مثال: Engine)
- image_url        # صورة الفئة
```

**مثال:**

- محرك (Engine)
- نظام الفرامل (Brake System)
- نظام التعليق (Suspension)

---

### 2. subcategories (الفئات الفرعية)

```sql
- id
- category_id      # FK → categories
- name_ar          # مثال: قطع المحرك
- name_en          # مثال: Engine Parts
```

**مثال:**

- محرك → قطع المحرك
- محرك → نظام التبريد
- الفرامل → أقراص الفرامل

---

### 3. standard_parts (أنواع القطع الموحدة)

```sql
- id
- subcategory_id   # FK → subcategories
- name_ar          # مثال: فلتر زيت
- name_en          # مثال: Oil Filter
```

**مثال:**

- قطع المحرك → فلتر زيت
- قطع المحرك → بواجي
- أقراص الفرامل → قرص فرامل أمامي

---

### 4. vehicles (السيارات)

```sql
- id
- make             # الماركة (مثال: Toyota)
- model            # الموديل (مثال: Corolla)
- year_from        # من سنة (مثال: 2015)
- year_to          # إلى سنة (مثال: 2020)
```

**مثال:**

- Toyota Corolla 2015-2020
- Honda Civic 2016-2021
- Nissan Sunny 2010-2015

---

### 5. sellers (البائعون)

```sql
- id
- store_name       # اسم المتجر
- owner_name       # اسم المالك
- phone            # رقم الهاتف (unique)
- email            # البريد الإلكتروني (nullable, unique)
- city             # المدينة
- district         # الحي
- address          # العنوان
- latitude         # خط العرض
- longitude        # خط الطول
- store_logo_path  # شعار المتجر
- whatsapp_link    # رابط واتساب
- opening_hours    # ساعات العمل (JSON)
- subscription_end # تاريخ انتهاء الاشتراك
- password         # كلمة المرور (مشفرة)
- is_banned        # محظور؟
- timestamps
```

---

### 6. parts (المنتجات/القطع)

```sql
- id
- seller_id        # FK → sellers (البائع)
- standard_part_id # FK → standard_parts (نوع القطعة)
- price            # السعر
- status           # الحالة: new, used, renewed
- quality          # الجودة: original, commercial, chinese, other
- extra_name       # اسم إضافي (nullable)
- description      # الوصف (nullable)
- timestamps
```

**Status (الحالة):**

- `new` - جديد
- `used` - مستعمل
- `renewed` - مجدد

**Quality (الجودة):**

- `original` - أصلي (وكالة)
- `commercial` - تجاري
- `chinese` - صيني
- `other` - آخر

---

### 7. images (صور المنتجات)

```sql
- id
- part_id          # FK → parts
- image_path       # مسار الصورة
```

**ملاحظة:** كل منتج يمكن أن يحتوي على عدة صور (1 to Many)

---

### 8. part_vehicle (جدول الربط)

```sql
- part_id          # FK → parts
- vehicle_id       # FK → vehicles
```

**الغرض:** ربط القطع بالسيارات المتوافقة (Many to Many)

**مثال:**

- فلتر زيت #123 → Toyota Corolla 2015-2020
- فلتر زيت #123 → Honda Civic 2016-2021

---

### 9. customers (العملاء)

```sql
- id
- name             # الاسم
- email            # البريد الإلكتروني (nullable, unique)
- phone            # رقم الهاتف (unique)
- password         # كلمة المرور (مشفرة)
- city             # المدينة
- timestamps
```

---

## 🔗 العلاقات (Relationships)

### Category → Subcategories

```
Category (1) ──→ (Many) Subcategories
```

### Subcategory → Standard Parts

```
Subcategory (1) ──→ (Many) Standard Parts
```

### Standard Part → Parts

```
Standard Part (1) ──→ (Many) Parts
```

### Seller → Parts

```
Seller (1) ──→ (Many) Parts
```

### Part → Images

```
Part (1) ──→ (Many) Images
```

### Part ↔ Vehicles (Many to Many)

```
Part (Many) ←→ (Many) Vehicles
```

---

## 📋 مثال عملي

### سيناريو: بائع يضيف فلتر زيت

1. **البائع:**

   - ID: 5
   - اسم المتجر: "قطع غيار الأمين"
   - المدينة: صنعاء

2. **القطعة:**

   - نوع القطعة: فلتر زيت (standard_part_id = 42)
   - السعر: 1500 ريال
   - الحالة: جديد (new)
   - الجودة: أصلي (original)
   - الوصف: "فلتر زيت أصلي من الوكالة"

3. **السيارات المتوافقة:**

   - Toyota Corolla 2015-2020
   - Honda Civic 2016-2021

4. **الصور:**
   - صورة 1: `/storage/parts/image1.jpg`
   - صورة 2: `/storage/parts/image2.jpg`
   - صورة 3: `/storage/parts/image3.jpg`

### البيانات في الجداول:

**parts:**

```
id: 100
seller_id: 5
standard_part_id: 42
price: 1500
status: new
quality: original
description: "فلتر زيت أصلي من الوكالة"
```

**images:**

```
{id: 1, part_id: 100, image_path: "/storage/parts/image1.jpg"}
{id: 2, part_id: 100, image_path: "/storage/parts/image2.jpg"}
{id: 3, part_id: 100, image_path: "/storage/parts/image3.jpg"}
```

**part_vehicle:**

```
{part_id: 100, vehicle_id: 15}  # Toyota Corolla
{part_id: 100, vehicle_id: 28}  # Honda Civic
```

---

## 🔍 استعلامات شائعة (للفهم)

### 1. جلب جميع المنتجات مع معلومات البائع

```sql
SELECT
    parts.*,
    sellers.store_name,
    sellers.city,
    sellers.phone,
    standard_parts.name_ar as part_name
FROM parts
JOIN sellers ON parts.seller_id = sellers.id
JOIN standard_parts ON parts.standard_part_id = standard_parts.id
```

### 2. جلب منتج مع صوره

```sql
SELECT
    parts.*,
    images.image_path
FROM parts
LEFT JOIN images ON parts.id = images.part_id
WHERE parts.id = 100
```

### 3. جلب المنتجات المتوافقة مع سيارة معينة

```sql
SELECT parts.*
FROM parts
JOIN part_vehicle ON parts.id = part_vehicle.part_id
WHERE part_vehicle.vehicle_id = 15  # Toyota Corolla
```

### 4. البحث في المنتجات

```sql
SELECT parts.*
FROM parts
JOIN standard_parts ON parts.standard_part_id = standard_parts.id
WHERE
    standard_parts.name_ar LIKE '%فلتر%'
    OR parts.extra_name LIKE '%فلتر%'
    OR parts.description LIKE '%فلتر%'
```

---

## 📱 للمطور Frontend

### ما تحتاج معرفته:

1. **الهيكل الهرمي:**

   ```
   Category → Subcategory → Standard Part → Parts
   ```

2. **كل منتج (Part) يحتوي على:**

   - معلومات القطعة (من standard_parts)
   - السعر والحالة والجودة
   - صور متعددة (images)
   - سيارات متوافقة (vehicles)
   - معلومات البائع (seller)

3. **للبحث والفلترة:**

   - يمكن الفلترة حسب: الفئة، السيارة، الحالة، الجودة، السعر، المدينة
   - البحث في: اسم القطعة، الاسم الإضافي، الوصف

4. **للعرض:**
   - استخدم الصورة الأولى كصورة رئيسية
   - اعرض Badge للحالة والجودة
   - اعرض معلومات البائع (اسم المتجر، المدينة، رقم الهاتف)

---

## 🎨 UI Mapping

### Product Card

```javascript
{
  id: part.id,
  image: part.images[0]?.image_path,
  name: part.standard_part.name_ar,
  extraName: part.extra_name,
  price: part.price,
  status: part.status,      // new/used/renewed
  quality: part.quality,    // original/commercial/chinese/other
  seller: {
    name: part.seller.store_name,
    city: part.seller.city,
  }
}
```

### Product Details

```javascript
{
  ...productCard,
  description: part.description,
  images: part.images.map(img => img.image_path),
  vehicles: part.vehicles.map(v => `${v.make} ${v.model} ${v.year_from}-${v.year_to}`),
  seller: {
    ...seller full info,
    phone: part.seller.phone,
    whatsapp: part.seller.whatsapp_link,
    location: {
      lat: part.seller.latitude,
      lng: part.seller.longitude,
    }
  }
}
```

---

**ملاحظة:** هذا ملخص سريع. للتفاصيل الكاملة، راجع ملفات الـ migrations في `database/migrations/`
