import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useStore, usePlaylistsStore } from "@/store/useStore"
import { apiClient } from "@/api/axios"

const DEFAULT_PARAMS = ['genre', 'year']
const PARAM_LABELS = {
    genre: 'Genre',
    year: 'Year / Decade',
    mood: 'Mood',
    artist: 'Artist',
    popularity: 'Popularity',
    language: 'Language',
    tempo: 'Tempo'
}

export default function Dashboard() {
    const navigate = useNavigate()
    const { clearAuth } = useStore()
    const { savedPlaylists, addManyPlaylists, removePlaylist, renamePlaylist } = usePlaylistsStore()

    const [tracks, setTracks] = useState([])
    const [isLoadingTracks, setIsLoadingTracks] = useState(true)

    const [availableParams, setAvailableParams] = useState([])
    const [selectedParams, setSelectedParams] = useState(new Set(DEFAULT_PARAMS))
    const [extraInstructions, setExtraInstructions] = useState("")

    const [suggestedGroups, setSuggestedGroups] = useState([])
    const [isSorting, setIsSorting] = useState(false)
    const [sortError, setSortError] = useState("")

    const [pushingIds, setPushingIds] = useState(new Set())
    const [toastMessage, setToastMessage] = useState("")

    useEffect(() => {
        apiClient.get('/tracks')
            .then(res => {
                if (res.data.success) setTracks(res.data.data)
            })
            .catch(() => navigate('/'))
            .finally(() => setIsLoadingTracks(false))

        apiClient.get('/sort/parameters')
            .then(res => {
                if (res.data.success) setAvailableParams(res.data.parameters)
            })
            .catch(() => {})
    }, [navigate])

    const handleLogout = async () => {
        try {
            await apiClient.post('/auth/logout')
            clearAuth()
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const toggleParam = (p) => {
        setSelectedParams(prev => {
            const next = new Set(prev)
            if (next.has(p)) next.delete(p)
            else next.add(p)
            return next
        })
    }

    const handleSort = async () => {
        if (selectedParams.size === 0) {
            setSortError("Pick at least one parameter.")
            return
        }
        if (tracks.length === 0) return

        setIsSorting(true)
        setSortError("")
        setSuggestedGroups([])

        try {
            const res = await apiClient.post('/sort', {
                tracks,
                parameters: Array.from(selectedParams),
                extra: extraInstructions.trim() || undefined
            })
            if (res.data.success) setSuggestedGroups(res.data.groups || [])
        } catch (error) {
            console.error(error)
            setSortError(error.response?.data?.error || "Gemini sorting failed.")
        } finally {
            setIsSorting(false)
        }
    }

    const keepGroup = (idx) => {
        const g = suggestedGroups[idx]
        addManyPlaylists([{ name: g.name, description: g.description, uris: g.uris }])
        setSuggestedGroups(prev => prev.filter((_, i) => i !== idx))
        flashToast(`"${g.name}" saved to your library`)
    }

    const keepAllGroups = () => {
        if (suggestedGroups.length === 0) return
        addManyPlaylists(suggestedGroups.map(g => ({
            name: g.name, description: g.description, uris: g.uris
        })))
        flashToast(`${suggestedGroups.length} playlist(s) saved`)
        setSuggestedGroups([])
    }

    const discardGroup = (idx) => {
        setSuggestedGroups(prev => prev.filter((_, i) => i !== idx))
    }

    const pushToSpotify = async (playlist) => {
        setPushingIds(prev => new Set(prev).add(playlist.id))
        try {
            const res = await apiClient.post('/playlists', {
                playlistName: playlist.name,
                uris: playlist.uris
            })
            if (res.data.success) {
                flashToast(`"${playlist.name}" added to Spotify!`)
                removePlaylist(playlist.id)
            }
        } catch (error) {
            console.error(error)
            flashToast(error.response?.data?.error || "Failed to push to Spotify.")
        } finally {
            setPushingIds(prev => {
                const next = new Set(prev)
                next.delete(playlist.id)
                return next
            })
        }
    }

    const flashToast = (msg) => {
        setToastMessage(msg)
        setTimeout(() => setToastMessage(""), 3500)
    }

    const trackCount = useMemo(() => tracks.length, [tracks])

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background font-sans text-foreground overflow-hidden">
            <div className="absolute top-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

            <header className="mb-8 flex items-center justify-between p-6 z-10 w-full max-w-5xl mx-auto">
                <h1 className="text-xl font-medium tracking-wide text-white">Lyra</h1>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40 hidden sm:inline">
                        {isLoadingTracks ? 'loading library…' : `${trackCount} tracks loaded`}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-3xl flex-col items-center flex-1 z-10 px-6 pb-20 gap-6">

                {/* Gemini Sort */}
                <section className="w-full glass-panel-heavy rounded-3xl p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-400/10 to-transparent opacity-50 pointer-events-none" />

                    <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 z-10">Sort with Gemini</h2>
                    <p className="text-[15px] font-light text-white/50 mb-6 z-10">
                        Pick one or more parameters. Gemini will group your {trackCount || 100} most recent tracks into playlists.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 z-10">
                        {(availableParams.length ? availableParams : Object.keys(PARAM_LABELS)).map(p => {
                            const active = selectedParams.has(p)
                            return (
                                <button
                                    key={p}
                                    onClick={() => toggleParam(p)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                        active
                                            ? 'bg-blue-500/20 border-blue-400/50 text-white'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {PARAM_LABELS[p] || p}
                                </button>
                            )
                        })}
                    </div>

                    <input
                        type="text"
                        value={extraInstructions}
                        onChange={(e) => setExtraInstructions(e.target.value)}
                        placeholder="Optional — extra hint, e.g. 'focus on 2020s'"
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-[14px] mb-4 z-10"
                    />

                    <Button
                        onClick={handleSort}
                        disabled={isSorting || tracks.length === 0 || selectedParams.size === 0}
                        className="w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-[15px] border border-indigo-400/30 z-10"
                    >
                        {isSorting ? "Asking Gemini…" : "Sort with AI"}
                    </Button>

                    {sortError && <p className="text-red-400 text-sm mt-3 text-center">{sortError}</p>}

                    {suggestedGroups.length > 0 && (
                        <div className="mt-6 border-t border-white/10 pt-6 space-y-3 z-10">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider">Suggestions</h3>
                                <button
                                    onClick={keepAllGroups}
                                    className="text-xs text-blue-300 hover:text-blue-200 font-medium"
                                >
                                    Keep all
                                </button>
                            </div>

                            {suggestedGroups.map((g, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <p className="text-white font-medium text-[15px]">{g.name}</p>
                                        <span className="text-xs text-white/40 whitespace-nowrap">{g.uris.length} tracks</span>
                                    </div>
                                    <p className="text-xs text-white/50 mb-3">{g.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => keepGroup(idx)}
                                            className="flex-1 h-9 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white text-sm font-medium border border-blue-400/30 transition-colors"
                                        >
                                            Keep
                                        </button>
                                        <button
                                            onClick={() => discardGroup(idx)}
                                            className="flex-1 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 text-sm font-medium border border-white/10 transition-colors"
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Saved Playlists */}
                <section className="w-full glass-panel-heavy rounded-3xl p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/10 to-transparent opacity-50 pointer-events-none" />

                    <div className="flex items-baseline justify-between mb-2 z-10">
                        <h2 className="text-2xl font-semibold tracking-tight text-white">Your saved playlists</h2>
                        <span className="text-xs text-white/40">{savedPlaylists.length} saved</span>
                    </div>
                    <p className="text-[14px] font-light text-white/50 mb-6 z-10">
                        Kept suggestions live here until you push them to Spotify. They persist across refreshes.
                    </p>

                    {savedPlaylists.length === 0 ? (
                        <p className="text-white/40 text-sm italic z-10">Nothing saved yet — sort some tracks above.</p>
                    ) : (
                        <div className="space-y-3 z-10">
                            {savedPlaylists.map(p => {
                                const isPushing = pushingIds.has(p.id)
                                return (
                                    <div key={p.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <input
                                            type="text"
                                            value={p.name}
                                            onChange={(e) => renamePlaylist(p.id, e.target.value)}
                                            className="w-full bg-transparent text-white font-medium text-[15px] focus:outline-none focus:bg-white/5 rounded px-1 mb-1"
                                        />
                                        {p.description && (
                                            <p className="text-xs text-white/50 mb-2 px-1">{p.description}</p>
                                        )}
                                        <p className="text-xs text-white/40 mb-3 px-1">{p.uris.length} tracks</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => pushToSpotify(p)}
                                                disabled={isPushing}
                                                className="flex-1 h-9 rounded-full bg-green-600/90 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-medium border border-green-400/30 transition-colors"
                                            >
                                                {isPushing ? "Pushing…" : "Add to Spotify"}
                                            </button>
                                            <button
                                                onClick={() => removePlaylist(p.id)}
                                                disabled={isPushing}
                                                className="flex-1 h-9 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white/70 text-sm font-medium border border-white/10 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>
            </main>

            {toastMessage && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 border border-white/10 text-white text-sm px-5 py-3 rounded-full backdrop-blur-xl shadow-lg">
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
