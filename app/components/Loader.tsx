"use client";

import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <ClipLoader size={50} />
    </div>
  );
}
