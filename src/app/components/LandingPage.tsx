import { useEffect, useRef, useState } from 'react';
import { Search, Zap, Sparkles, Star, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

const logo = '/logo_svg.svg';

const products = [
  {
    name: 'Nefertiti Absolu',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    notes: ['Jasmin', 'Ambre', 'Oud'],
    price: '€210',
    oldPrice: '€280',
    badge: 'Extrait',
    promo: '-25%',
    promoType: 'sale'
  },
  {
    name: 'Pyramide Nocturne',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80&sat=-50&hue=20',
    notes: ['Encens', 'Vanille noire', 'Cedre'],
    price: '€185',
    badge: 'Eau de Parfum',
    promo: 'NOUVEAU',
    promoType: 'new'
  },
  {
    name: 'Sable d\'Or',
    image: 'https://images.unsplash.com/photo-1563170423-18f482d82cc8?auto=format&fit=crop&w=900&q=80',
    notes: ['Musc blanc', 'Miel', 'Feve Tonka'],
    price: '€165',
    oldPrice: '€195',
    badge: 'Edition limitee',
    promo: '-15%',
    promoType: 'limited'
  }
];

const trailerSources = [
  '/vecteezy_a-bottle-of-perfume-sitting-next-to-a-swimming-pool_50766471.mov',
  '/vecteezy_paris-france-02-20-2025-man-picking-up-baccarat-rouge_60242249.mov',
  '/vecteezy_blank-luxury-perfume-bottle-on-a-black-background-beside_49989373.mp4',
  '/vecteezy_blank-luxury-perfume-bottle-on-a-black-background-beside_49989377.mp4'
];

const promoImages = [
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1600&q=80'
];

export function LandingPage({ onNavigateToLogin }: LandingPageProps) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.load();
      void vid.play().catch(() => {});
    }
  }, [currentVideo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => onNavigateToLogin();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-950 via-amber-950 to-orange-950 text-stone-50">
      {/* Effet métallique doré avec shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(251,191,36,0.3), transparent 40%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.25), transparent 35%), radial-gradient(circle at 50% 80%, rgba(217,119,6,0.2), transparent 45%), radial-gradient(ellipse at 60% 50%, rgba(252,211,77,0.15), transparent 50%)'
        }}
      />
      {/* Reflets métalliques animés */}
      <div
        className="absolute inset-0 pointer-events-none animate-shimmer opacity-20"
        style={{
          background:
            'linear-gradient(110deg, transparent 25%, rgba(252,211,77,0.4) 40%, rgba(251,191,36,0.6) 50%, rgba(252,211,77,0.4) 60%, transparent 75%)'
        }}
      />

      <nav className="relative z-40 backdrop-blur-2xl bg-gradient-to-r from-amber-950/80 via-yellow-900/80 to-orange-950/80 border-b-4 border-amber-500/40 shadow-2xl shadow-amber-600/40 py-6">
        {/* Effet de brillance métallique */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-shimmer pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12">
          {/* Navigation supérieure - menu à gauche, boutons à droite */}
          <div className="flex items-center justify-between mb-6">
            {/* Menu navigation */}
            <div className="hidden md:flex items-center gap-8 text-amber-100">
              <a href="#accueil" className="relative group px-4 py-2 font-semibold transition-all duration-300 text-sm uppercase tracking-wider">
                <span className="relative z-10 group-hover:text-yellow-200 transition-colors">Accueil</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#products" className="relative group px-4 py-2 font-semibold transition-all duration-300 text-sm uppercase tracking-wider">
                <span className="relative z-10 group-hover:text-yellow-200 transition-colors">Produits</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#portfolio" className="relative group px-4 py-2 font-semibold transition-all duration-300 text-sm uppercase tracking-wider">
                <span className="relative z-10 group-hover:text-yellow-200 transition-colors">Portfolio</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="relative group px-4 py-2 font-semibold transition-all duration-300 text-sm uppercase tracking-wider">
                <span className="relative z-10 group-hover:text-yellow-200 transition-colors">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Boutons action à droite */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleStart}
                className="relative px-6 py-2.5 rounded-full font-bold overflow-hidden group bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-400 hover:via-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-400/60 transition-all duration-300 border-2 border-yellow-400/40"
              >
                <span className="relative z-10 text-amber-950 font-black text-sm uppercase tracking-wide">Connexion</span>
                <span className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
              <button className="p-3 hover:bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full transition-all duration-300 border-2 border-amber-400/40 hover:border-amber-300 backdrop-blur-sm group shadow-md hover:shadow-lg hover:shadow-amber-500/40">
                <Search className="w-5 h-5 text-amber-300 group-hover:text-yellow-200 transition-colors" />
              </button>
            </div>
          </div>

          {/* Logo centré avec bordure décorative */}
          <div className="flex flex-col items-center gap-4">
            {/* Ligne décorative supérieure */}
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            
            {/* Logo et titre centrés */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                {/* Aura dorée autour du logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                <img 
                  src={logo} 
                  alt="Nefertiti" 
                  className="relative h-16 md:h-20 drop-shadow-2xl filter brightness-110 contrast-125 group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/70" />
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-200 drop-shadow-2xl filter contrast-150 tracking-wider">
                  NEFERTITI
                </h1>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/70" />
              </div>
              
              <p className="text-amber-300/80 text-xs uppercase tracking-[0.3em] font-semibold">Parfums d'Exception</p>
            </div>

            {/* Ligne décorative inférieure */}
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          </div>
        </div>
      </nav>

      <div id="accueil" className="relative z-30 flex flex-col gap-20 px-6 md:px-12 lg:px-24 pb-24 pt-8">
        <section className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl shadow-amber-600/60">
          <video
            key={currentVideo}
            ref={videoRef}
            className="w-full h-[480px] object-cover"
            src={trailerSources[currentVideo]}
            muted
            autoPlay
            playsInline
            onEnded={() => setCurrentVideo((prev) => (prev + 1) % trailerSources.length)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/95 via-yellow-900/60 to-transparent" />
          {/* Effet métallique sur vidéo */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-600/10 mix-blend-overlay" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 gap-4">
            <p className="text-yellow-300 uppercase tracking-[0.3em] text-sm font-bold mb-2 animate-pulse drop-shadow-lg">Collection Exclusive 2026</p>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-200 to-orange-100 drop-shadow-2xl filter contrast-125">Discover</h2>
            <p className="mt-4 text-amber-50/95 max-w-2xl text-lg leading-relaxed drop-shadow-lg">
              Parfums sculptés par la lumière, inspirés des ciels du désert et des pierres chaudes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStart}
                className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 shadow-2xl shadow-amber-600/60 hover:shadow-amber-400/80 transition-all duration-500 hover:scale-105 border-2 border-yellow-400/40"
              >
                <span className="relative z-10 flex items-center gap-2 text-amber-950 font-black">
                  Start Exploring
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </button>
              <a href="#products" className="group px-8 py-4 rounded-2xl border-2 border-amber-400/70 text-amber-100 font-bold text-lg hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-yellow-500/30 hover:border-amber-300 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/50">
                Voir les produits
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
          {/* Indicateurs de vidéo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {trailerSources.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVideo(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentVideo
                    ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 w-12 shadow-2xl shadow-amber-500/80 border border-yellow-300/50'
                    : 'bg-amber-300/50 w-2 hover:bg-amber-400/70 hover:w-4 hover:shadow-lg hover:shadow-amber-500/50'
                }`}
                aria-label={`Vidéo ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Bande-annonce promo */}
        <section className="relative w-full h-[550px] overflow-hidden rounded-3xl border-2 border-amber-400/60 shadow-2xl shadow-amber-600/50">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-yellow-900/40 blur-sm pointer-events-none" aria-hidden="true" />
          <img
            key={currentPromo}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            src={promoImages[currentPromo]}
            alt="Promotion parfum"
            loading="lazy"
          />
          {/* Overlay métallique sur images */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-600/10 mix-blend-overlay" />
          {/* Indicateurs d'images promo */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {promoImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPromo(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentPromo
                    ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 w-12 shadow-2xl shadow-yellow-500/80 border border-yellow-300/50'
                    : 'bg-yellow-300/50 w-2 hover:bg-yellow-400/70 hover:w-4 hover:shadow-lg hover:shadow-yellow-500/50'
                }`}
                aria-label={`Promotion ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <section id="products" className="space-y-10">
          <div className="text-center space-y-4">
            <p className="text-yellow-300 text-sm tracking-[0.3em] uppercase font-bold drop-shadow-lg">Sélection Premium</p>
            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-200 filter contrast-125 drop-shadow-2xl">Nos parfums phares</h3>
            <div className="w-24 h-2 mx-auto bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full shadow-lg shadow-amber-500/50"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, idx) => (
              <div
                key={p.name}
                className="group rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900/40 via-stone-900/60 to-yellow-900/40 border border-amber-500/30 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-amber-500/40 backdrop-blur-sm"
              >
                <div className="relative h-64 bg-gradient-to-br from-stone-800 to-stone-900 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-stone-950/80 to-amber-950/80 backdrop-blur-md border border-amber-400/40 text-amber-100 shadow-lg">
                    {p.badge}
                  </span>
                  {p.promo && (
                    <span
                      className={`absolute top-4 right-4 px-5 py-2.5 text-sm font-black rounded-2xl shadow-2xl animate-pulse backdrop-blur-md ${
                        p.promoType === 'sale'
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-2 border-amber-300/50'
                          : p.promoType === 'new'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-2 border-yellow-300/50'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 border-2 border-orange-200/50'
                      }`}
                    >
                      {p.promo}
                    </span>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-yellow-100">{p.name}</h4>
                    <div className="flex flex-col items-end">
                      {p.oldPrice && (
                        <span className="text-xs text-amber-200/50 line-through">{p.oldPrice}</span>
                      )}
                      <span className="text-amber-300 font-black text-lg">{p.price}</span>
                    </div>
                  </div>
                  <p className="text-sm text-amber-100/70 leading-relaxed">Blend exclusif {idx + 1} : accords nobles, sillage lumineux et persistant.</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {p.notes.map((n) => (
                      <span key={n} className="px-4 py-2 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 text-amber-100 backdrop-blur-sm font-medium hover:border-amber-300/60 transition-colors">
                        {n}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleStart}
                    className="group w-full mt-3 px-6 py-4 rounded-xl font-black text-base bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Commander
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-900/40">
          <div className="relative h-[400px] md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80"
              alt="Histoire"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 to-yellow-900/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-24 h-24 text-amber-300/30" />
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-amber-900/40 to-stone-900/60 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"></div>
                <p className="text-amber-300 text-sm uppercase tracking-[0.3em] font-bold">Depuis 1909</p>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 leading-tight">Notre Histoire</h3>
              <p className="text-amber-50/90 leading-relaxed text-lg">
                Une maison indépendante qui marie l'artisanat français et l'héritage égyptien. Nos parfums racontent la lumière du Nil, les sables dorés et les pierres précieuses.
              </p>
              <ul className="space-y-3 text-amber-100/80">
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>Plus de 100 ans d'excellence</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>Ingrédients naturels premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>Créations exclusives limitées</span>
                </li>
              </ul>
              <button 
                onClick={handleStart} 
                className="group px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit"
              >
                Découvrir la maison
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-amber-900/30 via-stone-900/50 to-yellow-900/30 border border-amber-500/30 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <p className="text-amber-300 text-sm uppercase tracking-[0.3em] font-bold">Atelier & Coulisses</p>
              </div>
              <h4 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200">Moments Capturés</h4>
            </div>
            <button 
              onClick={handleStart} 
              className="px-6 py-3 rounded-xl border-2 border-amber-300/50 text-amber-100 font-bold hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-yellow-500/20 hover:border-amber-200 transition-all duration-300 flex items-center gap-2 w-fit"
            >
              Accéder
              <span>→</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=600&q=60',
              'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=600&q=60',
              'https://images.unsplash.com/photo-1457410129867-5999af49daf7?auto=format&fit=crop&w=600&q=60',
              'https://images.unsplash.com/photo-1490367605959-06955305859b?auto=format&fit=crop&w=600&q=60'
            ].map((src, idx) => (
              <div key={src} className="group relative overflow-hidden rounded-2xl border border-amber-500/30 shadow-lg hover:shadow-amber-500/40 transition-all duration-500">
                <img src={src} alt="atelier" className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-amber-100 font-bold">Atelier {idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-amber-900/30 via-stone-900/50 to-yellow-900/30 border border-amber-500/30 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-12 space-y-4">
            <p className="text-amber-300 text-sm uppercase tracking-[0.3em] font-bold">Collection Signature</p>
            <h4 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200">Eaux & Extraits</h4>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Élixir Solaire', img: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=600&q=60' },
              { name: 'Oasis Nocturne', img: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=600&q=60' },
              { name: 'Cuir du Nil', img: 'https://images.unsplash.com/photo-1457410129867-5999af49daf7?auto=format&fit=crop&w=600&q=60' },
              { name: 'Ambre Royal', img: 'https://images.unsplash.com/photo-1490367605959-06955305859b?auto=format&fit=crop&w=600&q=60' }
            ].map((item) => (
              <div key={item.name} className="group flex flex-col items-center gap-4 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-900/40 to-stone-950/60 p-6 hover:border-amber-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-2">
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded-full border-4 border-amber-400/40 group-hover:border-amber-300 transition-all duration-500 shadow-lg" loading="lazy" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-amber-50 font-bold text-center text-lg">{item.name}</p>
                <button 
                  onClick={handleStart} 
                  className="text-sm px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold shadow-md hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-105 flex items-center gap-2"
                >
                  Découvrir
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-3xl bg-gradient-to-br from-amber-900/40 via-stone-900/60 to-yellow-900/40 border border-amber-500/30 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-amber-400" />
                  <p className="text-amber-300 text-sm uppercase tracking-[0.3em] font-bold">Contact</p>
                </div>
                <h4 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200 leading-tight">Parlons Ensemble</h4>
                <p className="text-amber-100/80 text-lg leading-relaxed">Email, WhatsApp, ou rendez-vous privé au showroom. Notre équipe est à votre écoute.</p>
              </div>
              
              <div className="space-y-4">
                <a href="mailto:contact@nefertiti.parfums" className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 hover:border-amber-300 transition-all duration-300 group backdrop-blur-sm">
                  <Mail className="w-6 h-6 text-amber-300 group-hover:text-amber-200 transition-colors" />
                  <span className="text-amber-100 font-medium group-hover:text-amber-50 transition-colors">contact@nefertiti.parfums</span>
                </a>
                <a href="tel:+33123456789" className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 hover:border-amber-300 transition-all duration-300 group backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-amber-300 group-hover:text-amber-200 transition-colors" />
                  <span className="text-amber-100 font-medium group-hover:text-amber-50 transition-colors">+33 1 23 45 67 89</span>
                </a>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-amber-300" />
                  <span className="text-amber-100 font-medium">Paris, France</span>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Espace Client
              </button>
            </div>

            <form className="space-y-5">
              <input
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-stone-950/70 to-amber-950/70 border border-amber-400/30 text-amber-50 placeholder-amber-300/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-500/20 transition-all backdrop-blur-sm font-medium"
                placeholder="Votre nom"
              />
              <input
                type="email"
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-stone-950/70 to-amber-950/70 border border-amber-400/30 text-amber-50 placeholder-amber-300/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-500/20 transition-all backdrop-blur-sm font-medium"
                placeholder="Votre email"
              />
              <input
                type="tel"
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-stone-950/70 to-amber-950/70 border border-amber-400/30 text-amber-50 placeholder-amber-300/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-500/20 transition-all backdrop-blur-sm font-medium"
                placeholder="Téléphone"
              />
              <textarea
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-stone-950/70 to-amber-950/70 border border-amber-400/30 text-amber-50 placeholder-amber-300/50 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-500/20 transition-all backdrop-blur-sm font-medium"
                rows={5}
                placeholder="Votre message, projet ou besoin..."
              />
              <button
                type="button"
                onClick={handleStart}
                className="w-full px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white shadow-lg hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Envoyer le message
                <span>→</span>
              </button>
            </form>
          </div>
        </section>

        <button
          onClick={handleStart}
          className="fixed bottom-10 right-10 z-50 flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 backdrop-blur-xl text-amber-950 rounded-2xl border-2 border-yellow-400/60 hover:from-yellow-400 hover:via-amber-400 hover:to-orange-400 hover:border-yellow-300 transition-all duration-500 shadow-2xl shadow-amber-500/70 hover:shadow-amber-400/90 font-black text-lg group hover:scale-110 animate-pulse-gold"
        >
          <Sparkles className="w-6 h-6 group-hover:animate-spin drop-shadow-lg" />
          <span className="drop-shadow-md">Explorer</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <style>{`
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes grid-move { 0% { transform: translateY(0); } 100% { transform: translateY(50px); } }
@keyframes scan-lines { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(-40px) translateX(0); } 75% { transform: translateY(-20px) translateX(-10px); } }
@keyframes shimmer { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
@keyframes glow-gold { 0%, 100% { filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.4)) drop-shadow(0 0 15px rgba(245, 158, 11, 0.3)); } 50% { filter: drop-shadow(0 0 80px rgba(251, 191, 36, 0.7)) drop-shadow(0 0 50px rgba(245, 158, 11, 0.5)); } }
@keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 15px rgba(245, 158, 11, 0.4); } 50% { box-shadow: 0 0 80px rgba(251, 191, 36, 0.9), 0 0 50px rgba(245, 158, 11, 0.7), 0 0 30px rgba(217, 119, 6, 0.5); } }
@keyframes flicker { 0%, 18%, 22%, 25%, 54%, 56%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0.7; } }
@keyframes metallic-shine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
.animate-fade-in { animation: fade-in 1s ease-out; }
.animate-slide-up { animation: slide-up 1s ease-out 0.2s both; }
.animate-fade-in-delay { animation: fade-in 1s ease-out 0.4s both; }
.animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.6s both; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 8s ease-in-out infinite; }
.animate-glow-gold { animation: glow-gold 3s ease-in-out infinite; }
.animate-pulse-gold { animation: pulse-gold 2s ease-in-out infinite; }
.animate-flicker { animation: flicker 3s ease-in-out infinite; }
.animate-metallic-shine { animation: metallic-shine 3s linear infinite; background-size: 200% 100%; }
      `}</style>
    </div>
  );
}
