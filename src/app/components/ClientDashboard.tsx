import { useState, useEffect } from 'react';
import { User } from '../App';
import { Product, Order, Boutique } from '../utils/dataInitializer';
import { ShoppingBag, Award, Package, LogOut, Star, Heart } from 'lucide-react';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ClientDashboard({ user, onLogout }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'loyalty'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [selectedBoutique, setSelectedBoutique] = useState<string>('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const productsData = JSON.parse(localStorage.getItem('products') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const boutiquesData = JSON.parse(localStorage.getItem('boutiques') || '[]');
    
    setProducts(productsData);
    setOrders(ordersData.filter((o: Order) => o.clientId === user.id));
    setBoutiques(boutiquesData);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const placeOrder = () => {
    if (cart.length === 0 || !selectedBoutique) {
      alert('Veuillez sélectionner une boutique et ajouter des produits');
      return;
    }

    const boutique = boutiques.find(b => b.id === selectedBoutique);
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const pointsEarned = Math.floor(total / 10);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      clientId: user.id,
      clientName: user.name,
      boutiqueId: selectedBoutique,
      boutiqueName: boutique?.name || '',
      products: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total,
      status: 'en_attente',
      createdAt: new Date().toISOString(),
      pointsEarned
    };

    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    ordersData.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(ordersData));

    // Update user loyalty points
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) =>
      u.id === user.id
        ? { ...u, loyaltyPoints: (u.loyaltyPoints || 0) + pointsEarned }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...user, loyaltyPoints: (user.loyaltyPoints || 0) + pointsEarned }));

    setCart([]);
    loadData();
    setActiveTab('orders');
    alert('Commande passée avec succès!');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Egyptian decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 text-8xl animate-pulse">𓋹</div>
        <div className="absolute top-40 right-20 text-6xl animate-bounce" style={{ animationDuration: '4s' }}>𓃭</div>
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 shadow-2xl border-b-4 border-yellow-400 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              🏛️ Nefertiti
            </h1>
            <p className="text-sm text-yellow-100">Bienvenue, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full border-2 border-yellow-300 shadow-lg">
              <Award className="w-5 h-5 text-amber-900" />
              <span className="font-semibold text-amber-900">{user.loyaltyPoints || 0} points</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-yellow-100 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Produits</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Mes Commandes</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'loyalty'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Fidélité</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="🔍 Rechercher un parfum divin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-amber-50"
                />
              </div>

              <div className="flex gap-2 mb-6">
                {['all', 'femme', 'homme', 'mixte'].map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border-2 ${
                      categoryFilter === category
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white border-yellow-400'
                        : 'bg-amber-50 text-amber-800 hover:bg-yellow-100 border-yellow-300'
                    }`}
                  >
                    {category === 'all' ? 'Tous' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border-2 border-yellow-400 hover:scale-105">
                    <div className="aspect-square bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-amber-700 font-medium mb-1">✨ {product.brand}</div>
                      <h3 className="font-semibold text-lg mb-2 text-amber-900">{product.name}</h3>
                      <p className="text-sm text-amber-700 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-yellow-700">{product.price}</span>
                          <span className="text-amber-700 ml-1">DH</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all border border-yellow-400"
                        >
                          Ajouter
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">Stock: {product.stock} unités</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Panier</h2>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Votre panier est vide</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex gap-3 border-b pb-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">{item.product.brand}</p>
                            <p className="text-purple-600 font-semibold">{item.product.price} DH</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 text-sm hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Choisir une boutique</label>
                      <select
                        value={selectedBoutique}
                        onChange={(e) => setSelectedBoutique(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Sélectionner...</option>
                        {boutiques.map(boutique => (
                          <option key={boutique.id} value={boutique.id}>
                            {boutique.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Total:</span>
                        <span className="text-xl font-bold text-purple-600">{cartTotal} DH</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Points gagnés:</span>
                        <span className="font-medium">+{Math.floor(cartTotal / 10)} points</span>
                      </div>
                    </div>

                    <button
                      onClick={placeOrder}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                    >
                      Réserver
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune commande pour le moment</p>
              </div>
            ) : (
              orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Commande #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-gray-600">{order.boutiqueName}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'récupérée' ? 'bg-green-100 text-green-700' :
                      order.status === 'prête' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'confirmée' ? 'bg-purple-100 text-purple-700' :
                      order.status === 'annulée' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{product.productName} x{product.quantity}</span>
                        <span className="font-medium">{product.price * product.quantity} DH</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span>+{order.pointsEarned} points</span>
                    </div>
                    <div className="text-xl font-bold text-purple-600">{order.total} DH</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Programme de Fidélité</h2>
            
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-xl p-8 text-white mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-purple-100 mb-2">Vos Points</p>
                  <div className="text-5xl font-bold">{user.loyaltyPoints || 0}</div>
                </div>
                <Award className="w-20 h-20 opacity-50" />
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Prochain palier: 500 points</span>
                  <span>{Math.min(100, ((user.loyaltyPoints || 0) / 500) * 100).toFixed(0)}%</span>
                </div>
                <div className="bg-white/30 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all"
                    style={{ width: `${Math.min(100, ((user.loyaltyPoints || 0) / 500) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Comment gagner des points?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Achats en boutique</h4>
                    <p className="text-sm text-gray-600">1 point pour chaque 10 DH dépensés</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 rounded-full p-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Parrainage</h4>
                    <p className="text-sm text-gray-600">50 points pour chaque ami parrainé</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">Récompenses disponibles</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Réduction 10%</h4>
                    <p className="text-sm text-gray-600">Sur votre prochain achat</p>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-600 font-bold">100 pts</div>
                    {(user.loyaltyPoints || 0) >= 100 ? (
                      <button className="text-sm text-purple-600 hover:underline">Échanger</button>
                    ) : (
                      <div className="text-xs text-gray-500">Insuffisant</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Réduction 20%</h4>
                    <p className="text-sm text-gray-600">Sur votre prochain achat</p>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-600 font-bold">200 pts</div>
                    {(user.loyaltyPoints || 0) >= 200 ? (
                      <button className="text-sm text-purple-600 hover:underline">Échanger</button>
                    ) : (
                      <div className="text-xs text-gray-500">Insuffisant</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Parfum miniature offert</h4>
                    <p className="text-sm text-gray-600">Sélection du mois</p>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-600 font-bold">300 pts</div>
                    {(user.loyaltyPoints || 0) >= 300 ? (
                      <button className="text-sm text-purple-600 hover:underline">Échanger</button>
                    ) : (
                      <div className="text-xs text-gray-500">Insuffisant</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
