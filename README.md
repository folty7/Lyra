# Lyra

AI-powered playlist organiser that sorts your Spotify library into smart, themed playlists using Google Gemini.

**[Live landing page](https://folty7.github.io/Lyra)** · [Privacy Policy](#) · [Terms of Use](#)

---

## Features

- Fetches your most recently saved Spotify tracks automatically
- Uses Google Gemini AI to group them into coherent, named playlists
- Sort by genre, year, mood, artist, popularity, language, or tempo
- Review and rename AI suggestions before committing
- Push playlists directly to your Spotify library in one click
- Bring your own Gemini API key (self-hosted mode)
- Playlists are created as private by default

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Zustand |
| Backend | Node.js, Express 5 |
| Auth | Spotify OAuth 2.0 (httpOnly cookies) |
| AI | Google Gemini API (`@google/genai`) |
| Deployment | Vercel (frontend) + Railway (backend) |
| GH Pages | Static landing page via separate Vite build |

---

## Project structure

```
Lyra/
├── be/                        # Express backend
│   ├── middleware/
│   │   └── auth.js            # Token verification & refresh
│   ├── routes/
│   │   └── api.js             # /api/* endpoints
│   ├── services/
│   │   ├── geminiService.js   # Gemini AI grouping logic
│   │   └── spotifyService.js  # Spotify API wrappers
│   ├── server.js              # Entry point, CORS, auth routes
│   ├── Dockerfile
│   └── .env.example
├── fe/                        # React frontend (deployed to Vercel)
│   ├── src/
│   │   ├── api/axios.js       # Axios instance (withCredentials)
│   │   ├── components/        # Shared UI components
│   │   ├── layouts/           # DashboardLayout
│   │   ├── pages/             # Landing, Login, Dashboard pages
│   │   └── store/             # Zustand state stores
│   ├── vite.config.js         # Main app build
│   ├── vite.ghpages.config.js # Static landing page build
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## Local development

### Prerequisites

- Node.js 24+
- A [Spotify Developer app](https://developer.spotify.com/dashboard) with redirect URI set to `http://127.0.0.1:8080/auth/callback`
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier is sufficient)

### 1. Clone the repo

```bash
git clone https://github.com/folty7/Lyra.git
cd Lyra
```

### 2. Backend

```bash
cd be
cp .env.example .env
# Fill in your credentials in .env
npm install
npm run dev
```

Backend runs on `http://127.0.0.1:8080`.

**`be/.env`**
```env
PORT=8080
FRONTEND_URI=http://127.0.0.1:5173

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:8080/auth/callback

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
```

### 3. Frontend

```bash
cd fe
npm install
npm run dev
```

Frontend runs on `http://127.0.0.1:5173`.

Open the app, click **Launch app** — you'll be redirected through Spotify OAuth and land on the dashboard.

---

## Docker (backend only)

The backend ships with a `Dockerfile` for local testing or self-hosting. The frontend is deployed to Vercel and does not have a Docker setup.

```bash
# From the project root
docker-compose up --build
```

Backend runs on `http://localhost:8080`. Make sure `be/.env` exists and is filled in before running.

---

## API reference

All `/api/*` routes require a valid session cookie (`access_token`). The auth middleware automatically refreshes expired tokens.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/login` | Redirects to Spotify OAuth |
| `GET` | `/auth/callback` | Handles OAuth callback, sets cookies |
| `GET` | `/auth/logout` | Clears session cookies |
| `GET` | `/api/me` | Current Spotify user profile |
| `GET` | `/api/tracks` | Saved tracks (`?limit=100`) |
| `GET` | `/api/top` | Top tracks, artists, and genres |
| `GET` | `/api/sort/parameters` | Available sort parameters |
| `POST` | `/api/sort` | Group tracks via Gemini AI |
| `POST` | `/api/playlists` | Create playlist(s) on Spotify |

### `POST /api/sort`

```json
{
  "tracks": [...],
  "parameters": ["genre", "mood"],
  "extra": "optional free-text instruction"
}
```

Pass `x-gemini-api-key` header to use your own Gemini key instead of the server's.

### `POST /api/playlists`

Single playlist:
```json
{ "playlistName": "Late Night Drive", "uris": ["spotify:track:..."] }
```

Bulk:
```json
{ "groups": [{ "name": "Workout", "uris": [...] }, { "name": "Chill", "uris": [...] }] }
```

---

## Deployment

### Backend → Railway

1. New project → Deploy from GitHub → set **Root directory** to `be`
2. Build: `npm install` · Start: `node server.js`
3. Generate a public domain
4. Add environment variables (same as `.env.example`, with production URLs)

### Frontend → Vercel

1. New project → import repo → set **Root directory** to `fe`
2. Build: `npm run build` · Output: `dist`
3. Add env var: `VITE_BACKEND_URL=https://your-railway-domain.up.railway.app`

### GitHub Pages (landing only)

The landing page is a separate static build deployed automatically via GitHub Actions on every push to `main`.

```bash
# Build locally
cd fe
npm run build:ghpages   # outputs to fe/dist-ghpages/
```

---

## Spotify OAuth scopes

Lyra requests the following scopes:

| Scope | Purpose |
|---|---|
| `user-read-private` | Read subscription level and country |
| `user-read-email` | Read account email (displayed in profile) |
| `user-library-read` | Read your saved tracks |
| `user-top-read` | Read your top tracks and artists |
| `playlist-modify-private` | Create private playlists |
| `playlist-modify-public` | Create public playlists (if you choose) |

You can revoke access at any time at [spotify.com/account/apps](https://www.spotify.com/account/apps/).

---

## License

MIT — see [LICENSE](LICENSE) for details.
