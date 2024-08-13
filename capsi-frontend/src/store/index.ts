import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import UserSlice from './slice/userSlice';
import globalLoginSlice from './slice/globalLoginSlice';
import videoSlice from './slice/videoSlice';
import templateSlice from './slice/templateSlice';

const cachedStoreKey = 'cachedVideoStore';
const cachedStoreVersion = 1;
const cachedKeys = ['videoId'];

const useAppStore = create(
  persist(
    devtools((set, get) => ({
      ...UserSlice(set, get),
      ...globalLoginSlice(set, get),
      ...videoSlice(set, get),
      ...templateSlice(set, get),
      //TODO: Add more slices here
    })),
    {
      // For persisting into localstorage (from: https://docs.pmnd.rs/zustand/integrations/persisting-store-data#options)
      name: cachedStoreKey,
      version: cachedStoreVersion,
      partialize: (state: any) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => [...cachedKeys].includes(key)) // only this key will be cached
        ),
    }
  )
);

export default useAppStore;
