import { Suspense } from "react";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Loading from "./loading";

const font = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bebras Web",
  description: "Web platform indexing bebras tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${font.className} flex flex-col h-full`}>
        <Navbar />
        <div className="h-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
