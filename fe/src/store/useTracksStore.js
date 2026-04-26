import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/api/axios';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

/**
 * Tracks the user's saved Spotify library + Spotify-curated top stats.
 * Cached in localStorage so reopening the app is instant; refresh forces
 * a refetch from Spotify.
 */
export const useTracksStore = create(persist(
    (set, get) => ({
        tracks: [],
        topArtists: [],
        topTracks: [],
        topGenres: [],
        needsReauth: false,
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastFetchedAt: null,

        fetchTracks: async ({ force = false } = {}) => {
            const state = get();
            if (state.isLoading || state.isRefreshing) return { ok: true, inFlight: true };

            // Cache hit — serve from store unless forced
            const cacheFresh = state.lastFetchedAt && (Date.now() - state.lastFetchedAt) < TWENTY_FOUR_HOURS;
            if (!force && state.tracks.length > 0 && cacheFresh) {
                // Refresh top data quietly (it's cheap and the 403 state may have changed)
                get().fetchTop();
                return { ok: true, cached: true };
            }

            set(force ? { isRefreshing: true, error: null } : { isLoading: true, error: null });

            try {
                const res = await apiClient.get('/tracks');
                if (res.data.success) {
                    set({
                        tracks: res.data.data,
                        lastFetchedAt: Date.now(),
                        isLoading: false,
                        isRefreshing: false,
                        error: null
                    });
                    get().fetchTop();
                    return { ok: true };
                }
                set({ isLoading: false, isRefreshing: false, error: 'Unexpected response' });
                return { ok: false, status: 500 };
            } catch (err) {
                const status = err.response?.status;
                set({
                    isLoading: false,
                    isRefreshing: false,
                    error: err.response?.data?.error || err.message || 'Failed to load library'
                });
                return { ok: false, status };
            }
        },

        fetchTop: async () => {
            try {
                const res = await apiClient.get('/top');
                if (res.data.success) {
                    set({
                        topArtists: res.data.topArtists || [],
                        topTracks: res.data.topTracks || [],
                        topGenres: res.data.topGenres || [],
                        needsReauth: false
                    });
                }
            } catch (err) {
                if (err.response?.status === 403) {
                    set({ needsReauth: true });
                } else {
                    console.warn('Top fetch failed:', err.message);
                }
            }
        },

        clear: () => set({
            tracks: [],
            topArtists: [],
            topTracks: [],
            topGenres: [],
            needsReauth: false,
            isLoading: false,
            isRefreshing: false,
            error: null,
            lastFetchedAt: null
        })
    }),
    {
        name: 'lyra-library-cache',
        partialize: (state) => ({
            tracks: state.tracks,
            topArtists: state.topArtists,
            topTracks: state.topTracks,
            topGenres: state.topGenres,
            lastFetchedAt: state.lastFetchedAt
        })
    }
));
