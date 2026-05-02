import axios from 'axios';

const GEMINI_KEY_STORAGE = 'lyra-gemini-api-key';

export const getStoredGeminiKey = () => {
    try { return localStorage.getItem(GEMINI_KEY_STORAGE) || ''; }
    catch { return ''; }
};

export const setStoredGeminiKey = (key) => {
    try {
        if (key) localStorage.setItem(GEMINI_KEY_STORAGE, key);
        else localStorage.removeItem(GEMINI_KEY_STORAGE);
    } catch { /* ignore */ }
};

// In production we use relative `/api` so Vercel proxies to Railway (same-origin → Safari ITP friendly).
// In dev we hit the local backend directly on port 8080.
const apiBase = import.meta.env.DEV
    ? `http://${window.location.hostname}:8080/api`
    : '/api';

export const apiClient = axios.create({
    baseURL: apiBase,
    withCredentials: true
});

// Attach the user's Gemini key (if they set one in Settings) ONLY on the /sort endpoint.
// This prevents accidental key leakage to other API routes.
apiClient.interceptors.request.use((config) => {
    if (config.url && config.url.includes('/sort')) {
        const key = getStoredGeminiKey();
        if (key) config.headers['x-gemini-api-key'] = key;
    }
    return config;
});
