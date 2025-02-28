"use client";

import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";

export default function Chat() {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    indicatorState,
    clearMessages,
  } = useApp();

  return (
    <div className="ai-bg h-screen flex flex-col">
      <ChatHeader clearMessages={clearMessages} />
      
      <div className="flex justify-center items-center flex-grow">
        <div className="flex-col max-w-screen-lg w-full h-full p-5 ai-container">
          <ChatMessages messages={messages} indicatorState={indicatorState} />
        </div>
      </div>
      
      <ChatInput 
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
      />
    </div>
  );
}
