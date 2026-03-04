import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Mood = 'tranquil' | 'energetic' | 'focused' | 'luxurious' | 'adventurous' | 'romantic' | 'unset';

interface MoodState {
  currentMood: Mood;
  desireMemory: string[];
  setMood: (mood: Mood) => void;
  addDesire: (desire: string) => void;
  clearMemory: () => void;
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      currentMood: 'unset',
      desireMemory: [],
      setMood: (mood) => set({ currentMood: mood }),
      addDesire: (desire) =>
        set((state) => ({ desireMemory: [...state.desireMemory, desire] })),
      clearMemory: () => set({ desireMemory: [] }),
    }),
    {
      name: 'elite-mood-storage',
    }
  )
);
