import React from 'react';
import {
  Sparkles,
  Utensils,
  Flower2,
  Hammer,
  Wrench,
  Droplet,
  Zap,
  LayoutGrid,
  Shield,
  HelpCircle,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Share2,
  Heart,
  ChevronRight,
  ArrowLeft,
  Bell,
  SlidersHorizontal,
  Send,
  Phone,
  Video,
  Plus,
  Home,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  Wallet,
  LogOut,
  X,
  CreditCard,
  QrCode,
  DollarSign,
  Search
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  switch (name.toLowerCase()) {
    case 'sparkles':
    case 'faxina':
    case 'faxina e limpeza':
      return <Sparkles className={className} size={size} />;
    case 'utensils':
    case 'lava louça':
    case 'lava-louca':
      return <Utensils className={className} size={size} />;
    case 'flower2':
    case 'jardinagem':
      return <Flower2 className={className} size={size} />;
    case 'hammer':
    case 'construcao':
    case 'construção e reforma':
      return <Hammer className={className} size={size} />;
    case 'wrench':
    case 'mecanica':
    case 'mecânica':
      return <Wrench className={className} size={size} />;
    case 'droplet':
    case 'encanador':
      return <Droplet className={className} size={size} />;
    case 'zap':
    case 'eletrica':
    case 'elétrica':
      return <Zap className={className} size={size} />;
    case 'layoutgrid':
    case 'outros':
    case 'outros serviços':
    default:
      return <LayoutGrid className={className} size={size} />;
  }
};

export {
  Sparkles,
  Utensils,
  Flower2,
  Hammer,
  Wrench,
  Droplet,
  Zap,
  LayoutGrid,
  Shield,
  HelpCircle,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Share2,
  Heart,
  ChevronRight,
  ArrowLeft,
  Bell,
  SlidersHorizontal,
  Send,
  Phone,
  Video,
  Plus,
  Home,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  Wallet,
  LogOut,
  X,
  CreditCard,
  QrCode,
  DollarSign,
  Search
};
