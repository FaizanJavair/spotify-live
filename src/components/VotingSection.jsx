import { useState, useEffect } from "react";
import { Check, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const VOTING_OPTIONS = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    votes: 45,
    color: "bg-purple-500",
    gradient: "from-purple-600 to-indigo-900",
  },
  {
    id: 2,
    title: "Starboy",
    artist: "The Weeknd",
    votes: 32,
    color: "bg-blue-500",
    gradient: "from-blue-600 to-cyan-900",
  },
  {
    id: 3,
    title: "Get Lucky",
    artist: "Daft Punk",
    votes: 18,
    color: "bg-orange-500",
    gradient: "from-orange-600 to-red-900",
  },
];

export function VotingSection() {
  const [options, setOptions] = useState(VOTING_OPTIONS);
  const [userVote, setUserVote] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Simulate live votes coming in from others
  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setOptions((prev) =>
        prev.map((opt) => ({
          ...opt,
          // Randomly add a vote to a random option occasionally
          votes: opt.votes + (Math.random() > 0.7 ? 1 : 0),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleVote = (id) => {
    if (userVote) return; // Prevent double voting
    setUserVote(id);
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
  };

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="flex flex-col h-full bg-[#121212] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            Next Track
            <TrendingUp className="w-4 h-4 text-[#1DB954]" />
          </h3>
          <p className="text-[#b3b3b3] text-xs">Vote for what plays next</p>
        </div>
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
            timeLeft < 10
              ? "bg-red-900/20 border-red-500/50"
              : "bg-[#282828] border-transparent"
          }`}
        >
          <Clock
            className={`w-3 h-3 ${
              timeLeft < 10 ? "text-red-500" : "text-[#1DB954]"
            }`}
          />
          <span
            className={`font-mono font-bold text-sm ${
              timeLeft < 10 ? "text-red-500" : "text-[#1DB954]"
            }`}
          >
            00:{timeLeft.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = userVote === option.id;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!!userVote || timeLeft === 0}
              whileTap={!userVote && timeLeft > 0 ? { scale: 0.98 } : {}}
              className={`
                relative overflow-hidden w-full text-left p-3 rounded-lg border transition-all group
                ${
                  isSelected
                    ? "border-[#1DB954] bg-[#1DB954]/10"
                    : "border-[#282828] bg-[#181818] hover:bg-[#282828]"
                }
                ${!!userVote && !isSelected ? "opacity-50 grayscale" : ""}
              `}
            >
              {/* Progress Bar Background (Only shown after voting) */}
              {(userVote || timeLeft === 0) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-full ${option.color} opacity-20 z-0`}
                />
              )}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Album Art Placeholder */}
                  <div
                    className={`w-10 h-10 rounded bg-gradient-to-br ${option.gradient} shrink-0 shadow-lg`}
                  />

                  <div>
                    <div
                      className={`font-bold text-sm ${
                        isSelected ? "text-[#1DB954]" : "text-white"
                      }`}
                    >
                      {option.title}
                    </div>
                    <div className="text-[#b3b3b3] text-xs">
                      {option.artist}
                    </div>
                  </div>
                </div>

                {userVote || timeLeft === 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">
                      {Math.round(percentage)}%
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#1DB954]" />}
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-[#b3b3b3] group-hover:border-white group-hover:scale-110 transition-all" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-[#b3b3b3] text-xs">
          {timeLeft === 0
            ? "Voting closed. Results coming up."
            : userVote
            ? "Waiting for results..."
            : "Cast your vote to shape the stream!"}
        </p>
      </div>
    </div>
  );
}
