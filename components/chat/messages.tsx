import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";

function AILogo() {
  return (
    <div className="w-9 h-9 border border-red-500 bg-blue-500 flex items-center justify-center">
      {console.log("Rendering AILogo")}
      {/* Replacing Next.js <Image> with <img> to test */}
      <img src="/ai-logo.png" alt={AI_NAME} width="48" height="48" onError={(e) => console.error("Image failed to load", e)} />
    </div>
  );
}

function UserMessage({ message }: { message: DisplayMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 py-1 justify-end"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="user-message"
      >
        {message.content}
      </motion.div>
    </motion.div>
  );
}

function AssistantMessage({ message }: { message: DisplayMessage }) {
  console.log("Rendering AssistantMessage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 py-1 justify-start items-center gap-3"
    >
      {console.log("Calling AILogo inside AssistantMessage")}
      <AILogo />
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="ai-message"
      >
        <Formatting message={message} />
      </motion.div>
    </motion.div>
  );
}

function EmptyMessages() {
  return (
    <div 
      className="empty-messages absolute top-17 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#080808] border-4 border-[#333] text-[#33ff33] font-['OCR-A',_monospace] text-lg rounded-lg shadow-lg whitespace-nowrap overflow-hidden"
      style={{
        boxShadow: "inset 0 0 5px rgba(0, 255, 0, 0.3), 0 0 10px rgba(51, 255, 51, 0.5), 0 0 20px rgba(0, 0, 0, 0.8)",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum.png')",
        backgroundBlendMode: "multiply",
        position: "relative"
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: "repeating-linear-gradient(transparent, rgba(0, 255, 0, 0.03) 2px, transparent 4px)",
          animation: "scanlines 5s linear infinite",
          pointerEvents: "none"
        }}
      ></div>
      <div className="scrolling-text">
        Submit your sacred inquiries below.
      </div>
    </div>
  );
}

export default function ChatMessages({
  messages,
  indicatorState,
}: {
  messages: DisplayMessage[];
  indicatorState: LoadingIndicator[];
}) {
  const showLoading =
    indicatorState.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 p-1 gap-3"
    >
      <div className="h-[60px]"></div>
      {messages.length === 0 ? (
        <EmptyMessages />
      ) : (
        messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {message.role === "user" ? (
              <UserMessage message={message} />
            ) : (
              <AssistantMessage message={message} />
            )}
          </motion.div>
        ))
      )}
      {showLoading && <Loading indicatorState={indicatorState} />}
      <div className="h-[225px]"></div>
    </motion.div>
  );
}
