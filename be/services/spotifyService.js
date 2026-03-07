// Service for handling Spotify API interactions

/**
 * Fetch a user's most recently saved tracks.
 * @param {SpotifyWebApi} spotifyApi The authenticated SpotifyWebApi instance.
 * @param {number} limit Maximum number of tracks to fetch (max 50 per request).
 * @returns {Promise<Array>} Array of track objects.
 */
const getSavedTracks = async (spotifyApi, limit = 50) => {
    try {
        const data = await spotifyApi.getMySavedTracks({ limit, offset: 0 });
        // Map tracks to a simpler format
        return data.body.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists.map(a => a.name).join(', '),
            uri: item.track.uri
        }));
    } catch (error) {
        console.error('Error fetching saved tracks:', error);
        throw new Error('Failed to fetch saved tracks from Spotify');
    }
};

/**
 * Fetch audio features for an array of track IDs.
 * @param {SpotifyWebApi} spotifyApi The authenticated SpotifyWebApi instance.
 * @param {Array<string>} trackIds Array of Spotify track IDs (max 100 per request).
 * @returns {Promise<Array>} Array of audio feature objects.
 */
const getAudioFeatures = async (spotifyApi, trackIds) => {
    try {
        if (trackIds.length === 0) return [];

        const data = await spotifyApi.getAudioFeaturesForTracks(trackIds);
        return data.body.audio_features.filter(af => af !== null);
    } catch (error) {
        console.error('Error fetching audio features:', error);
        throw new Error('Failed to fetch audio features from Spotify');
    }
};

/**
 * Creates grouped playlists on Spotify and adds tracks.
 * @param {SpotifyWebApi} spotifyApi The authenticated SpotifyWebApi instance.
 * @param {Object} categorizedPlaylists Object where keys are playlist names and values are arrays of track URIs.
 */
const createGroupedPlaylists = async (spotifyApi, categorizedPlaylists) => {
    try {
        const results = [];

        // Iterate through each category
        for (const [playlistName, trackUris] of Object.entries(categorizedPlaylists)) {
            if (!trackUris || trackUris.length === 0) continue;

            // Create the playlist
            const playlistResponse = await spotifyApi.createPlaylist(playlistName, {
                description: `Created by Smart Sort AI - Vibes: ${playlistName}`,
                public: false
            });

            const playlistId = playlistResponse.body.id;
            const playlistUrl = playlistResponse.body.external_urls.spotify;

            // Add tracks to the newly created playlist (max 100 per request, assuming < 100 for now)
            await spotifyApi.addTracksToPlaylist(playlistId, trackUris);

            results.push({ name: playlistName, id: playlistId, url: playlistUrl });
        }

        return results;
    } catch (error) {
        console.error('Error creating grouped playlists:', error);
        throw new Error('Failed to create playlists on Spotify');
    }
};

module.exports = {
    getSavedTracks,
    getAudioFeatures,
    createGroupedPlaylists
};
