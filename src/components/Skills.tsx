import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Palette, 
  Video, 
  Layers, 
  Wand2, 
  Camera, 
  PenTool, 
  Sparkles,
  FileImage,
  Film
} from 'lucide-react';

const skills = [
  {
    category: 'Intelligence Artificielle',
    icon: Brain,
    items: [
      { name: 'Prompt Engineering', level: 90 },
      { name: 'Génération d\'images IA', level: 85 },
      { name: 'Outils IA créatifs', level: 88 },
      { name: 'Automatisation IA', level: 80 },
    ],
  },
  {
    category: 'Design Graphique',
    icon: Palette,
    items: [
      { name: 'Adobe Photoshop', level: 92 },
      { name: 'Adobe Illustrator', level: 85 },
      { name: 'Canva Pro', level: 95 },
      { name: 'Design d\'affiches', level: 90 },
    ],
  },
  {
    category: 'Montage Vidéo',
    icon: Video,
    items: [
      { name: 'Adobe Premiere Pro', level: 88 },
      { name: 'CapCut', level: 92 },
      { name: 'After Effects', level: 75 },
      { name: 'Motion Design', level: 78 },
    ],
  },
  {
    category: 'Création de Contenu',
    icon: Sparkles,
    items: [
      { name: 'Création de flyers', level: 95 },
      { name: 'Réseaux sociaux', level: 90 },
      { name: 'Branding visuel', level: 85 },
      { name: 'Storytelling visuel', level: 88 },
    ],
  },
];

const toolIcons = [
  { icon: PenTool, label: 'Design' },
  { icon: Camera, label: 'Photo' },
  { icon: Film, label: 'Vidéo' },
  { icon: Wand2, label: 'IA' },
  { icon: FileImage, label: 'Graphisme' },
  { icon: Layers, label: 'Compositing' },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competences" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: 'hsl(24 95% 60%)' }} />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(174 72% 50%)' }} />
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

        {/* Tool Icons */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {toolIcons.map((tool, index) => (
            <motion.div
              key={tool.label}
              className="p-4 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <tool.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="p-6 lg:p-8 rounded-3xl card-gradient border border-border hover:border-primary/30 transition-all duration-500 hover-glow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-5">
                {category.items.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{skill.name}</span>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--gradient-primary)' }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
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
