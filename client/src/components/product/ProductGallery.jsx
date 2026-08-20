import { useState, useRef } from "react";
import { ChevronUp, ChevronDown, Search, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductGallery({ images, video, productId }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const navigate = useNavigate();
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();

        // Calculate cursor position as a percentage (0 to 1)
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Ensure values stay between 0 and 1
        setZoomPos({
            x: Math.max(0, Math.min(1, x)),
            y: Math.max(0, Math.min(1, y))
        });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 h-full relative z-20">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 justify-center md:justify-start">
                <button
                    className="hidden md:flex h-6 w-full items-center justify-center text-[#d4af37] hover:bg-white/5 rounded transition-colors"
                    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeIndex === 0}
                >
                    <ChevronUp size={20} />
                </button>

                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-none py-1 md:py-0">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeIndex === idx
                                ? "border-[#d4af37] opacity-100"
                                : "border-transparent opacity-60 hover:opacity-100 bg-white/5"
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>

                <button
                    className="hidden md:flex h-6 w-full items-center justify-center text-[#d4af37] hover:bg-white/5 rounded transition-colors"
                    onClick={() => setActiveIndex(prev => Math.min(images.length - 1, prev + 1))}
                    disabled={activeIndex === images.length - 1}
                >
                    <ChevronDown size={20} />
                </button>
            </div>

            {/* Main Image */}
            <div className="relative flex-1">
                <div
                    className={`relative rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] flex items-center justify-center p-8 aspect-square md:aspect-auto h-full overflow-hidden cursor-crosshair transition-colors ${isZooming ? 'border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : ''}`}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                    ref={imgRef}
                >
                    <img
                        src={images[activeIndex]}
                        alt="Main Product"
                        className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 ${isZooming ? 'scale-100' : 'hover:scale-105'}`}
                    />

                    {/* Zoom Icon (Hide when zooming) */}
                    <button className={`absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#080b14]/50 backdrop-blur-md border border-white/10 text-white/70 transition-all ${isZooming ? 'opacity-0 scale-90' : 'opacity-100 scale-100 hover:text-white hover:bg-[#080b14]/80'}`}>
                        <Search size={18} />
                    </button>
                </div>

                {/* Amazon-style Zoom Container (Appears on the right side when hovering) */}
                {isZooming && (
                    <div className="absolute top-0 bottom-0 left-[105%] w-[125%] h-full rounded-2xl border border-white/10 bg-[#080b14] overflow-hidden z-[100] hidden lg:block shadow-2xl pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div
                            className="w-full h-full bg-no-repeat"
                            style={{
                                backgroundImage: `url(${images[activeIndex]})`,
                                backgroundSize: '250%',
                                backgroundPosition: `${zoomPos.x * 100}% ${zoomPos.y * 100}%`,
                            }}
                        ></div>
                    </div>
                )}

                {/* Floating Video Reel Card */}
                {video && (
                    <button
                        onClick={() => navigate(`/reels/${productId}`)}
                        className="fixed bottom-8 left-30 w-24 sm:w-32 aspect-[9/16] rounded-xl overflow-hidden border-2 border-[#d4af37]/50 shadow-2xl group z-[90] hover:scale-105 transition-transform bg-black"
                    >
                        <video
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Play size={14} className="text-white fill-white ml-0.5" />
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}
