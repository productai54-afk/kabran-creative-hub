import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail, Github, Linkedin, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:daokabran@gmail.com?subject=Contact depuis le portfolio - ${formData.name}&body=${formData.message}%0A%0AEmail: ${formData.email}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative overflow-hidden" ref={ref}>
      <div className="section-padding border-t border-border">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(220 90% 56%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'hsl(260 85% 60%)' }} />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Contactez-moi
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Travaillons <span className="gradient-text">ensemble</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous avez un projet créatif en tête ? N'hésitez pas à me contacter pour en discuter.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Votre nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Votre email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                    placeholder="jean@exemple.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Votre message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Décrivez votre projet..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-2"
                  style={{ background: 'var(--gradient-primary)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(220 90% 56% / 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  Envoyer le message
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl card-gradient border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Téléphone</span>
                    <a href="tel:+2250715075967" className="text-foreground font-medium hover:text-primary transition-colors">07 15 07 59 67</a>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Email</span>
                    <a href="mailto:daokabran@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">daokabran@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'hsl(220 90% 56% / 0.1)' }}>
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Localisation</span>
                    <span className="text-foreground font-medium">Cocody Angré, 8ème Tranche, Abidjan</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-border">
                <h4 className="font-heading font-semibold mb-4 text-foreground">Réseaux sociaux</h4>
                <div className="flex gap-4">
                  <motion.a href="https://github.com/daokabran-star" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}>
                    <Github size={22} />
                  </motion.a>
                  <motion.a href="https://www.behance.net/daokabran" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </motion.a>
                  <motion.a href="https://www.linkedin.com/in/dao-kabran-3a91a836b" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}>
                    <Linkedin size={22} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-8 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-muted-foreground text-sm flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              © 2025 Dao KABRAN - @Anonymecreator. Fait avec <Heart size={14} className="text-accent" /> à Abidjan
            </motion.p>
            <motion.button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
