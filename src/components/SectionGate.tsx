import { motion, AnimatePresence } from 'framer-motion';
import { useGame, SectionId } from '@/contexts/GameContext';
import { Lock, Gamepad2, Coins } from 'lucide-react';
import { useState, ReactNode } from 'react';
import MiniGame from './MiniGame';

interface SectionGateProps {
  sectionId: SectionId;
  children: ReactNode;
  gameType?: string;
  gameTitle: string;
  coinsRequired?: number;
  levelLabel?: string;
}

const SectionGate = ({
  sectionId,
  children,
  gameTitle,
  coinsRequired = 8,
  levelLabel,
}: SectionGateProps) => {
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
    <div className="relative min-h-[600px]">
      <div className="blur-sm opacity-30 pointer-events-none select-none">
        {children}
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center py-12">
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
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(25 95% 53% / 0.3)',
                    '0 0 40px hsl(25 95% 53% / 0.6)',
                    '0 0 20px hsl(25 95% 53% / 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              {levelLabel && (
                <p className="game-font text-[10px] text-accent mb-2">{levelLabel}</p>
              )}
              <h3 className="game-font text-sm text-primary mb-3">SECTION VERROUILLÉE</h3>
              <p className="text-muted-foreground text-sm mb-4">{gameTitle}</p>

              <div className="flex items-center justify-center gap-2 mb-6 text-xs text-accent">
                <Coins className="w-4 h-4" />
                <span className="game-font text-[10px]">
                  RAMASSE {coinsRequired} PIÈCES
                </span>
              </div>

              <motion.button
                onClick={() => setShowGame(true)}
                className="px-8 py-4 rounded-xl font-bold text-primary-foreground flex items-center gap-3 mx-auto text-sm"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px hsl(25 95% 53% / 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 size={20} />
                JOUER LE NIVEAU
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              className="w-full max-w-lg mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <MiniGame
                onWin={handleGameWin}
                onClose={() => setShowGame(false)}
                coinsRequired={coinsRequired}
                gameTitle={levelLabel || 'NIVEAU'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionGate;
