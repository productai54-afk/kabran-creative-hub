import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCcw, Sparkles, Zap } from 'lucide-react';

interface MiniGameProps {
  type: 'quiz' | 'memory' | 'sequence' | 'puzzle' | 'code';
  onWin: () => void;
  onClose: () => void;
}

// Quiz game
const QuizGame = ({ onWin }: { onWin: () => void }) => {
  const questions = [
    {
      q: "Quel outil Adobe est utilisé pour le montage vidéo ?",
      options: ["Photoshop", "Premiere Pro", "Illustrator", "InDesign"],
      correct: 1,
    },
    {
      q: "Que signifie 'IA' dans la création digitale ?",
      options: ["Image Avancée", "Intelligence Artificielle", "Innovation Artistique", "Illustration Animée"],
      correct: 1,
    },
  ];
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(false);

  const handleAnswer = (i: number) => {
    setSelected(i);
    if (i === questions[qIndex].correct) {
      if (qIndex === questions.length - 1) {
        setCorrect(true);
        setTimeout(onWin, 800);
      } else {
        setTimeout(() => {
          setQIndex((p) => p + 1);
          setSelected(null);
        }, 600);
      }
    } else {
      setTimeout(() => setSelected(null), 800);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < qIndex ? 'xp-bar' : i === qIndex ? 'bg-primary/50' : 'bg-secondary'
            }`}
          />
        ))}
      </div>
      <p className="text-foreground font-medium text-center">{questions[qIndex].q}</p>
      <div className="grid grid-cols-2 gap-3">
        {questions[qIndex].options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => selected === null && handleAnswer(i)}
            className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
              selected === i
                ? i === questions[qIndex].correct
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-red-500 bg-red-500/20 text-red-400 animate-shake'
                : 'border-border bg-secondary/50 text-foreground hover:border-primary/50'
            }`}
            whileHover={selected === null ? { scale: 1.03 } : {}}
            whileTap={selected === null ? { scale: 0.97 } : {}}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Memory game
const MemoryGame = ({ onWin }: { onWin: () => void }) => {
  const emojis = ['🎨', '🎬', '🤖', '📱', '✏️', '📸'];
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, flipped: false, matched: false }));
    setCards(shuffled);
  }, []);

  const handleFlip = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji) {
        newCards[newFlipped[0]].matched = true;
        newCards[newFlipped[1]].matched = true;
        setCards(newCards);
        setFlippedIndices([]);
        if (newCards.every((c) => c.matched)) {
          setTimeout(onWin, 500);
        }
      } else {
        setTimeout(() => {
          const reset = [...newCards];
          reset[newFlipped[0]].flipped = false;
          reset[newFlipped[1]].flipped = false;
          setCards(reset);
          setFlippedIndices([]);
        }, 700);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-muted-foreground">Trouvez les paires</span>
        <span className="text-xs text-primary font-mono">{moves} coups</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            onClick={() => handleFlip(i)}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all duration-300 ${
              card.flipped || card.matched
                ? 'bg-primary/20 border-primary/50 border'
                : 'bg-secondary border border-border hover:border-primary/30'
            } ${card.matched ? 'opacity-60' : ''}`}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
            animate={card.flipped || card.matched ? { rotateY: 0 } : { rotateY: 180 }}
          >
            {(card.flipped || card.matched) ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Sequence game
const SequenceGame = ({ onWin }: { onWin: () => void }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const targetRounds = 3;
  const colors = ['bg-red-500', 'bg-primary', 'bg-green-500', 'bg-accent'];

  const startRound = useCallback(() => {
    const newSeq = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(newSeq);
    setPlayerSeq([]);
    setIsShowing(true);

    newSeq.forEach((s, i) => {
      setTimeout(() => {
        setActiveBtn(s);
        setTimeout(() => setActiveBtn(null), 400);
      }, (i + 1) * 600);
    });

    setTimeout(() => setIsShowing(false), newSeq.length * 600 + 400);
  }, [sequence]);

  useEffect(() => {
    if (round === 0) {
      setTimeout(() => startRound(), 500);
      setRound(1);
    }
  }, []);

  const handlePress = (i: number) => {
    if (isShowing) return;
    setActiveBtn(i);
    setTimeout(() => setActiveBtn(null), 200);

    const newPlayer = [...playerSeq, i];
    setPlayerSeq(newPlayer);

    const idx = newPlayer.length - 1;
    if (newPlayer[idx] !== sequence[idx]) {
      setSequence([]);
      setPlayerSeq([]);
      setRound(0);
      setTimeout(() => {
        setRound(1);
        startRound();
      }, 500);
      return;
    }

    if (newPlayer.length === sequence.length) {
      if (sequence.length >= targetRounds) {
        setTimeout(onWin, 500);
      } else {
        setTimeout(() => startRound(), 800);
      }
    }
  };

  return (
    <div>
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground mb-2">Reproduisez la séquence lumineuse</p>
        <div className="flex justify-center gap-1">
          {Array.from({ length: targetRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full ${i < sequence.length ? 'xp-bar' : 'bg-secondary'}`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-[200px] mx-auto">
        {[0, 1, 2, 3].map((i) => (
          <motion.button
            key={i}
            onClick={() => handlePress(i)}
            className={`aspect-square rounded-2xl ${colors[i]} transition-all duration-200 ${
              activeBtn === i ? 'opacity-100 scale-105' : 'opacity-40'
            } ${isShowing ? 'pointer-events-none' : ''}`}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

// Puzzle - unscramble word
const PuzzleGame = ({ onWin }: { onWin: () => void }) => {
  const words = ['CREATIVE', 'DESIGN', 'DIGITAL'];
  const word = words[Math.floor(Math.random() * words.length)];
  const [letters, setLetters] = useState<string[]>(() =>
    word.split('').sort(() => Math.random() - 0.5)
  );
  const [answer, setAnswer] = useState<string[]>([]);

  const addLetter = (letter: string, index: number) => {
    setAnswer([...answer, letter]);
    setLetters(letters.filter((_, i) => i !== index));
  };

  const removeLetter = (index: number) => {
    setLetters([...letters, answer[index]]);
    setAnswer(answer.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (answer.length === word.length && answer.join('') === word) {
      setTimeout(onWin, 500);
    }
  }, [answer, word, onWin]);

  return (
    <div className="space-y-6">
      <p className="text-center text-xs text-muted-foreground">Remettez les lettres dans l'ordre</p>

      <div className="flex justify-center gap-2 min-h-[48px]">
        {Array.from({ length: word.length }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => answer[i] && removeLetter(i)}
            className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all ${
              answer[i]
                ? answer.length === word.length && answer.join('') !== word
                  ? 'border-red-500 bg-red-500/10 text-red-400'
                  : 'border-primary bg-primary/10 text-primary'
                : 'border-border border-dashed'
            }`}
            layout
          >
            {answer[i] || ''}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {letters.map((letter, i) => (
          <motion.button
            key={`${letter}-${i}`}
            onClick={() => addLetter(letter, i)}
            className="w-10 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center font-bold text-lg text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            layout
          >
            {letter}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Code game - type the code
const CodeGame = ({ onWin }: { onWin: () => void }) => {
  const code = 'UNLOCK';
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input.toUpperCase() === code) {
      onWin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
      setInput('');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-xs text-muted-foreground">Tapez le code secret pour débloquer</p>
      <div className="flex justify-center gap-2">
        <p className="game-font text-xs text-primary/50">
          Indice: {code.split('').map((c, i) => (i % 2 === 0 ? c : '_')).join(' ')}
        </p>
      </div>
      <motion.input
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className={`w-full px-6 py-4 rounded-xl bg-secondary border-2 text-center font-mono text-xl tracking-[0.5em] text-foreground focus:outline-none transition-all ${
          error ? 'border-red-500 animate-shake' : 'border-border focus:border-primary'
        }`}
        placeholder="_ _ _ _ _ _"
        maxLength={6}
        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
      />
      <motion.button
        onClick={handleSubmit}
        className="px-8 py-3 rounded-xl font-bold text-primary-foreground text-sm"
        style={{ background: 'var(--gradient-primary)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        VALIDER
      </motion.button>
    </div>
  );
};

const MiniGame = ({ type, onWin, onClose }: MiniGameProps) => {
  const [won, setWon] = useState(false);

  const handleWin = () => {
    setWon(true);
    setTimeout(onWin, 1200);
  };

  const gameComponents = {
    quiz: <QuizGame onWin={handleWin} />,
    memory: <MemoryGame onWin={handleWin} />,
    sequence: <SequenceGame onWin={handleWin} />,
    puzzle: <PuzzleGame onWin={handleWin} />,
    code: <CodeGame onWin={handleWin} />,
  };

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
              <p className="game-font text-sm text-primary">DÉBLOQUÉ !</p>
              <p className="text-xs text-accent mt-2">+100 XP</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="game-font text-[10px] text-primary">MINI-JEU</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {gameComponents[type]}
    </div>
  );
};

export default MiniGame;
