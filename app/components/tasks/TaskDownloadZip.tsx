"use client";

import useDownloadZip from "@/app/hooks/useDownloadZip";
import Button from "../Button";

interface TaskDownloadZipProps {
  taskId: string;
  htmlContent: string;
  mdContent: string;
  texContent: string;
}

export default function TaskDownloadZip({
  taskId,
  htmlContent,
  mdContent,
  texContent,
}: TaskDownloadZipProps) {
  const downloadZip = useDownloadZip(
    taskId,
    htmlContent,
    mdContent,
    texContent
  );

  return (
    <div className="w-[50px]">
      <Button small label="ZIP" onClick={downloadZip} />
    </div>
  );
}
