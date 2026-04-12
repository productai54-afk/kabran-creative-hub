import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FileImage, Video, FolderKanban, ExternalLink, Brain, Target, Play } from 'lucide-react';

// Import images
import campagneCan from '@/assets/campagne-can.png';
import campagnePollution from '@/assets/campagne-pollution.png';
import campagneJeunes from '@/assets/campagne-jeunes.png';
import campagnePollutionAgee from '@/assets/campagne-pollution-agee.png';
import cafeAffiche from '@/assets/cafe-affiche.png';
import novembreBleu from '@/assets/novembre-bleu.png';
import visuelWeekend from '@/assets/visuel-weekend.png';

const categories = [
  { id: 'all', label: 'Tout', icon: FolderKanban },
  { id: 'visuels', label: 'Visuels & Affiches', icon: FileImage },
  { id: 'videos', label: 'Montages Vidéos', icon: Video },
  { id: 'ia', label: 'IA Générative', icon: Brain },
  { id: 'strategie', label: 'Stratégie & Communication', icon: Target },
];

const creations = [
  // Visuels & Affiches
  {
    id: 1,
    title: 'Campagne CAN Morocco 2025',
    category: 'visuels',
    description: 'Affiche promotionnelle pour ASD Travel & Services - Campagne CAN 2025',
    image: campagneCan,
  },
  {
    id: 2,
    title: 'Affiche E-Café ByMomo',
    category: 'visuels',
    description: 'Création visuelle complète pour E-Café - identité de marque et promotion',
    image: cafeAffiche,
  },
  {
    id: 3,
    title: 'Novembre Bleu',
    category: 'visuels',
    description: 'Visuel de sensibilisation - Lutte contre le cancer de la prostate',
    image: novembreBleu,
  },
  {
    id: 4,
    title: 'Visuel Weekend',
    category: 'visuels',
    description: 'Création visuelle dynamique et moderne - Reproduction créative',
    image: visuelWeekend,
  },
  // Stratégie & Communication
  {
    id: 5,
    title: 'Campagne Stop Pollution Plastique',
    category: 'strategie',
    description: 'Campagne de sensibilisation contre la pollution plastique - Stratégie multi-cibles',
    image: campagnePollution,
  },
  {
    id: 6,
    title: 'Sensibilisation Jeunesse Engagée',
    category: 'strategie',
    description: 'Campagne ciblée jeunes - #JeunesseEngagée #GénérationPropre #ZéroPlastiques',
    image: campagneJeunes,
  },
  {
    id: 7,
    title: 'Sensibilisation Personnes Âgées',
    category: 'strategie',
    description: 'Campagne ciblée personnes âgées - Adoptons des gestes saints pour un héritage saint',
    image: campagnePollutionAgee,
  },
  // Vidéos
  {
    id: 8,
    title: 'Générique Livre Full IA',
    category: 'ia',
    description: 'Vidéo générative IA - Générique de livre entièrement créé par intelligence artificielle',
    isVideo: true,
    videoSrc: '/videos/generique-livre-ia.mp4',
  },
];

const Creations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredCreations = activeCategory === 'all'
    ? creations
    : creations.filter((c) => c.category === activeCategory);

  return (
    <section id="creations" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(260 85% 60%)' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Mes <span className="gradient-text">Créations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes travaux classés par catégorie
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground'
              }`}
              style={activeCategory === cat.id ? { background: 'var(--gradient-primary)' } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <cat.icon size={16} />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Creations Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filteredCreations.map((creation, index) => (
              <motion.div
                key={creation.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div 
                  className="relative rounded-2xl overflow-hidden card-gradient border border-border hover:border-primary/30 transition-all duration-500 hover-glow cursor-pointer"
                  onClick={() => {
                    if ('image' in creation && creation.image) {
                      setSelectedImage(creation.image as string);
                    }
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    {creation.isVideo ? (
                      <div className="relative w-full h-full bg-secondary flex items-center justify-center">
                        <video
                          src={creation.videoSrc}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                          onMouseLeave={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="p-4 rounded-full bg-primary/80 group-hover:bg-primary transition-colors">
                            <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={(creation as any).image}
                        alt={creation.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        className="p-4 rounded-full"
                        style={{ background: 'var(--gradient-primary)' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink className="w-6 h-6 text-primary-foreground" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-primary border border-primary/30" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                        {categories.find(c => c.id === creation.category)?.label}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {creation.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{creation.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">Découvrez plus de créations sur mes profils</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.behance.net/daokabran"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-medium text-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
              Voir sur Behance
            </motion.a>
            <motion.a
              href="https://github.com/daokabran-star"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-medium text-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Voir sur GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Création agrandie"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Creations;
