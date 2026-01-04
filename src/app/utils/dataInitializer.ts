export interface Product {
  id: string;
  name: string;
  brand: string;
  sizes: { size: string; price: number; stock: number }[];
  image: string;
  description: string;
  category: 'homme' | 'femme' | 'mixte';
  promotionId?: string; // Link to active promotion
}

export interface Boutique {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  boutiqueId: string;
  boutiqueName: string;
  products: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'en_attente' | 'confirmée' | 'prête' | 'récupérée' | 'annulée';
  createdAt: string;
  pointsEarned: number;
}

export interface Sale {
  id: string;
  boutiqueId: string;
  vendorId: string;
  clientId?: string;
  clientName: string;
  products: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: 'espèces' | 'carte' | 'mobile';
  createdAt: string;
  pointsAwarded: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  active: boolean;
  productIds: string[]; // Can be empty array for "all products"
  applyToAll?: boolean; // If true, applies to all products
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  createdBy: string;
  recipientRole: 'client' | 'all';
  read: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  timestamp: string;
  recipientId?: string; // Optional for direct messages
}

export const initializeData = () => {
  // Initialize Users
  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: 'admin1',
        email: 'admin@nefertiti.com',
        password: 'admin123',
        role: 'admin',
        name: 'Administrateur Nefertiti'
      },
      {
        id: 'manager1',
        email: 'gerant@nefertiti.com',
        password: 'gerant123',
        role: 'manager',
        name: 'Mohamed Gharbi',
        boutiqueIds: ['boutique1', 'boutique2']
      },
      {
        id: 'vendor1',
        email: 'vendeur1@nefertiti.com',
        password: 'vendeur123',
        role: 'vendor',
        name: 'Fatima Benali',
        boutiqueId: 'boutique1',
        salesTarget: 15000,
        currentSales: 0
      },
      {
        id: 'vendor2',
        email: 'vendeur2@nefertiti.com',
        password: 'vendeur123',
        role: 'vendor',
        name: 'Karim Mansouri',
        boutiqueId: 'boutique2',
        salesTarget: 12000,
        currentSales: 0
      },
      {
        id: 'client1',
        email: 'client@email.com',
        password: 'client123',
        role: 'client',
        name: 'Amina Chakri',
        phone: '+216 20 123 456',
        loyaltyPoints: 450
      },
      {
        id: 'client2',
        email: 'sarah@email.com',
        password: 'client123',
        role: 'client',
        name: 'Sarah Alami',
        phone: '+216 22 987 654',
        loyaltyPoints: 230
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Initialize Boutiques
  if (!localStorage.getItem('boutiques')) {
    const boutiques: Boutique[] = [
      {
        id: 'boutique1',
        name: 'Nefertiti Tunis Centre',
        address: 'Avenue Habib Bourguiba',
        city: 'Tunis',
        phone: '+216 71 123 456'
      },
      {
        id: 'boutique2',
        name: 'Nefertiti Sousse',
        address: 'Avenue Léopold Sédar Senghor',
        city: 'Sousse',
        phone: '+216 73 456 789'
      },
      {
        id: 'boutique3',
        name: 'Nefertiti Sfax',
        address: 'Avenue Majida Boulila',
        city: 'Sfax',
        phone: '+216 74 987 654'
      }
    ];
    localStorage.setItem('boutiques', JSON.stringify(boutiques));
  }

  // Initialize Products
  if (!localStorage.getItem('products')) {
    const products: Product[] = [
      {
        id: 'prod1',
        name: 'La Vie Est Belle',
        brand: 'Lancôme',
        sizes: [
          { size: '15ml', price: 299, stock: 30 },
          { size: '30ml', price: 549, stock: 45 },
          { size: '50ml', price: 899, stock: 35 },
          { size: '100ml', price: 1599, stock: 20 }
        ],
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
        description: 'Eau de Parfum pour femme, notes florales et gourmandes',
        category: 'femme'
      },
      {
        id: 'prod2',
        name: 'Sauvage',
        brand: 'Dior',
        sizes: [
          { size: '15ml', price: 350, stock: 25 },
          { size: '30ml', price: 650, stock: 38 },
          { size: '60ml', price: 1050, stock: 30 },
          { size: '100ml', price: 1750, stock: 15 }
        ],
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400',
        description: 'Eau de Toilette pour homme, frais et épicé',
        category: 'homme'
      },
      {
        id: 'prod3',
        name: 'Chanel N°5',
        brand: 'Chanel',
        sizes: [
          { size: '15ml', price: 450, stock: 20 },
          { size: '35ml', price: 850, stock: 25 },
          { size: '50ml', price: 1250, stock: 18 },
          { size: '100ml', price: 2200, stock: 10 }
        ],
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
        description: 'Parfum iconique pour femme, bouquet floral aldehydé',
        category: 'femme'
      },
      {
        id: 'prod4',
        name: 'Bleu de Chanel',
        brand: 'Chanel',
        sizes: [
          { size: '20ml', price: 400, stock: 28 },
          { size: '50ml', price: 950, stock: 32 },
          { size: '100ml', price: 1650, stock: 16 },
          { size: '150ml', price: 2300, stock: 8 }
        ],
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400',
        description: 'Eau de Parfum pour homme, boisé aromatique',
        category: 'homme'
      },
      {
        id: 'prod5',
        name: 'Black Opium',
        brand: 'Yves Saint Laurent',
        sizes: [
          { size: '15ml', price: 320, stock: 40 },
          { size: '30ml', price: 580, stock: 50 },
          { size: '50ml', price: 950, stock: 35 },
          { size: '90ml', price: 1600, stock: 25 }
        ],
        image: 'https://images.unsplash.com/photo-1588405748879-acb4afc2f30c?w=400',
        description: 'Eau de Parfum pour femme, oriental gourmand',
        category: 'femme'
      },
      {
        id: 'prod6',
        name: "L'Homme",
        brand: 'Yves Saint Laurent',
        sizes: [
          { size: '20ml', price: 350, stock: 35 },
          { size: '40ml', price: 650, stock: 40 },
          { size: '60ml', price: 850, stock: 28 },
          { size: '100ml', price: 1400, stock: 20 }
        ],
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
        description: 'Eau de Toilette pour homme, frais et boisé',
        category: 'homme'
      },
      {
        id: 'prod7',
        name: 'Acqua di Gioia',
        brand: 'Giorgio Armani',
        sizes: [
          { size: '15ml', price: 280, stock: 30 },
          { size: '30ml', price: 520, stock: 35 },
          { size: '50ml', price: 780, stock: 25 },
          { size: '100ml', price: 1350, stock: 17 }
        ],
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
        description: 'Eau de Parfum pour femme, frais aquatique',
        category: 'femme'
      },
      {
        id: 'prod8',
        name: 'Armani Code',
        brand: 'Giorgio Armani',
        sizes: [
          { size: '20ml', price: 380, stock: 25 },
          { size: '50ml', price: 920, stock: 28 },
          { size: '75ml', price: 1350, stock: 18 },
          { size: '110ml', price: 1840, stock: 14 }
        ],
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
        description: 'Eau de Toilette pour homme, oriental sensuel',
        category: 'homme'
      },
      {
        id: 'prod9',
        name: 'Good Girl',
        brand: 'Carolina Herrera',
        sizes: [
          { size: '15ml', price: 370, stock: 22 },
          { size: '30ml', price: 680, stock: 30 },
          { size: '50ml', price: 1080, stock: 20 },
          { size: '80ml', price: 1720, stock: 15 }
        ],
        image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400',
        description: 'Eau de Parfum pour femme, floral oriental',
        category: 'femme'
      },
      {
        id: 'prod10',
        name: 'CK One',
        brand: 'Calvin Klein',
        sizes: [
          { size: '15ml', price: 180, stock: 50 },
          { size: '50ml', price: 450, stock: 60 },
          { size: '100ml', price: 750, stock: 40 },
          { size: '200ml', price: 1100, stock: 30 }
        ],
        image: 'https://images.unsplash.com/photo-1592124549776-a7f0cc973b24?w=400',
        description: 'Eau de Toilette mixte, frais et universel',
        category: 'mixte'
      }
    ];
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Initialize Orders
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }

  // Initialize Sales
  if (!localStorage.getItem('sales')) {
    localStorage.setItem('sales', JSON.stringify([]));
  }

  // Initialize Promotions
  if (!localStorage.getItem('promotions')) {
    localStorage.setItem('promotions', JSON.stringify([]));
  }

  // Initialize Notifications
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }

  // Initialize Chat Messages
  if (!localStorage.getItem('chatMessages')) {
    localStorage.setItem('chatMessages', JSON.stringify([]));
  }
};