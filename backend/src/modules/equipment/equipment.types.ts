export interface CreateProductInput {
  title: string;
  slug?: string;
  brand: string;
  category: string; // Category ID or Name
  type: string;     // e.g. Cardio, Strength, Accessories
  application: string; // e.g. Commercial Gym, Hotel, Corporate Gym
  description: string;
  features?: string[];
  specifications?: Record<string, any>;
  compatibleEquipment?: string[];
  images: string[];
  isFeatured?: boolean;
}

export interface ProductQueryFilters {
  search?: string;
  category?: string;
  brand?: string;
  type?: string;
  application?: string;
  page?: number;
  limit?: number;
}

export interface CreateEquipmentEnquiryInput {
  gymName: string;
  city: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
    notes?: string;
  }>;
}
