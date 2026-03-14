import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { apiClient } from "@/api/axios"

export default function Dashboard() {
    const navigate = useNavigate()
    const { clearAuth } = useStore() 

    const [tracks, setTracks] = useState([])
    const [selectedTracks, setSelectedTracks] = useState(new Set())
    const [playlistName, setPlaylistName] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        // Fetch 10 latest tracks on load
        apiClient.get('/tracks')
            .then(res => {
                if (res.data.success) {
                    setTracks(res.data.data)
                }
            })
            .catch(() => {
                navigate('/')
            })
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

    const toggleTrackSelection = (uri) => {
        const newSelection = new Set(selectedTracks)
        if (newSelection.has(uri)) {
            newSelection.delete(uri)
        } else {
            newSelection.add(uri)
        }
        setSelectedTracks(newSelection)
    }

    const handleCreatePlaylist = async () => {
        if (!playlistName.trim()) {
            alert("Please enter a playlist name")
            return
        }
        if (selectedTracks.size === 0) {
            alert("Please select at least one track")
            return
        }

        setIsCreating(true)
        setSuccessMessage("")

        try {
            const response = await apiClient.post('/playlists', {
                playlistName: playlistName.trim(),
                uris: Array.from(selectedTracks)
            })

            if (response.data.success) {
                setSuccessMessage("Playlist created successfully!")
                setSelectedTracks(new Set())
                setPlaylistName("")
            }
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.error || "Failed to create playlist.")
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background font-sans text-foreground overflow-hidden">
            {/* Ambient Blobs */}
            <div className="absolute top-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

            <header className="mb-8 flex items-center justify-between p-6 z-10 w-full max-w-5xl mx-auto">
                <h1 className="text-xl font-medium tracking-wide text-white">
                    Spotify App
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full glass-panel border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-2xl flex-col items-center flex-1 z-10 px-6 pb-20">
                <div className="w-full glass-panel-heavy rounded-3xl p-8 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/10 to-transparent opacity-50 pointer-events-none" />

                    <h2 className="text-3xl font-semibold tracking-tight text-white mb-2 z-10">Create a Playlist</h2>
                    <p className="text-[15px] font-light text-white/50 mb-6 z-10">
                        Select from your 10 most recently saved tracks.
                    </p>

                    <div className="w-full space-y-4 mb-6 z-10">
                        <div className="w-full max-h-80 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {tracks.length === 0 ? (
                                <p className="text-white/50 text-sm">Loading tracks...</p>
                            ) : (
                                tracks.map((track) => (
                                    <label key={track.uri} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors cursor-pointer"
                                            checked={selectedTracks.has(track.uri)}
                                            onChange={() => toggleTrackSelection(track.uri)}
                                        />
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-medium text-white/90 truncate">{track.name}</span>
                                            <span className="text-xs text-white/40 truncate">{track.artists}</span>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 z-10 border-t border-white/10 pt-6">
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="My Awesome Playlist"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-[15px]"
                        />
                        
                        <Button
                            onClick={handleCreatePlaylist}
                            disabled={isCreating || selectedTracks.size === 0 || tracks.length === 0}
                            className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all font-medium text-[15px] border border-blue-400/30"
                        >
                            {isCreating ? "Creating..." : "Create Playlist"}
                        </Button>
                        
                        {successMessage && (
                            <p className="text-green-400 text-sm font-medium mt-2 text-center animate-in fade-in slide-in-from-bottom-2">
                                {successMessage}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
