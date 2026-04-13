import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type SectionId = 'hero' | 'apropos' | 'competences' | 'experiences' | 'creations' | 'contact';

interface GameState {
  unlockedSections: SectionId[];
  currentXP: number;
  totalXP: number;
  level: number;
}

interface GameContextType {
  state: GameState;
  isSectionUnlocked: (id: SectionId) => boolean;
  unlockSection: (id: SectionId) => void;
  getNextLockedSection: () => SectionId | null;
}

const sectionOrder: SectionId[] = ['hero', 'apropos', 'competences', 'experiences', 'creations', 'contact'];
const xpPerSection = 100;

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>({
    unlockedSections: ['hero'],
    currentXP: 0,
    totalXP: sectionOrder.length * xpPerSection,
    level: 1,
  });

  const isSectionUnlocked = useCallback(
    (id: SectionId) => state.unlockedSections.includes(id),
    [state.unlockedSections]
  );

  const unlockSection = useCallback((id: SectionId) => {
    setState((prev) => {
      if (prev.unlockedSections.includes(id)) return prev;
      const newUnlocked = [...prev.unlockedSections, id];
      return {
        ...prev,
        unlockedSections: newUnlocked,
        currentXP: prev.currentXP + xpPerSection,
        level: Math.floor((prev.currentXP + xpPerSection) / (xpPerSection * 2)) + 1,
      };
    });
  }, []);

  const getNextLockedSection = useCallback(() => {
    for (const s of sectionOrder) {
      if (!state.unlockedSections.includes(s)) return s;
    }
    return null;
  }, [state.unlockedSections]);

  return (
    <GameContext.Provider value={{ state, isSectionUnlocked, unlockSection, getNextLockedSection }}>
      {children}
    </GameContext.Provider>
  );
};
