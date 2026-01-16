# رفع المشروع إلى GitHub

## الخطوات:

### 1️⃣ التأكد من Git

```bash
git --version
```

### 2️⃣ إعداد Git (إذا لم يكن معداً)

```bash
git config --global user.name "اسمك"
git config --global user.email "بريدك@example.com"
```

### 3️⃣ تهيئة المشروع

```bash
# الانتقال إلى مجلد المشروع
cd c:\laragon\www\spare-parts-marketplace

# تهيئة git repository
git init

# إضافة جميع الملفات
git add .

# عمل commit أول
git commit -m "Initial commit: Spare Parts Marketplace Backend API"
```

### 4️⃣ ربط المشروع بـ GitHub

```bash
# إنشاء repository على GitHub أولاً: https://github.com/new
# ثم تنفيذ:

git remote add origin https://github.com/Fadl711/spare-parts-marketplace.git

# رفع الملفات
git push -u origin main
```

أو إذا كان الفرع master:

```bash
git push -u origin master
```

---

## 📋 ملفات يجب تجاهلها (.gitignore)

تأكد من وجود ملف `.gitignore` بالمحتوى التالي:

```
/node_modules
/public/hot
/public/storage
/storage/*.key
/vendor
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
/.idea
/.vscode
```

---

## 🔄 تحديثات لاحقة

بعد أي تعديلات:

```bash
git add .
git commit -m "وصف التعديلات"
git push
```

---

## ⚠️ ملاحظات مهمة:

1. **لا ترفع ملف `.env`** - يحتوي على بيانات حساسة
2. **لا ترفع مجلد `vendor`** - سيتم تحميله عبر `composer install`
3. **لا ترفع مجلد `node_modules`** - سيتم تحميله عبر `npm install`

---

## 📝 أوامر سريعة:

```bash
# معرفة حالة الملفات
git status

# عرض السجل
git log --oneline

# إنشاء فرع جديد
git checkout -b feature-name

# دمج الفروع
git merge branch-name
```
