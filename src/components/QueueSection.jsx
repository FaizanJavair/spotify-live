import { useState } from "react";
import { Heart, Plus } from "lucide-react";

// Mock Queue Data
const QUEUE_ITEMS = [
  {
    id: 1,
    trackName: "Starboy",
    artistName: "The Weeknd, Daft Punk",
    duration: "3:50",
    gradient: "from-red-600 to-orange-600",
  },
  {
    id: 2,
    trackName: "Midnight City",
    artistName: "M83",
    duration: "4:03",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    trackName: "Instant Crush",
    artistName: "Daft Punk, Julian Casablancas",
    duration: "5:37",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    trackName: "The Hills",
    artistName: "The Weeknd",
    duration: "4:02",
    gradient: "from-gray-800 to-red-900",
  },
  {
    id: 5,
    trackName: "Get Lucky",
    artistName: "Daft Punk, Pharrell Williams",
    duration: "6:09",
    gradient: "from-yellow-600 to-orange-500",
  },
  {
    id: 6,
    trackName: "Nightcall",
    artistName: "Kavinsky",
    duration: "4:18",
    gradient: "from-indigo-900 to-purple-900",
  },
  {
    id: 7,
    trackName: "Resonance",
    artistName: "HOME",
    duration: "3:32",
    gradient: "from-teal-600 to-blue-500",
  },
  {
    id: 8,
    trackName: "Blinding Lights",
    artistName: "The Weeknd",
    duration: "3:20",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    id: 9,
    trackName: "After Dark",
    artistName: "Mr. Kitty",
    duration: "4:17",
    gradient: "from-gray-700 to-gray-500",
  },
  {
    id: 10,
    trackName: "Space Song",
    artistName: "Beach House",
    duration: "5:20",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    id: 11,
    trackName: "Heroes",
    artistName: "David Bowie",
    duration: "6:11",
    gradient: "from-zinc-600 to-zinc-400",
  },
  {
    id: 12,
    trackName: "Everybody Wants To Rule The World",
    artistName: "Tears For Fears",
    duration: "4:11",
    gradient: "from-green-600 to-emerald-500",
  },
];

export function QueueSection({ emotes, onEmoteClick }) {
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [isCurrentLiked, setIsCurrentLiked] = useState(false);

  const toggleLike = (id) => {
    setLikedTracks((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
      <div className="flex flex-col gap-4">
        {/* Currently Playing */}
        <div className="bg-[#282828]/50 p-3 rounded-lg group">
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-wider">
              Now Playing
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded shadow" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  Neon Nights
                </p>
                <p className="text-xs text-[#b3b3b3] truncate">Synthwave Boy</p>
              </div>

              {/* Current Song Like Button */}
              <button
                onClick={() => setIsCurrentLiked(!isCurrentLiked)}
                className={`
                  transition-all p-1
                  ${
                    isCurrentLiked
                      ? "opacity-100 text-[#1DB954]"
                      : "opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-[#1DB954]"
                  }
                `}
              >
                <Heart
                  className={`w-4 h-4 ${isCurrentLiked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Floating Emote Buttons (Visual Only in Queue) */}
          <div className="relative h-12 mt-2 flex items-center justify-center gap-2">
            {emotes.map((emote) => (
              <button
                key={emote}
                onClick={() => onEmoteClick(emote)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3E3E3E] hover:bg-[#5E5E5E] hover:scale-110 transition-all active:scale-95 shrink-0"
              >
                <span className="text-lg leading-none pt-0.5">{emote}</span>
              </button>
            ))}
            {/* Add More Emotes Button */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2a2a2a] border border-[#3E3E3E] hover:bg-[#3E3E3E] hover:scale-110 transition-all active:scale-95 shrink-0 group"
              title="More Emotes"
            >
              <Plus className="w-5 h-5 text-[#b3b3b3] group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Up Next List */}
        <div>
          <h3 className="text-white font-bold mb-2">Up Next</h3>
          <div className="flex flex-col gap-1">
            {QUEUE_ITEMS.map((item, index) => {
              const isLiked = likedTracks.has(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-[#2a2a2a] group"
                >
                  <div className="text-[#b3b3b3] text-sm w-4">{index + 1}</div>
                  {/* Album Art Placeholder with Gradients */}
                  <div
                    className={`w-8 h-8 rounded shrink-0 bg-gradient-to-br ${item.gradient}`}
                  />

                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm truncate group-hover:text-[#1DB954] transition-colors">
                      {item.trackName}
                    </p>
                    <p className="text-[#b3b3b3] text-xs truncate">
                      {item.artistName}
                    </p>
                  </div>

                  {/* Like Button (Visible on Hover or when Liked) */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`
                      transition-all p-1
                      ${
                        isLiked
                          ? "opacity-100 text-[#1DB954]"
                          : "opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-[#1DB954]"
                      }
                    `}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>

                  <div className="text-[#b3b3b3] text-xs">{item.duration}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
