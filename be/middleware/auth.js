const SpotifyWebApi = require('spotify-web-api-node');

const requireAuth = async (req, res, next) => {
    let accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    // If access token is missing but refresh token exists, try to get a new access token
    if (!accessToken && refreshToken) {
        try {
            spotifyApi.setRefreshToken(refreshToken);
            const data = await spotifyApi.refreshAccessToken();
            accessToken = data.body['access_token'];

            // Set the new access token cookie
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: data.body['expires_in'] * 1000,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            return res.status(401).json({ error: 'Unauthorized: Token expired and refresh failed' });
        }
    }

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: No access token provided' });
    }

    spotifyApi.setAccessToken(accessToken);
    if (refreshToken) {
        spotifyApi.setRefreshToken(refreshToken);
    }

    // Attach the initialized api instance to the request object
    req.spotifyApi = spotifyApi;

    next();
};

module.exports = { requireAuth };
