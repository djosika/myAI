import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, FileStack, FileSearch, Scan, AlertCircle } from "lucide-react";
import { LoadingIndicator, IndicatorIconType } from "@/types";

// Boot-up sequence messages
const bootMessages = [
  "[✓] Machine-Spirit Activation Protocol...",
  "[✓] Data-Wafers Loaded...",
  "[✓] Noospheric Link Established...",
  "[✓] Running Cogitation Subroutines...",
];

export function Pill({
  status,
  icon,
  isError,
  isDone,
}: {
  status: string;
  icon: IndicatorIconType;
  isError: boolean;
  isDone: boolean;
}) {
  return (
    <motion.div
      className={`flex flex-row gap-2 items-center font-mono text-sm ${
        isDone ? "text-green-400" : "text-green-600 animate-pulse"
      } ${isError ? "text-red-500" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {icon === "thinking" && <Brain className="w-4 h-4 animate-pulse" />}
      {icon === "searching" && <FileSearch className="w-4 h-4 animate-pulse" />}
      {icon === "understanding" && <Scan className="w-4 h-4 animate-pulse" />}
      {icon === "documents" && <FileStack className="w-4 h-4 animate-pulse" />}
      {icon === "error" && (
        <AlertCircle className="w-4 h-4 animate-pulse text-red-500" />
      )}

      <p className="tracking-wider">
        {icon === "thinking" && "[+] Cogitation-Rite Initiated..."}
        {icon === "searching" && "[~] Scanning Lexicanum..."}
        {icon === "understanding" && "[#] Deciphering Data-Wafers..."}
        {icon === "documents" && "[>] Noospheric Link Established..."}
        {icon === "error" && "[!] Error: Machine-Spirit Corruption Detected!"}
      </p>
    </motion.div>
  );
}

export default function Loading({
  indicatorState,
}: {
  indicatorState: LoadingIndicator[];
}) {
  const [bootUpComplete, setBootUpComplete] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setBootUpComplete(true), 1000);
    }
  }, [currentIndex]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="py-1 max-w-[60%] transition-shadow duration-300 text-green-400 font-mono"
    >
      {!bootUpComplete ? (
        <div className="text-green-400 animate-fade-in">
          {displayedMessages.map((msg, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {msg}
            </motion.p>
          ))}
        </div>
      ) : (
        indicatorState.map((indicator, index) => (
          <Pill
            key={indicator.status}
            status={indicator.status}
            icon={indicator.icon}
            isError={indicator.icon === "error"}
            isDone={index !== indicatorState.length - 1}
          />
        ))
      )}
    </motion.div>
  );
}
