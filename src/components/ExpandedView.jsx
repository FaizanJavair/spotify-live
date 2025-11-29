import {
  ChevronDown,
  Users,
  Radio,
  Share2,
  MoreHorizontal,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";
import { QueueSection } from "./QueueSection";

const EMOTES = ["😊", "👍", "😢", "🔥", "🎵"];

export function ExpandedView({ cardData, onClose }) {
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

  const gradientClasses = getGradientClasses(cardData.gradient);

  // Mock handler for emotes in this view
  const handleEmoteClick = (emote) => {
    console.log("Emote clicked:", emote);
  };

  return (
    <div
      className={`h-full w-full rounded-lg bg-gradient-to-b ${gradientClasses} p-6 flex flex-col relative overflow-hidden`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-10" />

      {/* Header Controls */}
      <div className="flex items-center justify-between relative z-20 mb-4 shrink-0">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-md"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">
            Playing from Live
          </span>
          <span className="text-xs font-bold text-white">{cardData.title}</span>
        </div>

        <button className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-md">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex gap-8 min-h-0 relative z-20 overflow-hidden">
        {/* LEFT: Visualizer & Current Song Info */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          {/* Album Art / Visualizer Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square max-h-[350px] w-full max-w-[350px] shadow-2xl rounded-lg overflow-hidden group mb-6 shrink-0"
          >
            {/* Placeholder Visuals */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            </div>

            {/* Live Indicator on Art */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Radio className="w-3 h-3 text-[#1DB954] animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live
              </span>
            </div>

            {/* Listener Count on Art */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Users className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">
                {cardData.listeners}
              </span>
            </div>
          </motion.div>

          {/* Title Info */}
          <div className="text-center space-y-2 mb-4 shrink-0">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {cardData.title}
            </h1>
            <p className="text-white/70 text-lg font-medium">
              {cardData.artist}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <button className="p-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <Heart className="w-8 h-8" />
            </button>
            <button className="p-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <Share2 className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* RIGHT: Queue Section */}
        <div className="w-[380px] bg-black/20 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col mb-2 shrink-0">
          <div className="p-4 border-b border-white/10 bg-black/10">
            <h3 className="text-white font-bold text-lg">Up Next</h3>
          </div>
          {/* Reuse the QueueSection component which has its own scroll logic */}
          <div className="flex-1 overflow-hidden flex flex-col [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
            <QueueSection emotes={EMOTES} onEmoteClick={handleEmoteClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
