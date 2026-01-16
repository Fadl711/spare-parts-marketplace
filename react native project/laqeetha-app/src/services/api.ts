import axios from "axios";
import { Platform } from "react-native";

// ⚠️ IMPORTANT: Change this to your computer's IP address!
// To find your IP: Run "ipconfig" in PowerShell and look for IPv4 Address
// Example: 192.168.1.5, 192.168.0.100, etc.

const YOUR_COMPUTER_IP = "192.168.8.124"; // 👈 UPDATED!

const BASE_URL = `http://${YOUR_COMPUTER_IP}:8080/api/v1`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000, // 10 seconds
});

// Add auth token interceptor
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// Response Types
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

// ==================== Auth ====================

export const AuthService = {
    // Customer Auth
    customerRegister: async (data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        phone: string;
        city?: string;
    }) => {
        const response = await api.post("/customer/register", {
            ...data,
            device_name: Platform.OS === "ios" ? "ios" : "android",
        });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    },

    customerLogin: async (email: string, password: string) => {
        const response = await api.post("/customer/login", { email, password });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    },

    customerLogout: async () => {
        await api.post("/customer/logout");
        setAuthToken(null);
    },

    // Seller Auth
    sellerRegister: async (data: {
        store_name: string;
        owner_name: string;
        phone: string;
        email: string;
        password: string;
        password_confirmation: string;
        city: string;
        district: string;
        address: string;
    }) => {
        const response = await api.post("/seller/register", {
            ...data,
            device_name: Platform.OS === "ios" ? "ios" : "android",
        });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    },

    sellerLogin: async (email: string, password: string) => {
        const response = await api.post("/seller/login", { email, password });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    },

    sellerLogout: async () => {
        await api.post("/seller/logout");
        setAuthToken(null);
    },
};

// ==================== Core Data ====================

export const CoreDataService = {
    getVehicles: async () => {
        const response = await api.get("/vehicles");
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get("/categories");
        return response.data;
    },

    getPartTypes: async (categoryId?: string) => {
        const response = await api.get("/part-types", {
            params: categoryId ? { category_id: categoryId } : undefined,
        });
        return response.data;
    },
};

// ==================== Marketplace ====================

export const MarketplaceService = {
    getParts: async (params?: {
        make?: string;
        model?: string;
        part_name?: string;
        condition?: string;
        page?: number;
        sort_by?: "created_at" | "price";
        sort_order?: "asc" | "desc";
    }) => {
        const response = await api.get<PaginatedResponse<any>>("/parts", {
            params,
        });
        return response.data;
    },

    getPartDetails: async (id: string | number) => {
        const response = await api.get<ApiResponse<any>>(`/parts/${id}`);
        return response.data;
    },
};

// ==================== Search ====================

export const SearchService = {
    search: async (params: {
        q?: string;
        make?: string;
        model?: string;
        year?: number;
        category_id?: number;
        subcategory_id?: number;
        status?: string;
        quality?: string;
        min_price?: number;
        max_price?: number;
        city?: string;
        sort_by?: "created_at" | "price";
        sort_order?: "asc" | "desc";
        page?: number;
        per_page?: number;
    }) => {
        const response = await api.get<PaginatedResponse<any>>("/search", {
            params,
        });
        return response.data;
    },

    getSuggestions: async (query: string) => {
        const response = await api.get("/search/suggestions", {
            params: { q: query },
        });
        return response.data;
    },

    getFilters: async () => {
        const response = await api.get("/search/filters");
        return response.data;
    },
};

// ==================== Customer - Favorites ====================

export const FavoritesService = {
    getFavorites: async (page = 1) => {
        const response = await api.get<PaginatedResponse<any>>(
            "/customer/favorites",
            {
                params: { page },
            }
        );
        return response.data;
    },

    addToFavorites: async (partId: number) => {
        const response = await api.post("/customer/favorites", {
            part_id: partId,
        });
        return response.data;
    },

    removeFromFavorites: async (id: number) => {
        const response = await api.delete(`/customer/favorites/${id}`);
        return response.data;
    },

    removeByPartId: async (partId: number) => {
        const response = await api.delete(`/customer/favorites/part/${partId}`);
        return response.data;
    },

    checkFavorite: async (partId: number) => {
        const response = await api.get<{ is_favorite: boolean }>(
            `/customer/favorites/check/${partId}`
        );
        return response.data;
    },
};

// ==================== Customer - Orders ====================

export const OrdersService = {
    getOrders: async (page = 1) => {
        const response = await api.get<PaginatedResponse<any>>(
            "/customer/orders",
            {
                params: { page },
            }
        );
        return response.data;
    },

    createOrder: async (data: {
        part_id: number;
        delivery_city: string;
        delivery_district: string;
        delivery_address: string;
        customer_phone: string;
        notes?: string;
    }) => {
        const response = await api.post("/customer/orders", data);
        return response.data;
    },

    getOrderDetails: async (id: number) => {
        const response = await api.get<ApiResponse<any>>(
            `/customer/orders/${id}`
        );
        return response.data;
    },

    cancelOrder: async (id: number) => {
        const response = await api.post(`/customer/orders/${id}/cancel`);
        return response.data;
    },
};

// ==================== Seller - Parts Management ====================

export const SellerPartsService = {
    getParts: async (page = 1) => {
        const response = await api.get<PaginatedResponse<any>>(
            "/seller/parts",
            {
                params: { page },
            }
        );
        return response.data;
    },

    createPart: async (data: FormData) => {
        const response = await api.post("/seller/parts", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    getPartDetails: async (id: number) => {
        const response = await api.get<ApiResponse<any>>(`/seller/parts/${id}`);
        return response.data;
    },

    updatePart: async (id: number, data: any) => {
        const response = await api.put(`/seller/parts/${id}`, data);
        return response.data;
    },

    deletePart: async (id: number) => {
        const response = await api.delete(`/seller/parts/${id}`);
        return response.data;
    },

    uploadImages: async (partId: number, images: FormData) => {
        const response = await api.post(
            `/seller/parts/${partId}/images`,
            images,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        return response.data;
    },

    deleteImage: async (partId: number, imageId: number) => {
        const response = await api.delete(
            `/seller/parts/${partId}/images/${imageId}`
        );
        return response.data;
    },
};

// ==================== Messaging ====================

export const MessagingService = {
    getConversations: async (page = 1) => {
        const response = await api.get<PaginatedResponse<any>>(
            "/conversations",
            {
                params: { page },
            }
        );
        return response.data;
    },

    getMessages: async (conversationId: number, page = 1) => {
        const response = await api.get<PaginatedResponse<any>>(
            `/conversations/${conversationId}/messages`,
            { params: { page } }
        );
        return response.data;
    },

    sendMessage: async (data: {
        conversation_id?: number;
        recipient_id?: number;
        recipient_type?: "customer" | "seller";
        content: string;
    }) => {
        const response = await api.post("/messages", data);
        return response.data;
    },
};

// ==================== Reviews ====================

export const ReviewsService = {
    getSellerReviews: async (sellerId: number, page = 1) => {
        const response = await api.get(`/sellers/${sellerId}/reviews`, {
            params: { page },
        });
        return response.data;
    },

    createReview: async (data: {
        seller_id: number;
        rating: number;
        comment?: string;
    }) => {
        const response = await api.post("/reviews", data);
        return response.data;
    },

    updateReview: async (
        id: number,
        data: { rating?: number; comment?: string }
    ) => {
        const response = await api.put(`/reviews/${id}`, data);
        return response.data;
    },

    deleteReview: async (id: number) => {
        const response = await api.delete(`/reviews/${id}`);
        return response.data;
    },
};

// ==================== Legacy Exports ====================
export const ApiService = {
    // Core Data
    getVehicles: CoreDataService.getVehicles,
    getCategories: CoreDataService.getCategories,
    getPartTypes: CoreDataService.getPartTypes,
    getMakes: CoreDataService.getVehicles, // Reusing getVehicles for makes as per common logic

    // Marketplace
    searchParts: MarketplaceService.getParts,
    getPartDetails: MarketplaceService.getPartDetails,
    getFeaturedParts: () =>
        MarketplaceService.getParts({
            sort_by: "created_at",
            sort_order: "desc",
        }), // Sort by new

    // Auth & User
    customerLogin: AuthService.customerLogin,
    getFavorites: FavoritesService.getFavorites,
};

export default api;
