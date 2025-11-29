import { useState, useRef, useEffect } from "react";
import { User, Send, Plus, Gift, Smile, EyeOff } from "lucide-react";

// Mock Chat Data
const INITIAL_MESSAGES = [
  {
    id: 1,
    user: "MusicLover99",
    text: "This beat is insane! 🔥",
    color: "text-green-400",
  },
  { id: 2, user: "Anonymous", text: "Vibes ✨", isAnonymous: true },
  {
    id: 3,
    user: "JazzCat",
    text: "Can we get some sax solo next?",
    color: "text-purple-400",
  },
  {
    id: 4,
    user: "SynthWave",
    text: "Love the retro feel.",
    color: "text-blue-400",
  },
];

const BOT_MESSAGES = [
  "Totally agree!",
  "Anyone know this artist?",
  "This is going straight to my playlist.",
  "🔥🔥🔥",
  "Drop the bass!",
  "Hello from Brazil! 🇧🇷",
];

const BOT_NAMES = [
  "PixelPunk",
  "RetroGirl",
  "BassHead",
  "Anonymous",
  "TechnoKing",
];

export function ChatSection({ emotes, onEmoteClick, onMessageReceived }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    // Add User Message
    const newMessage = {
      id: Date.now(),
      user: isAnonymous ? "Anonymous" : "You",
      text: chatInput,
      color: isAnonymous ? "text-gray-400" : "text-[#1DB954]", // Gray if anon, Green if You
      isAnonymous: isAnonymous,
      isMe: true, // Flag to identify user's own messages
    };

    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    // Simulate "Live" Activity (Bot response)
    setTimeout(() => {
      const randomUser =
        BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
      const randomText =
        BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];

      const botMsg = {
        id: Date.now() + 1,
        user: randomUser,
        text: randomText,
        isAnonymous: randomUser === "Anonymous",
        color: randomUser === "Anonymous" ? "text-gray-400" : "text-pink-400",
      };

      setMessages((prev) => [...prev, botMsg]);

      // Notify parent about new message (for notification dot)
      if (onMessageReceived) {
        onMessageReceived();
      }
    }, 1500 + Math.random() * 2000);
  };

  // Allow clicking emotes to add to input
  const handleEmoteClickInternal = (emote) => {
    onEmoteClick(emote); // Trigger animation in parent
    setChatInput((prev) => prev + emote); // Add to input
  };

  return (
    <div className="flex flex-col h-full bg-[#121212]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        <div className="flex flex-col justify-end min-h-full space-y-4 pt-4">
          {messages.map((msg) => {
            // Check if message is from current user
            const isMe = msg.isMe || msg.user === "You";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  isMe ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center shrink-0 mt-0.5">
                  {msg.isAnonymous ? (
                    <User className="w-4 h-4 text-gray-400" />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {msg.user.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold mb-0.5 ${
                      msg.color || "text-white"
                    }`}
                  >
                    {msg.user}
                  </span>
                  <div
                    className={`text-sm leading-relaxed max-w-[240px] break-words ${
                      isMe
                        ? "bg-[#282828] text-white px-3 py-2 rounded-2xl rounded-tr-none"
                        : "text-white/90"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-4 bg-[#181818] border-t border-[#282828] flex flex-col gap-3">
        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="relative group">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={
              isAnonymous ? "Chatting anonymously..." : "Say something..."
            }
            className="w-full bg-[#2a2a2a] text-white text-sm rounded-lg py-3 pl-4 pr-10 outline-none focus:ring-1 focus:ring-[#1DB954] focus:bg-[#333] transition-all placeholder-[#b3b3b3]"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#b3b3b3] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Tools & Quick Emotes */}
        <div className="flex items-center gap-2">
          {/* Action Icons */}
          <div className="flex items-center gap-1 shrink-0 text-[#b3b3b3]">
            <button
              className="p-2 hover:bg-[#2a2a2a] hover:text-white rounded-full transition-colors"
              title="Add"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-[#2a2a2a] hover:text-white rounded-full transition-colors"
              title="GIF"
            >
              <Gift className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-[#2a2a2a] hover:text-white rounded-full transition-colors"
              title="Emotes"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-[#333] shrink-0 mx-1" />

          {/* Anonymous Toggle */}
          <label
            className="flex items-center gap-2 cursor-pointer relative group shrink-0"
            title="Toggle Anonymous Mode"
          >
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#3E3E3E] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#1DB954] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1DB954]"></div>
            <EyeOff
              className={`w-4 h-4 transition-colors ${
                isAnonymous ? "text-[#1DB954]" : "text-[#b3b3b3]"
              }`}
            />
          </label>

          <div className="w-[1px] h-6 bg-[#333] shrink-0 mx-1" />

          {/* Quick Emotes Chips */}
          <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-gradient-right">
            {emotes.map((emote) => (
              <button
                key={emote}
                onClick={() => handleEmoteClickInternal(emote)}
                className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3e3e3e] rounded-full text-sm transition-colors cursor-pointer select-none whitespace-nowrap"
              >
                {emote}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
