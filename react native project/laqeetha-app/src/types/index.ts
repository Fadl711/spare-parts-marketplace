// ==================== User Types ====================

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    city?: string;
    is_active: boolean;
    created_at: string;
}

export interface Seller {
    id: number;
    store_name: string;
    owner_name?: string;
    email?: string;
    phone: string;
    whatsapp?: string;
    location: {
        city: string;
        district: string;
        address?: string;
    };
    rating: number;
    total_parts?: number;
    is_approved?: boolean;
    is_active?: boolean;
    opening_hours?: Record<string, string>;
    created_at: string;
}

// ==================== Part Types ====================

export interface Image {
    id: number;
    url: string;
    thumbnail?: string;
    // For backward compatibility if needed, though backend sends object
    image_path?: string;
}

export interface StandardPart {
    id: number;
    name_ar: string;
    name_en: string;
    subcategory?: {
        id: number;
        name_ar: string;
        name_en: string;
    };
}

export interface Vehicle {
    id: number;
    make: string;
    model: string;
    year_from: number;
    year_to: number;
    type?: string;
}

export interface PartType {
    id: number;
    name_ar: string;
    name_en: string;
    image_url?: string;
}

export interface Part {
    id: number;
    title: string;
    price: number;
    currency: string;
    // Backend uses 'status', Frontend often uses 'condition'. Mapping both for safety.
    status: "new" | "used" | "renewed";
    condition?: "new" | "used" | "renewed";
    quality: "original" | "commercial" | "chinese" | "other";
    description?: string;
    extra_name?: string;
    // Backend returns 'images' as object array
    images?: Image[];
    // Helper field commonly used in frontend logic
    imageUrls?: string[];
    // New backend field
    image_urls?: string[];
    seller: Seller;
    standard_part?: StandardPart;
    vehicles?: Vehicle[];
    category?: Category;
    // UI specific fields (might be undefined from backend currently)
    partNumber?: string;
    views?: number;
    created_at: string;
    updated_at: string;
}

// ==================== Category Types ====================

export interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image_url?: string;
    subcategories?: Subcategory[];
}

export interface Subcategory {
    id: number;
    category_id: number;
    name_ar: string;
    name_en: string;
}

// ==================== Order Types ====================

export interface Order {
    id: number;
    order_number: string;
    status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled";
    total_price: number;
    part: {
        id: number;
        title: string;
        price: number;
        image_url?: string;
    };
    seller: {
        id: number;
        store_name: string;
        phone: string;
        city: string;
    };
    delivery: {
        city: string;
        district: string;
        address: string;
        phone: string;
    };
    notes?: string;
    created_at: string;
    updated_at: string;
}

// ==================== Favorite Types ====================

export interface Favorite {
    id: number;
    part: Part;
    added_at: string;
}

// ==================== Messaging Types ====================

export interface Conversation {
    id: number;
    with: {
        type: "seller" | "customer";
        id: number;
        name: string;
    };
    last_message?: {
        content: string;
        sent_at: string;
        is_mine: boolean;
    };
    updated_at: string;
}

export interface Message {
    id: number;
    content: string;
    is_mine: boolean;
    sent_at: string;
}

// ==================== Review Types ====================

export interface Review {
    id: number;
    rating: number;
    comment?: string;
    customer: {
        name: string;
    };
    created_at: string;
}

export interface ReviewMeta {
    average_rating: number;
    total_reviews: number;
}

// ==================== Search Types ====================

export interface SearchFilters {
    q?: string;
    make?: string;
    model?: string;
    year?: number;
    category_id?: number;
    subcategory_id?: number;
    status?: "new" | "used" | "renewed";
    quality?: "original" | "commercial" | "chinese" | "other";
    min_price?: number;
    max_price?: number;
    city?: string;
    sort_by?: "created_at" | "price";
    sort_order?: "asc" | "desc";
}

export interface SearchSuggestions {
    parts: string[];
    makes: string[];
}

export interface AvailableFilters {
    makes: string[];
    status: string[];
    quality: string[];
    cities: string[];
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
    data: T;
    meta?: any;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ErrorResponse {
    error: string;
    message: string;
}

// ==================== Auth Types ====================

export interface AuthResponse {
    token: string;
    user: Customer | Seller;
    message?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface CustomerRegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    city?: string;
}

export interface SellerRegisterData {
    store_name: string;
    owner_name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
    city: string;
    district: string;
    address: string;
}

// ==================== Form Types ====================

export interface CreateOrderData {
    part_id: number;
    delivery_city: string;
    delivery_district: string;
    delivery_address: string;
    customer_phone: string;
    notes?: string;
}

export interface CreateReviewData {
    seller_id: number;
    rating: number;
    comment?: string;
}

export interface UpdatePartData {
    price?: number;
    status?: "new" | "used" | "renewed";
    quality?: "original" | "commercial" | "chinese" | "other";
    extra_name?: string;
    description?: string;
    vehicle_ids?: number[];
}

// ==================== Navigation Types ====================

export type RootStackParamList = {
    Home: undefined;
    BrandSelection: undefined;
    CategorySelection: { make: string; model: string };
    PartTypeSelection: { category: Category };
    SearchResults: { filters: SearchFilters };
    PartDetails: { partId: number };
    Favorites: undefined;
    Profile: undefined;
    Chat: {
        conversationId?: number;
        recipientId?: number;
        recipientType?: "seller" | "customer";
    };
    SellerParts: undefined;
    AddPart: undefined;
    EditPart: { partId: number };
};
