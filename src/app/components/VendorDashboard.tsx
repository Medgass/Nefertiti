import { useState, useEffect } from 'react';
import { User } from '../App';
import { Product, Order, Sale, Boutique } from '../utils/dataInitializer';
import { ShoppingCart, Users, Package, LogOut, DollarSign, TrendingUp, MessageSquare, Target, Search, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { ChatPanel } from './ChatPanel';
import logo from '/logo_svg.svg';

interface VendorDashboardProps {
  user: User;
  onLogout: () => void;
}

interface CartItem {
  product: Product;
  selectedSize: { size: string; price: number; stock: number };
  quantity: number;
}

export function VendorDashboard({ user, onLogout }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pos' | 'orders' | 'sales' | 'clients' | 'chat'>('pos');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [boutique, setBoutique] = useState<Boutique | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'espèces' | 'carte' | 'mobile'>('espèces');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const productsData = JSON.parse(localStorage.getItem('products') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const salesData = JSON.parse(localStorage.getItem('sales') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const boutiquesData = JSON.parse(localStorage.getItem('boutiques') || '[]');

    setProducts(productsData);
    setOrders(ordersData.filter((o: Order) => o.boutiqueId === user.boutiqueId));
    setSales(salesData.filter((s: Sale) => s.boutiqueId === user.boutiqueId));
    setClients(usersData.filter((u: User) => u.role === 'client'));
    setBoutique(boutiquesData.find((b: Boutique) => b.id === user.boutiqueId) || null);
  };

  const addToCart = (product: Product, sizeIndex: number = 0) => {
    const selectedSize = product.sizes[sizeIndex];
    const existingItemIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedSize.size === selectedSize.size
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product, selectedSize, quantity: 1 }]);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((_, i) => i !== index));
    } else {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  };

  const processSale = () => {
    if (cart.length === 0 || !clientName) {
      alert('Veuillez ajouter des produits et entrer le nom du client');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.selectedSize.price * item.quantity), 0);
    const pointsAwarded = Math.floor(total / 10);

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      boutiqueId: user.boutiqueId || '',
      vendorId: user.id,
      clientId: selectedClient || undefined,
      clientName,
      products: cart.map(item => ({
        productId: item.product.id,
        productName: `${item.product.name} ${item.selectedSize.size}`,
        quantity: item.quantity,
        price: item.selectedSize.price
      })),
      total,
      paymentMethod,
      createdAt: new Date().toISOString(),
      pointsAwarded
    };

    const salesData = JSON.parse(localStorage.getItem('sales') || '[]');
    salesData.push(newSale);
    localStorage.setItem('sales', JSON.stringify(salesData));

    // Update product stock
    const productsData = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = productsData.map((p: Product) => {
      const cartItems = cart.filter(item => item.product.id === p.id);
      if (cartItems.length > 0) {
        const updatedSizes = p.sizes.map(size => {
          const cartItem = cartItems.find(item => item.selectedSize.size === size.size);
          if (cartItem) {
            return { ...size, stock: size.stock - cartItem.quantity };
          }
          return size;
        });
        return { ...p, sizes: updatedSizes };
      }
      return p;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update client loyalty points if client is registered
    if (selectedClient) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) =>
        u.id === selectedClient
          ? { ...u, loyaltyPoints: (u.loyaltyPoints || 0) + pointsAwarded }
          : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    // Update vendor sales
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) =>
      u.id === user.id
        ? { ...u, currentSales: (u.currentSales || 0) + total }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setCart([]);
    setClientName('');
    setSelectedClient('');
    loadData();
    alert('Vente enregistrée avec succès!');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = ordersData.map((o: Order) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    loadData();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + (item.selectedSize.price * item.quantity), 0);
  const todaySales = sales.filter(sale => {
    const saleDate = new Date(sale.createdAt).toDateString();
    const today = new Date().toDateString();
    return saleDate === today;
  });
  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const salesProgress = user.salesTarget ? (todayRevenue / user.salesTarget) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Egyptian decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 right-10 text-9xl animate-pulse">𓋪</div>
        <div className="absolute bottom-10 left-10 text-8xl animate-bounce" style={{ animationDuration: '5s' }}>𓄴</div>
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 shadow-2xl border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Nefertiti" className="h-12 drop-shadow-lg" />
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">🏛️ Caisse Nefertiti</h1>
                <p className="text-sm text-yellow-100">{boutique?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-yellow-100">Scribe</p>
                <p className="font-semibold text-white">{user.name}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-yellow-100 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-300">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90">Ventes Aujourd'hui</p>
                  <p className="text-2xl font-bold">{todayRevenue} TND</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-300">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90">Transactions</p>
                  <p className="text-2xl font-bold">{todaySales.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-300">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90">Commandes</p>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'en_attente').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-300">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90">Objectif</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold">{salesProgress.toFixed(0)}%</p>
                    <p className="text-xs opacity-75">/ {user.salesTarget} TND</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('pos')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'pos'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Caisse</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Commandes ({orders.filter(o => o.status !== 'récupérée' && o.status !== 'annulée').length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'sales'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Historique</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'clients'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Clients</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'chat'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Chat</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-medium text-blue-600 mb-1">{product.brand}</div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-1">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {product.sizes.map((size, idx) => (
                          <button
                            key={idx}
                            onClick={() => addToCart(product, idx)}
                            disabled={size.stock === 0}
                            className={`text-xs py-1.5 px-2 rounded-md font-medium transition-colors ${
                              size.stock > 0
                                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <div>{size.size}</div>
                            <div className="font-bold">{size.price} TND</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* POS Cart */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl sticky top-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-xl">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    Panier
                  </h2>
                </div>

                <div className="p-4 space-y-4">
                  {/* Client Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Client</label>
                    <select
                      value={selectedClient}
                      onChange={(e) => {
                        setSelectedClient(e.target.value);
                        const client = clients.find(c => c.id === e.target.value);
                        if (client) setClientName(client.name);
                      }}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Client non enregistré</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name} ({client.loyaltyPoints} pts)
                        </option>
                      ))}
                    </select>
                    {!selectedClient && (
                      <input
                        type="text"
                        placeholder="Nom du client"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  {/* Cart Items */}
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">Panier vide</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {cart.map((item, index) => (
                          <div key={index} className="flex gap-3 border-2 border-gray-100 rounded-lg p-3 bg-gray-50">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.product.name}</h4>
                              <p className="text-xs text-blue-600">{item.selectedSize.size}</p>
                              <p className="text-sm font-bold text-gray-900">{item.selectedSize.price} TND</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center gap-1 bg-white rounded-lg border-2 border-gray-200">
                                <button
                                  onClick={() => updateQuantity(index, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                                >
                                  -
                                </button>
                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(index, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => updateQuantity(index, 0)}
                                className="text-red-500 text-xs hover:text-red-700 font-medium"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Paiement</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['espèces', 'carte', 'mobile'] as const).map(method => (
                            <button
                              key={method}
                              onClick={() => setPaymentMethod(method)}
                              className={`px-3 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                                paymentMethod === method
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {method === 'espèces' && <Banknote className="w-5 h-5" />}
                              {method === 'carte' && <CreditCard className="w-5 h-5" />}
                              {method === 'mobile' && <Smartphone className="w-5 h-5" />}
                              <span className="text-xs capitalize">{method}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sous-total:</span>
                          <span className="font-semibold">{cartTotal} TND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Total:</span>
                          <span className="font-bold text-2xl text-blue-600">{cartTotal} TND</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          +{Math.floor(cartTotal / 10)} points fidélité
                        </div>
                      </div>

                      <button
                        onClick={processSale}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Valider la vente
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Commandes clients</h2>
            {orders.filter(o => o.status !== 'récupérée' && o.status !== 'annulée').length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">Aucune commande active</p>
              </div>
            ) : (
              orders
                .filter(o => o.status !== 'récupérée' && o.status !== 'annulée')
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(order => (
                  <div key={order.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Commande #{order.id.slice(-8)}</h3>
                        <p className="text-sm text-gray-600">{order.clientName}</p>
                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.status === 'prête' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'confirmée' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-4">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{product.productName} x{product.quantity}</span>
                          <span className="font-medium">{product.price * product.quantity} TND</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <div className="text-2xl font-bold text-blue-600">{order.total} TND</div>
                      <div className="flex gap-2">
                        {order.status === 'en_attente' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmée')}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                          >
                            Confirmer
                          </button>
                        )}
                        {order.status === 'confirmée' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'prête')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                          >
                            Prête
                          </button>
                        )}
                        {order.status === 'prête' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'récupérée')}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                          >
                            Récupérée
                          </button>
                        )}
                        <button
                          onClick={() => updateOrderStatus(order.id, 'annulée')}
                          className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Historique des ventes</h2>
            {sales.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <TrendingUp className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">Aucune vente enregistrée</p>
              </div>
            ) : (
              sales
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(sale => (
                  <div key={sale.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Vente #{sale.id.slice(-8)}</h3>
                        <p className="text-sm text-gray-600">{sale.clientName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(sale.createdAt).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(sale.createdAt).toLocaleTimeString('fr-FR')}
                        </p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        {sale.paymentMethod}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 bg-gray-50 rounded-lg p-4">
                      {sale.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{product.productName} x{product.quantity}</span>
                          <span className="font-medium">{product.price * product.quantity} TND</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <div className="text-2xl font-bold text-green-600">{sale.total} TND</div>
                      <div className="text-sm text-gray-600">+{sale.pointsAwarded} points</div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Base de clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map(client => (
                <div key={client.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Points de fidélité</span>
                      <span className="font-bold text-purple-600 text-lg">{client.loyaltyPoints || 0} pts</span>
                    </div>
                    {client.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Téléphone</span>
                        <span className="text-sm">{client.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <ChatPanel currentUser={user} />
        )}
      </div>
    </div>
  );
}
