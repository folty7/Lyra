import { useEffect, useMemo } from "react"
import { X, Trash2, Music } from "lucide-react"
import { useTracksStore } from "@/store/useTracksStore"

export default function PlaylistTracksModal({ open, onClose, playlistName, uris, onRemoveTrack }) {
    const tracks = useTracksStore(s => s.tracks)
    const topTracks = useTracksStore(s => s.topTracks)

    const trackMap = useMemo(() => {
        const m = new Map()
        for (const t of tracks) m.set(t.uri, t)
        for (const t of topTracks) if (!m.has(t.uri)) m.set(t.uri, t)
        return m
    }, [tracks, topTracks])

    const resolved = useMemo(
        () => (uris || []).map(uri => trackMap.get(uri) || { uri, name: 'Unknown track', artists: '—', albumImageSmall: null }),
        [uris, trackMap]
    )

    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = prev
        }
    }, [open, onClose])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-3xl bg-[#0a1410] border border-white/[0.08] shadow-2xl flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4 p-5 border-b border-white/[0.06]">
                    <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-1">Playlist tracks</p>
                        <h3 className="text-lg font-medium truncate">{playlistName}</h3>
                        <p className="text-xs text-white/40 mt-0.5">{resolved.length} {resolved.length === 1 ? 'song' : 'songs'}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full hover:bg-white/[0.06] flex items-center justify-center shrink-0"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-white/60" />
                    </button>
                </div>

                {resolved.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-16 text-white/40">
                        <Music className="w-7 h-7 mb-2 opacity-50" />
                        <p className="text-sm">No tracks left.</p>
                    </div>
                ) : (
                    <div className="overflow-y-auto p-2 space-y-1">
                        {resolved.map((t) => (
                            <div key={t.uri} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04]">
                                {t.albumImageSmall || t.albumImage ? (
                                    <img
                                        src={t.albumImageSmall || t.albumImage}
                                        alt=""
                                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-md bg-white/[0.06] flex-shrink-0 flex items-center justify-center">
                                        <Music className="w-4 h-4 text-white/30" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{t.name}</p>
                                    <p className="text-[11px] text-white/50 truncate">{t.artists}</p>
                                </div>
                                {onRemoveTrack && (
                                    <button
                                        onClick={() => onRemoveTrack(t.uri)}
                                        className="w-8 h-8 rounded-full hover:bg-rose-500/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity shrink-0"
                                        title="Remove from playlist"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
