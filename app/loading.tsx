import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center m-36">
      <ClipLoader size={50} />
    </div>
  );
}
