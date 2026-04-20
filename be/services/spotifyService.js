// Service for handling Spotify API interactions

/**
 * Fetch up to `limit` recently saved tracks (max 50 per Spotify page).
 */
const getSavedTracks = async (spotifyApi, limit = 100) => {
    try {
        let allItems = [];
        for (let offset = 0; offset < limit; offset += 50) {
            const currentLimit = Math.min(50, limit - offset);
            const data = await spotifyApi.getMySavedTracks({ limit: currentLimit, offset });
            allItems = allItems.concat(data.body.items);
            if (data.body.items.length < currentLimit) break;
        }

        return allItems
            .filter(item => item.track)
            .map(item => {
                const year = (item.track.album?.release_date || '').slice(0, 4) || null;
                return {
                    id: item.track.id,
                    name: item.track.name,
                    artists: item.track.artists.map(a => a.name).join(', '),
                    artistIds: item.track.artists.map(a => a.id).filter(Boolean),
                    album: item.track.album?.name,
                    year: year ? parseInt(year, 10) : null,
                    popularity: item.track.popularity,
                    uri: item.track.uri
                };
            });
    } catch (error) {
        console.error('Error fetching saved tracks:', error);
        throw new Error('Failed to fetch saved tracks from Spotify');
    }
};

/**
 * Enrich tracks with artist genres. Spotify only exposes genres on the artist
 * object, so batch-fetch unique artists and join back. Graceful on 403 — some
 * dev-mode apps don't have quota for /v1/artists, in which case we just skip.
 */
const enrichTracksWithGenres = async (spotifyApi, tracks) => {
    const uniqueArtistIds = [...new Set(tracks.flatMap(t => t.artistIds || []))];
    const genresByArtistId = {};

    for (let i = 0; i < uniqueArtistIds.length; i += 50) {
        const batch = uniqueArtistIds.slice(i, i + 50);
        try {
            const res = await spotifyApi.getArtists(batch);
            for (const artist of res.body.artists || []) {
                genresByArtistId[artist.id] = artist.genres || [];
            }
        } catch (err) {
            console.warn(`Artist genres fetch failed: ${err.body?.error?.message || err.message}`);
            break;
        }
    }

    return tracks.map(t => ({
        ...t,
        genres: [...new Set((t.artistIds || []).flatMap(id => genresByArtistId[id] || []))]
    }));
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

module.exports = {
    getSavedTracks,
    enrichTracksWithGenres,
    createGroupedPlaylists
};
