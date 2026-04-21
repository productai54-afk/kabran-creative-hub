import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, Coins } from 'lucide-react';

interface MiniGameProps {
  type?: string;
  onWin: () => void;
  onClose: () => void;
  coinsRequired?: number;
  gameTitle?: string;
}

// Arena dimensions (game units)
const ARENA_W = 320;
const ARENA_H = 220;
const PLAYER_SIZE = 24;
const COIN_SIZE = 16;
const SPEED = 4;

interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

const CoinCollectorGame = ({
  onWin,
  coinsRequired = 8,
}: {
  onWin: () => void;
  coinsRequired?: number;
}) => {
  const [player, setPlayer] = useState({ x: ARENA_W / 2, y: ARENA_H / 2 });
  const [coins, setCoins] = useState<Coin[]>([]);
  const [collected, setCollected] = useState(0);
  const [started, setStarted] = useState(false);
  const keys = useRef<Record<string, boolean>>({});
  const rafRef = useRef<number>();
  const playerRef = useRef(player);
  const coinsRef = useRef<Coin[]>([]);

  // generate coins
  useEffect(() => {
    const newCoins: Coin[] = Array.from({ length: coinsRequired }).map((_, i) => ({
      id: i,
      x: 30 + Math.random() * (ARENA_W - 60),
      y: 30 + Math.random() * (ARENA_H - 60),
      collected: false,
    }));
    setCoins(newCoins);
    coinsRef.current = newCoins;
  }, [coinsRequired]);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // game loop
  useEffect(() => {
    if (!started) return;

    const loop = () => {
      const k = keys.current;
      let dx = 0;
      let dy = 0;
      if (k['arrowup'] || k['w'] || k['z']) dy -= SPEED;
      if (k['arrowdown'] || k['s']) dy += SPEED;
      if (k['arrowleft'] || k['a'] || k['q']) dx -= SPEED;
      if (k['arrowright'] || k['d']) dx += SPEED;

      if (dx || dy) {
        setPlayer((p) => {
          const nx = Math.max(0, Math.min(ARENA_W - PLAYER_SIZE, p.x + dx));
          const ny = Math.max(0, Math.min(ARENA_H - PLAYER_SIZE, p.y + dy));
          return { x: nx, y: ny };
        });
      }

      // collision check
      const px = playerRef.current.x;
      const py = playerRef.current.y;
      let changed = false;
      const updated = coinsRef.current.map((c) => {
        if (c.collected) return c;
        const cx = c.x;
        const cy = c.y;
        const overlap =
          px < cx + COIN_SIZE &&
          px + PLAYER_SIZE > cx &&
          py < cy + COIN_SIZE &&
          py + PLAYER_SIZE > cy;
        if (overlap) {
          changed = true;
          return { ...c, collected: true };
        }
        return c;
      });
      if (changed) {
        coinsRef.current = updated;
        setCoins(updated);
        const total = updated.filter((c) => c.collected).length;
        setCollected(total);
        if (total >= coinsRequired) {
          setTimeout(onWin, 400);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, coinsRequired, onWin]);

  // touch / virtual pad
  const setKey = (key: string, value: boolean) => {
    keys.current[key] = value;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-accent" />
          <span className="game-font text-[10px] text-primary">
            {collected} / {coinsRequired}
          </span>
        </div>
        <div className="flex-1 mx-3 h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full xp-bar"
            animate={{ width: `${(collected / coinsRequired) * 100}%` }}
            transition={{ type: 'spring', damping: 15 }}
          />
        </div>
      </div>

      <div
        className="relative mx-auto rounded-xl overflow-hidden game-border"
        style={{
          width: ARENA_W,
          maxWidth: '100%',
          aspectRatio: `${ARENA_W} / ${ARENA_H}`,
          background:
            'linear-gradient(180deg, hsl(20 15% 10%) 0%, hsl(20 18% 14%) 100%)',
          backgroundImage:
            'repeating-linear-gradient(0deg, hsl(25 95% 53% / 0.05) 0px, hsl(25 95% 53% / 0.05) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, hsl(25 95% 53% / 0.05) 0px, hsl(25 95% 53% / 0.05) 1px, transparent 1px, transparent 22px)',
        }}
      >
        {!started && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
            <p className="game-font text-[10px] text-primary mb-3 text-center px-4">
              RAMASSE {coinsRequired} PIÈCES
            </p>
            <p className="text-[10px] text-muted-foreground mb-4 text-center px-4">
              Flèches / WASD ou pad tactile
            </p>
            <motion.button
              onClick={() => setStarted(true)}
              className="px-6 py-2 rounded-lg game-font text-[10px] text-primary-foreground"
              style={{ background: 'var(--gradient-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START
            </motion.button>
          </div>
        )}

        {/* coins */}
        {coins.map((c) =>
          c.collected ? null : (
            <motion.div
              key={c.id}
              className="absolute rounded-full"
              style={{
                width: COIN_SIZE,
                height: COIN_SIZE,
                left: c.x,
                top: c.y,
                background:
                  'radial-gradient(circle at 30% 30%, hsl(45 100% 70%), hsl(35 100% 50%))',
                boxShadow: '0 0 12px hsl(35 100% 50% / 0.7)',
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: c.id * 0.1 }}
            />
          )
        )}

        {/* player */}
        <motion.div
          className="absolute rounded-md"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            left: player.x,
            top: player.y,
            background: 'var(--gradient-primary)',
            boxShadow: '0 0 16px hsl(25 95% 53% / 0.7)',
          }}
        >
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
        </motion.div>
      </div>

      {/* virtual pad for mobile */}
      <div className="flex justify-center md:hidden">
        <div className="grid grid-cols-3 gap-1 w-40 select-none">
          <div />
          <button
            onTouchStart={() => setKey('arrowup', true)}
            onTouchEnd={() => setKey('arrowup', false)}
            onMouseDown={() => setKey('arrowup', true)}
            onMouseUp={() => setKey('arrowup', false)}
            onMouseLeave={() => setKey('arrowup', false)}
            className="aspect-square rounded-lg bg-secondary border border-border active:bg-primary/30 game-font text-[10px] text-primary"
          >
            ▲
          </button>
          <div />
          <button
            onTouchStart={() => setKey('arrowleft', true)}
            onTouchEnd={() => setKey('arrowleft', false)}
            onMouseDown={() => setKey('arrowleft', true)}
            onMouseUp={() => setKey('arrowleft', false)}
            onMouseLeave={() => setKey('arrowleft', false)}
            className="aspect-square rounded-lg bg-secondary border border-border active:bg-primary/30 game-font text-[10px] text-primary"
          >
            ◀
          </button>
          <div />
          <button
            onTouchStart={() => setKey('arrowright', true)}
            onTouchEnd={() => setKey('arrowright', false)}
            onMouseDown={() => setKey('arrowright', true)}
            onMouseUp={() => setKey('arrowright', false)}
            onMouseLeave={() => setKey('arrowright', false)}
            className="aspect-square rounded-lg bg-secondary border border-border active:bg-primary/30 game-font text-[10px] text-primary"
          >
            ▶
          </button>
          <div />
          <button
            onTouchStart={() => setKey('arrowdown', true)}
            onTouchEnd={() => setKey('arrowdown', false)}
            onMouseDown={() => setKey('arrowdown', true)}
            onMouseUp={() => setKey('arrowdown', false)}
            onMouseLeave={() => setKey('arrowdown', false)}
            className="aspect-square rounded-lg bg-secondary border border-border active:bg-primary/30 game-font text-[10px] text-primary"
          >
            ▼
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};

const MiniGame = ({ onWin, onClose, coinsRequired = 8, gameTitle }: MiniGameProps) => {
  const [won, setWon] = useState(false);

  const handleWin = useCallback(() => {
    setWon(true);
    setTimeout(onWin, 1200);
  }, [onWin]);

  return (
    <div className="p-6 rounded-3xl glass-effect game-border relative overflow-hidden">
      <AnimatePresence>
        {won && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.8 }}
              >
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <p className="game-font text-sm text-primary">NIVEAU TERMINÉ !</p>
              <p className="text-xs text-accent mt-2">+100 XP — Section débloquée</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="game-font text-[10px] text-primary">
            {gameTitle || 'NIVEAU'}
          </span>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <CoinCollectorGame onWin={handleWin} coinsRequired={coinsRequired} />
    </div>
  );
};

export default MiniGame;
