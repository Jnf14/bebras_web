"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Logo from "./Logo";
import Link from "next/link";
import { GiBeaver } from "react-icons/gi";

const navItems = [
  {
    path: "/tasks",
    name: "Exercices",
  },
  {
    path: "/about",
    name: "À propos",
  },
];

const CASTOR_INFO_URL = "https://concours.castor-informatique.ch";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const params = useSearchParams();

  return (
    <div className="h-50 w-full px-4 py-3 bg-white z-10 select-none border-b-2">
      <div className="flex flex-row items-center w-full ">
        <div>
          <Logo />
        </div>

        <div className="ml-20 w-full flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start gap-4">
            {navItems.map((item, index) => {
              const isActive = item.path === pathname;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-2 py-2 rounded-md hover:bg-neutral-100 ${
                    isActive ? "border-2 font-semibold" : "font-medium"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className=" text-cod-gray-950 text-xs font-medium flex flex-row items-center">
            <h1>
              Bibliothèque d'exercices du concours{" "}
              <a
                className="border-b-[1px] hover:bg-neutral-100"
                href={params.get("h") == "b" ? TEST : CASTOR_INFO_URL}
              >
                castor informatique
              </a>
              .
            </h1>
            {params.get("h") === "b" && <GiBeaver size={25} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export const TEST = "http://tiny.cc/hgfavz";
