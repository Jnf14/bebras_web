"use client";

import useDownloadZip from "@/app/hooks/useDownloadZip";
import Button from "../Button";

interface TaskDownloadProps {
  taskId: string;
  htmlContent: string;
  mdContent: string;
  texContent: string;
}

export default function TaskDownload({
  taskId,
  htmlContent,
  mdContent,
  texContent,
}: TaskDownloadProps) {
  const downloadZip = useDownloadZip(
    taskId,
    htmlContent,
    mdContent,
    texContent
  );

  return (
    <div className="">
      <Button label="Download ZIP" onClick={downloadZip} />
    </div>
  );
}
