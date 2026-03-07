require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://127.0.0.1:5173';

// Middleware
app.use(cors({
    origin: FRONTEND_URI,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Initialize Spotify Web API Node
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// Helper functions for random strings
const generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';


// --- Routes ---

app.get('/auth/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // Requesting permissions
    const scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'playlist-modify-public', 'playlist-modify-private'];

    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    res.redirect(authorizeURL);
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(FRONTEND_URI + '/#' +
            new URLSearchParams({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);

        try {
            const data = await spotifyApi.authorizationCodeGrant(code);

            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            // Set cookies
            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: expires_in * 1000,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });

            res.redirect(FRONTEND_URI + '/dashboard');

        } catch (error) {
            console.error('Error exchanging code for tokens:', error);
            res.redirect(FRONTEND_URI + '/#' +
                new URLSearchParams({
                    error: 'invalid_token'
                }));
        }
    }
});

// Mount protected API routes
const apiRoutes = require('./routes/api');
const { requireAuth } = require('./middleware/auth');
app.use('/api', requireAuth, apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
