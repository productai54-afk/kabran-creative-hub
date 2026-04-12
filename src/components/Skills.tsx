import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, Palette, Video, Wand2, Camera, PenTool, Sparkles, Figma, 
  MessageSquare, Target, Layers, MonitorSmartphone
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Design & Création',
    icon: Palette,
    skills: [
      { name: 'Adobe Photoshop', icon: Layers },
      { name: 'Adobe Illustrator', icon: PenTool },
      { name: 'Canva Pro', icon: MonitorSmartphone },
      { name: 'Affinity Designer', icon: Palette },
      { name: 'Figma', icon: Figma },
    ],
  },
  {
    title: 'Montage Vidéo & Motion',
    icon: Video,
    skills: [
      { name: 'Adobe Premiere Pro', icon: Video },
      { name: 'CapCut', icon: Camera },
      { name: 'After Effects', icon: Sparkles },
      { name: 'Motion Design IA', icon: Wand2 },
    ],
  },
  {
    title: 'Intelligence Artificielle',
    icon: Brain,
    skills: [
      { name: 'Prompt Engineering', icon: Brain },
      { name: 'Génération d\'images IA', icon: Wand2 },
      { name: 'Vidéos IA génératives', icon: Sparkles },
      { name: 'Outils IA créatifs', icon: Brain },
    ],
  },
  {
    title: 'Gestion de Communication',
    icon: MessageSquare,
    skills: [
      { name: 'Élaboration de stratégie de communication', icon: Target },
      { name: 'Pilotage projet 360°', icon: Layers },
      { name: 'Branding & Identité visuelle', icon: Palette },
      { name: 'Community Management', icon: MessageSquare },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competences" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: 'hsl(220 90% 56%)' }} />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(260 85% 60%)' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Mes expertises
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Compétences</span> & Outils
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un ensemble de compétences polyvalentes au service de votre créativité
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="p-6 lg:p-8 rounded-3xl card-gradient border border-border hover:border-primary/30 transition-all duration-500 hover-glow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <skill.icon className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
