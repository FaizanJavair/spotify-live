import { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Maximize2,
  Minimize2,
  PanelRightClose,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatSection } from "./ChatSection";
import { VotingSection } from "./VotingSection";
import { QueueSection } from "./QueueSection";

const EMOTES = ["😊", "👍", "😢", "🔥", "🎵"];

export function RightPanel({
  isOpen,
  onClose,
  cardData,
  isExpanded,
  onToggleExpand,
}) {
  const [activeTab, setActiveTab] = useState("Queue");
  const [animatedEmotes, setAnimatedEmotes] = useState([]);

  // Notification States
  const [hasChatUnread, setHasChatUnread] = useState(true);
  const [hasVotingUnread, setHasVotingUnread] = useState(true);

  // Filter tabs based on expanded state
  // If expanded: Only Chat and Voting. If not expanded: Queue, Chat, Voting.
  const AVAILABLE_TABS = isExpanded
    ? ["Live Chat", "Voting"]
    : ["Queue", "Live Chat", "Voting"];

  // Ensure active tab is valid when switching modes
  useEffect(() => {
    if (isExpanded && activeTab === "Queue") {
      setActiveTab("Live Chat");
    }
  }, [isExpanded, activeTab]);

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

  // Clear notifications when switching tabs
  useEffect(() => {
    if (activeTab === "Live Chat") {
      setHasChatUnread(false);
    }
    if (activeTab === "Voting") {
      setHasVotingUnread(false);
    }
  }, [activeTab]);

  // Simulate a new voting event appearing after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab !== "Voting") {
        setHasVotingUnread(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Handle Emote Animation
  const handleEmoteClick = (emote) => {
    const id = Date.now();
    const x = Math.random() * 200 - 100;
    setAnimatedEmotes((prev) => [...prev, { id, emote, x }]);
    setTimeout(() => {
      setAnimatedEmotes((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-[350px] bg-[#121212] z-40 overflow-hidden flex flex-col h-full rounded-lg"
    >
      {/* 1. Tool Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <button
          onClick={onClose}
          className="text-[#b3b3b3] hover:text-white transition-colors p-1 hover:bg-[#282828] rounded-md"
          title="Close Sidebar"
        >
          <PanelRightClose className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button className="text-[#b3b3b3] hover:text-white transition-colors p-1 hover:bg-[#282828] rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={onToggleExpand}
            className={`text-[#b3b3b3] hover:text-white transition-colors p-1 hover:bg-[#282828] rounded-md ${
              isExpanded ? "text-[#1DB954]" : ""
            }`}
            title={isExpanded ? "Exit Expanded View" : "Expand to Full View"}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. The "Now Playing" Visual Card - HIDDEN if expanded */}
      {!isExpanded && (
        <div className="px-4 pb-4 shrink-0">
          <div
            className={`
              h-48 w-full rounded-xl bg-gradient-to-br ${gradientClasses} 
              relative p-4 flex flex-col justify-between shadow-lg overflow-hidden
            `}
          >
            {/* Card Content */}
            <div className="mt-auto flex items-end justify-between relative z-10 w-full">
              <h2 className="font-bold text-2xl text-white leading-tight shadow-black/20 drop-shadow-md max-w-[65%]">
                {cardData.title}
              </h2>
              <div className="bg-[#1DB954] text-black text-[10px] font-bold px-2 py-1.5 rounded-full shadow-md whitespace-nowrap">
                {cardData.listeners} Listeners
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 px-4 pb-2 border-b border-[#282828] shrink-0">
        {AVAILABLE_TABS.map((tab) => {
          // Determine if this tab has an unread notification
          const isUnread =
            (tab === "Live Chat" && hasChatUnread) ||
            (tab === "Voting" && hasVotingUnread);

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                  relative flex items-center justify-center gap-2
                  ${
                    activeTab === tab
                      ? "text-white after:absolute after:bottom-[-9px] after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[#1DB954]"
                      : "text-[#b3b3b3] hover:text-white"
                  }
                  flex-1 py-2 text-sm font-bold transition-all
                `}
            >
              {tab}
              {/* Notification Dot */}
              {isUnread && activeTab !== tab && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none] [&_*]:[-ms-overflow-style:none]">
        {/* --- QUEUE TAB (Hidden if Expanded) --- */}
        {activeTab === "Queue" && !isExpanded && (
          <QueueSection emotes={EMOTES} onEmoteClick={handleEmoteClick} />
        )}

        {/* --- LIVE CHAT TAB --- */}
        {activeTab === "Live Chat" && (
          <ChatSection
            emotes={EMOTES}
            onEmoteClick={handleEmoteClick}
            onMessageReceived={() => {
              if (activeTab !== "Live Chat") setHasChatUnread(true);
            }}
          />
        )}

        {/* --- VOTING TAB --- */}
        {activeTab === "Voting" && <VotingSection />}

        {/* Animation Overlay */}
        <AnimatePresence>
          {animatedEmotes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 0, opacity: 1, x: item.x }}
              animate={{
                y: -300,
                opacity: 0,
                x: item.x + (Math.random() * 50 - 25),
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-20 left-1/2 pointer-events-none text-3xl z-50"
            >
              {item.emote}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
