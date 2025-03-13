import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";

export const AILogo = () => (
  <div className="relative w-12 h-12">
    <Image src="/ai-logo.PNG" alt={AI_NAME} width={60} height={60} />
    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500"></div>
  </div>
);

export default function ChatHeader({ clearMessages }: { clearMessages: () => void }) {
  return (
    <div className="fixed top-0 w-full z-10 flex justify-center items-center p-5 bg-white shadow-[0_10px_15px_-3px_rgba(255,255,255,1)]">
      <div className="flex w-full">
        {/* Left spacing block */}
        <div className="flex-0 w-auto"></div>

        {/* Center section with AI logo and header text */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>

        {/* Right section with button */}
        <div className="flex-0 w-auto flex justify-end items-center">
          <Button
            onClick={clearMessages}
            className="gap-2 shadow-sm whitespace-nowrap px-6 py-3"
            variant="outline"
            size="lg"
          >
            <EraserIcon className="w-4 h-4" />
            <span>{CLEAR_BUTTON_TEXT}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
