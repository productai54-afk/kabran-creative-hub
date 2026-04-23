import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '07 15 07 59 67' },
    { icon: Mail, label: 'Email', value: 'daokabran@gmail.com' },
    { icon: MapPin, label: 'Localisation', value: 'Cocody Angré, 8ème Tranche' },
  ];

  return (
    <section id="apropos" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: 'hsl(220 90% 56%)' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Qui suis-je ?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            À <span className="gradient-text">propos</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              Sociologue, consultant communication <span className="gradient-text">& créateur IA</span>
            </h3>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Je suis <strong className="text-foreground">Dao KABRAN</strong>, alias <strong className="text-primary">@Anonymecreator</strong>.
                Mon profil hybride — <strong className="text-foreground">sociologue</strong>, <strong className="text-foreground">consultant en communication</strong> et <strong className="text-foreground">IA Digital Creator</strong> —
                me permet d'analyser les publics, structurer une stratégie claire et la traduire en contenus visuels percutants.
              </p>
              <p>
                Mon Master en <strong className="text-foreground">sociologie des migrations</strong> (Université Félix Houphouët-Boigny)
                m'apporte une vraie capacité à comprendre les dynamiques sociales, les comportements et les besoins terrain :
                un atout pour concevoir des messages justes, inclusifs et adaptés à chaque cible.
              </p>
              <p>
                Côté technique, formé <strong className="text-foreground">IA Product Creator</strong> chez IISAN SIMPLON CI,
                je conçois des contenus IA (visuels, vidéos, motion), pilote des stratégies 360° et propose également un
                <strong className="text-primary"> accompagnement et des formations à l'usage de l'IA </strong>
                pour les équipes, indépendants et organisations qui veulent monter en compétence.
              </p>
              <p>
                <strong className="text-foreground">Ce qu'un tel profil apporte à un projet :</strong> une lecture sociologique du public,
                une stratégie de communication structurée, une exécution créative moderne (design, vidéo, IA) et un transfert de
                compétences pour rendre les équipes autonomes.
              </p>
            </div>

            {/* Languages */}
            <div className="mt-8 p-6 rounded-2xl card-gradient border border-border">
              <h4 className="font-heading font-semibold mb-4 text-foreground">Langues</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Français</span>
                    <span className="text-sm text-primary">Langue maternelle</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Anglais</span>
                    <span className="text-sm text-accent">Niveau débutant</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gradient-accent)' }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '30%' } : {}}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover-glow group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">{item.label}</span>
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 rounded-2xl card-gradient border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <h4 className="font-heading font-semibold mb-4 text-foreground">Centres d'intérêt</h4>
              <div className="flex flex-wrap gap-3">
                {['Sport', 'Musique', 'Lecture'].map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 text-primary"
                    style={{ background: 'hsl(220 90% 56% / 0.1)' }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
