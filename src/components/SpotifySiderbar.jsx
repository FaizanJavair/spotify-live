import { useState } from "react";
import {
  Library,
  Plus,
  ArrowRight,
  ArrowLeft,
  Search as SearchIcon,
  List,
  Pin,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export function SpotifySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Mock Data
  const libraryItems = [
    {
      type: "liked",
      title: "Liked Songs",
      subtitle: "Playlist • 1,142 songs",
      pinned: true,
      gradient: "bg-gradient-to-br from-[#450af5] to-[#c4efd9]",
    },
    {
      type: "artist",
      title: "The Weeknd",
      subtitle: "Artist",
      gradient: "bg-gradient-to-br from-red-900 to-black",
    },
    {
      type: "playlist",
      title: "Late Night Drive",
      subtitle: "Playlist • Spotify",
      gradient: "bg-gradient-to-br from-purple-900 to-indigo-900",
    },
    {
      type: "playlist",
      title: "Rock Classics",
      subtitle: "Playlist • Spotify",
      gradient: "bg-gradient-to-br from-red-700 to-orange-600",
    },
    {
      type: "playlist",
      title: "lofi chill",
      subtitle: "Playlist • Spotify",
      gradient: "bg-gradient-to-br from-teal-500 to-emerald-700",
    },
    {
      type: "artist",
      title: "Daft Punk",
      subtitle: "Artist",
      gradient: "bg-gradient-to-br from-yellow-600 to-yellow-800",
    },
    {
      type: "playlist",
      title: "Top 50 - Global",
      subtitle: "Playlist • Spotify",
      gradient: "bg-gradient-to-br from-green-600 to-emerald-900",
    },
    {
      type: "artist",
      title: "Arctic Monkeys",
      subtitle: "Artist",
      gradient: "bg-gradient-to-br from-gray-800 to-black",
    },
    {
      type: "album",
      title: "Random Access Memories",
      subtitle: "Album • Daft Punk",
      gradient: "bg-gradient-to-br from-slate-800 to-slate-900",
    },
    {
      type: "podcast",
      title: "The Daily",
      subtitle: "Podcast • The New York Times",
      gradient: "bg-gradient-to-br from-gray-200 to-gray-400",
    },
  ];

  return (
    <div
      className={`
        flex flex-col gap-2 h-full pl-2 pr-1 transition-all duration-300 ease-in-out shrink-0
        ${isCollapsed ? "w-[88px]" : "w-[280px] lg:w-[320px]"}
      `}
    >
      {/* Library Block */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Header Area */}
        <div
          className={`flex flex-col ${
            isCollapsed ? "items-center gap-4 py-4" : "px-4 pt-4 pb-2"
          }`}
        >
          {/* Top Row: Library Icon/Text + Controls */}
          <div
            className={`flex items-center ${
              isCollapsed ? "flex-col gap-4" : "justify-between"
            } text-[#b3b3b3] w-full`}
          >
            {/* Library Label / Collapse Toggle */}
            <button
              className={`flex items-center gap-2 hover:text-white transition-colors font-bold ${
                isCollapsed ? "" : "w-auto"
              }`}
              onClick={toggleSidebar}
              title={
                isCollapsed ? "Expand Your Library" : "Collapse Your Library"
              }
            >
              {isCollapsed ? (
                <div className="hover:bg-[#282828] p-1 rounded-md">
                  <PanelLeftOpen className="w-6 h-6 text-[#b3b3b3]" />
                </div>
              ) : (
                <>
                  <Library className="w-6 h-6 shrink-0" />
                  <span>Your Library</span>
                </>
              )}
            </button>

            {/* Controls: Plus & Arrow */}
            {isCollapsed ? (
              <button className="p-2 bg-[#282828] hover:bg-[#3E3E3E] hover:text-white rounded-full transition-colors shadow-md">
                <Plus className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-[#282828] hover:text-white rounded-full transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleSidebar}
                  className="p-1 hover:bg-[#282828] hover:text-white rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Filters (Pills) - Only visible when Expanded */}
          {!isCollapsed && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 mb-2 fade-in">
              <span className="bg-[#232323] px-3 py-1.5 rounded-full text-xs font-medium text-white cursor-pointer hover:bg-[#3E3E3E] transition-colors whitespace-nowrap">
                Playlists
              </span>
              <span className="bg-[#232323] px-3 py-1.5 rounded-full text-xs font-medium text-white cursor-pointer hover:bg-[#3E3E3E] transition-colors whitespace-nowrap">
                Podcasts
              </span>
              <span className="bg-[#232323] px-3 py-1.5 rounded-full text-xs font-medium text-white cursor-pointer hover:bg-[#3E3E3E] transition-colors whitespace-nowrap">
                Albums
              </span>
            </div>
          )}
        </div>

        {/* Search & Recents Bar - Only visible when Expanded */}
        {!isCollapsed && (
          <div className="px-4 py-2 flex items-center justify-between text-[#b3b3b3]">
            <button className="p-1 hover:bg-[#282828] hover:text-white rounded-full">
              <SearchIcon className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-xs font-medium hover:text-white hover:scale-105 transition-all">
              <span>Recents</span>
              <List className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* List Content - Standard Div with hidden Scrollbar */}
        <div className="flex-1 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col pb-4 px-2">
            {libraryItems.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-center p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group
                  ${isCollapsed ? "justify-center py-3" : "gap-3"}
                `}
              >
                {/* Visual Icon/Gradient */}
                <div
                  className={`
                  relative shrink-0 
                  ${item.type === "artist" ? "rounded-full" : "rounded-md"} 
                  ${isCollapsed ? "w-12 h-12" : "w-12 h-12"}
                  overflow-hidden shadow-lg ${item.gradient}
                  flex items-center justify-center
                `}
                >
                  {item.type === "liked" ? (
                    <svg
                      role="img"
                      height="24"
                      width="24"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  ) : (
                    <span className="text-white font-bold text-sm uppercase">
                      {item.title.substring(0, 2)}
                    </span>
                  )}
                </div>

                {/* Text Details - Hidden when collapsed */}
                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden flex-1">
                    <p
                      className={`text-white font-medium text-[15px] truncate ${
                        item.type === "liked" ? "text-[#1ed760]" : ""
                      }`}
                    >
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {item.pinned && (
                        <Pin className="w-3 h-3 text-[#1DB954] rotate-45 fill-[#1DB954]" />
                      )}
                      <p className="text-[#b3b3b3] text-[13px] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
