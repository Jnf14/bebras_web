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
      iframe.style.height = `${newHeight}px`;
      iframe.height = `${newHeight}px`;
      iframe.style.visibility = "visible";
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.contentWindow?.addEventListener("DOMContentLoaded", function (e) {
        resizeIFrameHandler();
      });

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
        iframe.contentWindow?.removeEventListener(
          "resize",
          resizeIFrameHandler
        );
      };
    }
  }, []);

  return (
    <div className="">
      <iframe
        ref={iframeRef}
        id="htmlFrame"
        srcDoc={htmlText}
        style={{
          visibility: "hidden",
          width: "100%",
          height: "900px",
        }}
      />
    </div>
  );
}
