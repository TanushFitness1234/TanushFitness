export * from '../core/types';
export * from '../modules/equipment-marketplace/types';
export * from '../modules/manpower-hiring/types';
export * from '../modules/business-growth-services/types';

export type PageType = 'home' | 'about' | 'equipment' | 'manpower' | 'services' | 'contact' | 'admin';

export interface FilterState {
  category: string;
  searchQuery: string;
  brands: string[];
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'rating' | 'name';
}

export interface CartItem {
  product: import('../modules/equipment-marketplace/types').Product;
  quantity: number;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  gymName: string;
  email: string;
  mobile: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied';
}
