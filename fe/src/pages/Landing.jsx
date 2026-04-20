import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const LAUNCH_URL = typeof window !== 'undefined'
    ? `http://${window.location.hostname}:8080/auth/login`
    : '#'

function LyraLogo({ size = 48 }) {
    return (
        <div
            className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700 shadow-[0_4px_20px_rgba(59,130,246,0.4)] border border-white/20 shrink-0"
            style={{ height: size, width: size }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
                style={{ height: size * 0.55, width: size * 0.55 }}
            >
                <path d="M3 12c2 0 2-4 4-4s2 10 4 10 2-14 4-14 2 8 4 8h2" />
            </svg>
        </div>
    )
}

function LaptopMockup() {
    return (
        <div className="relative mx-auto w-full max-w-4xl">
            <div className="relative rounded-t-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 border-b-0 p-3 shadow-2xl">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-slate-700" />
                <div className="rounded-md bg-slate-950 overflow-hidden aspect-[16/10]">
                    {/* Fake Dashboard */}
                    <div className="relative h-full w-full p-6 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 text-[10px]">
                        <div className="absolute top-[-20%] right-[-10%] h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
                        <div className="absolute bottom-[-20%] left-[-10%] h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />

                        <div className="relative flex items-center justify-between mb-5">
                            <div className="flex items-center gap-1.5">
                                <LyraLogo size={16} />
                                <span className="text-white font-medium text-xs">Lyra</span>
                            </div>
                            <span className="text-white/40">100 tracks loaded</span>
                        </div>

                        <div className="relative space-y-3">
                            <div className="rounded-lg bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                                <p className="text-white font-semibold text-xs mb-2">Sort with Gemini</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/50 text-white text-[8px]">Genre</span>
                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/50 text-white text-[8px]">Year</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[8px]">Mood</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[8px]">Artist</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[8px]">Popularity</span>
                                </div>
                                <div className="h-5 rounded-full bg-indigo-600 text-white text-[8px] flex items-center justify-center font-medium">
                                    Sort with AI
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { n: "90s Indie Rock", c: 12 },
                                    { n: "Chill 2020s", c: 18 },
                                    { n: "Hype Pop", c: 9 }
                                ].map((g, i) => (
                                    <div key={i} className="rounded-md bg-white/5 border border-white/10 p-2">
                                        <p className="text-white text-[9px] font-medium truncate">{g.n}</p>
                                        <p className="text-white/40 text-[7px]">{g.c} tracks</p>
                                        <div className="mt-1.5 h-3 rounded-full bg-green-600/80 text-white text-[7px] flex items-center justify-center">
                                            Keep
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Laptop base */}
            <div className="mx-auto h-3 bg-gradient-to-b from-slate-700 to-slate-800 border-x border-white/10 rounded-b-xl" style={{ width: '105%', marginLeft: '-2.5%' }} />
            <div className="mx-auto h-1 bg-slate-900 rounded-b-2xl" style={{ width: '50%' }} />
        </div>
    )
}

function MobileMockup() {
    return (
        <div className="relative mx-auto w-[240px] rounded-[2.5rem] bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 p-2 shadow-2xl">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black z-10" />
            <div className="rounded-[2rem] overflow-hidden aspect-[9/19] bg-slate-950">
                <div className="relative h-full w-full p-4 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 text-[10px]">
                    <div className="absolute top-[-20%] right-[-10%] h-40 w-40 rounded-full bg-indigo-600/25 blur-3xl" />

                    <div className="relative pt-8 mb-3">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium text-xs">Saved</span>
                            <span className="text-white/40 text-[9px]">3</span>
                        </div>
                    </div>

                    <div className="relative space-y-2">
                        {[
                            { n: "Sunset Drive", d: "Golden-hour indie & chill", c: 14 },
                            { n: "Late Night Studio", d: "Lo-fi & ambient", c: 22 },
                            { n: "Throwback 2000s", d: "Pop anthems", c: 17 }
                        ].map((p, i) => (
                            <div key={i} className="rounded-lg bg-white/5 border border-white/10 p-2.5">
                                <p className="text-white text-[10px] font-medium">{p.n}</p>
                                <p className="text-white/50 text-[8px] mt-0.5">{p.d}</p>
                                <p className="text-white/30 text-[7px] mt-1">{p.c} tracks</p>
                                <div className="flex gap-1 mt-2">
                                    <div className="flex-1 h-4 rounded-full bg-green-600/90 text-white text-[7px] flex items-center justify-center">
                                        Add to Spotify
                                    </div>
                                    <div className="flex-1 h-4 rounded-full bg-white/5 border border-white/10 text-white/70 text-[7px] flex items-center justify-center">
                                        Remove
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TabletMockup() {
    return (
        <div className="relative mx-auto w-full max-w-sm rounded-[1.75rem] bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 p-2.5 shadow-2xl">
            <div className="rounded-[1.25rem] overflow-hidden aspect-[4/5] bg-slate-950">
                <div className="relative h-full w-full p-6 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 flex flex-col items-center justify-center text-center">
                    <div className="absolute top-[-20%] left-[-10%] h-60 w-60 rounded-full bg-blue-600/25 blur-3xl" />
                    <div className="absolute bottom-[-20%] right-[-10%] h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

                    <div className="relative">
                        <LyraLogo size={56} />
                    </div>
                    <h3 className="relative text-white text-3xl font-semibold tracking-tight mt-5 bg-gradient-to-b from-white to-blue-200/80 bg-clip-text text-transparent">
                        Lyra
                    </h3>
                    <p className="relative text-[10px] text-white/60 mt-2 px-4">
                        AI-curated playlists from your saved library.
                    </p>
                    <div className="relative mt-6 h-8 w-40 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-medium flex items-center justify-center gap-1.5 border border-blue-400/30 shadow-lg">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.3-.58.39-.88.2-2.41-1.47-5.44-1.8-9.01-.99-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.91-.89 7.27-.51 9.96 1.14.3.19.39.58.21.89z" />
                        </svg>
                        Connect with Spotify
                    </div>
                </div>
            </div>
        </div>
    )
}

const FEATURES = [
    { icon: "🎧", title: "Your full library", body: "Pulls the 100 newest saved tracks from your Spotify account automatically." },
    { icon: "🤖", title: "Gemini-powered sorting", body: "Google's Gemini AI groups your tracks into coherent, named playlists." },
    { icon: "🎛️", title: "Custom parameters", body: "Pick how to sort: genre, year, mood, artist, popularity, language, or tempo." },
    { icon: "💾", title: "Save before you commit", body: "Review Gemini's suggestions, keep what you love, discard the rest." },
    { icon: "🚀", title: "One-click to Spotify", body: "Push any saved playlist back to your Spotify library when you're ready." },
    { icon: "🔒", title: "Private by default", body: "Created playlists are private; we only read your library, nothing more." }
]

const STEPS = [
    { n: "01", title: "Connect", body: "Authorize Lyra to read your saved tracks via Spotify OAuth." },
    { n: "02", title: "Curate", body: "Choose the parameters that matter. Gemini proposes smart playlists." },
    { n: "03", title: "Push", body: "Keep the playlists you like and publish them to Spotify in one tap." }
]

export default function Landing() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background font-sans text-foreground overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-[-5%] right-[-5%] h-[700px] w-[700px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
            <div className="absolute top-[50%] left-[-15%] h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[0%] right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

            {/* Nav */}
            <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2.5">
                    <LyraLogo size={36} />
                    <span className="text-xl font-semibold tracking-tight text-white">Lyra</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how" className="hover:text-white transition-colors">How it works</a>
                    <a href="#setup" className="hover:text-white transition-colors">Setup</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </nav>
                <a href={LAUNCH_URL}>
                    <Button
                        className="h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[13px] font-medium px-5 backdrop-blur-md"
                    >
                        Launch app
                    </Button>
                </a>
            </header>

            {/* Hero */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-12 sm:pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="flex flex-col">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 w-fit mb-6 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                            AI-powered · Powered by Gemini
                        </span>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
                            Your library,<br />
                            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                                intelligently sorted.
                            </span>
                        </h1>

                        <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-lg">
                            Lyra reads your 100 newest saved Spotify tracks and uses Google Gemini to
                            group them into smart playlists — by genre, year, mood, or whatever you choose.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <a href={LAUNCH_URL}>
                                <Button
                                    size="lg"
                                    className="h-13 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)] font-medium text-[15px] flex items-center gap-2.5"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.3-.58.39-.88.2-2.41-1.47-5.44-1.8-9.01-.99-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.91-.89 7.27-.51 9.96 1.14.3.19.39.58.21.89zm1.22-2.72c-.24.37-.74.49-1.11.25-2.75-1.69-6.94-2.18-10.2-1.19-.42.13-.87-.11-1-.53-.13-.42.11-.87.53-1 3.72-1.13 8.34-.59 11.51 1.36.37.24.49.74.27 1.11zm.11-2.84C14.73 8.87 9.5 8.7 6.3 9.67c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.67-1.11 9.44-.91 13.16 1.29.46.27.61.86.34 1.31-.27.46-.86.61-1.32.34z" />
                                    </svg>
                                    Launch app
                                </Button>
                            </a>
                            <a href="#features">
                                <Button
                                    size="lg"
                                    className="h-13 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-[15px] backdrop-blur-md"
                                >
                                    See how it works
                                </Button>
                            </a>
                        </div>

                        <div className="flex items-center gap-6 mt-10 text-xs text-white/40">
                            <span className="flex items-center gap-1.5">✅ Free to use</span>
                            <span className="flex items-center gap-1.5">🔒 Read-only access</span>
                            <span className="flex items-center gap-1.5">⚡ No install</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <TabletMockup />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">What Lyra does</h2>
                    <p className="text-white/50 max-w-xl mx-auto text-[15px]">
                        Everything you need to turn a chaotic library into curated playlists.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="glass-panel-heavy rounded-2xl p-6 hover:border-white/25 transition-colors"
                        >
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <h3 className="text-white font-medium text-lg mb-2">{f.title}</h3>
                            <p className="text-white/55 text-[14px] leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Screenshots / Product Showcase */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">See it in action</h2>
                    <p className="text-white/50 max-w-xl mx-auto text-[15px]">
                        Built mobile-first, works everywhere.
                    </p>
                </div>

                <div className="mb-20">
                    <LaptopMockup />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <MobileMockup />
                    <div className="space-y-4 max-w-md">
                        <h3 className="text-3xl font-semibold text-white tracking-tight">
                            Your saved playlists, your rules.
                        </h3>
                        <p className="text-white/60 text-[15px] leading-relaxed">
                            Gemini's suggestions are just suggestions. Keep the good ones, rename them,
                            edit them, or push them to Spotify when you're ready.
                        </p>
                        <ul className="space-y-3 pt-2">
                            <li className="flex items-start gap-3 text-white/70 text-[14px]">
                                <span className="text-lg">📌</span>
                                <span>Playlists persist across sessions — saved locally until you push them.</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70 text-[14px]">
                                <span className="text-lg">✏️</span>
                                <span>Rename any playlist inline before committing to Spotify.</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70 text-[14px]">
                                <span className="text-lg">🎯</span>
                                <span>One-click push creates a private playlist in your Spotify library.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">How it works</h2>
                    <p className="text-white/50 max-w-xl mx-auto text-[15px]">
                        Three steps. No account to create.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 relative">
                    {STEPS.map((s, i) => (
                        <div key={i} className="glass-panel-heavy rounded-2xl p-8 relative">
                            <span className="text-6xl font-semibold bg-gradient-to-b from-blue-300 to-indigo-500 bg-clip-text text-transparent block mb-4">
                                {s.n}
                            </span>
                            <h3 className="text-white text-xl font-medium mb-2">{s.title}</h3>
                            <p className="text-white/55 text-[14px] leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Setup / Self-host */}
            <section id="setup" className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24">
                <div className="glass-panel-heavy rounded-3xl p-8 sm:p-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px] mb-4">
                        Coming soon — self-hosted option
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">Bring your own keys</h2>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-2xl">
                        Prefer to run Lyra yourself? A self-hosted mode is on the way. You'll plug in
                        your own credentials and the app runs entirely under your control.
                    </p>

                    <div className="space-y-4">
                        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-6 w-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-medium">1</span>
                                <h4 className="text-white font-medium text-[15px]">Create a Spotify Developer app</h4>
                            </div>
                            <p className="text-white/55 text-[13px] ml-8">
                                Visit <span className="text-blue-300">developer.spotify.com/dashboard</span>, create
                                an app, and copy the Client ID + Secret. Set the redirect URI to your deployment URL.
                            </p>
                        </div>

                        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-6 w-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-medium">2</span>
                                <h4 className="text-white font-medium text-[15px]">Grab a Gemini API key</h4>
                            </div>
                            <p className="text-white/55 text-[13px] ml-8">
                                Generate one at <span className="text-blue-300">aistudio.google.com/apikey</span>.
                                The free tier is plenty for personal use.
                            </p>
                        </div>

                        <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-6 w-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-medium">3</span>
                                <h4 className="text-white font-medium text-[15px]">Paste into Lyra settings</h4>
                            </div>
                            <p className="text-white/55 text-[13px] ml-8 mb-3">
                                In the self-hosted version, you'll open <span className="text-white/75 bg-white/10 px-1.5 py-0.5 rounded">Settings → API Keys</span> and
                                paste all three values. Lyra encrypts them locally in your browser storage.
                            </p>
                            <pre className="ml-8 text-[11px] bg-black/60 border border-white/5 rounded-lg p-3 text-white/70 overflow-x-auto">
{`SPOTIFY_CLIENT_ID=•••••
SPOTIFY_CLIENT_SECRET=•••••
GEMINI_API_KEY=•••••`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24">
                <div className="text-center mb-10">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">Get in touch</h2>
                    <p className="text-white/50 max-w-xl mx-auto text-[15px]">
                        Questions, partnerships, or press? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <a
                        href="mailto:foland717@gmail.com"
                        className="glass-panel-heavy rounded-2xl p-6 flex items-start gap-4 hover:border-white/25 transition-colors group"
                    >
                        <div className="h-11 w-11 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-xl">
                            ✉️
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[15px] mb-1">Email</h3>
                            <p className="text-white/60 text-[13px] group-hover:text-blue-300 transition-colors">
                                foland717@gmail.com
                            </p>
                        </div>
                    </a>

                    <a
                        href="https://github.com/folty7/Resonance_AI"
                        target="_blank"
                        rel="noreferrer"
                        className="glass-panel-heavy rounded-2xl p-6 flex items-start gap-4 hover:border-white/25 transition-colors group"
                    >
                        <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-xl">
                            🐙
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[15px] mb-1">GitHub</h3>
                            <p className="text-white/60 text-[13px] group-hover:text-blue-300 transition-colors">
                                folty7/Resonance_AI
                            </p>
                        </div>
                    </a>
                </div>

                <form
                    action="mailto:foland717@gmail.com"
                    method="post"
                    encType="text/plain"
                    className="glass-panel-heavy rounded-2xl p-6 sm:p-8 mt-4"
                >
                    <h3 className="text-white font-medium text-lg mb-5">Or drop a quick message</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className="h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-[14px]"
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-[14px]"
                        />
                    </div>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="What's on your mind?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-[14px] resize-none mb-4"
                    />
                    <Button
                        type="submit"
                        className="h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white font-medium text-[14px] px-6"
                    >
                        Send message
                    </Button>
                </form>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24">
                <div className="glass-panel-heavy rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-full bg-gradient-to-b from-blue-400/20 to-transparent pointer-events-none" />

                    <div className="relative flex justify-center mb-6">
                        <LyraLogo size={64} />
                    </div>
                    <h2 className="relative text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
                        Ready to curate your library?
                    </h2>
                    <p className="relative text-white/60 mb-8 text-[15px]">
                        Connect your Spotify in one click. Free, fast, private.
                    </p>
                    <a href={LAUNCH_URL} className="relative inline-block">
                        <Button
                            size="lg"
                            className="h-13 px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)] font-medium text-[15px] flex items-center gap-2.5"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.3-.58.39-.88.2-2.41-1.47-5.44-1.8-9.01-.99-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.91-.89 7.27-.51 9.96 1.14.3.19.39.58.21.89z" />
                            </svg>
                            Launch Lyra now
                        </Button>
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <LyraLogo size={24} />
                    <span className="text-white/60 text-[13px]">© 2026 Lyra. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6 text-[12px] text-white/40">
                    <Link to="/login" className="hover:text-white transition-colors">Login</Link>
                    <a href="#setup" className="hover:text-white transition-colors">Setup</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    )
}
