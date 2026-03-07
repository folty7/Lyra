const SpotifyWebApi = require('spotify-web-api-node');

const requireAuth = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: No access token provided' });
    }

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.setAccessToken(accessToken);
    if (refreshToken) {
        spotifyApi.setRefreshToken(refreshToken);
    }

    // Attach the initialized api instance to the request object
    req.spotifyApi = spotifyApi;

    next();
};

module.exports = { requireAuth };
