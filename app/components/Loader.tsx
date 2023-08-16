"use client";

import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center m-36">
      <PuffLoader size={75} />
    </div>
  );
}
