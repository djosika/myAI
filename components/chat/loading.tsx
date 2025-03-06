import { LoadingIndicator, IndicatorIconType } from "@/types";
import { motion } from "framer-motion";
import { Brain, FileStack, FileSearch, Scan, AlertCircle } from "lucide-react";

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
    <div
      className={`flex flex-row gap-2 items-center font-mono text-sm ${
        isDone ? "text-green-400" : "text-green-600 animate-pulse"
      } ${isError ? "text-red-500" : ""}`}
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
    </div>
  );
}

export default function Loading({
  indicatorState,
}: {
  indicatorState: LoadingIndicator[];
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="py-1 max-w-[60%] transition-shadow duration-300"
    >
      {indicatorState.map((indicator, index) => {
        return (
          <Pill
            key={indicator.status}
            status={indicator.status}
            icon={indicator.icon}
            isError={indicator.icon === "error"}
            isDone={index !== indicatorState.length - 1}
          />
        );
      })}
    </motion.div>
  );
}
