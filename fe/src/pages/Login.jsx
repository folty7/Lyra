import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { WEB3FORMS_KEY } from "@/components/ContactForm"

function DemoAccessNotice() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("idle") // idle | submitting | success | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("submitting")
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: "Lyra — demo access request",
                    from_name: "Lyra login page",
                    email,
                    message: `Please add ${email} to the Spotify app's allowed users.`,
                    botcheck: "",
                }),
            })
            const data = await res.json()
            setStatus(data.success ? "success" : "error")
        } catch {
            setStatus("error")
        }
    }

    return (
        <div className="w-full mb-6 rounded-2xl border border-amber-300/20 bg-amber-400/[0.06] p-4 text-left">
            <p className="text-[13px] font-medium text-amber-200">Invite-only demo</p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                Lyra runs in Spotify's Development mode, so only approved accounts can sign in. Send me the email
                of your Spotify account and I'll add you to the demo.
            </p>

            {status === "success" ? (
                <p className="mt-3 text-[12px] text-green-300">
                    Request sent! You'll be able to connect once I've approved your account.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Spotify account email"
                        className="min-w-0 flex-1 h-9 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-amber-300/40"
                    />
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="h-9 shrink-0 rounded-full border border-amber-300/30 bg-amber-400/15 px-4 text-[12px] font-medium text-amber-100 hover:bg-amber-400/25 transition-colors disabled:opacity-50"
                    >
                        {status === "submitting" ? "Sending…" : "Request access"}
                    </button>
                </form>
            )}
            {status === "error" && (
                <p className="mt-2 text-[11px] text-red-300">Something went wrong. Please try again.</p>
            )}
        </div>
    )
}

function LyraLogo() {
    return (
        <div className="relative h-32 w-32 flex items-center justify-center animate-float">
            <span className="absolute inset-0 rounded-full bg-blue-500/15 blur-2xl" />
            <span className="absolute h-full w-full rounded-full border border-blue-400/30 animate-ring-slow" />
            <span className="absolute h-4/5 w-4/5 rounded-full border border-indigo-300/40 animate-ring-fast" />

            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_8px_30px_rgba(59,130,246,0.4)] border border-white/20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-white"
                >
                    <path d="M3 12c2 0 2-4 4-4s2 10 4 10 2-14 4-14 2 8 4 8h2" />
                </svg>
            </div>
        </div>
    )
}

function FeatureBullet({ children }) {
    return (
        <li className="flex items-start gap-2.5 text-white/70 text-[13px]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 mt-[3px] text-blue-300 shrink-0"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{children}</span>
        </li>
    )
}

export default function Login() {
    return (
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center p-6 overflow-hidden">
            <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/25 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[140px] pointer-events-none" />
            <div className="absolute top-[30%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

            <div className="z-10 flex flex-col items-center max-w-md w-full glass-panel-heavy rounded-[2.5rem] p-10 sm:p-12 text-center">

                <div className="mb-8">
                    <LyraLogo />
                </div>

                <div className="space-y-3 mb-8 w-full">
                    <h1 className="text-5xl font-semibold tracking-tight text-white bg-gradient-to-b from-white to-blue-200/80 bg-clip-text text-transparent">
                        Lyra
                    </h1>
                    <p className="text-[14px] font-light leading-relaxed text-white/60 px-2 max-w-xs mx-auto">
                        AI-curated playlists from your saved library — sorted by what actually matters.
                    </p>
                </div>

                <ul className="w-full space-y-2 mb-8 text-left px-2">
                    <FeatureBullet>100 newest saved tracks, auto-enriched with genre metadata</FeatureBullet>
                    <FeatureBullet>Gemini groups them by genre, year, mood, and more</FeatureBullet>
                    <FeatureBullet>Keep what you like, push to Spotify in one click</FeatureBullet>
                </ul>

                <DemoAccessNotice />

                <a href={import.meta.env.DEV ? `http://${window.location.hostname}:8080/auth/login` : `${import.meta.env.VITE_API_URL ?? ''}/auth/login`} className="w-full">
                    <Button
                        size="lg"
                        className="w-full h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30 text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)] transition-all duration-300 font-medium tracking-wide text-[15px] flex items-center justify-center gap-2.5"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.3-.58.39-.88.2-2.41-1.47-5.44-1.8-9.01-.99-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.91-.89 7.27-.51 9.96 1.14.3.19.39.58.21.89zm1.22-2.72c-.24.37-.74.49-1.11.25-2.75-1.69-6.94-2.18-10.2-1.19-.42.13-.87-.11-1-.53-.13-.42.11-.87.53-1 3.72-1.13 8.34-.59 11.51 1.36.37.24.49.74.27 1.11zm.11-2.84C14.73 8.87 9.5 8.7 6.3 9.67c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.67-1.11 9.44-.91 13.16 1.29.46.27.61.86.34 1.31-.27.46-.86.61-1.32.34z" />
                        </svg>
                        Connect with Spotify
                    </Button>
                </a>

                <p className="text-[11px] text-white/30 mt-6">
                    We read your library, profile, and top stats. Nothing is stored server-side. Playlists stay private by default.{" "}
                    <Link to="/privacy" className="underline hover:text-white/60 transition-colors">Privacy Policy</Link>
                    {" · "}
                    <Link to="/terms" className="underline hover:text-white/60 transition-colors">Terms</Link>
                </p>
            </div>
        </div>
    )
}
