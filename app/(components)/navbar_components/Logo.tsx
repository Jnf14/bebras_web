"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/tasks")}
      alt="Logo"
      className="hidden md:block cursor-pointer select-none "
      height="50"
      width="150"
      src="/images/bebras_CH.png"
    />
  );
};

export default Logo;
