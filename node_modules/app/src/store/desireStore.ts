import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Mood = 'chill' | 'party' | 'gastronomy' | 'cultural' | 'business' | 'unknown';

interface DesireState {
  currentMood: Mood;
  energyLevel: number; // 0 to 100
  budgetLevel: 'standard' | 'elite' | 'sovereign';
  setMood: (mood: Mood) => void;
  setEnergy: (level: number) => void;
  setBudget: (budget: 'standard' | 'elite' | 'sovereign') => void;
}

export const useDesireStore = create<DesireState>()(
  persist(
    (set) => ({
      currentMood: 'unknown',
      energyLevel: 50,
      budgetLevel: 'elite',
      setMood: (mood) => set({ currentMood: mood }),
      setEnergy: (level) => set({ energyLevel: level }),
      setBudget: (budget) => set({ budgetLevel: budget }),
    }),
    {
      name: 'elite-desire-storage',
    }
  )
);
