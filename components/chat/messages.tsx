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
    <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-black border border-green-600 text-green-400 font-mono text-lg rounded-md shadow-lg">
      [ Awaiting input... Please engage in the Omnissiah's wisdom. ]
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
