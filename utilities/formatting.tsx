import { CitationCircle } from "@/components/chat/citation";
import { Citation } from "@/types";
import React from "react";

/**
 * Preprocesses LaTeX content by replacing delimiters and escaping certain characters.
 *
 * @param content The input string containing LaTeX expressions.
 * @returns The processed string with replaced delimiters and escaped characters.
 */
export function preprocessLaTeX(content: string): string {
  const codeBlocks: string[] = [];
  content = content.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match, code) => {
    codeBlocks.push(code);
    return `<<CODE_BLOCK_${codeBlocks.length - 1}>>`;
  });

  const latexExpressions: string[] = [];
  content = content.replace(
    /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\))/g,
    (match) => {
      latexExpressions.push(match);
      return `<<LATEX_${latexExpressions.length - 1}>>`;
    }
  );

  content = content.replace(/\$(?=\d)/g, "\\$");

  content = content.replace(
    /<<LATEX_(\d+)>>/g,
    (_, index) => latexExpressions[parseInt(index)]
  );

  content = content.replace(
    /<<CODE_BLOCK_(\d+)>>/g,
    (_, index) => codeBlocks[parseInt(index)]
  );

  return content;
}

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
  const matchRegex = /(\[\d+\])/g;

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

// ✅ Ensure we only export once and without duplicates
export { preprocessLaTeX, renderCitations };
