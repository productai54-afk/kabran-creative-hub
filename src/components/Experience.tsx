import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Calendar, Award } from 'lucide-react';
import eventImage from '@/assets/event-palais.jpeg';
import carteJeuneImage from '@/assets/carte-jeune.png';

const experiences = [
  {
    type: 'emploi',
    title: 'Chargé de Communication & Gestionnaire Administratif',
    organization: 'Nafrica — Marque PALMITA (Cosmétique)',
    period: 'En cours',
    description: 'Élaboration et pilotage de stratégies de communication, création de contenus visuels, gestion des réseaux sociaux et coordination de projets 360°. Gestion administrative pour la marque cosmétique PALMITA.',
  },
  {
    type: 'freelance',
    title: 'Freelance - IA Digital Creator & Graphiste',
    organization: 'Indépendant',
    period: 'En cours',
    description: 'Prestations en design graphique, montage vidéo, création de contenu IA et stratégie de communication. Clients : ASD GROUP (agence de voyage), Somet Shop, et divers autres clients.',
  },
  {
    type: 'terrain',
    title: 'Chef d\'Équipe Enquête de Terrain & Enquêteur',
    organization: 'Projet WURI (Banque Mondiale), Abidjan',
    period: '2025',
    description: 'Organisation de consultations communautaires et focus groups. Collecte et contrôle qualité des données de terrain. Coordination d\'enquêtes et reporting aux chefs de projet.',
  },
  {
    type: 'consultant',
    title: 'Assistant Consultant',
    organization: 'Projet WURI (Banque Mondiale), Abidjan',
    period: '2025',
    description: 'Retranscription des données. Élaboration de check-lists d\'entretiens. Conception de grilles de recensement des données. Contribution à l\'analyse préliminaire des données.',
  },
];

const formations = [
  {
    title: 'IA Product Creator',
    organization: 'IISAN SIMPLON CI',
    period: '2025 - Terminé (stage à l\'appui)',
    description: 'Formation intensive en création de produits basés sur l\'intelligence artificielle, développement de compétences en prompt engineering et outils IA créatifs.',
  },
  {
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
    description: 'Participation au programme officiel de lancement de la Carte Jeunes en présence du Ministre de la Jeunesse et de plusieurs autorités gouvernementales.',
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
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'hsl(260 85% 60%)' }} />
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

        {/* Expériences Professionnelles */}
        <div className="mb-20">
          <motion.h3
            className="font-heading text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Briefcase className="text-primary" />
            Expériences Professionnelles
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
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
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

        {/* Formations */}
        <div className="mb-20">
          <motion.h3
            className="font-heading text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GraduationCap className="text-accent" />
            Formations
          </motion.h3>

          <div className="space-y-6">
            {formations.map((f, index) => (
              <motion.div
                key={f.title}
                className="relative pl-8 border-l-2 border-accent/30"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ background: 'var(--gradient-accent)' }} />
                <div className="p-6 rounded-2xl card-gradient border border-border hover:border-accent/30 transition-all duration-300 hover-glow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'hsl(32 100% 55% / 0.1)' }}>
                      <span className="text-accent flex items-center gap-1">
                        <Calendar size={12} />
                        {f.period}
                      </span>
                    </span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-foreground mb-2">{f.title}</h4>
                  <p className="text-accent font-medium mb-3">{f.organization}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activités */}
        <div>
          <motion.h3
            className="font-heading text-2xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Award className="text-primary" />
            Activités Professionnelles
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/30 transition-all duration-300 hover-glow group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-medium">{activity.period}</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {activity.title}
                </h4>
                <p className="text-accent text-sm font-medium mb-3">{activity.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{activity.description}</p>

                {activity.hasImages && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <motion.div className="rounded-xl overflow-hidden aspect-square" whileHover={{ scale: 1.05 }}>
                      <img src={eventImage} alt="Événement Carte Jeunes" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div className="rounded-xl overflow-hidden aspect-square" whileHover={{ scale: 1.05 }}>
                      <img src={carteJeuneImage} alt="Carte Jeunes" className="w-full h-full object-cover" />
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
