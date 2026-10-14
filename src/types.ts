export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'categories'
  | 'category_listings'
  | 'professional_profile'
  | 'booking'
  | 'chat'
  | 'worker_profile'
  | 'orders'
  | 'wallet'
  | 'favorites'
  | 'notifications';

export type UserRole = 'client' | 'worker';

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  subcategories: string[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ServiceOffered {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceUnit: string; // e.g., "por diária", "por hora", "por serviço"
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  category: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  price: number;
  priceUnit: string;
  bio: string;
  experienceYears: number;
  completedServicesCount: number;
  satisfactionRate: number; // e.g. 92%
  availableDays: string; // e.g. "Seg a Sáb"
  paymentMethods: string[]; // ["PIX", "Cartão", "Dinheiro"]
  phone: string;
  services: ServiceOffered[];
  reviews: Review[];
  verified: boolean;
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'professional';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalTitle: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  address: string;
  paymentMethod: string;
  notes?: string;
  price: number;
  status: 'pendente' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  roleTitle: string;
  avatar: string;
  email: string;
  phone: string;
  balance: number;
  address: string;
}
