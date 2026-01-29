import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award } from 'lucide-react';
import eventImage from '@/assets/event-palais.jpeg';
import carteJeuneImage from '@/assets/carte-jeune.png';

const experiences = [
  {
    type: 'formation',
    title: 'IA Product Creator',
    organization: 'IISAN SIMPLON CI',
    period: 'Octobre 2025 - En cours',
    description: 'Formation intensive en création de produits basés sur l\'intelligence artificielle, développement de compétences en prompt engineering et outils IA créatifs.',
  },
  {
    type: 'formation',
    title: 'Master en Sociologie des Migrations',
    organization: 'Université Félix Houphouët-Boigny, Abidjan',
    period: '2024 - 2025',
    description: 'Étude approfondie des dynamiques migratoires, analyse sociologique et recherche académique.',
  },
];

const activities = [
  {
    title: 'Projet WURI',
    subtitle: 'Projet Régional d\'Identification Unique pour l\'Intégration Régionale et l\'Inclusion en Afrique de l\'Ouest',
    period: '2025',
    description: 'Participation active au projet d\'identification régionale visant l\'intégration et l\'inclusion en Afrique de l\'Ouest.',
    icon: Award,
  },
  {
    title: 'Lancement Carte Jeunes',
    subtitle: 'Sofitel Hôtel Ivoire, Abidjan',
    period: '2025',
    description: 'Participation au programme officiel de lancement de la Carte Jeunes en présence du Ministre de la Jeunesse et de plusieurs autorités gouvernementales. Un événement majeur pour la jeunesse ivoirienne.',
    icon: Award,
    hasImages: true,
  },
  {
    title: 'Programme PNSAR',
    subtitle: 'Programme National de Stage, d\'Apprentissage et de Reconversion Professionnelle',
    period: '2025',
    description: 'Participation au programme national visant l\'insertion professionnelle et la reconversion des jeunes talents.',
    icon: Briefcase,
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experiences" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'hsl(174 72% 50%)' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Mon parcours
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Expériences & <span className="gradient-text">Formations</span>
          </h2>
        </motion.div>

        {/* Formations */}
        <div className="mb-20">
          <motion.h3
            className="font-heading text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GraduationCap className="text-primary" />
            Formations
          </motion.h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className="relative pl-8 border-l-2 border-primary/30"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                
                <div className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/30 transition-all duration-300 hover-glow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'hsl(174 72% 50% / 0.1)' }}>
                      <span className="text-primary flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                    </span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-foreground mb-2">{exp.title}</h4>
                  <p className="text-primary font-medium mb-3">{exp.organization}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activités Professionnelles */}
        <div>
          <motion.h3
            className="font-heading text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Briefcase className="text-accent" />
            Activités Professionnelles
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                className="p-6 rounded-2xl card-gradient border border-border hover:border-accent/30 transition-all duration-300 hover-glow group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl" style={{ background: 'hsl(24 95% 60% / 0.1)' }}>
                    <activity.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs text-accent font-medium">{activity.period}</span>
                </div>
                
                <h4 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {activity.title}
                </h4>
                <p className="text-primary text-sm font-medium mb-3">{activity.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{activity.description}</p>

                {activity.hasImages && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <motion.div
                      className="rounded-xl overflow-hidden aspect-square"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={eventImage}
                        alt="Événement Carte Jeunes"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="rounded-xl overflow-hidden aspect-square"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={carteJeuneImage}
                        alt="Carte Jeunes"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
