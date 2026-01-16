# لَقِيتَها (Taris) - Spare Parts Marketplace

> **سوق قطع الغيار - ابحث واطلب بسرعة**

A complete React Native marketplace application built with Expo for buying and selling spare parts in Yemen. Features dual Customer/Seller interfaces with full Arabic RTL support.

## 📱 Features

### Customer View
- **Smart Search**: Search by vehicle type (cars/trucks), make, model, and part name
- **Detailed Listings**: View part details with image sliders, specifications, and compatibility
- **Direct Contact**: Call, WhatsApp, or chat with sellers instantly
- **Favorites**: Save parts for later viewing
- **User Profile**: Manage account settings and preferences

### Seller View
- **Dashboard**: View comprehensive stats (views, calls, chats, active listings)
- **Subscription Management**: Track subscription tier (Free, Silver, Gold, Platinum)
- **Product Management**: Add and manage spare part listings
- **Messages**: Communicate with buyers
- **Settings**: Configure store information and preferences

## 🛠 Tech Stack

- **Framework**: React Native (Expo SDK ~54)
- **Language**: TypeScript (Strict mode)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Navigation**: React Navigation v6 (Bottom Tabs + Native Stack)
- **Localization**: Full Arabic RTL support
- **Icons**: Expo Vector Icons

## 📦 Installation

1. **Clone/Navigate to the project**:
   ```bash
   cd "d:\react native project\laqeetha-app"
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**:
   - Install **Expo Go** app on your iOS or Android device
   - Scan the QR code shown in the terminal
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📂 Project Structure

```
laqeetha-app/
├── src/
│   ├── components/          # Reusable components
│   ├── data/
│   │   └── mock.ts         # Mock data (vehicles, parts, sellers)
│   ├── navigation/
│   │   ├── AppNavigator.tsx      # Main navigator with view switcher
│   │   ├── CustomerNavigator.tsx # Customer bottom tabs + stack
│   │   └── SellerNavigator.tsx   # Seller bottom tabs
│   ├── screens/
│   │   ├── customer/
│   │   │   ├── HomeScreen.tsx           # Search hub
│   │   │   ├── SearchResultsScreen.tsx  # Parts list
│   │   │   ├── PartDetailsScreen.tsx    # Part details
│   │   │   ├── FavoritesScreen.tsx      # Saved parts
│   │   │   └── ProfileScreen.tsx        # User profile
│   │   └── seller/
│   │       ├── DashboardScreen.tsx      # Stats & analytics
│   │       ├── ProductsScreen.tsx       # Manage listings
│   │       ├── MessagesScreen.tsx       # Buyer messages
│   │       └── SettingsScreen.tsx       # Seller settings
│   └── types/
│       └── index.ts        # TypeScript interfaces
├── App.tsx                 # Entry point with RTL config
├── global.css              # Tailwind directives
├── tailwind.config.js      # Tailwind configuration
├── metro.config.js         # Metro bundler config for NativeWind
└── package.json
```

## 🎨 Design System

The app uses a carefully crafted color palette optimized for the spare parts marketplace:

### Colors
- **Primary Blue**: `#0284c7` (Trust, professionalism)
- **Secondary Purple**: `#9333ea` (Seller branding)
- **Success Green**: `#16a34a` (New parts, availability)
- **Warning Yellow**: `#f59e0b` (Used parts, premium tiers)

### Typography
- All text is right-aligned for Arabic RTL
- Font sizes: Base 16px, Headings 20-32px
- Font weights: Regular (400), Semibold (600), Bold (700)

## 📊 Mock Data Structure

The app includes comprehensive Arabic mock data:

### Entities
- **6 Vehicles**: Popular models in Yemen (Toyota Hilux, Camry, Corolla, etc.)
- **7 Categories**: Engine, Brakes, Tires, Lights, Electrical, AC, Body Parts
- **3 Sellers**: With ratings, locations, and subscription tiers
- **10+ Parts**: Complete listings with images, prices, specifications

### Data Relations
All entities use IDs for relations (ready for backend integration):
```typescript
Part {
  sellerId: string         // → Seller
  categoryId: string       // → Category
  compatibleVehicleIds[]   // → Vehicle[]
}
```

## 🌍 RTL Support

The app is fully configured for Arabic right-to-left layout:

- ✅ Text alignment (right-aligned)
- ✅ Layout mirroring (icons, buttons)
- ✅ Navigation gestures (swipe left to go back)
- ✅ Flex direction reversal

**Note**: On Android, you may need to restart the app after the first launch for RTL to fully take effect.

## 🚀 Available Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Type check
npx tsc --noEmit
```

## 🔄 Next Steps for Production

To connect this frontend to a Laravel backend:

1. **Replace mock data** with Axios/Fetch API calls
2. **Add authentication**: Login, signup, JWT tokens
3. **Implement real-time chat**: Using WebSockets or Firebase
4. **Add image upload**: For sellers adding products
5. **Integrate maps**: Google Maps for seller locations
6. **Add payment processing**: For subscription upgrades
7. **Implement push notifications**: For new messages, offers

### Example API Integration

Replace this:
```typescript
import { searchParts } from '../../data/mock';
const results = searchParts(filters);
```

With this:
```typescript
import axios from 'axios';
const response = await axios.get('https://api.laqeetha.com/parts/search', { params: filters });
const results = response.data;
```

## 📱 App Flow

### Customer Journey
1. **Launch** → View switcher (Customer/Seller)
2. **Home** → Select vehicle type → Choose make/model → Enter part name
3. **Search Results** → Browse parts → Filter/sort
4. **Part Details** → View specs → Check compatibility → Contact seller
5. **Contact** → Call, WhatsApp, or in-app chat

### Seller Journey
1. **Launch** → View switcher (Customer/Seller)
2. **Dashboard** → View stats → Monitor performance
3. **Add Product** → FAB button → Fill details → Upload images
4. **Messages** → Respond to buyer inquiries
5. **Settings** → Manage subscription → Update store info

## 🎯 Key Features Implemented

- ✅ Complete navigation architecture (Customer + Seller flows)
- ✅ Search with dynamic filtering (vehicle type, make, model)
- ✅ Image slider for part galleries
- ✅ Contact actions (Call, WhatsApp, Chat placeholder)
- ✅ Seller ratings and verification badges
- ✅ Subscription tier system (Free → Platinum)
- ✅ Stats dashboard for sellers
- ✅ Responsive layouts with NativeWind
- ✅ Full TypeScript type safety
- ✅ RTL Arabic support throughout

## 🐛 Troubleshooting

### App doesn't start
```bash
# Clear cache and restart
npx expo start --clear
```

### RTL not working on Android
- Close the app completely
- Reopen it (RTL applies on app restart)

### NativeWind styles not applying
```bash
# Rebuild with cleared cache
npx expo start --clear
```

### TypeScript errors
```bash
# Check for errors
npx tsc --noEmit
```

## 📄 License

This project is built as a frontend scaffolding template for the Taris marketplace application.

## 🤝 Credits

Built with ❤️ using:
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Made for the Yemeni spare parts market** 🇾🇪
