"use client";

// import { useEffect, useState } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useEffect, useRef, useState } from "react";

// Props type for HtmlFrame
type HtmlInnerSetProps = { htmlText: string };

export default function TaskHtmlInnerSet({ htmlText }: HtmlInnerSetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const styleElements = containerRef.current.querySelectorAll("style");
      styleElements.forEach((styleElement) => {
        const cssContent = styleElement.innerHTML;
        const newStyle = document.createElement("style");
        newStyle.innerHTML = cssContent;
        containerRef.current?.appendChild(newStyle);
        styleElement.parentNode?.removeChild(styleElement);
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}
