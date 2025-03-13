import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";

export const AILogo = () => (
  <div className="relative w-12 h-12">
    <Image src="/ai-logo.png" alt={AI_NAME} width={60} height={60} />
    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500"></div>
  </div>
);

export default function ChatHeader({ clearMessages }: { clearMessages: () => void }) {
  return (
    <div className="fixed top-0 w-full z-10 bg-white shadow-md p-4 sm:p-4 flex flex-col items-center justify-center">
      
      {/* AI Logo & Header Text - Centered */}
      <div className="flex flex-col items-center gap-2">
        <AILogo />
        <p className="text-center">{CHAT_HEADER}</p>
      </div>

      {/* Button Section - Centered Below */}
      <div className="mt-2">
        <Button
  onClick={clearMessages}
  className="gap-2 shadow-sm whitespace-nowrap px-6 py-3 sm:px-4 sm:py-2"
  variant="outline"
  size="lg"
>
  <EraserIcon className="w-4 h-4 sm:w-3 sm:h-3" />
  <span>{CLEAR_BUTTON_TEXT}</span>
        </Button>
      </div>

    </div>
  );
}
