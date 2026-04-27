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

export default function Terms() {
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
                            Terms of Use
                        </h1>
                        <p className="text-white/40 text-[13px]">Last updated: April 27, 2026</p>
                    </div>

                    <div className={sectionClass}>
                        <p className={pClass}>
                            These Terms of Use ("Terms") govern your access to and use of Lyra (the "Service"), operated by Andrej Folta ("we", "us", "our").
                            By accessing or using Lyra you agree to be bound by these Terms. If you do not agree, do not use the Service.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>1. Description of the Service</h2>
                        <p className={pClass}>
                            Lyra is a web application that connects to your Spotify account via the Spotify Web API and uses Google Gemini AI
                            to analyse your saved tracks and suggest thematic playlists. You may review, rename, and push suggested playlists
                            to your Spotify library.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>2. Eligibility</h2>
                        <p className={pClass}>
                            You must be at least 13 years old and hold a valid Spotify account to use Lyra. By using the Service you represent
                            that you meet these requirements.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>3. Spotify account and authorisation</h2>
                        <p className={pClass}>
                            Lyra accesses your Spotify account only with your explicit consent through Spotify's OAuth 2.0 flow.
                            You may revoke this access at any time via your{" "}
                            <a href="https://www.spotify.com/account/apps/" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">
                                Spotify account settings
                            </a>. Lyra requests the minimum scopes necessary:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={liClass}><code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">user-library-read</code> — read your saved tracks.</li>
                            <li className={liClass}><code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">user-top-read</code> — read your top tracks and artists for dashboard statistics.</li>
                            <li className={liClass}><code className="text-green-300 text-[12px] bg-white/[0.05] px-1.5 py-0.5 rounded">playlist-modify-private</code> — create private playlists on your behalf when you choose to push them.</li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>4. Acceptable use</h2>
                        <p className={pClass}>You agree not to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={liClass}>Use the Service for any unlawful purpose or in violation of Spotify's or Google's terms of service.</li>
                            <li className={liClass}>Attempt to reverse-engineer, scrape, or abuse the Service or its underlying APIs.</li>
                            <li className={liClass}>Use the Service to generate, store, or distribute content that is harmful, abusive, or infringing.</li>
                            <li className={liClass}>Circumvent any rate limits, authentication mechanisms, or other security measures.</li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>5. Intellectual property</h2>
                        <p className={pClass}>
                            All music content, artwork, and metadata accessed through Lyra remains the property of the respective rights holders
                            and is subject to Spotify's terms. Lyra does not claim ownership of any music or Spotify content.
                        </p>
                        <p className={pClass}>
                            The Lyra application code, design, and brand assets are the property of Andrej Folta. The source code is made
                            available on GitHub under the terms of its repository licence.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>6. AI-generated content</h2>
                        <p className={pClass}>
                            Playlist suggestions are generated by Google Gemini AI and are provided for convenience only. We make no guarantee
                            about the accuracy, quality, or appropriateness of AI-generated groupings. You are responsible for reviewing
                            suggestions before pushing them to Spotify.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>7. API quotas and availability</h2>
                        <p className={pClass}>
                            Lyra depends on the Spotify Web API and Google Gemini API, both of which impose usage quotas. We do not guarantee
                            uninterrupted availability of the Service. If you supply your own Gemini API key (self-hosted mode), you are
                            responsible for managing your quota and any associated costs.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>8. Disclaimer of warranties</h2>
                        <p className={pClass}>
                            The Service is provided "as is" and "as available" without warranties of any kind, express or implied.
                            We do not warrant that the Service will be error-free, uninterrupted, or free of harmful components.
                            Use of the Service is at your own risk.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>9. Limitation of liability</h2>
                        <p className={pClass}>
                            To the fullest extent permitted by applicable law, Andrej Folta shall not be liable for any indirect, incidental,
                            special, consequential, or punitive damages arising from your use of or inability to use the Service, including
                            but not limited to loss of data or unintended changes to your Spotify library.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>10. Third-party terms</h2>
                        <p className={pClass}>Your use of Lyra is also subject to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={liClass}>
                                <a href="https://www.spotify.com/legal/end-user-agreement/" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">
                                    Spotify End User Licence Agreement
                                </a>
                            </li>
                            <li className={liClass}>
                                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">
                                    Google Terms of Service
                                </a>
                            </li>
                            <li className={liClass}>
                                <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noreferrer" className="text-green-300 hover:underline">
                                    Gemini API Additional Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>11. Modifications to the Terms</h2>
                        <p className={pClass}>
                            We reserve the right to update these Terms at any time. The updated Terms will be posted on this page with a revised
                            date. Continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.
                        </p>
                    </div>

                    <div className={sectionClass}>
                        <h2 className={h2Class}>12. Governing law</h2>
                        <p className={pClass}>
                            These Terms are governed by and construed in accordance with the laws of the Slovak Republic, without regard to
                            conflict of law principles.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/[0.07]">
                        <h2 className={h2Class}>Contact</h2>
                        <p className={pClass}>
                            Questions about these Terms? Reach us at{" "}
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
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms of Use</Link>
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </div>
            </footer>
        </div>
    )
}
