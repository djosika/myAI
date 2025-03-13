import { CitationCircle } from "@/components/chat/citation";
import { Citation } from "@/types";
import React from "react";

/**
 * Processes text to render citations inline without breaking paragraph formatting.
 *
 * @param children The content in which citations are to be rendered.
 * @param citations The list of citations available.
 * @returns The formatted text with inline citations.
 */
export function renderCitations(
  children: React.ReactNode | string,
  citations: Citation[]
): React.ReactNode {
  const matchRegex = /(\[\d+\])/g; // Matches citations like [1], [2]

  const processString = (text: string) => {
    const parts = text.split(matchRegex);
    return parts.map((part, index) => {
      const match = part.match(matchRegex);
      if (match) {
        const number = parseInt(part.replace(/[\[\]]/g, ""), 10);
        return (
          <span key={index} className="citation">
            <CitationCircle number={number} citation={citations[number - 1]} />
          </span>
        );
      }
      return part;
    });
  };

  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return processString(node);
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>{processChildren(child)}</React.Fragment>
      ));
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        ...node.props,
        children: processChildren(node.props.children),
      });
    }

    return node;
  };

  return <>{processChildren(children)}</>;
}
