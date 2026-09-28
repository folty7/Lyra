import { useState } from "react"
import { WEB3FORMS_KEY } from "@/components/ContactForm"

const OWNER_EMAIL = "ondrej4a@gmail.com"

const MAILTO = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent("Lyra — demo access request")}&body=${encodeURIComponent(
    "Hi Ondrej,\n\nI'd like to try the Lyra demo.\n\nEmail on my Spotify account: \n\nThanks!"
)}`

/**
 * Invite-only notice + access request form.
 *
 * Lyra runs in Spotify's Development mode, so only accounts the developer has
 * added to the Spotify app can complete OAuth. The "Launch app" button sends
 * users straight to Spotify, so this has to be visible on the landing page —
 * by the time they reach Spotify it is too late to explain.
 *
 * Sends the requester's Spotify account email through Web3Forms (same channel
 * as the contact form), with a plain mailto: fallback.
 */
export default function DemoAccessNotice() {
    const [email, setEmail] = useState("")
    const [note, setNote] = useState("")
    const [botcheck, setBotcheck] = useState(false)
    const [status, setStatus] = useState("idle") // idle | submitting | success | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (botcheck) return // honeypot tripped — silently drop
        setStatus("submitting")
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: "Lyra — demo access request",
                    from_name: "Lyra landing page",
                    email,
                    message:
                        `Demo access request.\n\nSpotify account email: ${email}\n` +
                        (note.trim() ? `Note: ${note.trim()}\n` : "") +
                        `\nAdd this address to the Spotify app's allowed users.`,
                }),
            })
            const data = await res.json()
            setStatus(data.success ? "success" : "error")
        } catch {
            setStatus("error")
        }
    }

    return (
        <div className="rounded-2xl border border-amber-300/25 bg-amber-400/[0.07] p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[11px] font-medium tracking-wide text-amber-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                    Invite-only demo
                </span>
                <h2 className="text-[15px] font-medium text-white">Request access before you launch Lyra</h2>
            </div>

            <p className="max-w-2xl text-[13px] leading-relaxed text-white/60">
                Lyra runs in Spotify&apos;s Development mode, so only accounts I&apos;ve added to the Spotify app
                can sign in — everyone else gets rejected by Spotify itself. Send me the email address
                your Spotify account uses and I&apos;ll add you to the demo.
            </p>

            {status === "success" ? (
                <p
                    role="status"
                    className="mt-4 rounded-xl border border-green-400/25 bg-green-500/10 px-4 py-3 text-[13px] text-green-200"
                >
                    Request sent. I&apos;ll add <span className="font-medium">{email}</span> to the demo and reply
                    once you can connect.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Honeypot — hidden from humans, bots fill it in */}
                    <label className="hidden" aria-hidden="true">
                        <input
                            type="checkbox"
                            tabIndex={-1}
                            autoComplete="off"
                            checked={botcheck}
                            onChange={(e) => setBotcheck(e.target.checked)}
                        />
                    </label>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <label htmlFor="demo-access-email" className="sr-only">
                            Email address of your Spotify account
                        </label>
                        <input
                            id="demo-access-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email on your Spotify account"
                            className="h-11 min-w-0 flex-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-[14px] text-white placeholder-white/30 transition-colors focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30"
                        />
                        <label htmlFor="demo-access-note" className="sr-only">
                            Optional note
                        </label>
                        <input
                            id="demo-access-note"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Your name (optional)"
                            className="h-11 min-w-0 flex-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-[14px] text-white placeholder-white/30 transition-colors focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30 sm:max-w-[200px]"
                        />
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="h-11 shrink-0 rounded-full border border-amber-300/30 bg-amber-400/20 px-6 text-[13px] font-medium text-amber-50 transition-colors hover:bg-amber-400/30 disabled:opacity-50"
                        >
                            {status === "submitting" ? "Sending…" : "Request access"}
                        </button>
                    </div>

                    <p className="mt-3 text-[12px] text-white/40">
                        Prefer email? Write to{" "}
                        <a href={MAILTO} className="text-amber-200/90 underline underline-offset-2 hover:text-amber-100">
                            {OWNER_EMAIL}
                        </a>{" "}
                        and include the address on your Spotify account.
                    </p>

                    {status === "error" && (
                        <p role="alert" className="mt-2 text-[12px] text-red-300">
                            Sending failed. Please email me directly at{" "}
                            <a href={MAILTO} className="underline underline-offset-2">
                                {OWNER_EMAIL}
                            </a>
                            .
                        </p>
                    )}
                </form>
            )}
        </div>
    )
}
