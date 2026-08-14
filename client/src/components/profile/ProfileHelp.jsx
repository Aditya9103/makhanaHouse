import { HeadphonesIcon } from "lucide-react";

export default function ProfileHelp() {
    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 relative overflow-hidden flex-1 flex flex-col justify-center">
            
            <div className="relative z-10">
                <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-2">Need Help?</h3>
                <p className="text-[12px] text-[var(--color-text-secondary)] mb-4">
                    We are here to help you!
                </p>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#080b14] transition-all text-xs font-medium bg-[#d4af37]/5">
                    <HeadphonesIcon size={14} />
                    Contact Support
                </button>
            </div>

            {/* Decorative Image */}
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 pointer-events-none opacity-80">
                <img 
                    src="/makhanabowl.png" 
                    alt="Makhana Decor" 
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="absolute right-12 bottom-4 w-12 h-12 pointer-events-none opacity-60 mix-blend-screen">
                 <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c0-4-3-8-3-12s3-8 3-8 3 4 3 8-3 8-3 12z" />
                    <path d="M12 22c-3-2-8-5-8-11s3-5 5-5" />
                    <path d="M12 22c3-2 8-5 8-11s-3-5-5-5" />
                </svg>
            </div>
            
        </div>
    );
}
