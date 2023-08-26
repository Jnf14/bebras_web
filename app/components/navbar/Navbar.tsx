"use client";

import { usePathname } from "next/navigation";
import Container from "../Container";
import Logo from "./Logo";
import Link from "next/link";

const navItems = [
  {
    path: "/",
    name: "Accueil",
  },
  {
    path: "/tasks",
    name: "Tâches",
  },
  // {
  //   path: "/about",
  //   name: "À propos",
  // },
];

export default function Navbar() {
  let pathname = usePathname() || "/";

  return (
    <div className="w-full bg-white z-10 shadow-sm select-none border-b-2">
      <Container>
        <div className="flex ">
          <div>
            <Logo />
          </div>

          <div className="ml-20 flex flex-row items-center justify-start gap-4">
            {navItems.map((item, index) => {
              const isActive = item.path === pathname;
              console.log(isActive);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-2 py-2 rounded-md hover:bg-slate-200 ${
                    isActive ? "border-2 font-bold" : ""
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* <Search /> */}
        </div>
      </Container>
    </div>
  );
}
