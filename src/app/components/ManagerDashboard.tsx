import { useState, useEffect } from 'react';
import { User } from '../App';
import { Boutique, Sale, Order, Product } from '../utils/dataInitializer';
import { Store, Users, UserPlus, LogOut, TrendingUp, MessageSquare, Target } from 'lucide-react';
import { ChatPanel } from './ChatPanel';
import logo from '/logo_svg.svg';

interface ManagerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ManagerDashboard({ user, onLogout }: ManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'clients' | 'chat'>('overview');
  const [boutiques, setBoutiques] = useState<Boutique[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [vendors, setVendors] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    password: '',
    boutiqueId: '',
    salesTarget: 10000
  });
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const boutiquesData = JSON.parse(localStorage.getItem('boutiques') || '[]');
    const salesData = JSON.parse(localStorage.getItem('sales') || '[]');
    const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');

    const myBoutiques = boutiquesData.filter((b: Boutique) => 
      user.boutiqueIds?.includes(b.id)
    );
    setBoutiques(myBoutiques);

    const myBoutiqueIds = myBoutiques.map((b: Boutique) => b.id);
    setSales(salesData.filter((s: Sale) => myBoutiqueIds.includes(s.boutiqueId)));
    setOrders(ordersData.filter((o: Order) => myBoutiqueIds.includes(o.boutiqueId)));
    setVendors(usersData.filter((u: User) => u.role === 'vendor' && myBoutiqueIds.includes(u.boutiqueId || '')));
    setClients(usersData.filter((u: User) => u.role === 'client'));
  };

  const createVendor = () => {
    if (!newVendor.name || !newVendor.email || !newVendor.password || !newVendor.boutiqueId) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    if (usersData.some((u: User) => u.email === newVendor.email)) {
      alert('Cet email existe déjà');
      return;
    }

    const vendor: User = {
      id: `vendor-${Date.now()}`,
      email: newVendor.email,
      password: newVendor.password,
      role: 'vendor',
      name: newVendor.name,
      boutiqueId: newVendor.boutiqueId,
      salesTarget: newVendor.salesTarget,
      currentSales: 0
    };

    usersData.push(vendor);
    localStorage.setItem('users', JSON.stringify(usersData));
    loadData();
    setShowVendorForm(false);
    setNewVendor({ name: '', email: '', password: '', boutiqueId: '', salesTarget: 10000 });
    alert('Vendeur créé avec succès!');
  };

  const createClient = () => {
    if (!newClient.name || !newClient.email || !newClient.password) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    if (usersData.some((u: User) => u.email === newClient.email)) {
      alert('Cet email existe déjà');
      return;
    }

    const client: User = {
      id: `client-${Date.now()}`,
      email: newClient.email,
      password: newClient.password,
      role: 'client',
      name: newClient.name,
      phone: newClient.phone,
      loyaltyPoints: 0
    };

    usersData.push(client);
    localStorage.setItem('users', JSON.stringify(usersData));
    loadData();
    setShowClientForm(false);
    setNewClient({ name: '', email: '', password: '', phone: '' });
    alert('Client créé avec succès!');
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Egyptian decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-20 text-9xl animate-pulse">𓄴</div>
        <div className="absolute bottom-20 right-20 text-8xl animate-bounce" style={{ animationDuration: '6s' }}>𓋹</div>
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 shadow-2xl border-b-4 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Nefertiti" className="h-12 drop-shadow-lg" />
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">🏛️ Espace Grand Prêtre</h1>
                <p className="text-sm text-yellow-100">{user.name}</p>
              </div>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-yellow-100 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b-2 border-yellow-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-yellow-600 text-amber-900 font-bold' : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Vue d'ensemble</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'vendors' ? 'border-yellow-600 text-amber-900 font-bold' : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Vendeurs</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'clients' ? 'border-yellow-600 text-amber-900 font-bold' : 'border-transparent text-amber-700 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span>Clients</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'chat' ? 'border-yellow-600 text-amber-900 font-bold' : 'border-transparent text-amber-700 hover:text-amber-900'
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md p-6 border-2 border-yellow-400">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-200 rounded-full p-3">
                    <TrendingUp className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-yellow-700">{totalRevenue} TND</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl shadow-md p-6 border-2 border-yellow-400">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-200 rounded-full p-3">
                    <Store className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700">Boutiques gérées</p>
                    <p className="text-2xl font-bold text-amber-700">{boutiques.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-md p-6 border-2 border-yellow-400">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-200 rounded-full p-3">
                    <Users className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700">Vendeurs</p>
                    <p className="text-2xl font-bold text-yellow-700">{vendors.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutiques */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Mes Boutiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {boutiques.map(boutique => {
                  const boutiqueSales = sales.filter(s => s.boutiqueId === boutique.id);
                  const revenue = boutiqueSales.reduce((sum, s) => sum + s.total, 0);
                  return (
                    <div key={boutique.id} className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">{boutique.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{boutique.address}, {boutique.city}</p>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ventes</span>
                        <span className="font-bold text-green-600">{revenue} TND</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vendors Performance */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Performance des vendeurs</h2>
              <div className="space-y-4">
                {vendors.map(vendor => {
                  const vendorSales = sales.filter(s => s.vendorId === vendor.id);
                  const vendorRevenue = vendorSales.reduce((sum, s) => sum + s.total, 0);
                  const target = vendor.salesTarget || 10000;
                  const progress = (vendorRevenue / target) * 100;
                  
                  return (
                    <div key={vendor.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {boutiques.find(b => b.id === vendor.boutiqueId)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{vendorRevenue} TND</p>
                          <p className="text-sm text-gray-600">Objectif: {target} TND</p>
                        </div>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3 mt-2">
                        <div
                          className={`rounded-full h-3 transition-all ${
                            progress >= 100 ? 'bg-green-600' : progress >= 70 ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${Math.min(100, progress)}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{progress.toFixed(0)}% de l'objectif</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des vendeurs</h2>
              <button
                onClick={() => setShowVendorForm(!showVendorForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span>Nouveau vendeur</span>
              </button>
            </div>

            {showVendorForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Créer un compte vendeur</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={newVendor.name}
                      onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={newVendor.email}
                      onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={newVendor.password}
                      onChange={(e) => setNewVendor({ ...newVendor, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Boutique</label>
                    <select
                      value={newVendor.boutiqueId}
                      onChange={(e) => setNewVendor({ ...newVendor, boutiqueId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Sélectionner...</option>
                      {boutiques.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Objectif mensuel (TND)</label>
                    <input
                      type="number"
                      value={newVendor.salesTarget}
                      onChange={(e) => setNewVendor({ ...newVendor, salesTarget: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={createVendor} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
                    Créer
                  </button>
                  <button onClick={() => setShowVendorForm(false)} className="px-6 py-2 bg-gray-200 rounded-lg">
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendors.map(vendor => (
                <div key={vendor.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{vendor.name}</h3>
                      <p className="text-sm text-gray-600">{vendor.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Boutique</span>
                      <span className="text-sm font-medium">
                        {boutiques.find(b => b.id === vendor.boutiqueId)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Objectif</span>
                      <span className="text-sm font-medium">{vendor.salesTarget || 0} TND</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des clients</h2>
              <button
                onClick={() => setShowClientForm(!showClientForm)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span>Nouveau client</span>
              </button>
            </div>

            {showClientForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Créer un compte client</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={newClient.password}
                      onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={createClient} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
                    Créer
                  </button>
                  <button onClick={() => setShowClientForm(false)} className="px-6 py-2 bg-gray-200 rounded-lg">
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map(client => (
                <div key={client.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Points</span>
                      <span className="font-bold text-purple-600">{client.loyaltyPoints || 0} pts</span>
                    </div>
                    {client.phone && (
                      <div className="flex justify-between">
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
