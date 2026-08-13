import { useEffect, useRef } from "react";

/**
 * PremiumBackground
 * ------------------
 * A premium, ambient animated background — drifting aurora blobs rendered
 * on a half-resolution canvas (cheap to paint, GPU-composited on scale-up),
 * plus a sparse field of twinkling particles and a static grain layer for
 * texture. No three.js / WebGL needed, so there's no scene-graph, shader
 * compile, or context-loss overhead — just 2D canvas draws capped at 30fps.
 *
 * Performance choices:
 *  - Canvas is rendered at ~0.5x device pixels, then CSS-scaled up (blurred
 *    blobs hide the resolution loss completely, this alone cuts fill-rate ~4x)
 *  - Glow sprites for each blob are pre-rendered ONCE to offscreen canvases,
 *    then just drawImage'd every frame (no per-frame radial gradient calls)
 *  - Frame loop is throttled to 30fps via a timestamp gate
 *  - Animation fully pauses on tab blur (visibilitychange) and respects
 *    prefers-reduced-motion (renders one static frame instead)
 *  - Particle field is drawn in the same pass, no extra canvas/DOM nodes
 *
 * Theming: everything derives from the `theme` prop (or CSS variables on
 * the wrapper), so this drops into a navy/gold system, a brand-yellow
 * system, or anything else without touching the internals.
 *
 * Usage:
 *   <PremiumBackground /> // fixed, full-bleed, sits behind your content
 *   <PremiumBackground theme={{ base: "#0a0e1a", blobs: ["#f8b417","#c9a24b","#1e3a5f"] }} />
 */

const DEFAULT_THEME = {
    base: "#080b14", // deep navy base
    baseGradient: ["#0d1220", "#080b14", "#05070d"],
    blobs: ["#f8b417", "#8b6f2e", "#2a3f6b"], // gold + muted gold + steel navy
    particle: "#f8b417",
    grainOpacity: 0.035,
};

function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const bigint = parseInt(
        h.length === 3
            ? h.split("").map((c) => c + c).join("")
            : h,
        16
    );
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export default function GlobalBackground({
    children,
    theme = DEFAULT_THEME,
    particleCount = 46,
    className = "",
    style = {},
}) {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const RES_SCALE = 0.55; // render at ~55% resolution, upscale via CSS
        const TARGET_FPS = 30;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        const blobColors = theme.blobs.map(hexToRgb);
        const particleRgb = hexToRgb(theme.particle);

        // ---- Blob definitions: each drifts on its own slow elliptical path ----
        const blobs = blobColors.map((rgb, i) => ({
            rgb,
            baseX: 0.68 + ((i * 0.12) % 0.24), // clustered toward the right edge
            baseY: 0.2 + ((i * 0.53) % 0.6),
            radius: 0.18 + (i % 2) * 0.05, // fraction of min(width,height) — smaller blobs
            speed: 0.00006 + i * 0.000015,
            phase: i * 2.1,
            orbit: 0.08 + (i % 3) * 0.02, // tighter drift so they stay on the right
            opacity: 0.5 - i * 0.08,
            sprite: null,
            spriteSize: 0,
        }));

        // ---- Particle field: tiny drifting, twinkling points ----
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.3 + 0.3,
            driftX: (Math.random() - 0.5) * 0.00004,
            driftY: (Math.random() - 0.5) * 0.00004,
            twinkleSpeed: Math.random() * 0.0015 + 0.0005,
            twinklePhase: Math.random() * Math.PI * 2,
        }));

        function buildSprite(blob) {
            // Pre-render a soft radial glow once per blob; reused every frame.
            const size = Math.ceil(blob.radius * Math.max(width, height) * 2 * RES_SCALE);
            const off = document.createElement("canvas");
            off.width = size;
            off.height = size;
            const octx = off.getContext("2d");
            const [r, g, b] = blob.rgb;
            const grad = octx.createRadialGradient(
                size / 2,
                size / 2,
                0,
                size / 2,
                size / 2,
                size / 2
            );
            grad.addColorStop(0, `rgba(${r},${g},${b},${blob.opacity})`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},${blob.opacity * 0.35})`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            octx.fillStyle = grad;
            octx.fillRect(0, 0, size, size);
            blob.sprite = off;
            blob.spriteSize = size;
        }

        function resize() {
            const rect = wrap.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.max(1, Math.floor(width * RES_SCALE * dpr));
            canvas.height = Math.max(1, Math.floor(height * RES_SCALE * dpr));
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            blobs.forEach(buildSprite);
        }

        let ro;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(resize);
            ro.observe(wrap);
        } else {
            window.addEventListener("resize", resize);
        }
        resize();

        let rafId = null;
        let lastFrameTime = 0;
        let running = true;

        function drawFrame(t) {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Base gradient wash
            const bg = ctx.createLinearGradient(0, 0, 0, h);
            theme.baseGradient.forEach((c, i) =>
                bg.addColorStop(i / (theme.baseGradient.length - 1), c)
            );
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, w, h);

            // Aurora blobs (pre-rendered sprites, just positioned + drawn)
            ctx.globalCompositeOperation = "screen";
            blobs.forEach((blob) => {
                const angle = t * blob.speed + blob.phase;
                const cx =
                    (blob.baseX + Math.cos(angle) * blob.orbit) * w;
                const cy =
                    (blob.baseY + Math.sin(angle * 0.8) * blob.orbit) * h;
                ctx.drawImage(
                    blob.sprite,
                    cx - blob.spriteSize / 2,
                    cy - blob.spriteSize / 2,
                    blob.spriteSize,
                    blob.spriteSize
                );
            });
            ctx.globalCompositeOperation = "source-over";

            // Particle field
            const [pr, pg, pb] = particleRgb;
            particles.forEach((p) => {
                p.x += p.driftX * FRAME_INTERVAL;
                p.y += p.driftY * FRAME_INTERVAL;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;
                if (p.y < 0) p.y = 1;
                if (p.y > 1) p.y = 0;
                const twinkle =
                    0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinklePhase));
                ctx.beginPath();
                ctx.fillStyle = `rgba(${pr},${pg},${pb},${(0.55 * twinkle).toFixed(3)})`;
                ctx.arc(p.x * w, p.y * h, p.r * RES_SCALE * dpr, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function loop(t) {
            if (!running) return;
            if (t - lastFrameTime >= FRAME_INTERVAL) {
                lastFrameTime = t;
                drawFrame(t);
            }
            rafId = requestAnimationFrame(loop);
        }

        if (reduceMotion) {
            drawFrame(0);
        } else {
            rafId = requestAnimationFrame(loop);
        }

        function handleVisibility() {
            if (document.hidden) {
                running = false;
                if (rafId) cancelAnimationFrame(rafId);
            } else if (!reduceMotion) {
                running = true;
                rafId = requestAnimationFrame(loop);
            }
        }
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            document.removeEventListener("visibilitychange", handleVisibility);
            if (ro) ro.disconnect();
            else window.removeEventListener("resize", resize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [particleCount]);

    return (
        <div className="min-h-screen relative text-[#f8f9fa] selection:bg-[#d4af37]/30 font-sans">
            <div
                ref={wrapRef}
                className={className}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: -1,
                    overflow: "hidden",
                    background: theme.base,
                    ...style,
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        filter: "blur(6px)",
                        transform: "translateZ(0)",
                    }}
                />
                {/* Static grain layer — pure CSS, zero animation cost */}
                <svg
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: theme.grainOpacity,
                        mixBlendMode: "overlay",
                        pointerEvents: "none",
                    }}
                >
                    <filter id="premium-bg-grain">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.85"
                            numOctaves="2"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#premium-bg-grain)" />
                </svg>
                {/* Subtle vignette to focus foreground content */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 100%)",
                        pointerEvents: "none",
                    }}
                />
            </div>
            {/* Content wrapper */}
            <div className="relative z-10 flex min-h-screen flex-col">
                {children}
            </div>
        </div>
    );
}