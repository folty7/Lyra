# Resonance AI: Technical Documentation

This document outlines the architectural decisions, development phases, and important technical context for the Resonance AI (formerly SmartSort) application. It is designed to help future developers understand the system's evolution, current state, and the reasoning behind key technical choices.

## Project Overview

Resonance AI is a full-stack web application that allows Spotify users to authenticate their accounts, scan their recently saved tracks, and use Google's Gemini AI to intelligently group those tracks into vibe-based or genre-based playlists. Users can then seamlessly sync these new playlists back to their Spotify accounts.

## Technology Stack

*   **Frontend:** React, Vite, React Router, Tailwind CSS v4, Shadcn UI, Zustand (State Management), Axios.
*   **Backend:** Node.js, Express, `spotify-web-api-node` (wrapper), `@google/genai` (Gemini SDK).
*   **APIs:** Spotify Web API (OAuth, Tracks, Playlists), Google Gemini API (Text categorization).

---

## Architectural Decisions & Development Phases

### Phase 1 & 2: Backend Architecture & Spotify Authentication
*   **Decision (Express & Node.js):** Chosen for its lightweight nature and ease of integrating with Node-based API SDKs (Spotify, Gemini).
*   **Decision (CORS handling):** A custom, extensive CORS middleware was implemented in [server.js](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/be/server.js) to handle `Access-Control-Allow-Credentials: true` which is strictly required for passing HTTP-only authentication cookies between the `127.0.0.1:5173` frontend and the `8080` backend.
*   **OAuth 2.0 Flow:** We utilize the Authorization Code Flow. 
    *   **Crucial Scope Changes:** Initially, we only requested read permissions. To allow users to sync playlists later, we updated the scopes to include `playlist-modify-public` and `playlist-modify-private`. 
    *   **Token Storage:** Access and refresh tokens are stored securely in `httpOnly` cookies (`access_token`, `refresh_token`), protecting them from XSS attacks on the frontend.

### Phase 3: Core API Logic & AI Integration
*   **Decision (AI Model):** We use `gemini-2.5-flash` for fast, cost-effective text inference.
*   **Deprecation Workaround (Spotify Audio Features):** Initially, the plan was to fetch low-level audio features (BPM, danceability, valence) from Spotify to feed to the AI. Spotify deprecated these endpoints. 
    *   *Solution:* We shifted the AI strategy. We now feed Gemini a lean JSON payload containing only the Track Name, Artist(s), and Spotify URI. The prompt explicitly relies on the AI's "vast world knowledge" of music to infer the genre and vibe.
*   **The "Unknown Track" Bug:** Initially, the AI was hallucinating or misformatting the Spotify URIs in its response, causing the frontend to render "Unknown Track".
    *   *Solution:* The Gemini System Prompt in [aiService.js](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/be/services/aiService.js) was heavily reinforced to strictly enforce 1-to-1 matching of the exact `uri` strings provided in the input payload.

### Phase 4 & 5: Frontend Foundations & Initial UI
*   **Decision (Zustand):** Chosen over Redux/Context for its minimal boilerplate. The store holds vital session data: `isAuthenticated` and the JSON response object `sortedPlaylists`.
*   **Decision (Axios):** Interceptors were configured in [src/api/axios.js](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/fe/src/api/axios.js) to ensure every request automatically sets `withCredentials: true`, guaranteeing the Express backend receives the session cookies.
*   **UI Framework:** Shadcn UI combined with Tailwind styling provides robust, accessible base components (Cards, Buttons, Scroll Areas).

### Phase 6: Premium UI Redesign (Glassmorphism)
*   The initial "Neon Tech" aesthetic was completely dismantled and rebuilt.
*   **CSS Architecture:** Heavy reliance on global utility classes defined in [index.css](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/fe/src/index.css) (e.g., `.glass-panel`, `.glass-panel-heavy`).
*   **Visual Strategy:** Uses deep ambient background blurs (`blur-[150px]`), translucent whites (`bg-white/5`), and opalescent borders (`border-white/10`) to simulate a premium crypto-wallet or macOS Glassmorphism design language.

### Phase 7: Resonance AI Rebranding, AI Configurator, & Bug Fixes
*   **App Rebranding:** Namespaces were updated from SmartSort to Resonance AI.
*   **The AI Configurator:** 
    *   *Feature:* Users can now override the AI's auto-pilot by typing manual instructions (e.g., "Sort by 90s hiphop eras") in a `textarea` on the Dashboard.
    *   *Implementation:* The `customPrompt` string is passed in the POST payload to `/smart-sort`. The backend injects this dynamically into the Gemini System Prompt under a high-priority "USER PREFERENCES" block.
*   **The 500 / 403 Sync Bug:** During playlist creation, syncing failed with a 403 Forbidden error from Spotify.
    *   *Root Cause 1:* The `spotify-web-api-node` wrapper's `createPlaylist` method was hitting a legacy, deprecated `/v1/me/playlists` endpoint.
    *   *Root Cause 2:* The frontend was accidentally dispatching entire track objects `[{id, name, uri}]` back to the server instead of just an array of raw `uri` strings.
    *   *Solution:* Rewrote [spotifyService.js](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/be/services/spotifyService.js) to manually execute a native `fetch()` against the modern `https://api.spotify.com/v1/users/${userId}/playlists` endpoint. Patched [Results.jsx](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/fe/src/pages/Results.jsx) to correctly map the `tracks` array to `t.uri`.
*   **Logout Mechanism:** 
    *   Added a manual `/auth/logout` endpoint in Node to deliberately clear the `httpOnly` cookies. 
    *   *Why?* Crucial for debugging token scope issues forcing the user to re-authenticate with Spotify's Consent Screen to acquire new scopes (like playlist creation).

---

## Future Developer Notes

1.  **Environment Variables:** Always ensure [.env](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/be/.env) contains `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`, and `GEMINI_API_KEY`.
2.  **Spotify Rate Limits:** The [getSavedTracks](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/be/services/spotifyService.js#3-33) function currently loops sequentially. If scaling up to fetch thousands of tracks, you must implement exponential backoff or the Spotify API will return `429 Too Many Requests`.
3.  **Authentication State:** The React app's `isAuthenticated` state is currently a "dumb" ping to the backend tracks endpoint. If the backend fails, it assumes the user is logged out. This is functional but could be improved with a dedicated `/auth/verify` endpoint.
4.  **Local API Endpoints:** 
    *   Be cautious if testing on multiple devices locally. The backend CORS is strictly locked to localhost/127.0.0.1.
5.  **Shadcn Styling updates:** If upgrading Shadcn components or adding new ones via `npx shadcn@latest add`, double-check the integration with the custom CSS properties inside [index.css](file:///Users/andrejfolta/Documents/Projekty/SpotifyAiApp/fe/src/index.css). The glassmorphism look relies heavily on overriding standard Shadcn background variables.
