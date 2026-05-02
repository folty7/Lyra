import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
    LayoutGrid, Disc3, Sparkles, Settings as SettingsIcon,
    HelpCircle, LogOut, ChevronLeft, ChevronRight, ExternalLink
} from "lucide-react"
import { useStore } from "@/store/useStore"
import { useTracksStore } from "@/store/useTracksStore"
import { apiClient } from "@/api/axios"
import lyraLogo from "@/assets/lyra-logo.png"

const SIDEBAR_STATE_KEY = 'lyra-sidebar-collapsed'

export function LyraMark({ size = 32 }) {
    return (
        <img src={lyraLogo} alt="Lyra Logo" className="shrink-0 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: size, height: size }} />
    )
}

const NAV = [
    { to: "/dashboard", icon: LayoutGrid, label: "Dashboard", end: true },
    { to: "/dashboard/library", icon: Disc3, label: "Library" },
    { to: "/dashboard/sort", icon: Sparkles, label: "AI Sort" },
]

const NAV_PREFS = [
    { to: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
]

export default function DashboardLayout() {
    const navigate = useNavigate()
    const { user, setUser, clearAuth } = useStore()
    const { fetchTracks, error: tracksError } = useTracksStore()
    const [collapsed, setCollapsed] = useState(() => {
        try { return localStorage.getItem(SIDEBAR_STATE_KEY) === '1' } catch { return false }
    })

    useEffect(() => {
        try { localStorage.setItem(SIDEBAR_STATE_KEY, collapsed ? '1' : '0') } catch { /* noop */ }
    }, [collapsed])

    useEffect(() => {
        if (!user) {
            apiClient.get('/me').then(res => {
                if (res.data.success) {
                    setUser(res.data.user)
                }
            }).catch(() => { })
        }
    }, [user, setUser])

    // Load library once when the dashboard mounts
    useEffect(() => {
        fetchTracks().then(result => {
            if (result && !result.ok && result.status === 401) navigate('/')
        })
    }, [fetchTracks, navigate])

    const handleLogout = async () => {
        try {
            await apiClient.post('/auth/logout')
            useTracksStore.getState().clear()
            clearAuth()
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-[#040a06] text-white font-sans overflow-hidden">
            {/* ambient warm glow */}
            <div className="pointer-events-none absolute -top-[10%] -right-[10%] h-[700px] w-[700px] rounded-full bg-green-600/30 blur-[140px]" />
            <div className="pointer-events-none absolute top-[40%] -left-[15%] h-[500px] w-[500px] rounded-full bg-green-500/15 blur-[160px]" />
            <div className="pointer-events-none absolute bottom-0 right-[10%] h-[400px] w-[400px] rounded-full bg-green-500/10 blur-[120px]" />

            <div className="relative z-10 flex min-h-screen">
                {/* SIDEBAR */}
                <aside
                    className={`hidden lg:flex flex-col shrink-0 ${collapsed ? 'w-[84px] px-3' : 'w-[260px] px-5'} py-6 border-r border-white/[0.06] transition-[width,padding] duration-200 ease-out`}
                >
                    <div className={`relative flex items-center mb-10 ${collapsed ? 'justify-center' : 'gap-2.5 px-2'}`}>
                        <LyraMark size={32} />
                        {!collapsed && <span className="text-[20px] font-semibold tracking-tight">Lyra</span>}
                        <button
                            onClick={() => setCollapsed(c => !c)}
                            className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors`}
                            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed
                                ? <ChevronRight className="w-3.5 h-3.5" />
                                : <ChevronLeft className="w-3.5 h-3.5" />}
                        </button>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {NAV.map(item => <SidebarLink key={item.to} {...item} collapsed={collapsed} />)}
                    </nav>

                    {!collapsed && (
                        <p className="mt-8 mb-3 px-3 text-[11px] font-medium tracking-[0.18em] text-white/30">PREFERENCE</p>
                    )}
                    {collapsed && <div className="mt-6 mb-3 mx-auto w-6 h-px bg-white/10" />}
                    <nav className="flex flex-col gap-1">
                        {NAV_PREFS.map(item => <SidebarLink key={item.to} {...item} collapsed={collapsed} />)}
                    </nav>

                    {!collapsed && (
                        <div className="mt-auto pt-6">
                            <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-5 text-center overflow-hidden">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <HelpCircle className="w-6 h-6 text-white" />
                                </div>
                                <p className="mt-6 text-sm font-medium">Help Center</p>
                                <p className="mt-1 text-[11px] text-white/40 leading-relaxed">
                                    Having trouble in Lyra?<br />Please contact us
                                </p>
                                <button className="mt-4 w-full h-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white text-sm font-medium transition-all">
                                    Contact us
                                </button>
                            </div>
                        </div>
                    )}
                </aside>

                {/* MAIN */}
                <main className="flex-1 min-w-0 px-6 lg:px-8 py-6">
                    {/* TOP BAR */}
                    <header className="flex items-center justify-end mb-7">
                        <div className="flex items-center gap-3">
                            <a
                                href="https://open.spotify.com"
                                target="_blank"
                                rel="noreferrer"
                                className="h-11 px-4 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 hover:border-emerald-400/50 transition-colors flex items-center gap-2 text-sm font-medium text-emerald-100"
                                title="Open Spotify Web Player in a new tab"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.3-.58.39-.88.2-2.41-1.47-5.44-1.8-9.01-.99-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.91-.89 7.27-.51 9.96 1.14.3.19.39.58.21.89zm1.22-2.72c-.24.37-.74.49-1.11.25-2.75-1.69-6.94-2.18-10.2-1.19-.42.13-.87-.11-1-.53-.13-.42.11-.87.53-1 3.72-1.13 8.34-.59 11.51 1.36.37.24.49.74.27 1.11zm.11-2.84C14.73 8.87 9.5 8.7 6.3 9.67c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.67-1.11 9.44-.91 13.16 1.29.46.27.61.86.34 1.31-.27.46-.86.61-1.32.34z" />
                                </svg>
                                <span className="hidden sm:inline">Open Spotify</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                            </a>
                            <div className="flex items-center gap-3 px-1 pr-4 h-11 rounded-full bg-white/[0.04] border border-white/[0.06]">
                                {user?.images?.[0]?.url ? (
                                    <img src={user.images[0].url} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-sm font-semibold text-white">
                                        {user?.display_name ? user.display_name.charAt(0).toUpperCase() : 'L'}
                                    </div>
                                )}
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-medium leading-tight truncate max-w-[120px]">{user?.display_name || 'Listener'}</p>
                                    <p className="text-[11px] text-white/40 leading-tight">{user?.product === 'premium' ? 'Premium Account' : 'Free Account'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-green-400/30 transition-colors flex items-center justify-center"
                                title="Log out"
                            >
                                <LogOut className="w-4 h-4 text-white/70" />
                            </button>
                        </div>
                    </header>

                    {tracksError && (
                        <div className="mb-4 px-4 py-2.5 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-rose-200 text-sm">
                            {tracksError}
                        </div>
                    )}

                    <Outlet />
                </main>
            </div>
        </div>
    )
}

function SidebarLink({ to, icon: Icon, label, end, collapsed }) {
    return (
        <NavLink
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
                `group flex items-center ${collapsed ? 'justify-center px-0 w-12 h-12 rounded-2xl' : 'gap-3 h-10 px-3 rounded-full'} text-sm transition-all ${isActive
                    ? 'bg-white/[0.06] border border-white/15 text-white'
                    : 'border border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`
            }
        >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="flex-1 text-left">{label}</span>}
        </NavLink>
    )
}
