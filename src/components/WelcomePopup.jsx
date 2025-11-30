import { useState, useEffect } from "react";
import {
  X,
  Music,
  Heart,
  MessageSquare,
  VenetianMask,
  Vote,
  Radio,
  Maximize2,
  Check,
} from "lucide-react";
import { motion } from "motion/react";

const INITIAL_TASKS = [
  { icon: Music, text: "Play a Live Stream Music", completed: false },
  { icon: Heart, text: "Like a Song in the Queue", completed: false },
  { icon: MessageSquare, text: "Send a message in Chat", completed: false },
  { icon: VenetianMask, text: "Send an anonymous message", completed: false },
  { icon: Vote, text: "Vote for the next track", completed: false },
  { icon: Radio, text: "Change the live stream channel", completed: false },
  { icon: Maximize2, text: "Expand the live view", completed: false },
];

export function WelcomePopup({ onClose }) {
  // Initialize state from localStorage if available
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("spotify_live_tasks");
      if (saved) {
        const parsed = JSON.parse(saved);
        // We merge with INITIAL_TASKS to ensure we have the Icons (which can't be stored in JSON)
        // and only restore the 'completed' status.
        return INITIAL_TASKS.map((task, index) => ({
          ...task,
          completed: parsed[index]?.completed ?? false,
        }));
      }
    } catch (e) {
      console.error("Failed to load tasks from local storage", e);
    }
    return INITIAL_TASKS;
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("spotify_live_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#181818] border border-[#282828] rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-black mb-2">
            Welcome to Live!
          </h2>
          <p className="text-black/80 font-medium">
            Experience music together in real-time.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-white/70 mb-4 text-sm">
            Ready to jump in? Tap tasks to mark them complete:
          </p>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <button
                key={index}
                onClick={() => toggleTask(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all group text-left
                  ${
                    task.completed
                      ? "bg-[#1DB954]/10 border-[#1DB954]/50"
                      : "bg-[#282828]/50 border-transparent hover:bg-[#282828]"
                  }
                `}
              >
                <div
                  className={`p-2 rounded-full transition-all ${
                    task.completed
                      ? "bg-[#1DB954] text-black"
                      : "bg-[#1DB954]/10 text-[#1DB954] group-hover:bg-[#1DB954] group-hover:text-black"
                  }`}
                >
                  <task.icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-sm font-medium transition-colors flex-1 ${
                    task.completed
                      ? "text-white line-through opacity-70"
                      : "text-white"
                  }`}
                >
                  {task.text}
                </span>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-[#1DB954] border-[#1DB954]"
                      : "border-[#b3b3b3] group-hover:border-[#1DB954]"
                  }`}
                >
                  {task.completed && <Check className="w-3 h-3 text-black" />}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-white text-black font-bold py-3 rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            Let's Go!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
