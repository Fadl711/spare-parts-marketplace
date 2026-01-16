# Quick Git Commands - رفع المشروع

## ⚡ نسخ ولصق مباشر:

### 1. إضافة جميع الملفات

```bash
git add .
```

### 2. عمل Commit

```bash
git commit -m "Add complete backend API with messaging, reviews, and advanced search"
```

### 3. ربط بـ GitHub (إذا لم يكن مربوطاً)

```bash
git remote add origin https://github.com/Fadl711/spare-parts-marketplace.git
```

### 4. رفع الملفات

```bash
git push -u origin main
```

أو إذا كان الفرع master:

```bash
git push -u origin master
```

---

## ✅ إذا كانت هذه أول مرة:

```bash
cd c:\laragon\www\spare-parts-marketplace
git init
git add .
git commit -m "Initial commit: Complete Spare Parts Marketplace Backend"
git branch -M main
git remote add origin https://github.com/Fadl711/spare-parts-marketplace.git
git push -u origin main
```

---

## 🔄 للتحديثات اللاحقة فقط:

```bash
git add .
git commit -m "وصف التعديل"
git push
```

---

## ❗ إذا واجهت مشكلة في الرفع:

```bash
# سحب التحديثات أولاً
git pull origin main --rebase

# ثم الرفع
git push
```
