import { useState, useEffect } from 'react';
import { User } from '../App';
import { Product, Order, Sale, Boutique, Promotion } from '../utils/dataInitializer';
import { Store, Package, Users, TrendingUp, LogOut, Percent, Send, Plus, Edit2, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'boutiques' | 'products' | 'promotions' | 'messages'>('dashboard');
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [newPromo, setNewPromo] = useState({
    title: '',
    description: '',
    discountPercent: 0,
    startDate: '',
    endDate: ''
  });
  const [message, setMessage] = useState({
    subject: '',
    content: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBoutiques(JSON.parse(localStorage.getItem('boutiques') || '[]'));
    setProducts(JSON.parse(localStorage.getItem('products') || '[]'));
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
    setSales(JSON.parse(localStorage.getItem('sales') || '[]'));
    setPromotions(JSON.parse(localStorage.getItem('promotions') || '[]'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setClients(users.filter((u: User) => u.role === 'client'));
  };

  const createPromotion = () => {
    if (!newPromo.title || !newPromo.description || newPromo.discountPercent <= 0) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const promotion: Promotion = {
      id: `promo-${Date.now()}`,
      title: newPromo.title,
      description: newPromo.description,
      discountPercent: newPromo.discountPercent,
      startDate: newPromo.startDate || new Date().toISOString(),
      endDate: newPromo.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      active: true
    };

    const promotionsData = [...promotions, promotion];
    localStorage.setItem('promotions', JSON.stringify(promotionsData));
    setPromotions(promotionsData);
    setShowPromoForm(false);
    setNewPromo({ title: '', description: '', discountPercent: 0, startDate: '', endDate: '' });
    alert('Promotion créée avec succès!');
  };

  const togglePromotion = (promoId: string) => {
    const updatedPromotions = promotions.map(p =>
      p.id === promoId ? { ...p, active: !p.active } : p
    );
    localStorage.setItem('promotions', JSON.stringify(updatedPromotions));
    setPromotions(updatedPromotions);
  };

  const deletePromotion = (promoId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion?')) {
      const updatedPromotions = promotions.filter(p => p.id !== promoId);
      localStorage.setItem('promotions', JSON.stringify(updatedPromotions));
      setPromotions(updatedPromotions);
    }
  };

  const sendMessage = () => {
    if (!message.subject || !message.content) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // In a real app, this would send emails or push notifications
    alert(`Message "${message.subject}" envoyé à ${clients.length} clients!`);
    setMessage({ subject: '', content: '' });
    setShowMessageForm(false);
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = orders.length;
  const totalClients = clients.length;

  const salesByBoutique = boutiques.map(boutique => ({
    boutique,
    sales: sales.filter(s => s.boutiqueId === boutique.id),
    revenue: sales.filter(s => s.boutiqueId === boutique.id).reduce((sum, s) => sum + s.total, 0)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Egyptian decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 text-9xl animate-pulse" style={{ animationDuration: '4s' }}>𓂠</div>
        <div className="absolute top-40 right-10 text-8xl animate-bounce" style={{ animationDuration: '5s' }}>𓋪</div>
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 shadow-2xl border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">👑 Nefertiti - Palais du Pharaon</h1>
              <p className="text-sm text-yellow-100">Tableau de bord du souverain</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-yellow-100">Pharaon</p>
                <p className="font-semibold text-white">{user.name}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-yellow-100 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Vue d'ensemble</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('boutiques')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'boutiques'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                <span>Boutiques</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Produits</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'promotions'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                <span>Promotions & Soldes</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'messages'
                  ? 'border-yellow-600 text-amber-900 font-bold'
                  : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span>Messages clients</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-green-600">{totalRevenue} DH</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Commandes totales</p>
                    <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clients</p>
                    <p className="text-2xl font-bold text-purple-600">{totalClients}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Store className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Boutiques</p>
                    <p className="text-2xl font-bold text-orange-600">{boutiques.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutiques Performance */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Performance par boutique</h2>
              <div className="space-y-4">
                {salesByBoutique.map(({ boutique, sales, revenue }) => (
                  <div key={boutique.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold">{boutique.name}</h3>
                        <p className="text-sm text-gray-600">{boutique.address}, {boutique.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{revenue} DH</p>
                        <p className="text-sm text-gray-600">{sales.length} ventes</p>
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 rounded-full h-2 transition-all"
                        style={{ width: `${totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Commandes récentes</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">#{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">{order.clientName} - {order.boutiqueName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.total} DH</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'récupérée' ? 'bg-green-100 text-green-700' :
                        order.status === 'prête' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'boutiques' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des boutiques</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boutiques.map(boutique => {
                const boutiqueSales = sales.filter(s => s.boutiqueId === boutique.id);
                const boutiqueRevenue = boutiqueSales.reduce((sum, s) => sum + s.total, 0);
                const boutiqueOrders = orders.filter(o => o.boutiqueId === boutique.id);

                return (
                  <div key={boutique.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{boutique.name}</h3>
                        <p className="text-sm text-gray-600">{boutique.city}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">{boutique.address}</p>
                      <p className="text-sm text-gray-600">{boutique.phone}</p>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ventes totales</span>
                        <span className="font-bold text-green-600">{boutiqueRevenue} DH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Commandes</span>
                        <span className="font-bold">{boutiqueOrders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Transactions</span>
                        <span className="font-bold">{boutiqueSales.length}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des produits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-purple-600 font-medium mb-1">{product.brand}</div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-purple-600">{product.price} DH</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        product.stock > 20 ? 'bg-green-100 text-green-700' :
                        product.stock > 10 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des promotions</h2>
              <button
                onClick={() => setShowPromoForm(!showPromoForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="w-5 h-5" />
                <span>Nouvelle promotion</span>
              </button>
            </div>

            {showPromoForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Créer une promotion</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre</label>
                    <input
                      type="text"
                      value={newPromo.title}
                      onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Soldes d'été"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={newPromo.description}
                      onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="Jusqu'à 50% de réduction sur une sélection de parfums"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Réduction (%)</label>
                      <input
                        type="number"
                        value={newPromo.discountPercent}
                        onChange={(e) => setNewPromo({ ...newPromo, discountPercent: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date de début</label>
                      <input
                        type="date"
                        value={newPromo.startDate}
                        onChange={(e) => setNewPromo({ ...newPromo, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date de fin</label>
                      <input
                        type="date"
                        value={newPromo.endDate}
                        onChange={(e) => setNewPromo({ ...newPromo, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={createPromotion}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700"
                    >
                      Créer la promotion
                    </button>
                    <button
                      onClick={() => setShowPromoForm(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promotions.length === 0 ? (
                <div className="col-span-2 bg-white rounded-xl shadow-md p-8 text-center">
                  <Percent className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Aucune promotion active</p>
                </div>
              ) : (
                promotions.map(promo => (
                  <div key={promo.id} className={`bg-white rounded-xl shadow-md p-6 ${!promo.active && 'opacity-60'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{promo.title}</h3>
                        <p className="text-sm text-gray-600">{promo.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePromotion(promo.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            promo.active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {promo.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4 mb-4">
                      <div className="text-4xl font-bold text-center">-{promo.discountPercent}%</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>Du {new Date(promo.startDate).toLocaleDateString('fr-FR')}</span>
                      <span>Au {new Date(promo.endDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <button
                      onClick={() => deletePromotion(promo.id)}
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Messages aux clients</h2>
              <button
                onClick={() => setShowMessageForm(!showMessageForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700"
              >
                <Send className="w-5 h-5" />
                <span>Nouveau message</span>
              </button>
            </div>

            {showMessageForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Envoyer un message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <input
                      type="text"
                      value={message.subject}
                      onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nouvelles promotions disponibles"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={message.content}
                      onChange={(e) => setMessage({ ...message, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={6}
                      placeholder="Chers clients, nous avons le plaisir de vous annoncer..."
                    />
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      Ce message sera envoyé à <strong>{clients.length} clients</strong> enregistrés.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={sendMessage}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700"
                    >
                      Envoyer le message
                    </button>
                    <button
                      onClick={() => setShowMessageForm(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Base de clients ({clients.length})</h3>
              <div className="space-y-3">
                {clients.map(client => (
                  <div key={client.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Points de fidélité</p>
                      <p className="font-bold text-purple-600">{client.loyaltyPoints || 0} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
