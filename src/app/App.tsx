import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { ClientDashboard } from './components/ClientDashboard';
import { VendorDashboard } from './components/VendorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { initializeData } from './utils/dataInitializer';

export type UserRole = 'client' | 'vendor' | 'admin' | 'manager';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
  loyaltyPoints?: number;
  boutiqueId?: string;
  boutiqueIds?: string[]; // For managers with multiple boutiques
  salesTarget?: number; // Monthly target for vendors
  currentSales?: number; // Current month sales
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Initialize data on first load
    initializeData();

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setShowLanding(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setShowLanding(true);
  };

  const handleNavigateToLogin = () => {
    setShowLanding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="text-2xl text-amber-600 animate-pulse">Chargement...</div>
      </div>
    );
  }

  if (showLanding && !currentUser) {
    return <LandingPage onNavigateToLogin={handleNavigateToLogin} />;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  switch (currentUser.role) {
    case 'client':
      return <ClientDashboard user={currentUser} onLogout={handleLogout} />;
    case 'vendor':
      return <VendorDashboard user={currentUser} onLogout={handleLogout} />;
    case 'admin':
      return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
    case 'manager':
      return <ManagerDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return <LoginPage onLogin={handleLogin} />;
  }
}

export default App;