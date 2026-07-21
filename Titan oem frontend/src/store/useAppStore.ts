import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  region: string;
  language: string;
  setRegion: (region: string) => void;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      region: 'US',
      language: 'en',
      setRegion: (region) => set({ region }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'oem-app-storage',
      partialize: (state) => ({
        region: state.region,
        language: state.language,
      }),
    }
  )
);
