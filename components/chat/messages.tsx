import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";

function AILogo() {
  return (
    <div className="w-9 h-9">
     <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 py-1 justify-start gap-[5px]"
    >
      <div className="w-9 flex items-end">{<AILogo />}</div>
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
    <div className="empty-message">
      <div className="scrolling-text">
        Submit your sacred inquiries below.
      </div>
      <style>
        {`
          @keyframes scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 100px; }
          }
          
          @keyframes scrollText {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .scrolling-text {
            display: inline-block;
            white-space: nowrap;
            animation: scrollText 1s ease-out;
          }
        `}
      </style>
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
