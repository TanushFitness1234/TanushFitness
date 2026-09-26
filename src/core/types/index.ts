export type ActiveModule = 'home' | 'about' | 'equipment' | 'manpower' | 'services' | 'contact' | 'admin';

export interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
  visible: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  type: 'rfq' | 'application' | 'service' | 'contact';
  time: string;
  read: boolean;
}

export interface GlobalSearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'equipment' | 'job' | 'service';
  targetPage: ActiveModule;
  image?: string;
}
