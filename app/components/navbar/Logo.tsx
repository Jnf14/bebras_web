"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer select-none "
      height="30"
      width="100"
      src="/images/bebras_logo.png"
    />
  );
};

export default Logo;
