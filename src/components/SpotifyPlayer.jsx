import {
  SkipBack,
  SkipForward,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Volume2,
  Heart,
  Maximize2,
  SquarePlay,
  Radio,
} from "lucide-react";
import { Slider } from "./ui/Slider";

export function SpotifyPlayer({
  isLivePanelOpen,
  onToggleLive,
  currentStream,
  nextStream,
  prevStream,
  onNextStream,
  onPrevStream,
}) {
  // Consistent gradient mapping matching App data
  const getGradientClasses = (color) => {
    switch (color) {
      case "blue":
        return "from-[#4b91f1] to-[#204485]";
      case "pink":
        return "from-[#d95d78] to-[#6e2a3a]";
      case "purple":
        return "from-[#8b5cf6] to-[#4c1d95]";
      case "orange":
        return "from-[#f97316] to-[#9a3412]";
      case "green":
        return "from-[#10b981] to-[#064e3b]";
      default:
        return "from-[#64748b] to-[#1e293b]";
    }
  };

  const gradientClasses = getGradientClasses(currentStream?.gradient);

  return (
    <div className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between w-full z-50">
      {/* LEFT: Track Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        <div className="w-14 h-14 bg-zinc-800 rounded shadow-lg overflow-hidden group relative cursor-pointer">
          {/* Dynamic Gradient based on stream */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientClasses}`}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <Radio className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <a
            href="#"
            className="text-sm font-normal hover:underline cursor-pointer text-white line-clamp-1"
          >
            {currentStream?.title || "Select a Stream"}
          </a>
          <a
            href="#"
            className="text-xs text-[#b3b3b3] hover:underline hover:text-white cursor-pointer line-clamp-1"
          >
            {currentStream?.artist || "Spotify Live"}
          </a>
        </div>
        <button className="text-[#b3b3b3] hover:text-white transition-colors ml-2">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* CENTER: Player Controls */}
      <div className="flex flex-col items-center max-w-[722px] w-[40%] gap-2">
        <div className="flex items-center gap-8">
          {/* Prev Stream Control */}
          <div className="flex items-center gap-3 group relative">
            <div className="hidden lg:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-full mr-2 whitespace-nowrap">
              <span className="text-[9px] text-[#b3b3b3] uppercase tracking-wider font-bold">
                Prev Channel
              </span>
              <span className="text-[10px] font-bold text-white">
                {prevStream?.title}
              </span>
            </div>
            <button
              onClick={onPrevStream}
              className="text-[#b3b3b3] hover:text-white transition-colors active:scale-90 transform"
              title={`Switch to Previous: ${prevStream?.title}`}
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>
          </div>

          {/* Center "LIVE" Indicator (Replaces Signal/Play) */}
          <div className="flex flex-col items-center justify-center relative group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 border border-[#1DB954] flex items-center justify-center hover:bg-[#1DB954]/20 transition-all shadow-[0_0_10px_rgba(29,185,84,0.2)]">
              <div className="w-3 h-3 rounded-full bg-[#1DB954]" />
            </div>

            {/* Tooltip */}
            <div className="absolute -top-8 bg-[#282828] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/5">
              Playing Live
            </div>
          </div>

          {/* Next Stream Control */}
          <div className="flex items-center gap-3 group relative">
            <button
              onClick={onNextStream}
              className="text-[#b3b3b3] hover:text-white transition-colors active:scale-90 transform"
              title={`Switch to Next: ${nextStream?.title}`}
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
            <div className="hidden lg:flex flex-col items-start opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-full ml-2 whitespace-nowrap">
              <span className="text-[9px] text-[#b3b3b3] uppercase tracking-wider font-bold">
                Next Channel
              </span>
              <span className="text-[10px] font-bold text-white">
                {nextStream?.title}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar (Standard Music Progress) */}
        <div className="w-full flex items-center gap-2 text-xs font-medium text-[#a7a7a7]">
          <span>1:23</span>
          <div className="group w-full flex items-center cursor-pointer">
            <Slider
              defaultValue={[33]}
              max={100}
              step={1}
              className="w-full hover:cursor-grab"
            />
          </div>
          <span>3:45</span>
        </div>
      </div>

      {/* RIGHT: Volume & Extra */}
      <div className="flex items-center justify-end gap-2 w-[30%] min-w-[180px]">
        {/* Toggle Live Panel Button */}
        <button
          onClick={onToggleLive}
          className={`p-2 transition-colors transform active:scale-95 ${
            isLivePanelOpen
              ? "text-[#1DB954]"
              : "text-[#b3b3b3] hover:text-white"
          }`}
          title="Toggle Live Panel"
        >
          <SquarePlay className="w-4 h-4" />
        </button>

        {/* Standard Icons */}
        <button className="text-[#b3b3b3] hover:text-white p-2">
          <Mic2 className="w-4 h-4" />
        </button>
        <button className="text-[#b3b3b3] hover:text-white p-2">
          <ListMusic className="w-4 h-4" />
        </button>
        <button className="text-[#b3b3b3] hover:text-white p-2">
          <MonitorSpeaker className="w-4 h-4" />
        </button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 w-24 group px-2">
          <Volume2 className="w-4 h-4 text-[#b3b3b3] group-hover:text-white" />
          <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
        </div>

        <button className="text-[#b3b3b3] hover:text-white p-2">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
