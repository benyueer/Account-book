import { create } from 'zustand'

interface SystemState {
  tabBarVisible: boolean
  hideTabBar: () => void
  showTabBar: () => void
}

export const useSystemStore = create<SystemState>(set => ({
  tabBarVisible: true,
  hideTabBar: () => set({ tabBarVisible: false }),
  showTabBar: () => set({ tabBarVisible: true }),
}))
