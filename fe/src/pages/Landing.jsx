import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import ContactForm from "@/components/ContactForm"
import lyraLogo from "@/assets/lyra-logo.png"
import iphoneMockup from "@/assets/iphone-mockup-suggestions.png"
import macbookMockup from "@/assets/Macbook-Mockup-dashboard.png"

// In production: relative URL → Vercel proxies to Railway. In dev: hit local backend directly.
const LAUNCH_URL = import.meta.env.DEV
    ? (typeof window !== 'undefined' ? `http://${window.location.hostname}:8080/auth/login` : '/auth/login')
    : '/auth/login';

function LyraLogo({ size = 36 }) {
    return (
        <img src={lyraLogo} alt="Lyra Logo" className="shrink-0 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.45)]" style={{ width: size, height: size }} />
    )
}


const FEATURES = [
    { icon: "🎧", title: "Your full library", body: "Pulls the 100 newest saved tracks from your Spotify account automatically." },
    { icon: "🤖", title: "Gemini-powered sorting", body: "Google's Gemini AI groups your tracks into coherent, named playlists." },
    { icon: "🎛️", title: "Custom parameters", body: "Pick how to sort: genre, year, mood, artist, popularity, language, or tempo." },
    { icon: "💾", title: "Save before you commit", body: "Review Gemini's suggestions, keep what you love, discard the rest." },
    { icon: "🚀", title: "One-click to Spotify", body: "Push any saved playlist back to your Spotify library when you're ready." },
    { icon: "🔒", title: "Private by default", body: "Created playlists are private. We read your library, profile, and top stats — nothing is stored on our servers." }
]

const STEPS = [
    { n: "01", title: "Connect", body: "Authorize Lyra to read your saved tracks via Spotify OAuth." },
    { n: "02", title: "Curate", body: "Choose the parameters that matter. Gemini proposes smart playlists." },
    { n: "03", title: "Push", body: "Keep the playlists you like and publish them to Spotify in one tap." }
]

const cardClass = "rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.07] hover:border-green-400/30 transition-colors"

export default function Landing() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#040a06] font-sans text-white overflow-hidden">

            {/* Ambient warm glows */}
            <div className="pointer-events-none absolute -top-[10%] -right-[10%] h-[800px] w-[800px] rounded-full bg-green-600/30 blur-[160px]" />
            <div className="pointer-events-none absolute top-[35%] -left-[15%] h-[600px] w-[600px] rounded-full bg-green-500/15 blur-[160px]" />
            <div className="pointer-events-none absolute bottom-[5%] right-[10%] h-[500px] w-[500px] rounded-full bg-green-500/15 blur-[140px]" />

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
                    <Button className="h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-[13px] font-medium px-5">
                        Launch app
                    </Button>
                </a>
            </header>

            {/* Hero */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-12 sm:pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="flex flex-col">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/60 w-fit mb-6 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                            AI-powered · Powered by Gemini
                        </span>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
                            Your library,<br />
                            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
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
                                    className="h-13 px-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-0 text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)] font-medium text-[15px] flex items-center gap-2.5"
                                >
                                    Launch app
                                </Button>
                            </a>
                            <a href="#features">
                                <Button
                                    size="lg"
                                    className="h-13 px-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-[15px]"
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

                    <div className="flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-[120px] rounded-full" />
                        <img src={macbookMockup} alt="Macbook App Dashboard" className="relative z-10 w-full max-w-2xl mx-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500" />
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
                        <div key={i} className={`${cardClass} p-6`}>
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <h3 className="text-white font-medium text-lg mb-2">{f.title}</h3>
                            <p className="text-white/55 text-[14px] leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Showcase */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">See it in action</h2>
                    <p className="text-white/50 max-w-xl mx-auto text-[15px]">
                        A warm, focused dashboard built mobile-first.
                    </p>
                </div>

                <div className="mb-20 relative">
                    <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full" />
                    <img src={macbookMockup} alt="Macbook App Dashboard Showcase" className="relative z-10 w-full max-w-5xl mx-auto drop-shadow-2xl" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative flex justify-center">
                        <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full" />
                        <img src={iphoneMockup} alt="iPhone App Suggestions Showcase" className="relative z-10 w-[350px] md:w-[500px] drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500" />
                    </div>
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
                        <div key={i} className={`${cardClass} p-8 relative`}>
                            <span className="text-6xl font-semibold bg-gradient-to-b from-green-300 to-green-600 bg-clip-text text-transparent block mb-4">
                                {s.n}
                            </span>
                            <h3 className="text-white text-xl font-medium mb-2">{s.title}</h3>
                            <p className="text-white/55 text-[14px] leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Setup */}
            <section id="setup" className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24">
                <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.07] p-8 sm:p-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/15 border border-green-400/30 text-green-200 text-[11px] mb-4">
                        Coming soon — self-hosted option
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">Bring your own keys</h2>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-2xl">
                        Prefer to run Lyra yourself? A self-hosted mode is on the way. You'll plug in
                        your own credentials and the app runs entirely under your control.
                    </p>

                    <div className="space-y-4">
                        {[
                            { n: 1, t: "Create a Spotify Developer app", b: <>Visit <span className="text-green-300">developer.spotify.com/dashboard</span>, create an app, and copy the Client ID + Secret. Set the redirect URI to your deployment URL.</> },
                            { n: 2, t: "Grab a Gemini API key", b: <>Generate one at <span className="text-green-300">aistudio.google.com/apikey</span>. The free tier is plenty for personal use.</> },
                            { n: 3, t: "Paste into Lyra settings", b: <>In the self-hosted version, you'll open <span className="text-white/75 bg-white/[0.06] px-1.5 py-0.5 rounded">Settings → API Keys</span> and paste all three values. Lyra encrypts them locally in your browser storage.</> }
                        ].map((step) => (
                            <div key={step.n} className="rounded-2xl bg-black/30 border border-white/[0.06] p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-xs flex items-center justify-center font-medium">{step.n}</span>
                                    <h4 className="text-white font-medium text-[15px]">{step.t}</h4>
                                </div>
                                <p className="text-white/55 text-[13px] ml-8">{step.b}</p>
                                {step.n === 3 && (
                                    <pre className="ml-8 mt-3 text-[11px] bg-black/60 border border-white/5 rounded-lg p-3 text-white/70 overflow-x-auto">
                                        {`SPOTIFY_CLIENT_ID=•••••
SPOTIFY_CLIENT_SECRET=•••••
GEMINI_API_KEY=•••••`}
                                    </pre>
                                )}
                            </div>
                        ))}
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
                        href="mailto:ondrej4a@gmail.com"
                        className={`${cardClass} p-6 flex items-start gap-4 group`}
                    >
                        <div className="h-11 w-11 rounded-xl bg-green-500/15 border border-green-400/30 flex items-center justify-center shrink-0 text-xl">
                            ✉️
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[15px] mb-1">Email</h3>
                            <p className="text-white/60 text-[13px] group-hover:text-green-300 transition-colors">
                                ondrej4a@gmail.com
                            </p>
                        </div>
                    </a>

                    <a
                        href="https://github.com/folty7/Lyra"
                        target="_blank"
                        rel="noreferrer"
                        className={`${cardClass} p-6 flex items-start gap-4 group`}
                    >
                        <div className="h-11 w-11 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0 text-xl">
                            🐙
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-[15px] mb-1">GitHub</h3>
                            <p className="text-white/60 text-[13px] group-hover:text-green-300 transition-colors">
                                folty7/Lyra
                            </p>
                        </div>
                    </a>
                </div>

                <ContactForm />
            </section>

            {/* Final CTA */}
            <section className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24">
                <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-10 sm:p-16 text-center relative overflow-hidden">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[80%] bg-green-500/30 blur-3xl pointer-events-none" />

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
                            className="h-13 px-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-0 text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)] font-medium text-[15px] flex items-center gap-2.5"
                        >
                            Launch Lyra now
                        </Button>
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <LyraLogo size={24} />
                    <span className="text-white/60 text-[13px]">© 2026 Lyra. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6 text-[12px] text-white/40">
                    <Link to="/login" className="hover:text-white transition-colors">Login</Link>
                    <a href="#setup" className="hover:text-white transition-colors">Setup</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </footer>
        </div>
    )
}
