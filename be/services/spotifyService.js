// Service for handling Spotify API interactions

/**
 * Fetch up to `limit` recently saved tracks (Spotify caps each page at 50).
 * Defaults to 1000; clamped to a max of 5000 to keep the response sane.
 */
const getSavedTracks = async (spotifyApi, limit = 1000) => {
    try {
        const cap = Math.min(Math.max(parseInt(limit, 10) || 1000, 1), 5000);
        let allItems = [];
        for (let offset = 0; offset < cap; offset += 50) {
            const currentLimit = Math.min(50, cap - offset);
            const data = await spotifyApi.getMySavedTracks({ limit: currentLimit, offset });
            const items = data.body.items || [];
            allItems = allItems.concat(items);
            if (items.length < currentLimit) break;
        }

        return allItems
            .filter(item => item.track)
            .map(item => {
                const t = item.track;
                const year = (t.album?.release_date || '').slice(0, 4) || null;
                const images = t.album?.images || [];
                return {
                    id: t.id,
                    name: t.name,
                    artists: t.artists.map(a => a.name).join(', '),
                    artistIds: t.artists.map(a => a.id).filter(Boolean),
                    album: t.album?.name,
                    albumImage: images[1]?.url || images[0]?.url || images[2]?.url || null,
                    albumImageSmall: images[2]?.url || images[1]?.url || images[0]?.url || null,
                    year: year ? parseInt(year, 10) : null,
                    popularity: t.popularity,
                    durationMs: t.duration_ms,
                    addedAt: item.added_at,
                    uri: t.uri
                };
            });
    } catch (error) {
        console.error('Error fetching saved tracks:', error);
        throw new Error('Failed to fetch saved tracks from Spotify');
    }
};

/**
 * Creates grouped playlists on Spotify and adds tracks.
 * @param {SpotifyWebApi} spotifyApi
 * @param {Object} categorizedPlaylists Object where keys are playlist names and values are arrays of track URIs.
 */
const createGroupedPlaylists = async (spotifyApi, categorizedPlaylists) => {
    try {
        const results = [];

        const meResponse = await spotifyApi.getMe();
        const userId = meResponse.body.id;
        const accessToken = spotifyApi.getAccessToken();

        console.log(`[Spotify Debug] Fetching /users/${userId}/playlists`);
        console.log(`[Spotify Debug] Token snippet: ${accessToken?.substring(0, 10)}... (Length: ${accessToken?.length})`);

        for (const [playlistName, trackUris] of Object.entries(categorizedPlaylists)) {
            if (!trackUris || trackUris.length === 0) continue;

            console.log(`[Spotify Debug] Attempting to create playlist: "${playlistName}" for User: ${userId}`);

            const createRes = await fetch(`https://api.spotify.com/v1/me/playlists`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: `Created by Lyra - ${playlistName}`,
                    public: false
                })
            });

            if (!createRes.ok) {
                const errText = await createRes.text();
                if (createRes.status === 403) {
                    throw new Error(`Forbidden (403): Spotify denied playlist creation. Your account may be restricted or require private playlists. (Details: ${errText})`);
                }
                throw new Error(`Failed to create playlist: ${errText}`);
            }

            const playlistData = await createRes.json();
            const playlistId = playlistData.id;
            const playlistUrl = playlistData.external_urls.spotify;

            // Spotify's add-items endpoint caps at 100 URIs per call.
            for (let i = 0; i < trackUris.length; i += 100) {
                const chunk = trackUris.slice(i, i + 100);
                const addRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ uris: chunk })
                });

                if (!addRes.ok) {
                    const addErrText = await addRes.text();
                    throw new Error(`Failed to add tracks to playlist: ${addErrText}`);
                }
            }

            results.push({ name: playlistName, id: playlistId, url: playlistUrl });
        }

        return results;
    } catch (error) {
        console.error('Error creating grouped playlists:', error);
        throw error;
    }
};

/**
 * Fetch the user's Spotify-curated top artists and tracks. Note: artist
 * `genres`, `popularity`, and `followers` are deprecated by Spotify and now
 * return empty/null, so we don't surface them. Requires the `user-top-read`
 * OAuth scope.
 */
const getTopData = async (spotifyApi) => {
    const [artistsRes, tracksRes] = await Promise.all([
        spotifyApi.getMyTopArtists({ limit: 50, time_range: 'medium_term' }),
        spotifyApi.getMyTopTracks({ limit: 20, time_range: 'medium_term' })
    ]);

    const topArtists = (artistsRes.body.items || []).map(a => ({
        id: a.id,
        name: a.name,
        image: a.images?.[1]?.url || a.images?.[0]?.url || a.images?.[2]?.url || null
    }));

    const topTracks = (tracksRes.body.items || []).map(t => {
        const images = t.album?.images || [];
        const year = (t.album?.release_date || '').slice(0, 4) || null;
        return {
            id: t.id,
            name: t.name,
            artists: t.artists.map(a => a.name).join(', '),
            albumImage: images[1]?.url || images[0]?.url || images[2]?.url || null,
            year: year ? parseInt(year, 10) : null,
            uri: t.uri
        };
    });

    return { topArtists, topTracks };
};

module.exports = {
    getSavedTracks,
    createGroupedPlaylists,
    getTopData
};
