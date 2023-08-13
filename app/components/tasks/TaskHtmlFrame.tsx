"use client";

// import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";

// Props type for HtmlFrame
type HtmlFrameProps = { htmlText: string };

export default function TaskHtmlFrame({ htmlText }: HtmlFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const resizeIFrameHandler = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const newHeight = iframe.contentWindow.document.body.scrollHeight + 40;
      iframe.height = `${newHeight}px`;
      iframe.style.visibility = "visible";
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.contentWindow?.addEventListener("load", resizeIFrameHandler, true);
      iframe.contentWindow?.addEventListener(
        "resize",
        resizeIFrameHandler,
        true
      );

      // Call the resize handler once after attaching the load event listener
      resizeIFrameHandler();

      return () => {
        iframe.contentWindow?.removeEventListener("load", resizeIFrameHandler);
        iframe.contentWindow?.removeEventListener("load", resizeIFrameHandler);
      };
    }
  }, []);

  return (
    <div className=" embed">
      <iframe
        ref={iframeRef}
        id="htmlFrame"
        srcDoc={htmlText}
        style={{ width: "100%", overflow: "auto", visibility: "hidden" }}
        scrolling="no"
      />
    </div>
  );
}
