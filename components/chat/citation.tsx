"use client";

import { useState } from "react";
import { Citation } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
import { EMPTY_CITATION_MESSAGE } from "@/configuration/ui";

export function CitationCircle({
  number,
  citation,
}: {
  number: number;
  citation: Citation;
}) {
  const [open, setOpen] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const hasSourceUrl = isValidUrl(citation.source_url);
  const hasSourceDescription = citation.source_description.trim() !== "";

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <span className="citation" onClick={() => setOpen(true)}>
          <span>{number}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent
        className="tooltip-content"
        side="top" /* Ensures tooltip appears above citation */
        align="center"
        sideOffset={5} /* Prevents tooltip from overlapping text */
      >
        <div className="bg-white p-2 rounded-md shadow-sm flex flex-col justify-center border border-gray-200 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <p className="text-sm">
            {hasSourceUrl ? (
              <Link
                href={citation.source_url}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {citation.source_description}
              </Link>
            ) : (
              hasSourceDescription || EMPTY_CITATION_MESSAGE
            )}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
