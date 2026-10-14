import { Category, Professional, ChatMessage, Booking, UserProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'faxina',
    name: 'Faxina e limpeza',
    subtitle: 'Casas, apartamentos, escritórios',
    iconName: 'Sparkles',
    iconBgColor: 'bg-blue-50 text-blue-600',
    iconColor: '#0052FF',
    subcategories: ['Todos', 'Residencial', 'Comercial', 'Pós-obra', 'Limpeza pesada']
  },
  {
    id: 'lava-louca',
    name: 'Lava louça',
    subtitle: 'Eventos, restaurantes, residências',
    iconName: 'Utensils',
    iconBgColor: 'bg-sky-50 text-sky-600',
    iconColor: '#0284C7',
    subcategories: ['Todos', 'Eventos', 'Restaurantes', 'Residencial', 'Festas']
  },
  {
    id: 'jardinagem',
    name: 'Jardinagem',
    subtitle: 'Corte de grama, poda, limpeza de quintais',
    iconName: 'Flower2',
    iconBgColor: 'bg-emerald-50 text-emerald-600',
    iconColor: '#059669',
    subcategories: ['Todos', 'Corte de grama', 'Poda de árvores', 'Paisagismo', 'Limpeza']
  },
  {
    id: 'construcao',
    name: 'Construção e reforma',
    subtitle: 'Pintura, alvenaria, reparos',
    iconName: 'Hammer',
    iconBgColor: 'bg-amber-50 text-amber-600',
    iconColor: '#D97706',
    subcategories: ['Todos', 'Pintura', 'Alvenaria', 'Piso e azulejo', 'Gesso']
  },
  {
    id: 'mecanica',
    name: 'Mecânica',
    subtitle: 'Carros, motos, manutenção',
    iconName: 'Wrench',
    iconBgColor: 'bg-indigo-50 text-indigo-600',
    iconColor: '#4F46E5',
    subcategories: ['Todos', 'Carros', 'Motos', 'Auto elétrica', 'Troca de óleo']
  },
  {
    id: 'encanador',
    name: 'Encanador',
    subtitle: 'Instalação e reparos em geral',
    iconName: 'Droplet',
    iconBgColor: 'bg-cyan-50 text-cyan-600',
    iconColor: '#0891B2',
    subcategories: ['Todos', 'Vazamentos', 'Instalação hidráulica', 'Desentupimento', 'Torneiras']
  },
  {
    id: 'eletrica',
    name: 'Elétrica',
    subtitle: 'Instalação e manutenção elétrica',
    iconName: 'Zap',
    iconBgColor: 'bg-yellow-50 text-yellow-600',
    iconColor: '#CA8A04',
    subcategories: ['Todos', 'Quadro de força', 'Tomadas e interruptores', 'Chuveiro', 'Iluminação']
  },
  {
    id: 'outros',
    name: 'Outros serviços',
    subtitle: 'Diversos serviços gerais',
    iconName: 'LayoutGrid',
    iconBgColor: 'bg-violet-50 text-violet-600',
    iconColor: '#7C3AED',
    subcategories: ['Todos', 'Montador de móveis', 'Frete e mudanças', 'Cuidador', 'Passadeira']
  }
];

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'ana-souza',
    name: 'Ana Souza',
    title: 'Faxineira',
    category: 'faxina',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 124,
    distanceKm: 2,
    price: 80.0,
    priceUnit: 'por diária',
    bio: 'Trabalho com limpeza residencial e comercial. Sou responsável, pontual e caprichosa no que faço. Tenho experiência e referências.',
    experienceYears: 3,
    completedServicesCount: 148,
    satisfactionRate: 98,
    availableDays: 'Seg a Sáb',
    paymentMethods: ['PIX', 'Cartão', 'Dinheiro'],
    phone: '(11) 98765-4321',
    verified: true,
    featured: true,
    services: [
      {
        id: 's-ana-1',
        name: 'Faxina Residencial Completa',
        category: 'faxina',
        description: 'Limpeza minuciosa de quartos, banheiros, cozinha e salas.',
        price: 80.0,
        priceUnit: 'por diária'
      },
      {
        id: 's-ana-2',
        name: 'Limpeza Comercial / Escritório',
        category: 'faxina',
        description: 'Organização de mesas, higienização de ambientes coletivos e copas.',
        price: 110.0,
        priceUnit: 'por diária'
      },
      {
        id: 's-ana-3',
        name: 'Limpeza Pós-festa / Evento',
        category: 'faxina',
        description: 'Recolhimento de descartáveis, lavagem de chão e restauração do espaço.',
        price: 95.0,
        priceUnit: 'por diária'
      }
    ],
    reviews: [
      {
        id: 'r-1',
        authorName: 'Mariana Costa',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        comment: 'Excelente profissional! Muito atenciosa e caprichosa. Super recomendo!',
        date: '12/08/2026'
      },
      {
        id: 'r-2',
        authorName: 'Rodrigo Albuquerque',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 4.8,
        comment: 'Chegou no horário combinado e deixou o apartamento brilhando. Contratarei novamente.',
        date: '03/08/2026'
      },
      {
        id: 'r-3',
        authorName: 'Carla Nogueira',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        comment: 'Extremamente educada e cuidadosa com os móveis delicados.',
        date: '28/07/2026'
      }
    ]
  },
  {
    id: 'carlos-lima',
    name: 'Carlos Lima',
    title: 'Faxineiro & Trabalhador Geral',
    category: 'faxina',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 89,
    distanceKm: 3,
    price: 70.0,
    priceUnit: 'por diária',
    bio: 'Profissional multifuncional dedicado a limpezas pesadas, reparos hidráulicos e pequenos consertos elétricos. Mais de 3 anos no mercado garantindo satisfação.',
    experienceYears: 3,
    completedServicesCount: 12,
    satisfactionRate: 92,
    availableDays: 'Seg a Sáb',
    paymentMethods: ['PIX', 'Cartão', 'Dinheiro'],
    phone: '(11) 97654-3210',
    verified: true,
    featured: true,
    services: [
      {
        id: 's-carlos-1',
        name: 'Encanador',
        category: 'encanador',
        description: 'Instalações e reparos hidráulicos, torneiras e canos.',
        price: 80.0,
        priceUnit: 'por serviço'
      },
      {
        id: 's-carlos-2',
        name: 'Elétrica',
        category: 'eletrica',
        description: 'Instalações e manutenção preventiva e corretiva.',
        price: 90.0,
        priceUnit: 'por serviço'
      },
      {
        id: 's-carlos-3',
        name: 'Pequenos reparos',
        category: 'outros',
        description: 'Geral, fixação de suportes, tomadas e maçanetas.',
        price: 70.0,
        priceUnit: 'por serviço'
      }
    ],
    reviews: [
      {
        id: 'r-4',
        authorName: 'Felipe Mendes',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        comment: 'Resolveu o vazamento da pia em 30 minutos e ainda verificou o chuveiro.',
        date: '10/08/2026'
      }
    ]
  },
  {
    id: 'juliana-alves',
    name: 'Juliana Alves',
    title: 'Faxineira Especialista',
    category: 'faxina',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewsCount: 56,
    distanceKm: 4,
    price: 90.0,
    priceUnit: 'por diária',
    bio: 'Especialista em organização e higienização residencial. Atendo casas de médio e grande porte, com produtos próprios e técnica profissional.',
    experienceYears: 4,
    completedServicesCount: 78,
    satisfactionRate: 100,
    availableDays: 'Seg a Sex',
    paymentMethods: ['PIX', 'Cartão'],
    phone: '(11) 96543-2109',
    verified: true,
    services: [
      {
        id: 's-ju-1',
        name: 'Faxina Premium + Organização de Armários',
        category: 'faxina',
        description: 'Higienização completa e método de dobra inteligente.',
        price: 90.0,
        priceUnit: 'por diária'
      }
    ],
    reviews: [
      {
        id: 'r-5',
        authorName: 'Patricia Lima',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        comment: 'Nota 1000! Organização impecável e simpatia incomparável.',
        date: '08/08/2026'
      }
    ]
  },
  {
    id: 'roberto-santos',
    name: 'Roberto Santos',
    title: 'Faxineiro e Lavador de Estofados',
    category: 'faxina',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: 43,
    distanceKm: 5,
    price: 75.0,
    priceUnit: 'por diária',
    bio: 'Limpeza de garagens, quintais, janelas altas e lavagem a seco de sofás e tapetes. Trabalho rápido e com maquinário próprio.',
    experienceYears: 2,
    completedServicesCount: 52,
    satisfactionRate: 94,
    availableDays: 'Ter a Dom',
    paymentMethods: ['PIX', 'Dinheiro'],
    phone: '(11) 95432-1098',
    verified: true,
    services: [
      {
        id: 's-rob-1',
        name: 'Limpeza de Janelas e Fachadas',
        category: 'faxina',
        description: 'Limpeza externa e interna sem deixar manchas.',
        price: 75.0,
        priceUnit: 'por diária'
      }
    ],
    reviews: [
      {
        id: 'r-6',
        authorName: 'Guilherme Castro',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 4.8,
        comment: 'Limpeza do meu quintal ficou perfeita.',
        date: '02/08/2026'
      }
    ]
  },
  {
    id: 'marcos-silva',
    name: 'Marcos Silva',
    title: 'Eletricista Residencial e Predial',
    category: 'eletrica',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 110,
    distanceKm: 1.8,
    price: 90.0,
    priceUnit: 'por serviço',
    bio: 'Eletricista credenciado pelo SENAI. Instalação de quadros de disjuntores, chuveiros, tomadas inteligentes e iluminação LED.',
    experienceYears: 6,
    completedServicesCount: 230,
    satisfactionRate: 99,
    availableDays: 'Seg a Sáb',
    paymentMethods: ['PIX', 'Cartão', 'Dinheiro'],
    phone: '(11) 94321-0987',
    verified: true,
    featured: true,
    services: [
      {
        id: 's-marcos-1',
        name: 'Instalação de Chuveiro e Disjuntor',
        category: 'eletrica',
        description: 'Fiação adequada e aterramento seguro.',
        price: 90.0,
        priceUnit: 'por serviço'
      }
    ],
    reviews: []
  },
  {
    id: 'lucas-jardim',
    name: 'Lucas Pinho',
    title: 'Jardineiro e Paisagista',
    category: 'jardinagem',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 64,
    distanceKm: 3.2,
    price: 85.0,
    priceUnit: 'por serviço',
    bio: 'Cuido do seu jardim com carinho e precisão: poda de cercas vivas, corte de grama, adubação orgânica e controle de pragas.',
    experienceYears: 5,
    completedServicesCount: 95,
    satisfactionRate: 97,
    availableDays: 'Seg a Sáb',
    paymentMethods: ['PIX', 'Cartão'],
    phone: '(11) 93210-9876',
    verified: true,
    services: [
      {
        id: 's-lucas-1',
        name: 'Manutenção de Jardim e Gramado',
        category: 'jardinagem',
        description: 'Corte de grama até 200m² e poda de acabamento.',
        price: 85.0,
        priceUnit: 'por serviço'
      }
    ],
    reviews: []
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'ana-souza': [
    {
      id: 'm-1',
      sender: 'user',
      text: 'Oi, Ana! Tudo bem? Queria saber se você tem disponibilidade na próxima sexta-feira?',
      time: '16:24',
      status: 'read'
    },
    {
      id: 'm-2',
      sender: 'professional',
      text: 'Oi! Tenho sim, posso sim. Qual horário você precisa?',
      time: '16:27',
      status: 'read'
    },
    {
      id: 'm-3',
      sender: 'user',
      text: 'Seria pela manhã, se possível. Pode ser das 8h às 12h?',
      time: '16:28',
      status: 'read'
    },
    {
      id: 'm-4',
      sender: 'professional',
      text: 'Perfeito! Pode ser sim. Vou te enviar o valor total por este serviço.',
      time: '16:29',
      status: 'read'
    },
    {
      id: 'm-5',
      sender: 'user',
      text: 'Beleza! Pode confirmar pra mim e já faço o pagamento pelo app.',
      time: '16:30',
      status: 'sent'
    }
  ],
  'carlos-lima': [
    {
      id: 'm-c1',
      sender: 'user',
      text: 'Boa tarde Carlos! Você faz conserto de vazamento de sifão?',
      time: '14:10',
      status: 'read'
    },
    {
      id: 'm-c2',
      sender: 'professional',
      text: 'Olá! Faço sim, levo os materiais ou você já tem as peças compradas?',
      time: '14:15',
      status: 'read'
    }
  ]
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ped-1049',
    professionalId: 'ana-souza',
    professionalName: 'Ana Souza',
    professionalAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    professionalTitle: 'Faxineira',
    serviceName: 'Faxina Residencial Completa',
    date: '17/10/2026',
    timeSlot: '08:00 às 12:00',
    address: 'Av. Paulista, 1000 - Apto 42, Bela Vista, São Paulo - SP',
    paymentMethod: 'PIX (pago no app)',
    notes: 'Favor trazer produtos antialérgicos se possível.',
    price: 80.0,
    status: 'confirmado',
    createdAt: '14/10/2026 09:30'
  },
  {
    id: 'ped-1032',
    professionalId: 'carlos-lima',
    professionalName: 'Carlos Lima',
    professionalAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    professionalTitle: 'Encanador',
    serviceName: 'Reparo de Torneira e Válvula',
    date: '12/10/2026',
    timeSlot: '14:00 às 16:00',
    address: 'Rua Augusta, 450 - Consolação, São Paulo - SP',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Válvula de descarga travando.',
    price: 80.0,
    status: 'concluido',
    createdAt: '10/10/2026 15:20'
  }
];

export const CURRENT_USER: UserProfile = {
  name: 'Gustavo',
  roleTitle: 'Usuário',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  email: 'gustavo.almeida@email.com',
  phone: '(11) 98123-4567',
  balance: 350.0,
  address: 'Av. Paulista, 1000 - Apto 42, São Paulo - SP'
};
