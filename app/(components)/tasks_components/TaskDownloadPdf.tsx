"use client";

import Button from "../Button";
import { GrDocumentPdf } from "react-icons/gr";

interface TaskDownloadPdfProps {
  taskId: string;
}

export default function TaskDownloadPdf({ taskId }: TaskDownloadPdfProps) {
  const pdfPath = `./pdfFiles/${taskId}.task.pdf`;

  return (
    <div className="">
      <a href={pdfPath} download={`${taskId}.pdf`}>
        <Button label="" icon={GrDocumentPdf} iconSize="20" />
      </a>
    </div>
  );
}
