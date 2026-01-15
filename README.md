# Laqeetha (Auto Spare Parts Marketplace)

This repository contains both the **Laravel Backend** and the **React Native Frontend**.

## Prerequisites

- **Backend**:
  - PHP >= 8.2
  - Composer
  - Database (MySQL/MariaDB)
- **Frontend**:
  - Node.js >= 18
  - Expo CLI

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://your-repository-url.git
cd spare-parts-marketplace
```

### 2. Backend Setup (Laravel)

Navigate to the root directory:

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure database in .env
# DB_DATABASE=your_db_name
# DB_USERNAME=root
# DB_PASSWORD=

# Generate key
php artisan key:generate

# Run migrations and seeders
php artisan migrate:fresh --seed

# Start the server
php artisan serve
```

_Backend runs on: `http://localhost:8000`_

### 3. Frontend Setup (React Native)

Navigate to the frontend directory:

```bash
cd "react native project/laqeetha-app"

# Install dependencies
npm install

# Start the app
npx expo start
```

_Scan the QR code with Expo Go (Android/iOS) or run on Emulator._

---

## Directory Structure

- `/app, /routes, ...` -> Laravel Backend
- `/react native project/laqeetha-app` -> React Native Frontend
