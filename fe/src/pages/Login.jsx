export default function Login() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[var(--color-dark-base)]">
            <h1 className="mb-8 text-4xl font-bold text-white">Smart-Sort Spotify</h1>
            <a
                href="http://127.0.0.1:8080/auth/login"
                className="rounded-full bg-[var(--color-primary-green)] px-8 py-3 font-semibold text-black transition-transform hover:scale-105"
            >
                Log in with Spotify
            </a>
        </div>
    )
}
