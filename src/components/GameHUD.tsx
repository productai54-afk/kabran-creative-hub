import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Zap, Star } from 'lucide-react';

const GameHUD = () => {
  const { state } = useGame();
  const progress = (state.currentXP / state.totalXP) * 100;

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3 rounded-2xl glass-effect game-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, type: 'spring' }}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg" style={{ background: 'var(--gradient-primary)' }}>
          <Trophy className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="game-font text-[10px] text-primary">LVL {state.level}</span>
      </div>

      <div className="flex items-center gap-2 min-w-[120px]">
        <Zap className="w-4 h-4 text-accent" />
        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full xp-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">{state.currentXP}XP</span>
      </div>

      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-accent" />
        <span className="text-[10px] text-muted-foreground font-mono">
          {state.unlockedSections.length}/{6}
        </span>
      </div>
    </motion.div>
  );
};

export default GameHUD;
