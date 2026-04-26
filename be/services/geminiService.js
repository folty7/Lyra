const { GoogleGenAI } = require('@google/genai');

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

let serverClient = null;
const getClient = (overrideKey) => {
    if (overrideKey && typeof overrideKey === 'string' && overrideKey.trim()) {
        return new GoogleGenAI({ apiKey: overrideKey.trim() });
    }
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('No Gemini API key. Add your own in Settings, or configure GEMINI_API_KEY on the server.');
    }
    if (!serverClient) {
        serverClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return serverClient;
};

// Spotify deprecated artist `genres`, `popularity`, and audio features in 2025.
// What we still get reliably per track: name, artists, album, year, durationMs.
// Anything else (genre, mood, activity) must be inferred by the LLM from its
// training knowledge of the artist + track.
const PARAMETER_HINTS = {
    artist: 'group by performing artist (one playlist per artist, or cluster collaborators)',
    album: 'group tracks by the album / EP they belong to',
    year: 'release year or decade (e.g. 1990s, 2010s, 2020s)',
    genre: 'strictly classify tracks into cohesive, highly specific musical genres and sub-genres based on their sound, origin, and characteristics. Rely deeply on your extensive musical knowledge base to infer accurate genres even for lesser-known tracks.',
    mood: 'analyze the acoustic properties, tempo, lyrical themes, and emotional resonance of each track. Group them by nuanced moods or emotional states (e.g., deeply melancholic, euphoric, high-energy adrenaline, tranquil chill, aggressive, nostalgic). Be highly perceptive.',
    activity: 'best-fit listening context (e.g. workout, focus, road trip, party, late night, study) — INFER from the track\'s energy and style'
};

/**
 * Ask Gemini to group tracks into playlists using the selected parameters.
 * @param {Array} tracks Enriched Spotify tracks.
 * @param {string[]} parameters One or more keys from PARAMETER_HINTS.
 * @param {string} [extra] Optional free-text user guidance.
 */
const groupTracksByParameters = async (tracks, parameters, extra = '', apiKey = null) => {
    const ai = getClient(apiKey);

    const usedParams = (parameters || []).filter(p => PARAMETER_HINTS[p]);
    if (usedParams.length === 0) {
        throw new Error('At least one grouping parameter is required');
    }

    const paramSpec = usedParams
        .map(p => `- ${p}: ${PARAMETER_HINTS[p]}`)
        .join('\n');

    const trackSummaries = tracks.map(t => ({
        uri: t.uri,
        name: t.name,
        artists: t.artists,
        album: t.album,
        year: t.year
    }));

    const prompt = `You are a music curator. Group the following Spotify tracks into playlists using these parameters:\n${paramSpec}\n${extra ? `\nAdditional instructions: ${extra}\n` : ''}
Rules:
- Every track URI must appear in exactly one group.
- Aim for 3-6 well-balanced groups; each with at least 2 tracks when possible.
- Name each playlist concisely (max 40 chars) and write a one-sentence description.
- Base names on the parameters actually used (e.g. "90s Rock", "Chill Indie 2020s", "Workout Hype").
- The input only contains: name, artists, album, year. For any selected parameter not directly present (genre, mood, activity), use your training knowledge of the artist and track to infer it. Do not refuse or skip a track because metadata is missing.

Return ONLY JSON: { "groups": [ { "name": string, "description": string, "uris": string[] } ] }

Tracks:
${JSON.stringify(trackSummaries, null, 2)}`;

    let response;
    try {
        response = await ai.models.generateContent({
            model: MODEL,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: 'object',
                    properties: {
                        groups: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    uris: { type: 'array', items: { type: 'string' } }
                                },
                                required: ['name', 'description', 'uris']
                            }
                        }
                    },
                    required: ['groups']
                }
            }
        });
    } catch (err) {
        console.error('Gemini API Error:', err);
        if (err.status === 429 || err.message?.includes('429') || err.message?.toLowerCase().includes('quota') || err.message?.toLowerCase().includes('exhausted')) {
            throw new Error('QUOTA_EXCEEDED');
        }
        throw err;
    }

    let parsed;
    try {
        const raw = response.text;
        parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (!parsed || typeof parsed !== 'object') throw new Error('not an object');
    } catch (err) {
        console.error('Gemini parse failed. Raw response.text:', response.text);
        throw new Error('AI response could not be parsed');
    }

    const validUris = new Set(tracks.map(t => t.uri));
    return (parsed.groups || [])
        .map(g => ({
            name: String(g.name || 'Untitled').slice(0, 100),
            description: String(g.description || '').slice(0, 280),
            uris: (g.uris || []).filter(uri => validUris.has(uri))
        }))
        .filter(g => g.uris.length > 0);
};

module.exports = {
    groupTracksByParameters,
    AVAILABLE_PARAMETERS: Object.keys(PARAMETER_HINTS)
};
