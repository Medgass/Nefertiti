import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import logo from '/logo_svg.svg';

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

export function LandingPage({ onNavigateToLogin }: LandingPageProps) {
  const [email, setEmail] = useState('');

  const handleStart = () => {
    onNavigateToLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900">
      {/* Premium Background with Gradient Mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)
          `,
          animation: 'mesh-shift 15s ease-in-out infinite'
        }} />
      </div>

      {/* Grid Pattern - Premium look */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(0deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px, transparent 40px, rgba(217, 119, 6, 0.1) 40px),
                           linear-gradient(90deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px, transparent 40px, rgba(217, 119, 6, 0.1) 40px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Gradient Orbs - Premium NFT feel */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-yellow-600/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animation: 'float-orbit 20s ease-in-out infinite' }}></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float-orbit-reverse 25s ease-in-out infinite' }}></div>

      {/* Premium Navigation */}
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-20 py-8 backdrop-blur-xl bg-slate-950/40 border-b border-yellow-600/20 shadow-2xl">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Nefertiti NFT" className="h-12 md:h-14 drop-shadow-2xl filter brightness-110" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 drop-shadow-lg">
              NEFERTITI
            </h1>
            <p className="text-xs text-yellow-600/80 font-semibold tracking-widest">NFT COLLECTION</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-yellow-100/80">
          <a href="#collection" className="hover:text-yellow-300 transition-all duration-300 font-medium hover:drop-shadow-lg">Collection</a>
          <a href="#rarity" className="hover:text-yellow-300 transition-all duration-300 font-medium">Rarity</a>
          <a href="#roadmap" className="hover:text-yellow-300 transition-all duration-300 font-medium">Roadmap</a>
          <a href="#contact" className="hover:text-yellow-300 transition-all duration-300 font-medium">Contact</a>
          <button className="p-3 hover:bg-yellow-500/20 rounded-full transition-all border border-yellow-600/30 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30">
            <Search className="w-5 h-5 text-yellow-400" />
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="relative z-30 flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-100px)] px-8 md:px-20 gap-12">
        
        {/* Left Content - Premium Typography */}
        <div className="w-full md:w-1/2 space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-600/50 backdrop-blur-sm">
            <p className="text-yellow-300 text-sm font-bold tracking-widest">🔱 ETHEREAL COLLECTION</p>
          </div>

          {/* Main Heading */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500">
              Ancient
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-300">
              Royalty
            </span>
            <br />
            <span className="inline-block relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-600">
                Reimagined
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm"></div>
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-yellow-100/90 font-light leading-relaxed max-w-lg border-l-4 border-yellow-500/60 pl-6 py-4 backdrop-blur-sm bg-amber-900/20 rounded">
            Experience the magnificence of Egypt's divine rulers through cutting-edge digital art. Ultra-realistic portraits infused with ancient mystique and futuristic elegance.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="p-4 bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/40 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
              <p className="text-3xl font-black text-yellow-300">999</p>
              <p className="text-yellow-200/70 text-sm font-semibold">TOTAL NFTs</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-600/20 to-orange-600/10 border border-yellow-600/40 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
              <p className="text-3xl font-black text-yellow-300">12</p>
              <p className="text-yellow-200/70 text-sm font-semibold">RARITIES</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1 max-w-md group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your wallet address..."
                className="w-full px-6 py-4 rounded-lg bg-slate-950/60 border-2 border-yellow-600/40 text-yellow-100 placeholder-yellow-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/60 focus:border-yellow-400 transition-all shadow-lg backdrop-blur-sm group-hover:border-yellow-400/80 group-hover:shadow-yellow-500/40 group-hover:shadow-lg font-medium"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-5 blur transition-opacity pointer-events-none"></div>
            </div>
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 text-slate-950 font-black rounded-lg hover:shadow-2xl hover:shadow-yellow-500/70 transform hover:scale-105 transition-all duration-300 whitespace-nowrap border-2 border-yellow-300/50 animate-glow-button text-lg tracking-wider"
            >
              🔱 MINT NOW
            </button>
          </div>
        </div>

        {/* Right Side - Ultra Realistic NFT Gallery */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative h-screen perspective">
          {/* Premium Gallery Container */}
          <div className="relative w-full h-full max-w-xl max-h-[600px] flex items-center justify-center">
            {/* Central Premium NFT Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-500/40 backdrop-blur-xl bg-gradient-to-br from-slate-900/50 to-amber-900/30 p-3" style={{
                boxShadow: '0 0 60px rgba(217, 119, 6, 0.4), inset 0 0 60px rgba(217, 119, 6, 0.1)',
                animation: 'nft-float 4s ease-in-out infinite'
              }}>
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-amber-900">
                  <img 
                    src="/egyptian_portrait_3d_artistic.svg" 
                    alt="Nefertiti NFT - Ultra Realistic" 
                    className="w-full h-full object-cover drop-shadow-2xl" 
                    style={{
                      filter: 'drop-shadow(0 0 80px rgba(217, 119, 6, 0.8))',
                      animation: 'pulse-nft 3s ease-in-out infinite'
                    }}
                  />
                  {/* NFT Overlay Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-yellow-500/60 text-yellow-300 text-xs font-bold">
                    #001 LEGENDARY
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting NFT Cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card 1 */}
              <div className="absolute w-40 h-52 rounded-xl overflow-hidden border border-yellow-500/30 shadow-xl" style={{
                animation: 'orbit-nft 14s linear infinite',
                transformOrigin: 'center center'
              }}>
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-amber-900 p-2">
                  <img 
                    src="/pharaoh_portrait.svg" 
                    alt="Pharaoh NFT" 
                    className="w-full h-full object-cover drop-shadow-lg filter opacity-85 hover:opacity-100 transition-opacity rounded-lg" 
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(217, 119, 6, 0.5))',
                      animation: 'pulse-card 3s ease-in-out infinite'
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-yellow-300 text-xs font-bold">
                    #015 RARE
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute w-40 h-52 rounded-xl overflow-hidden border border-yellow-500/30 shadow-xl" style={{
                animation: 'orbit-nft 14s linear infinite reverse',
                animationDelay: '4.66s',
                transformOrigin: 'center center'
              }}>
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-amber-900 p-2">
                  <img 
                    src="/nefertiti_profile.svg" 
                    alt="Nefertiti NFT" 
                    className="w-full h-full object-cover drop-shadow-lg filter opacity-85 hover:opacity-100 transition-opacity rounded-lg" 
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(217, 119, 6, 0.5))',
                      animation: 'pulse-card 3s ease-in-out infinite 1s'
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-yellow-300 text-xs font-bold">
                    #042 EPIC
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute w-40 h-52 rounded-xl overflow-hidden border border-yellow-500/30 shadow-xl" style={{
                animation: 'orbit-nft 14s linear infinite',
                animationDelay: '9.33s',
                transformOrigin: 'center center'
              }}>
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-amber-900 p-2">
                  <img 
                    src="/egyptian_portrait_3d_artistic.svg" 
                    alt="Egyptian Portrait NFT" 
                    className="w-full h-full object-cover drop-shadow-lg filter opacity-85 hover:opacity-100 transition-opacity rounded-lg" 
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(217, 119, 6, 0.5))',
                      animation: 'pulse-card 3s ease-in-out infinite 2s'
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-yellow-300 text-xs font-bold">
                    #087 RARE
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-500/30" style={{
              boxShadow: '0 0 80px rgba(217, 119, 6, 0.3), inset 0 0 80px rgba(217, 119, 6, 0.15)',
              animation: 'rotate-ring 20s linear infinite'
            }} />
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <button 
        onClick={handleStart}
        className="fixed bottom-8 right-8 flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-slate-950 rounded-xl border-2 border-yellow-300/60 hover:shadow-2xl hover:shadow-yellow-500/70 transform hover:scale-110 transition-all duration-300 font-black text-lg shadow-xl z-50 group"
        style={{
          animation: 'pulse-button 2s ease-in-out infinite'
        }}
      >
        <span>🎨 EXPLORE</span>
        <Zap className="w-5 h-5 group-hover:animate-spin" />
      </button>

      {/* Premium Animations */}
      <style>{`
        @keyframes mesh-shift {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes float-orbit {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }

        @keyframes float-orbit-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-20px); }
        }

        @keyframes nft-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }

        @keyframes orbit-nft {
          0% {
            transform: translate(0, 0) rotate(0deg) translateX(180px) rotate(0deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) translateX(180px) rotate(-360deg);
          }
        }

        @keyframes pulse-nft {
          0%, 100% {
            filter: drop-shadow(0 0 40px rgba(217, 119, 6, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 80px rgba(217, 119, 6, 1));
          }
        }

        @keyframes pulse-card {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.4));
            opacity: 0.75;
          }
          50% {
            filter: drop-shadow(0 0 50px rgba(217, 119, 6, 0.8));
            opacity: 0.9;
          }
        }

        @keyframes rotate-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse-button {
          0%, 100% {
            box-shadow: 0 0 30px rgba(217, 119, 6, 0.5), 0 0 60px rgba(217, 119, 6, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(217, 119, 6, 0.9), 0 0 90px rgba(217, 119, 6, 0.6);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow-button {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.5); }
          50% { box-shadow: 0 0 60px rgba(217, 119, 6, 0.9), 0 0 40px rgba(251, 191, 36, 0.7); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-glow-button {
          animation: glow-button 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
