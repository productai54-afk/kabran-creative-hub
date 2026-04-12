import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Expériences', href: '#experiences' },
  { label: 'Créations', href: '#creations' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <motion.a
          href="#accueil"
          className="font-heading text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">DK.</span>
          <span className="text-xs text-muted-foreground ml-1 font-normal">@Anonymecreator</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-5 py-2.5 rounded-full font-medium text-sm text-primary-foreground transition-all duration-300"
            style={{ background: 'var(--gradient-primary)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px hsl(220 90% 56% / 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Me contacter
          </motion.a>
        </nav>

        <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="px-5 py-3 rounded-full font-medium text-center text-primary-foreground mt-2"
                style={{ background: 'var(--gradient-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Me contacter
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
