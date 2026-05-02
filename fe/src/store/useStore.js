import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setAuth: (status) => set({ isAuthenticated: status }),
    setUser: (userData) => set({ user: userData }),
    clearAuth: () => set({ isAuthenticated: false, user: null })
}));

/**
 * Playlists the user has "kept" from Gemini's suggestions.
 * Persists across refreshes via localStorage, so the user can push them to
 * Spotify later without re-running the AI.
 */
export const usePlaylistsStore = create(
    persist(
        (set) => ({
            savedPlaylists: [],

            addPlaylist: (playlist) => set((state) => ({
                savedPlaylists: [
                    ...state.savedPlaylists,
                    { id: crypto.randomUUID(), createdAt: Date.now(), ...playlist }
                ]
            })),

            addManyPlaylists: (playlists) => set((state) => ({
                savedPlaylists: [
                    ...state.savedPlaylists,
                    ...playlists.map(p => ({ id: crypto.randomUUID(), createdAt: Date.now(), ...p }))
                ]
            })),

            removePlaylist: (id) => set((state) => ({
                savedPlaylists: state.savedPlaylists.filter(p => p.id !== id)
            })),

            renamePlaylist: (id, name) => set((state) => ({
                savedPlaylists: state.savedPlaylists.map(p => p.id === id ? { ...p, name } : p)
            })),

            removeTrackFromPlaylist: (id, uri) => set((state) => ({
                savedPlaylists: state.savedPlaylists.map(p =>
                    p.id === id ? { ...p, uris: p.uris.filter(u => u !== uri) } : p
                )
            })),

            clearPlaylists: () => set({ savedPlaylists: [] })
        }),
        { name: 'lyra-saved-playlists' }
    )
);
