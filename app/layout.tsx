import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import SideBar from "./components/sidebar/SideBar";

const font = Inter({
  weight: "400",
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
      <body className={font.className}>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
