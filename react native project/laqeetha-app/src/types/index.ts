// Vehicle types
export type VehicleType = 'car' | 'truck';

// Vehicle make and model
export interface Vehicle {
    id: string;
    type: VehicleType;
    make: string; // الشركة المصنعة
    model: string; // الموديل
    yearFrom: number;
    yearTo: number;
    logoUrl?: string; // Brand logo
    imageUrl?: string; // 3D car render
}

// Part category
export interface Category {
    id: string;
    nameAr: string;
    nameEn: string;
    icon?: string;
    imageUrl?: string; // Contextual background image
}

// Part Type (Sub-category)
export interface PartType {
    id: string;
    categoryId: string;
    nameAr: string;
    nameEn: string;
    imageUrl: string;
}

// Subscription tiers
export type SubscriptionTier = 'free' | 'silver' | 'gold' | 'platinum';

// Seller information
export interface Seller {
    id: string;
    storeName: string; // اسم المتجر
    ownerName: string; // اسم المالك
    rating: number; // 0-5
    totalReviews: number;
    phone: string;
    whatsapp: string;
    location: {
        city: string;
        district: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    subscriptionTier: SubscriptionTier;
    verified: boolean;
}

// Part condition and quality
export type PartCondition = 'new' | 'used';
export type PartQuality = 'original' | 'commercial'; // أصلي / تجاري

// Spare part
export interface Part {
    id: string;
    title: string;
    description: string;
    price: number; // YER (Yemeni Rial)
    condition: PartCondition;
    quality: PartQuality;
    partNumber?: string; // رقم القطعة
    categoryId: string;
    category?: Category; // Populated by API
    sellerId: string;
    seller?: Seller; // Populated by API
    compatibleVehicleIds: string[]; // Array of vehicle IDs this part fits
    vehicles?: Vehicle[]; // Populated by API
    imageUrls: string[];
    stock: number;
    views: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

// Stats for seller dashboard
export interface SellerStats {
    totalViews: number;
    totalCalls: number;
    totalChats: number;
    activeListings: number;
}

// Search filters
export interface SearchFilters {
    vehicleType?: VehicleType;
    make?: string;
    model?: string;
    yearFrom?: number;
    yearTo?: number;
    partName?: string;
    condition?: PartCondition;
    quality?: PartQuality;
    priceMin?: number;
    priceMax?: number;
}
