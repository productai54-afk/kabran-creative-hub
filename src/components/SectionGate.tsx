import { motion, AnimatePresence } from 'framer-motion';
import { useGame, SectionId } from '@/contexts/GameContext';
import { Lock, Gamepad2 } from 'lucide-react';
import { useState, ReactNode } from 'react';
import MiniGame from './MiniGame';

interface SectionGateProps {
  sectionId: SectionId;
  children: ReactNode;
  gameType: 'quiz' | 'memory' | 'sequence' | 'puzzle' | 'code';
  gameTitle: string;
}

const SectionGate = ({ sectionId, children, gameType, gameTitle }: SectionGateProps) => {
  const { isSectionUnlocked, unlockSection } = useGame();
  const [showGame, setShowGame] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const unlocked = isSectionUnlocked(sectionId);

  const handleGameWin = () => {
    setJustUnlocked(true);
    unlockSection(sectionId);
    setTimeout(() => {
      setShowGame(false);
      setJustUnlocked(false);
    }, 1500);
  };

  if (unlocked) {
    return (
      <motion.div
        initial={justUnlocked ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div className="blur-sm opacity-30 pointer-events-none select-none">
        {children}
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="lock"
              className="text-center p-8 rounded-3xl glass-effect game-border max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
                animate={{ boxShadow: ['0 0 20px hsl(25 95% 53% / 0.3)', '0 0 40px hsl(25 95% 53% / 0.6)', '0 0 20px hsl(25 95% 53% / 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <h3 className="game-font text-sm text-primary mb-3">SECTION VERROUILLÉE</h3>
              <p className="text-muted-foreground text-sm mb-6">{gameTitle}</p>

              <motion.button
                onClick={() => setShowGame(true)}
                className="px-8 py-4 rounded-xl font-bold text-primary-foreground flex items-center gap-3 mx-auto text-sm"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(25 95% 53% / 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 size={20} />
                JOUER POUR DÉBLOQUER
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              className="w-full max-w-lg mx-4"
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <MiniGame type={gameType} onWin={handleGameWin} onClose={() => setShowGame(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionGate;
