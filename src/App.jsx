import { useState, useEffect } from "react";
import {
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
  User,
  Home,
  Search,
  Briefcase,
  Info,
} from "lucide-react";
import { SpotifySidebar } from "./components/SpotifySiderbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ContentCard } from "./components/ContentCard";
import { RightPanel } from "./components/RightPanel";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { ExpandedView } from "./components/ExpandedView";
import { WelcomePopup } from "./components/WelcomePopup";

const HAPPENING_NOW = [
  {
    id: "live-1",
    title: "Chill Weekend Tunes",
    description: "Relaxing beats for your weekend • LIVE Host: Sarah",
    gradient: "blue",
    badges: ["Live", "20k listeners"],
    artist: "Various Artists",
    listeners: "20k",
  },
  {
    id: "live-2",
    title: "Electronic Rising",
    description: "The best new electronic tracks delivered live.",
    gradient: "pink",
    badges: ["Live", "15k listeners"],
    artist: "Electronic Beats",
    listeners: "15k",
  },
  {
    id: "live-3",
    title: "Lofi Girl Radio",
    description: "Beats to relax/study to • 24/7 Stream",
    gradient: "purple",
    badges: ["Live", "112k listeners"],
    artist: "Lofi Records",
    listeners: "112k",
  },
  {
    id: "live-4",
    title: "K-Pop Comeback",
    description: "Counting down the hottest new releases • Seoul",
    gradient: "orange",
    badges: ["Live", "85k listeners"],
    artist: "K-Pop Central",
    listeners: "85k",
  },
  {
    id: "live-5",
    title: "Jazz Cafe",
    description: "Smooth jazz improvisation • Live from NY",
    gradient: "green",
    badges: ["Live", "4k listeners"],
    artist: "Blue Note",
    listeners: "4k",
  },
];

const MADE_FOR_YOU = [
  {
    id: "mfy-1",
    title: "Discover Weekly",
    description: "New music updated every Monday.",
    gradient: "purple",
    artist: "Spotify",
    badges: ["Live", "32k listeners"],
    listeners: "32k",
  },
  {
    id: "mfy-2",
    title: "Release Radar",
    description: "Catch up on the latest releases from artists you follow.",
    gradient: "blue",
    artist: "Spotify",
    badges: ["Live", "18k listeners"],
    listeners: "18k",
  },
  {
    id: "mfy-3",
    title: "On Repeat",
    description: "Songs you love right now.",
    gradient: "pink",
    artist: "Spotify",
    badges: ["Live", "45k listeners"],
    listeners: "45k",
  },
  {
    id: "mfy-4",
    title: "Time Capsule",
    description: "We made you a playlist for a trip down memory lane.",
    gradient: "orange",
    artist: "Spotify",
    badges: ["Live", "12k listeners"],
    listeners: "12k",
  },
];

const THINGS_YOU_LOVE = [
  {
    id: "tyl-1",
    title: "Indie Pop Broadcast",
    description: "Live session with top Indie artists.",
    gradient: "green",
    badges: ["Live", "12k listeners"],
    artist: "Indie Nation",
    listeners: "12k",
  },
  {
    id: "tyl-2",
    title: "Deep Focus",
    description: "Keep calm and focus with ambient and post-rock.",
    gradient: "blue",
    artist: "Spotify",
    badges: ["Live", "9k listeners"],
    listeners: "9k",
  },
  {
    id: "tyl-3",
    title: "Rock Anthems",
    description: "Live commentary on classic rock history.",
    gradient: "orange",
    badges: ["Live", "8k listeners"],
    artist: "Rock FM",
    listeners: "8k",
  },
  {
    id: "tyl-4",
    title: "Synthwave Sunset",
    description: "Retro futuristic beats for your night drive.",
    gradient: "purple",
    artist: "Neon Grid",
    badges: ["Live", "22k listeners"],
    listeners: "22k",
  },
];

const GENRES = [
  { id: "g-1", title: "Pop", gradient: "pink" },
  { id: "g-2", title: "Hip-Hop", gradient: "orange" },
  { id: "g-3", title: "Indie", gradient: "green" },
  { id: "g-4", title: "Rock", gradient: "purple" },
  { id: "g-5", title: "Electronic", gradient: "blue" },
  { id: "g-6", title: "Classical", gradient: "pink" },
];

// Combine all playable streams into one master list for easier navigation state
const ALL_PLAYABLE = [...HAPPENING_NOW, ...MADE_FOR_YOU, ...THINGS_YOU_LOVE];

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Track the current stream using its ID
  const [activeStreamId, setActiveStreamId] = useState(HAPPENING_NOW[0].id);

  // Helper to find full object
  const activeStream =
    ALL_PLAYABLE.find((s) => s.id === activeStreamId) || HAPPENING_NOW[0];

  const handleCardClick = (stream) => {
    setActiveStreamId(stream.id);
    setIsPanelOpen(true);
  };

  const toggleRightPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
  };

  // Stream Navigation Handlers
  const handleNextStream = () => {
    const currentIndex = ALL_PLAYABLE.findIndex((s) => s.id === activeStreamId);
    const nextIndex = (currentIndex + 1) % ALL_PLAYABLE.length;
    setActiveStreamId(ALL_PLAYABLE[nextIndex].id);
  };

  const handlePrevStream = () => {
    const currentIndex = ALL_PLAYABLE.findIndex((s) => s.id === activeStreamId);
    const prevIndex =
      (currentIndex - 1 + ALL_PLAYABLE.length) % ALL_PLAYABLE.length;
    setActiveStreamId(ALL_PLAYABLE[prevIndex].id);
  };

  // Calculate Next/Prev for Player Display
  const currentIndex = ALL_PLAYABLE.findIndex((s) => s.id === activeStreamId);
  const nextStream = ALL_PLAYABLE[(currentIndex + 1) % ALL_PLAYABLE.length];
  const prevStream =
    ALL_PLAYABLE[
      (currentIndex - 1 + ALL_PLAYABLE.length) % ALL_PLAYABLE.length
    ];

  return (
    <div className="h-screen w-full flex flex-col bg-black overflow-hidden font-sans select-none relative">
      {/* Welcome Popup */}
      {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />}

      {/* Header - Custom Spotify Implementation */}
      <div className="h-[64px] bg-[#000] sticky top-0 z-20 flex items-center justify-between px-4 shrink-0 gap-4">
        {/* Left: Navigation Arrows */}
        <div className="flex gap-2 shrink-0">
          <button className="bg-black/50 hover:bg-black/70 rounded-full p-1.5 text-[#b3b3b3] hover:text-white transition-colors disabled:opacity-50">
            <ChevronLeft className="size-6" />
          </button>
          <button className="bg-black/50 hover:bg-black/70 rounded-full p-1.5 text-[#b3b3b3] hover:text-white transition-colors disabled:opacity-50">
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Center: Home Button & Search Pill */}
        <div className="flex items-center gap-2 flex-1 max-w-[480px]">
          {/* Home Button */}
          <button className="bg-[#1F1F1F] p-3 rounded-full hover:scale-105 hover:bg-[#2A2A2A] text-white transition-all shrink-0">
            <Home className="size-6" />
          </button>

          {/* Search Pill */}
          <div className="flex-1 relative group h-12">
            <div className="absolute inset-0 bg-[#1F1F1F] hover:bg-[#2A2A2A] hover:border-[#333] border border-transparent rounded-full transition-colors pointer-events-none" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-hover:text-white transition-colors z-10">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              placeholder="What do you want to play?"
              className="w-full h-full bg-transparent rounded-full py-3 pl-10 pr-14 text-sm text-white placeholder-[#b3b3b3] hover:placeholder-white outline-none z-10 relative truncate"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
              <div className="h-6 w-[1px] bg-[#7c7c7c]" />
              <Briefcase className="size-5 text-[#b3b3b3] hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="text-[#b3b3b3] hover:text-white hover:scale-105 transition-all">
            <Bell className="size-5" />
          </button>
          <button className="text-[#b3b3b3] hover:text-white hover:scale-105 transition-all">
            <Users className="size-5" />
          </button>
          <button className="bg-[#1F1F1F] p-1 rounded-full hover:scale-105 transition-transform">
            <div className="size-7 bg-[#535353] rounded-full flex items-center justify-center overflow-hidden">
              <User className="size-5 text-white" />
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 gap-2 mx-1 my-3">
        {/* 1. Sidebar */}
        <SpotifySidebar />

        {/* 2. Main Center Content */}
        <div className="flex-1 bg-[#121212] rounded-lg overflow-hidden relative flex flex-col mr-2">
          {/* CONDITIONAL RENDERING */}
          {isExpanded && activeStream && isPanelOpen ? (
            <ExpandedView
              cardData={activeStream}
              onClose={handleCloseExpanded}
            />
          ) : (
            <ScrollArea className="flex-1 h-full overflow-auto [&>[data-orientation=vertical]]:hidden [&>[data-orientation=horizontal]]:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="px-6 pb-8 pt-2 bg-gradient-to-b from-[#1F1F1F] via-[#121212] to-[#121212] flex flex-col gap-8 min-h-full">
                {/* Filter Chips */}
                <div className="flex gap-2 py-2">
                  <button className="bg-[#282828] text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    All
                  </button>
                  <button className="bg-[#282828] text-white px-3 py-1.5 rounded-full text-sm font-bold hover:bg-[#3E3E3E] transition-colors">
                    Music
                  </button>
                  <button className="bg-[#282828] text-white px-3 py-1.5 rounded-full text-sm font-bold hover:bg-[#3E3E3E] transition-colors">
                    Podcasts
                  </button>
                  <button className="bg-[#1DB954] text-black px-3 py-1.5 rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-green-900/20">
                    <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    Spotify Live
                  </button>
                  <button
                    onClick={() => setShowWelcome(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#282828] hover:bg-[#3E3E3E] text-white text-sm font-medium transition-colors border border-[#1DB954]/20 hover:border-[#1DB954]/50 ml-1"
                    title="View Live Tasks"
                  >
                    <Info className="w-4 h-4 text-[#1DB954]" />
                    <span className="opacity-90">Prototype Tasks</span>
                  </button>
                </div>

                {/* 1. HAPPENING NOW */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                      Happening Now
                    </h2>
                    <span className="text-xs font-bold text-[#b3b3b3] hover:underline cursor-pointer tracking-widest uppercase">
                      Show all
                    </span>
                  </div>
                  <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                    {HAPPENING_NOW.map((stream) => (
                      <ContentCard
                        key={stream.id}
                        {...stream}
                        isPlaying={activeStreamId === stream.id}
                        onClick={() => handleCardClick(stream)}
                      />
                    ))}
                  </div>
                </section>

                {/* 2. MADE FOR YOU */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 hover:underline cursor-pointer">
                    Made For You
                  </h2>
                  <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                    {MADE_FOR_YOU.map((item) => (
                      <ContentCard
                        key={item.id}
                        {...item}
                        isPlaying={activeStreamId === item.id}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </section>

                {/* 3. THINGS YOU'D LOVE */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 hover:underline cursor-pointer">
                    Things you'd love
                  </h2>
                  <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                    {THINGS_YOU_LOVE.map((item) => (
                      <ContentCard
                        key={item.id}
                        {...item}
                        isPlaying={activeStreamId === item.id}
                        onClick={() => handleCardClick(item)}
                      />
                    ))}
                  </div>
                </section>

                {/* 4. EXPLORE BY GENRE */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 hover:underline cursor-pointer">
                    Explore by Genre
                  </h2>
                  <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                    {GENRES.map((genre) => (
                      <ContentCard
                        key={genre.id}
                        title={genre.title}
                        gradient={genre.gradient}
                        variant="genre"
                        onClick={() => {}} // Genre click logic placeholder
                      />
                    ))}
                  </div>
                </section>
              </div>
            </ScrollArea>
          )}
        </div>

        {/* 3. Right Panel */}
        {activeStream && (
          <RightPanel
            isOpen={isPanelOpen}
            onClose={() => {
              setIsPanelOpen(false);
              setIsExpanded(false);
            }}
            cardData={activeStream}
            isExpanded={isExpanded}
            onToggleExpand={toggleExpand}
          />
        )}
      </div>

      {/* 4. Bottom Player */}
      <SpotifyPlayer
        isLivePanelOpen={isPanelOpen}
        onToggleLive={toggleRightPanel}
        currentStream={activeStream}
        nextStream={nextStream}
        prevStream={prevStream}
        onNextStream={handleNextStream}
        onPrevStream={handlePrevStream}
      />
    </div>
  );
}
