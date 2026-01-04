import { useState } from 'react';
import { Search } from 'lucide-react';

export default function LandingPage({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [email, setEmail] = useState('');

  const handleStart = () => {
    if (email) {
      onNavigateToLogin();
    }
  };

  const products = [
    { id: 1, name: 'Nébesi Nectarum Ésotéra', color: 'bg-blue-900' },
    { id: 2, name: 'Extrait Extrêm Vermeil', color: 'bg-amber-100' },
    { id: 3, name: 'Essence Divine', color: 'bg-amber-200' },
    { id: 4, name: 'Aurore Royale', color: 'bg-yellow-100' },
    { id: 5, name: 'Parfum des Pharaons', color: 'bg-amber-300' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-button {
          0%, 100% { box-shadow: 0 0 20px rgba(30, 58, 138, 0.4); }
          50% { box-shadow: 0 0 30px rgba(30, 58, 138, 0.8); }
        }
        .hieroglyphics {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='10' y='50' font-size='30' fill='rgba(120,80,20,0.05)'%3E𓀀𓀁𓀂𓀃𓀄%3E%3C/text%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="relative z-50 backdrop-blur-xl bg-white/40 border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo_svg.svg" alt="Nefertiti" className="h-10" />
            <h1 className="font-bold text-xl text-blue-900">NEFERTITI</h1>
          </div>
          <div className="hidden md:flex gap-8">
            {['Collections', 'Parfums', 'Marque', 'Contact'].map(link => (
              <a key={link} href="#" className="text-blue-900/70 hover:text-blue-900 transition text-sm font-medium">
                {link}
              </a>
            ))}
          </div>
          <button className="p-2 rounded-lg bg-blue-900/10 hover:bg-blue-900/20 border border-blue-900/30 transition">
            <Search className="w-5 h-5 text-blue-900" />
          </button>
        </div>
      </nav>

      {/* Hero Section with Pharaoh */}
      <div className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 hieroglyphics" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-96">
          <div style={{ animation: 'fade-in 0.8s ease-out' }}>
            <img
              src="/pharaoh_portrait.svg"
              alt="Pharaoh Tutankhamun"
              className="w-48 h-48 mx-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(217, 119, 6, 0.6))',
                animation: 'float-gentle 4s ease-in-out infinite'
              }}
            />
          </div>
          <h2 className="text-5xl font-black text-white mt-8 mb-4" style={{ animation: 'fade-in 0.8s ease-out 0.2s backwards' }}>
            Nefertiti
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section with Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left - Branding */}
            <div className="lg:col-span-2 space-y-6" style={{ animation: 'slide-in 0.8s ease-out' }}>
              <h3 className="text-4xl font-black text-blue-900">
                Nefertiti
              </h3>
              <p className="text-lg text-blue-900/70 leading-relaxed">
                Découvrez notre exclusive collection de parfums inspirée par l'élégance royale de l'Égypte ancienne. Chaque fragrance raconte une histoire d'opulence, de mystère et de raffinement intemporel. Une expérience olfactive qui transcende le temps.
              </p>
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-blue-900 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-blue-800 transition"
                style={{
                  animation: 'glow-button 2s ease-in-out infinite',
                  boxShadow: '0 0 30px rgba(30, 58, 138, 0.3)'
                }}
              >
                Découvrir
              </button>
            </div>

            {/* Right - Email Input */}
            <div className="flex flex-col justify-center space-y-4" style={{ animation: 'slide-in 0.8s ease-out 0.2s backwards' }}>
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">
                  Rester Informé
                </label>
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-blue-900/30 bg-white/50 backdrop-blur text-blue-900 placeholder-blue-900/40 focus:outline-none focus:border-blue-900 transition"
                />
              </div>
              <button
                onClick={handleStart}
                className="px-6 py-2 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition"
              >
                S'Inscrire
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black text-blue-900">
              Notre Collection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  style={{ animation: `fade-in 0.6s ease-out ${idx * 0.1}s backwards` }}
                >
                  {/* Perfume Bottle Placeholder */}
                  <div className={`${product.color} rounded-2xl h-48 flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-20 bg-white/30 rounded-full mx-auto mb-4" />
                      <div className="w-16 h-6 bg-yellow-600/50 rounded-lg mx-auto mb-3" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h4 className="font-bold text-blue-900 text-sm group-hover:text-blue-700 transition">
                      {product.name}
                    </h4>
                    <p className="text-xs text-blue-900/60">
                      Découvrir
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-20 py-12 bg-gradient-to-r from-blue-900/10 to-yellow-600/10 rounded-3xl border border-blue-900/20 px-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-black text-blue-900 mb-4">
                L'Essence de la Royauté
              </h3>
              <p className="text-blue-900/70 leading-relaxed">
                Chaque parfum Nefertiti est une invitation à explorer les mystères de l'Égypte ancienne. Inspirés par les essences rares et les ingrédients précieux que portaient les pharaons, nos fragrances capturent l'essence intemporelle de la magnificence royale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
