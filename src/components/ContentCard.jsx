import { Play, Disc } from "lucide-react";

export function ContentCard({
  title,
  gradient,
  badges = [],
  description = "Classic Rock Vibes • Timeless Hits",
  onClick,
  isPlaying = false,
  variant = "standard", // "standard" or "genre"
}) {
  const gradientClasses =
    gradient === "blue"
      ? "bg-gradient-to-br from-[#4b91f1] to-[#204485]"
      : gradient === "pink"
      ? "bg-gradient-to-br from-[#d95d78] to-[#6e2a3a]"
      : gradient === "purple"
      ? "bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95]"
      : gradient === "orange"
      ? "bg-gradient-to-br from-[#f97316] to-[#9a3412]"
      : gradient === "green"
      ? "bg-gradient-to-br from-[#10b981] to-[#064e3b]"
      : "bg-gradient-to-br from-[#64748b] to-[#1e293b]";

  if (variant === "genre") {
    return (
      <div
        onClick={onClick}
        className={`
          relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105
          h-[100px] w-[180px] shrink-0 ${gradientClasses}
        `}
      >
        <span className="absolute top-3 left-3 font-bold text-white text-lg tracking-tight">
          {title}
        </span>
        {/* Decorative rotated box */}
        <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-black/20 transform rotate-[25deg] rounded-lg" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        group relative p-4 rounded-lg transition-all duration-300 cursor-pointer w-[200px] flex-shrink-0
        ${isPlaying ? "bg-[#282828]" : "bg-[#181818] hover:bg-[#282828]"}
      `}
    >
      {/* Image Area */}
      <div
        className={`
          aspect-square w-full rounded-md shadow-lg mb-4 relative overflow-hidden ${gradientClasses} 
          flex items-center justify-center
        `}
      >
        {/* Live Badge - Updated Color */}
        {badges.includes("Live") && (
          <div className="absolute top-2 left-2 bg-[#1DB954] text-black text-[10px] font-bold px-2 py-1 rounded-full z-10 uppercase tracking-wide shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            Live
          </div>
        )}

        {/* Listener Count */}
        {badges.some((b) => b.includes("listeners")) && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
            {badges.find((b) => b.includes("listeners"))}
          </div>
        )}

        {/* Playing Overlay - Rotating CD */}
        {isPlaying ? (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
            <Disc className="w-12 h-12 text-[#1DB954] animate-[spin_4s_linear_infinite]" />
          </div>
        ) : (
          <div className="text-white font-bold text-xl px-4 text-center group-hover:scale-105 transition-transform duration-300">
            {title}
          </div>
        )}

        {/* Play Button (Hover) */}
        {!isPlaying && (
          <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-20">
            <button className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-black/40 shadow-lg">
              <Play className="fill-black text-black ml-1 w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Text Area */}
      <div className="flex flex-col gap-1">
        <h3
          className={`font-bold truncate w-full ${
            isPlaying ? "text-[#1DB954]" : "text-white"
          }`}
          title={title}
        >
          {title}
        </h3>
        <p className="text-[#a7a7a7] text-sm line-clamp-2 leading-tight font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
