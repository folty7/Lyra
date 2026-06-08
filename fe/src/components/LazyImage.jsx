import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Image with a skeleton placeholder + fade-in on load.
 *
 * - By default uses native lazy loading (loading="lazy") + async decoding,
 *   so off-screen images don't block initial render. Pass `eager` for
 *   above-the-fold/LCP images (e.g. the hero) to load them immediately.
 * - While loading (or on error) a pulsing skeleton fills the box, so layout
 *   doesn't jump and the user gets immediate feedback.
 *
 * `className` styles the <img> (and the wrapper inherits sizing/positioning,
 * so glow/positioning siblings keep working). `skeletonClassName` lets you
 * tweak the placeholder (e.g. rounding to match the image).
 */
export default function LazyImage({
    src,
    alt = "",
    className,
    wrapperClassName,
    skeletonClassName,
    eager = false,
    ...props
}) {
    const [status, setStatus] = useState("loading") // loading | loaded | error

    return (
        <div className={cn("relative", wrapperClassName)}>
            {status !== "loaded" && (
                <div
                    aria-hidden
                    className={cn(
                        "absolute inset-0 animate-pulse rounded-2xl bg-white/[0.05]",
                        skeletonClassName
                    )}
                />
            )}
            <img
                src={src}
                alt={alt}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={eager ? "high" : undefined}
                onLoad={() => setStatus("loaded")}
                onError={() => setStatus("error")}
                className={cn(
                    "transition-opacity duration-700 ease-out",
                    status === "loaded" ? "opacity-100" : "opacity-0",
                    className
                )}
                {...props}
            />
        </div>
    )
}
