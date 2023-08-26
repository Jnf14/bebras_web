"use client";

import Button from "../Button";

interface TaskDownloadPdfProps {
  taskId: string;
}

export default function TaskDownloadPdf({ taskId }: TaskDownloadPdfProps) {
  const pdfPath = `./pdfs/${taskId}`;
  return (
    <div className="w-[50px]">
      <a href={pdfPath} download={`${taskId}.pdf`}>
        <Button small label="PDF" />
      </a>
    </div>
  );
}
