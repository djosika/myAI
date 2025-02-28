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
      className={`flex flex-row gap-2 items-center ${
        isDone ? "text-gray-200" : "text-gray-400 animate-pulse"
      } ${isError ? "text-red-500" : ""}`}
    >
{icon === "thinking" && <Brain className="w-4 h-4 animate-pulse" />}
{icon === "searching" && <FileSearch className="w-4 h-4 animate-pulse" />}
{icon === "understanding" && <Scan className="w-4 h-4 animate-pulse" />}
{icon === "documents" && <FileStack className="w-4 h-4 animate-pulse" />}
{icon === "error" && <AlertCircle className="w-4 h-4 animate-pulse text-red-500" />}
<p>
  {icon === "thinking" && "Cogitators Engaged... Processing Data-Streams."}
  {icon === "searching" && "Scanning Noospheric Archives... Standby."}
  {icon === "understanding" && "Binary Sequences Interfacing... Divining Omnissiah’s Will."}
  {icon === "documents" && "Transcribing Data-Litanies... Collating Knowledge."}
  {icon === "error" && "+++ MALFUNCTION DETECTED +++ RITUALS OF PURIFICATION REQUIRED."}
      <p>{status}</p>
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
