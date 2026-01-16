import {
    Vehicle,
    Category,
    Seller,
    Part,
    SellerStats,
} from '../types';

// Mock Vehicles - Popular in Yemen
export const MOCK_VEHICLES: Vehicle[] = [
    {
        id: 'v1',
        type: 'car',
        make: 'تويوتا',
        model: 'كورولا',
        yearFrom: 2010,
        yearTo: 2023,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
        imageUrl: 'https://www.pngmart.com/files/4/Toyota-Corolla-PNG-Transparent-Image.png',
    },
    {
        id: 'v2',
        type: 'car',
        make: 'تويوتا',
        model: 'كامري',
        yearFrom: 2012,
        yearTo: 2023,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
        imageUrl: 'https://www.pngmart.com/files/22/Toyota-Camry-PNG-Isolated-HD.png',
    },
    {
        id: 'v3',
        type: 'truck',
        make: 'تويوتا',
        model: 'هايلكس',
        yearFrom: 2008,
        yearTo: 2023,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
        imageUrl: 'https://www.pngmart.com/files/22/Toyota-Hilux-PNG-Image.png',
    },
    {
        id: 'v4',
        type: 'truck',
        make: 'هيونداي',
        model: 'HD',
        yearFrom: 2015,
        yearTo: 2023,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png',
        imageUrl: 'https://www.pngmart.com/files/22/Hyundai-Truck-PNG-Clipart.png',
    },
    {
        id: 'v5',
        type: 'car',
        make: 'نيسان',
        model: 'صني',
        yearFrom: 2010,
        yearTo: 2022,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.png/800px-Nissan_logo.png',
        imageUrl: 'https://www.pngmart.com/files/4/Nissan-Sunny-PNG-HD.png',
    },
    {
        id: 'v6',
        type: 'car',
        make: 'كيا',
        model: 'سيراتو',
        yearFrom: 2014,
        yearTo: 2023,
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/2560px-Kia_logo.svg.png',
        imageUrl: 'https://www.pngmart.com/files/22/Kia-Cerato-PNG-File.png',
    },
];

// Mock Categories
export const MOCK_CATEGORIES: Category[] = [
    {
        id: 'c1',
        nameAr: 'محرك وأجزاءه',
        nameEn: 'Engine & Parts',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Engine-PNG-Transparent.png'
    },
    {
        id: 'c2',
        nameAr: 'فرامل',
        nameEn: 'Brakes',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Brake-PNG-Clipart.png'
    },
    {
        id: 'c3',
        nameAr: 'إطارات وجنوط',
        nameEn: 'Tires & Rims',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Wheel-PNG-Photos.png'
    },
    {
        id: 'c4',
        nameAr: 'مصابيح',
        nameEn: 'Lights',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Headlight-PNG-Picture.png'
    },
    {
        id: 'c5',
        nameAr: 'كهرباء',
        nameEn: 'Electrical',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Battery-PNG-Transparent-Image.png'
    },
    {
        id: 'c6',
        nameAr: 'تكييف',
        nameEn: 'AC System',
        imageUrl: 'https://www.pngmart.com/files/22/Car-AC-Compressor-PNG-File.png'
    },
    {
        id: 'c7',
        nameAr: 'هيكل خارجي',
        nameEn: 'Body Parts',
        imageUrl: 'https://www.pngmart.com/files/22/Car-Door-PNG-Clipart.png'
    },
];

// Mock Part Types (Sub-categories)
export const MOCK_PART_TYPES = [
    { id: 'pt1', nameAr: 'صدام أمامي', nameEn: 'Front Bumper', categoryId: 'c7', imageUrl: 'https://www.pngmart.com/files/22/Car-Bumper-PNG-Photo.png' },
    { id: 'pt2', nameAr: 'باب', nameEn: 'Door', categoryId: 'c7', imageUrl: 'https://www.pngmart.com/files/22/Car-Door-PNG-Clipart.png' },
    { id: 'pt3', nameAr: 'شمعه', nameEn: 'Headlight', categoryId: 'c4', imageUrl: 'https://www.pngmart.com/files/22/Car-Headlight-PNG-Picture.png' },
    { id: 'pt4', nameAr: 'اسطب خلفي', nameEn: 'Tail Light', categoryId: 'c4', imageUrl: 'https://www.pngmart.com/files/22/Car-Tail-Light-PNG-Transparent.png' },
    { id: 'pt5', nameAr: 'ماكينة', nameEn: 'Engine', categoryId: 'c1', imageUrl: 'https://www.pngmart.com/files/22/Car-Engine-PNG-Transparent.png' },
    { id: 'pt6', nameAr: 'رديتر', nameEn: 'Radiator', categoryId: 'c1', imageUrl: 'https://www.pngmart.com/files/22/Car-Radiator-PNG-Image.png' },
    { id: 'pt7', nameAr: 'فحمات', nameEn: 'Brake Pads', categoryId: 'c2', imageUrl: 'https://www.pngmart.com/files/22/Brake-Pads-PNG-Clipart.png' },
    { id: 'pt8', nameAr: 'هوبات', nameEn: 'Brake Discs', categoryId: 'c2', imageUrl: 'https://www.pngmart.com/files/22/Car-Brake-Disc-PNG-File.png' },
];

// Mock Sellers
export const MOCK_SELLERS: Seller[] = [
    {
        id: 's1',
        storeName: 'متجر الأمين لقطع الغيار',
        ownerName: 'أحمد محمد',
        rating: 4.8,
        totalReviews: 127,
        phone: '+967-777-123-456',
        whatsapp: '+967-777-123-456',
        location: {
            city: 'صنعاء',
            district: 'الزبيري',
            coordinates: { lat: 15.3694, lng: 44.1910 },
        },
        subscriptionTier: 'gold',
        verified: true,
    },
    {
        id: 's2',
        storeName: 'قطع غيار السعيد',
        ownerName: 'خالد علي',
        rating: 4.5,
        totalReviews: 89,
        phone: '+967-733-987-654',
        whatsapp: '+967-733-987-654',
        location: {
            city: 'عدن',
            district: 'المعلا',
            coordinates: { lat: 12.7855, lng: 45.0187 },
        },
        subscriptionTier: 'silver',
        verified: true,
    },
    {
        id: 's3',
        storeName: 'الياسر للسيارات',
        ownerName: 'محمد حسن',
        rating: 4.9,
        totalReviews: 203,
        phone: '+967-771-555-777',
        whatsapp: '+967-771-555-777',
        location: {
            city: 'تعز',
            district: 'صالة',
            coordinates: { lat: 13.5779, lng: 44.0177 },
        },
        subscriptionTier: 'platinum',
        verified: true,
    },
];

// Mock Parts - Mutable for demo purposes
export let MOCK_PARTS: Part[] = [
    {
        id: 'p1',
        title: 'محرك تويوتا كورولا 2015',
        description: 'محرك أصلي بحالة ممتازة، تم فحصه بالكامل وجاهز للتركيب',
        price: 2500000, // 2.5M YER
        condition: 'used',
        quality: 'original',
        partNumber: 'ENG-TYT-CR-2015',
        categoryId: 'c1',
        sellerId: 's1',
        compatibleVehicleIds: ['v1'],
        imageUrls: [
            'https://picsum.photos/seed/engine1/400/300',
            'https://picsum.photos/seed/engine2/400/300',
        ],
        stock: 1,
        views: 245,
        createdAt: '2024-11-15T10:30:00Z',
        updatedAt: '2024-11-25T14:20:00Z',
    },
    {
        id: 'p2',
        title: 'فرامل هايلكس أمامية',
        description: 'طقم فرامل أمامي كامل - أصلي يابان',
        price: 180000, // 180K YER
        condition: 'new',
        quality: 'original',
        partNumber: 'BRK-HIL-FRT',
        categoryId: 'c2',
        sellerId: 's2',
        compatibleVehicleIds: ['v3'],
        imageUrls: [
            'https://picsum.photos/seed/brakes1/400/300',
            'https://picsum.photos/seed/brakes2/400/300',
            'https://picsum.photos/seed/brakes3/400/300',
        ],
        stock: 5,
        views: 156,
        createdAt: '2024-11-20T09:15:00Z',
        updatedAt: '2024-11-26T16:45:00Z',
    },
    {
        id: 'p3',
        title: 'مصباح أمامي كامري 2018',
        description: 'مصباح LED أصلي - يمين',
        price: 450000, // 450K YER
        condition: 'new',
        quality: 'original',
        partNumber: 'LGT-CAM-R-18',
        categoryId: 'c4',
        sellerId: 's3',
        compatibleVehicleIds: ['v2'],
        imageUrls: [
            'https://picsum.photos/seed/headlight1/400/300',
        ],
        stock: 3,
        views: 312,
        createdAt: '2024-11-22T11:00:00Z',
        updatedAt: '2024-11-26T18:30:00Z',
    },
    {
        id: 'p4',
        title: 'طقم إطارات نيسان صني',
        description: '4 إطارات نظيفة جداً - مستعمل بحالة ممتازة',
        price: 320000, // 320K YER
        condition: 'used',
        quality: 'commercial',
        categoryId: 'c3',
        sellerId: 's1',
        compatibleVehicleIds: ['v5'],
        imageUrls: [
            'https://picsum.photos/seed/tires1/400/300',
            'https://picsum.photos/seed/tires2/400/300',
        ],
        stock: 1,
        views: 198,
        createdAt: '2024-11-18T14:20:00Z',
        updatedAt: '2024-11-24T10:15:00Z',
    },
    {
        id: 'p5',
        title: 'كمبروسر تكييف كيا سيراتو',
        description: 'كمبروسر أصلي - ضمان 6 شهور',
        price: 550000, // 550K YER
        condition: 'new',
        quality: 'original',
        partNumber: 'AC-KIA-CRT',
        categoryId: 'c6',
        sellerId: 's2',
        compatibleVehicleIds: ['v6'],
        imageUrls: [
            'https://picsum.photos/seed/compressor1/400/300',
            'https://picsum.photos/seed/compressor2/400/300',
            'https://picsum.photos/seed/compressor3/400/300',
        ],
        stock: 2,
        views: 421,
        createdAt: '2024-11-10T08:45:00Z',
        updatedAt: '2024-11-27T09:00:00Z',
    },
    {
        id: 'p6',
        title: 'باب أمامي كورولا - أيمن',
        description: 'باب خارجي بحالة جيدة جداً - لون فضي',
        price: 280000, // 280K YER
        condition: 'used',
        quality: 'original',
        categoryId: 'c7',
        sellerId: 's3',
        compatibleVehicleIds: ['v1'],
        imageUrls: [
            'https://picsum.photos/seed/door1/400/300',
        ],
        stock: 1,
        views: 167,
        createdAt: '2024-11-19T13:30:00Z',
        updatedAt: '2024-11-25T15:45:00Z',
    },
    {
        id: 'p7',
        title: 'بطارية هايلكس 70 أمبير',
        description: 'بطارية جديدة - ضمان سنة',
        price: 95000, // 95K YER
        condition: 'new',
        quality: 'commercial',
        categoryId: 'c5',
        sellerId: 's1',
        compatibleVehicleIds: ['v3', 'v4'],
        imageUrls: [
            'https://picsum.photos/seed/battery1/400/300',
        ],
        stock: 8,
        views: 532,
        createdAt: '2024-11-12T07:20:00Z',
        updatedAt: '2024-11-27T11:15:00Z',
    },
    {
        id: 'p8',
        title: 'مرايا جانبية كامري - طقم',
        description: 'مرايا كهربائية أصلية - يسار + يمين',
        price: 380000, // 380K YER
        condition: 'new',
        quality: 'original',
        partNumber: 'MIR-CAM-SET',
        categoryId: 'c7',
        sellerId: 's2',
        compatibleVehicleIds: ['v2'],
        imageUrls: [
            'https://picsum.photos/seed/mirrors1/400/300',
            'https://picsum.photos/seed/mirrors2/400/300',
        ],
        stock: 2,
        views: 289,
        createdAt: '2024-11-21T10:00:00Z',
        updatedAt: '2024-11-26T12:30:00Z',
    },
    {
        id: 'p9',
        title: 'دينمو تويوتا هايلكس',
        description: 'دينمو أصلي مضمون - تم فحصه',
        price: 175000, // 175K YER
        condition: 'used',
        quality: 'original',
        partNumber: 'ALT-HIL-2020',
        categoryId: 'c5',
        sellerId: 's3',
        compatibleVehicleIds: ['v3'],
        imageUrls: [
            'https://picsum.photos/seed/alternator1/400/300',
        ],
        stock: 1,
        views: 145,
        createdAt: '2024-11-23T09:45:00Z',
        updatedAt: '2024-11-26T14:00:00Z',
    },
    {
        id: 'p10',
        title: 'شنطة خلفية نيسان صني',
        description: 'شنطة أصلية - بدون خدوش',
        price: 220000, // 220K YER
        condition: 'used',
        quality: 'original',
        categoryId: 'c7',
        sellerId: 's1',
        compatibleVehicleIds: ['v5'],
        imageUrls: [
            'https://picsum.photos/seed/trunk1/400/300',
            'https://picsum.photos/seed/trunk2/400/300',
        ],
        stock: 1,
        views: 203,
        createdAt: '2024-11-17T12:15:00Z',
        updatedAt: '2024-11-24T16:20:00Z',
    },
];



// Mock Chats
export interface Chat {
    id: string;
    buyerName: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    avatarUrl: string;
}

export const MOCK_CHATS: Chat[] = [
    {
        id: 'chat1',
        buyerName: 'محمد أحمد',
        lastMessage: 'هل القطعة ما زالت موجودة؟',
        time: '10:30 ص',
        unreadCount: 2,
        avatarUrl: 'https://ui-avatars.com/api/?name=Mohamed+Ahmed&background=0D8ABC&color=fff',
    },
    {
        id: 'chat2',
        buyerName: 'علي صالح',
        lastMessage: 'كم آخر سعر للماكينة؟',
        time: 'أمس',
        unreadCount: 0,
        avatarUrl: 'https://ui-avatars.com/api/?name=Ali+Saleh&background=random',
    },
    {
        id: 'chat3',
        buyerName: 'ورشة السعادة',
        lastMessage: 'تم تحويل المبلغ',
        time: '25/11',
        unreadCount: 0,
        avatarUrl: 'https://ui-avatars.com/api/?name=Workshop&background=random',
    },
];

// Mock Seller Stats
export const MOCK_SELLER_STATS: Record<string, SellerStats> = {
    s1: {
        totalViews: 1523,
        totalCalls: 89,
        totalChats: 142,
        activeListings: 4,
    },
    s2: {
        totalViews: 956,
        totalCalls: 67,
        totalChats: 98,
        activeListings: 3,
    },
    s3: {
        totalViews: 2145,
        totalCalls: 134,
        totalChats: 201,
        activeListings: 3,
    },
};

// Helper functions to simulate API calls
export const getVehiclesByType = (type: 'car' | 'truck'): Vehicle[] => {
    return MOCK_VEHICLES.filter((v) => v.type === type);
};

export const getPartById = (id: string): Part | undefined => {
    return MOCK_PARTS.find((p) => p.id === id);
};

export const getSellerById = (id: string): Seller | undefined => {
    return MOCK_SELLERS.find((s) => s.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
    return MOCK_CATEGORIES.find((c) => c.id === id);
};

export const getVehicleById = (id: string): Vehicle | undefined => {
    return MOCK_VEHICLES.find((v) => v.id === id);
};

export const getPartsBySellerId = (sellerId: string): Part[] => {
    return MOCK_PARTS.filter((p) => p.sellerId === sellerId);
};

export const addPart = (part: Part): void => {
    MOCK_PARTS.unshift(part);
};

export const updatePart = (part: Part): void => {
    const index = MOCK_PARTS.findIndex((p) => p.id === part.id);
    if (index !== -1) {
        MOCK_PARTS[index] = part;
    }
};

export const deletePart = (id: string): void => {
    MOCK_PARTS = MOCK_PARTS.filter((p) => p.id !== id);
};



export const searchParts = (filters: {
    vehicleType?: 'car' | 'truck';
    make?: string;
    model?: string;
    partName?: string;
    condition?: 'new' | 'used';
    quality?: 'original' | 'commercial';
}): Part[] => {
    let results = [...MOCK_PARTS];

    // Filter by vehicle type
    if (filters.vehicleType) {
        const vehicleIds = MOCK_VEHICLES
            .filter((v) => v.type === filters.vehicleType)
            .map((v) => v.id);
        results = results.filter((part) =>
            part.compatibleVehicleIds.some((vid) => vehicleIds.includes(vid))
        );
    }

    // Filter by make
    if (filters.make) {
        const vehicleIds = MOCK_VEHICLES
            .filter((v) => v.make === filters.make)
            .map((v) => v.id);
        results = results.filter((part) =>
            part.compatibleVehicleIds.some((vid) => vehicleIds.includes(vid))
        );
    }

    // Filter by model
    if (filters.model) {
        const vehicleIds = MOCK_VEHICLES
            .filter((v) => v.model === filters.model)
            .map((v) => v.id);
        results = results.filter((part) =>
            part.compatibleVehicleIds.some((vid) => vehicleIds.includes(vid))
        );
    }

    // Filter by part name
    if (filters.partName && filters.partName.trim() !== '') {
        results = results.filter((part) =>
            part.title.toLowerCase().includes(filters.partName!.toLowerCase())
        );
    }

    // Filter by condition
    if (filters.condition) {
        results = results.filter((part) => part.condition === filters.condition);
    }

    // Filter by quality
    if (filters.quality) {
        results = results.filter((part) => part.quality === filters.quality);
    }

    return results;
};
