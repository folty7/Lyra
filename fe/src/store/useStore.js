import { create } from 'zustand';

export const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    sortedPlaylists: null,

    setAuth: (status) => set({ isAuthenticated: status }),
    setUser: (userData) => set({ user: userData }),
    setSortedPlaylists: (playlists) => set({ sortedPlaylists: playlists }),
    clearAuth: () => set({ isAuthenticated: false, user: null, sortedPlaylists: null })
}));
