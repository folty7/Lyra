const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');

// @route   GET /api/tracks
// @desc    Test fetching user saved tracks directly
router.get('/tracks', async (req, res) => {
    try {
        const tracks = await spotifyService.getSavedTracks(req.spotifyApi, 10);
        res.json({ success: true, count: tracks.length, data: tracks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   POST /api/playlists
// @desc    Create playlists and add tracks
router.post('/playlists', async (req, res) => {
    try {
        const { playlistName, uris } = req.body;

        if (!playlistName || !uris || !Array.isArray(uris)) {
            return res.status(400).json({ error: "Invalid payload. Expected playlistName and uris array." });
        }

        const categorizedPlaylists = {
            [playlistName]: uris
        };

        console.log("Creating playlist on Spotify...");
        const results = await spotifyService.createGroupedPlaylists(req.spotifyApi, categorizedPlaylists);

        res.json({ success: true, created_playlists: results });

    } catch (error) {
        console.error("Playlist Creation Error:", error);
        res.status(500).json({ error: error.message || "Failed to create playlists" });
    }
});

module.exports = router;
