import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Formatting } from "./formatting";
import { LoadingIndicator } from "@/types";
import Loading from "./loading";
import { AI_NAME } from "@/configuration/identity";

function AILogo() {
  return (
    <div className="w-14 h-14"> {/* Increases size */}
      <Image src="/ai-logo.png" alt={AI_NAME} width={56} height={56} className="rounded-lg" />
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
    <div className="flex flex-col flex-1 p-1 gap-3 justify-center items-center">
      <p className="text-gray-500">Ask a question to start the conversation</p>
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
