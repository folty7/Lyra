### Smart-Sort Spotify App: Full-Stack Roadmap

**Phase 1: Environment & Setup (Completed)**

* Create a parent directory for the project (e.g., `smart-sort-app`).
* Initialize the backend: Create a `backend` folder and run `npm init -y`.
* Initialize the frontend: Run `npm create vite@latest frontend -- --template react` in the parent directory.
* Go to the Spotify Developer Dashboard, create an app, and save the Client ID and Client Secret.
* In the Spotify app settings, add the local backend callback URL to the Redirect URIs using the loopback IP (e.g., `http://127.0.0.1:8080/auth/callback`).
* Generate a free API key for the chosen AI (e.g., Google AI Studio for Gemini).
* Create `.env` files in both the frontend and backend directories to securely store keys and API URLs.

**Phase 2: Node.js Backend & Authentication**

* Install core backend dependencies: `npm install express cors dotenv cookie-parser spotify-web-api-node`. *(Completed)*
* Create `server.js` and set up a basic Express server listening on port 8080.
* Configure `cors` middleware to accept requests only from the frontend URL (`http://127.0.0.1:5173`) and allow credentials (cookies).
* Create the `/auth/login` endpoint to redirect the user to Spotify's authorization screen.
* Create the `/auth/callback` endpoint to receive the code from Spotify, exchange it for Access/Refresh tokens, and store them in secure, HTTP-only cookies.
* Create a middleware function to verify if the user has a valid access token cookie before allowing them to hit protected API routes.

**Phase 3: Core API Logic (Backend)**

* Create a `GET /api/tracks` endpoint to fetch the user's saved tracks or a specific playlist.
* Write a utility function that takes an array of track IDs and fetches their `audio_features` from Spotify.
* Install the AI SDK (e.g., `npm install @google/genai`).
* Create a `POST /api/smart-sort` endpoint:
* Fetch the user's tracks and audio features.
* Format the data into a lean, stringified JSON payload.
* Send the payload to the AI API with a strict system prompt to return categorized JSON based on vibes/audio features.
* Parse the AI's response and send it back to the frontend.


* Create a `POST /api/playlists` endpoint that takes the AI's grouped track URIs and creates actual playlists on the user's Spotify account.

**Phase 4: React Frontend Foundations**

* Navigate to the frontend folder and install dependencies: `npm install axios react-router-dom zustand`.
* Install and configure Tailwind CSS for styling.
* Set up Axios globally. Crucial: configure it with `withCredentials: true` so it automatically sends secure backend cookies with every request.
* Set up React Router with basic empty pages: Login, Dashboard, and Results.
* Set up a Zustand store (or React Context) to hold global state, such as `isAuthenticated` and `sortedPlaylists`.

**Phase 5: UI & Application Flow**

* **Login Page:** Create a simple landing page with a "Log in with Spotify" button that redirects to `http://127.0.0.1:8080/auth/login`.
* **Dashboard Page:**
* Fetch the user's profile info and display their avatar/name.
* Create a "Smart Sort My Music" button.
* Build a loading skeleton or spinner (AI requests can take a few seconds).


* **Results Page:**
* Take the JSON response from the backend and render it visually (e.g., cards for "Late Night Drive", "Workout", etc., listing the tracks inside).
* Add a "Save to Spotify" button next to each categorized playlist that triggers the backend creation endpoint.



**Phase 6: Polish & Deployment**

* Add error handling on the frontend (e.g., what happens if the AI returns malformed JSON or the Spotify token expires?).
* Update CORS settings in the Express backend to accept the future production frontend domain.
* Update Spotify Developer Dashboard to include the production backend redirect URI.
* Deploy the backend to Render or Railway.
* Deploy the frontend to Vercel or Netlify.