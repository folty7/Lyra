import { Link } from "react-router-dom"
import lyraLogo from "@/assets/lyra-logo.png"

function LyraLogo({ size = 28 }) {
    return (
        <img src={lyraLogo} alt="Lyra Logo" className="shrink-0 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.45)]" style={{ width: size, height: size }} />
    )
}

const sectionClass = "mb-10"
const h2Class = "text-xl font-semibold text-white mb-3 mt-8"
const pClass = "text-white/60 text-[14px] leading-relaxed mb-3"
const liClass = "text-white/60 text-[14px] leading-relaxed"

export default function PrivacyPolicy() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#040a06] font-sans text-white overflow-hidden">
            <div className="pointer-events-none absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-green-600/20 blur-[160px]" />
            <div className="pointer-events-none absolute bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[160px]" />

            {/* Nav */}
            <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 w-full max-w-4xl mx-auto">
                <Link to="/" className="flex items-center gap-2.5">
                    <LyraLogo size={28} />
                    <span className="text-lg font-semibold tracking-tight text-white">Lyra</span>
                </Link>
                <Link to="/" className="text-[13px] text-white/50 hover:text-white transition-colors">
                    ← Back to home
                </Link>
            </header>

            {/* Content */}
            <main className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pt-8 pb-24">
                <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.07] p-8 sm:p-12">

                    <div className="mb-8 pb-8 border-b border-white/[0.07]">
                        <span className="inline-block px-3 py-1 rounded-full bg-green-500/15 border border-green-400/30 text-green-200 text-[11px] mb-4">
                            Legal
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
                            Privacy Policy
                        </h1>
                        <p className="text-white/40 text-[13px]">Last updated: April 27, 2026</p>
                    </div>

                    <div className={sectionClass}>
                        <p className={pClass}>
                            Lyra ("we", "us", "our") is a personal-use application that helps you organise your Spotify library
                            into AI-curated playlists. This Privacy Policy explains what data we access, how we use it, and your rights.
                        </p>
                        <p className={pClass}>
                            By using Lyra you agree to the practices described here. If you disagree, please do not use the application.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>1. Data we collect</h2>
                        <p className={pClass}>Lyra accesses the following data from your Spotify account via the official Spotify Web API:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2 mb-3">
                            <li className={liClass}>Your display name and profile picture — shown in the dashboard header.</li>
                            <li className={liClass}>Your 100 most recently saved tracks (title, artist, album, duration, popularity, release year).</li>
                            <li className={liClass}>Your top tracks and top artists (used for overview statistics).</li>
                        </ul>
                        <p className={pClass}>
                            We do <strong className="text-white/80">not</strong> collect your email address, payment information, listening history beyond what is
                            listed above, or any other personal data from Spotify.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>2. How we use your data</h2>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={liClass}>Your saved tracks are sent to Google Gemini AI to generate playlist suggestions.</li>
                            <li className={liClass}>Your access token is stored in a secure, HTTP-only cookie for the duration of your session only.</li>
                            <li className={liClass}>Suggested playlists you choose to save are stored in your browser's local storage — they never leave your device unless you explicitly push them to Spotify.</li>
                            <li className={liClass}>We do not store your Spotify data on any server between sessions.</li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>3. Third-party services</h2>
                        <p className={pClass}>Lyra integrates with two external services:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={liClass}>
                                <strong className="text-white/80">Spotify</strong> — authentication and library access are handled via
                                Spotify OAuth 2.0. Lyra requests only the minimum required scopes:
                                {" "}<code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">user-library-read</code>,
                                {" "}<code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">user-top-read</code>, and
                                {" "}<code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">playlist-modify-private</code>.
                            </li>
                            <li className={liClass}>
                                <strong className="text-white/80">Google Gemini AI</strong> — track metadata (titles, artists, release years, popularity scores)
                                is sent to the Gemini API to generate playlist groupings. No personally identifying information beyond
                                track metadata is included in these requests. Google's privacy policy applies to this processing:
                                {" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">policies.google.com/privacy</a>.
                            </li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>4. Data retention</h2>
                        <p className={pClass}>
                            Lyra does not operate a user database. Your session token cookie expires at the end of your browser session.
                            Any playlist data saved locally in your browser can be cleared at any time by clearing your browser storage.
                            No data is retained on our servers after your session ends.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>5. Your rights</h2>
                        <p className={pClass}>Because Lyra stores no personal data server-side, there is nothing for us to delete, export, or correct on your behalf.
                            To revoke Lyra's access to your Spotify account at any time:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li className={liClass}>Go to <a href="https://www.spotify.com/account/apps/" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">spotify.com/account/apps</a>.</li>
                            <li className={liClass}>Find "Lyra" in the list and click "Remove access".</li>
                        </ol>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>6. Security</h2>
                        <p className={pClass}>
                            Access tokens are stored in HTTP-only cookies — they are never accessible via JavaScript and are transmitted
                            over HTTPS only. Your Gemini API key (if provided in self-hosted mode) is stored only in your browser's
                            local storage and is never logged or stored on the server.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>7. Children's privacy</h2>
                        <p className={pClass}>
                            Lyra is not directed at children under 13. We do not knowingly collect data from children.
                            Use of Lyra requires a Spotify account, which itself requires users to be 13 or older.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>8. Changes to this policy</h2>
                        <p className={pClass}>
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
                            Continued use of Lyra after changes constitutes acceptance of the revised policy.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/[0.07]">
                        <h2 className={h2Class}>Contact</h2>
                        <p className={pClass}>
                            Questions about this policy? Reach us at{" "}
                            <a href="mailto:ondrej4a@gmail.com" className="text-green-300 hover:underline">ondrej4a@gmail.com</a>.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <LyraLogo size={20} />
                    <span className="text-white/40 text-[12px]">© 2026 Lyra. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-6 text-[12px] text-white/40">
                    <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </div>
            </footer>
        </div>
    )
}
