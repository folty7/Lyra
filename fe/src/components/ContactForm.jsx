import { useState } from "react"

const WEB3FORMS_KEY = "b3e2dd8e-b39a-4f65-b0c3-9c4d7571ffa7"

const inputClass = "h-11 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 text-white placeholder-white/30 focus:outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/30 text-[14px]"
const cardClass = "rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.07] hover:border-green-400/30 transition-colors"

export default function ContactForm() {
    const [status, setStatus] = useState("idle") // idle | submitting | success | error
    const [fields, setFields] = useState({ name: "", email: "", message: "" })

    const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("submitting")
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: "Lyra — contact form message",
                    from_name: fields.name,
                    ...fields,
                    botcheck: "",
                }),
            })
            const data = await res.json()
            if (data.success) {
                setStatus("success")
                setFields({ name: "", email: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch {
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className={`${cardClass} p-6 sm:p-8 mt-4 flex flex-col items-center justify-center gap-3 py-14`}>
                <div className="h-12 w-12 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center text-2xl">✓</div>
                <p className="text-white font-medium">Message sent!</p>
                <p className="text-white/50 text-[13px]">I'll get back to you soon.</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-[12px] text-white/40 hover:text-white transition-colors underline"
                >
                    Send another
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={`${cardClass} p-6 sm:p-8 mt-4`}>
            <h3 className="text-white font-medium text-lg mb-5">Or drop a quick message</h3>

            {/* Honeypot — invisible to humans, filled by bots */}
            <input type="checkbox" name="botcheck" className="hidden" readOnly />

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={fields.name}
                    onChange={set("name")}
                    className={inputClass}
                />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={fields.email}
                    onChange={set("email")}
                    className={inputClass}
                />
            </div>
            <textarea
                name="message"
                required
                rows={4}
                placeholder="What's on your mind?"
                value={fields.message}
                onChange={set("message")}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/30 text-[14px] resize-none mb-4"
            />

            {status === "error" && (
                <p className="text-red-400 text-[13px] mb-3">Something went wrong — please try again or email directly.</p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="h-11 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed border-0 text-white font-medium text-[14px] px-6 transition-all"
            >
                {status === "submitting" ? "Sending…" : "Send message"}
            </button>
        </form>
    )
}
