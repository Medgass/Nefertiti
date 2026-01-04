import { useState } from 'react';
import { User } from '../App';
import logo from '/logo_svg.svg';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-4 relative overflow-hidden">
      {/* Egyptian decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">𓋹</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>𓃭</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{ animationDuration: '4s' }}>𓆃</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse" style={{ animationDuration: '3s' }}>𓅓</div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl p-8 border-4 border-yellow-400">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full shadow-xl border-4 border-yellow-300 mb-4">
              <img src={logo} alt="Nefertiti" className="h-16" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent mb-2">
              Nefertiti
            </h1>
            <p className="text-amber-700 font-serif italic">Temple des Parfums Divins</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-amber-50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-amber-50"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 text-white py-3 rounded-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all font-semibold border-2 border-yellow-400 hover:scale-105"
            >
              🔓 Entrer dans le Temple
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-yellow-400">
            <p className="text-sm text-amber-700 mb-3 font-medium">✨ Accès aux Chambres Sacrées:</p>
            <div className="space-y-2 text-xs text-amber-800">
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-2 rounded border border-yellow-400">
                <strong>👑 Pharaon:</strong> admin@nefertiti.com / admin123
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-2 rounded border border-amber-400">
                <strong>🏛️ Grand Prêtre:</strong> gerant@nefertiti.com / gerant123
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-2 rounded border border-yellow-400">
                <strong>📜 Scribe:</strong> vendeur1@nefertiti.com / vendeur123
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-2 rounded border border-amber-400">
                <strong>🌟 Visiteur:</strong> client@email.com / client123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}