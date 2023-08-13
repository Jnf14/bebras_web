"use client";

// import { useEffect, useState } from "react";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useEffect, useRef, useState } from "react";

// Props type for HtmlFrame
type HtmlFrameProps = { htmlText: string };

export default function TaskHtmlFrame({ htmlText }: HtmlFrameProps) {
  const [iframeHeight, setIframeHeight] = useState(0);
  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe.contentWindow?.addEventListener(
        "load",
        () => {
          iframe.width = "100%";
          iframe.height = iframe.contentWindow
            ? (iframe.contentWindow.document.body.scrollHeight + 40).toString()
            : "0";
        },
        true
      );
      iframe.contentWindow?.addEventListener(
        "resize",
        () => {
          iframe.height = iframe.contentWindow
            ? (iframe.contentWindow.document.body.scrollHeight + 40).toString()
            : "0";
        },
        true
      );
    });
  }, []);

  return (
    <div className=" embed">
      <iframe srcDoc={htmlText} style={{ width: "100%", overflow: "auto" }} />
    </div>
  );
}
