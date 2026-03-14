import { create } from 'zustand';

export const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setAuth: (status) => set({ isAuthenticated: status }),
    setUser: (userData) => set({ user: userData }),
    clearAuth: () => set({ isAuthenticated: false, user: null })
}));
