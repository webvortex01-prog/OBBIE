import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenId,
  Professional,
  Category,
  Booking,
  ChatMessage,
  UserProfile,
  UserRole
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROFESSIONALS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_BOOKINGS,
  CURRENT_USER
} from '../data/initialData';

export type ViewMode = 'phone' | 'overview' | 'responsive';

interface AppContextType {
  // Navigation
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  screenHistory: ScreenId[];
  goBack: () => void;
  navigateTo: (screen: ScreenId) => void;

  // View modes
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Roles
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleUserRole: () => void;

  // Selected Entities
  selectedProfessional: Professional;
  setSelectedProfessional: (prof: Professional) => void;
  selectProfessionalById: (id: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectCategoryById: (id: string) => void;

  // Data
  categories: Category[];
  professionals: Professional[];
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  cancelBooking: (id: string) => void;

  // Chat
  chatMessages: Record<string, ChatMessage[]>;
  sendMessage: (professionalId: string, text: string) => void;
  activeChatProfessionalId: string;
  setActiveChatProfessionalId: (id: string) => void;

  // Favorites
  favorites: string[]; // ids of professionals
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // User
  currentUser: UserProfile;
  updateUserBalance: (delta: number) => void;

  // Drawer
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;

  // Modals
  publishModalOpen: boolean;
  setPublishModalOpen: (open: boolean) => void;
  activeCallModal: { isOpen: boolean; type: 'voice' | 'video'; professional: Professional | null };
  openCallModal: (type: 'voice' | 'video', professional?: Professional) => void;
  closeCallModal: () => void;
  paymentSuccessBooking: Booking | null;
  setPaymentSuccessBooking: (b: Booking | null) => void;

  // Search & Filter
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  filterModalOpen: boolean;
  setFilterModalOpen: (open: boolean) => void;
  maxDistanceFilter: number;
  setMaxDistanceFilter: (d: number) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (p: number) => void;

  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['home']);
  const [viewMode, setViewMode] = useState<ViewMode>('phone');
  const [userRole, setUserRole] = useState<UserRole>('client');

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [professionals, setProfessionals] = useState<Professional[]>(INITIAL_PROFESSIONALS);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional>(INITIAL_PROFESSIONALS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(INITIAL_CATEGORIES[0]);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('obbi_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('obbi_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [activeChatProfessionalId, setActiveChatProfessionalId] = useState<string>('ana-souza');

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('obbi_favs');
    return saved ? JSON.parse(saved) : ['ana-souza', 'marcos-silva'];
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [publishModalOpen, setPublishModalOpen] = useState<boolean>(false);

  const [activeCallModal, setActiveCallModal] = useState<{
    isOpen: boolean;
    type: 'voice' | 'video';
    professional: Professional | null;
  }>({ isOpen: false, type: 'voice', professional: null });

  const [paymentSuccessBooking, setPaymentSuccessBooking] = useState<Booking | null>(null);

  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [maxDistanceFilter, setMaxDistanceFilter] = useState<number>(10);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(200);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('obbi_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('obbi_chats', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('obbi_favs', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigateTo = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    setDrawerOpen(false);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const selectProfessionalById = (id: string) => {
    const found = professionals.find((p) => p.id === id) || professionals[0];
    setSelectedProfessional(found);
    setActiveChatProfessionalId(found.id);
  };

  const selectCategoryById = (id: string) => {
    const found = categories.find((c) => c.id === id) || categories[0];
    setSelectedCategory(found);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removido dos favoritos' : 'Adicionado aos favoritos!');
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleUserRole = () => {
    const nextRole = userRole === 'client' ? 'worker' : 'client';
    setUserRole(nextRole);
    showToast(
      nextRole === 'worker'
        ? 'Modo Trabalhador ativado! Visualizando como Carlos Lima.'
        : 'Modo Cliente ativado! Visualizando como Gustavo.'
    );
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `ped-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelado' } : b))
    );
    showToast('Pedido cancelado com sucesso.');
  };

  const sendMessage = (professionalId: string, text: string) => {
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: timeStr,
      status: 'sent'
    };

    setChatMessages((prev) => {
      const existing = prev[professionalId] || [];
      return {
        ...prev,
        [professionalId]: [...existing, userMsg]
      };
    });

    // Realistic auto-reply simulation after 1.5 seconds
    setTimeout(() => {
      const replies = [
        'Combinado! Pode contar comigo nesse horário.',
        'Perfeito! Anotei aqui seu endereço e os detalhes.',
        'Se tiver qualquer alteração ou dúvida pode me chamar!',
        'Muito obrigado pela confiança! Já deixei reservado na minha agenda.',
        'Vou levar todos os equipamentos necessários para o serviço.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'professional',
        text: randomReply,
        time: replyTime,
        status: 'read'
      };

      setChatMessages((prev) => {
        const existing = prev[professionalId] || [];
        return {
          ...prev,
          [professionalId]: [...existing, replyMsg]
        };
      });
    }, 1500);
  };

  const updateUserBalance = (delta: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance + delta)
    }));
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const openCallModal = (type: 'voice' | 'video', professional?: Professional) => {
    setActiveCallModal({
      isOpen: true,
      type,
      professional: professional || selectedProfessional
    });
  };

  const closeCallModal = () => {
    setActiveCallModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        screenHistory,
        goBack,
        navigateTo,
        viewMode,
        setViewMode,
        userRole,
        setUserRole,
        toggleUserRole,
        selectedProfessional,
        setSelectedProfessional,
        selectProfessionalById,
        selectedCategory,
        setSelectedCategory,
        selectCategoryById,
        categories,
        professionals,
        bookings,
        addBooking,
        cancelBooking,
        chatMessages,
        sendMessage,
        activeChatProfessionalId,
        setActiveChatProfessionalId,
        favorites,
        toggleFavorite,
        isFavorite,
        currentUser,
        updateUserBalance,
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
        publishModalOpen,
        setPublishModalOpen,
        activeCallModal,
        openCallModal,
        closeCallModal,
        paymentSuccessBooking,
        setPaymentSuccessBooking,
        globalSearchQuery,
        setGlobalSearchQuery,
        filterModalOpen,
        setFilterModalOpen,
        maxDistanceFilter,
        setMaxDistanceFilter,
        maxPriceFilter,
        setMaxPriceFilter,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
