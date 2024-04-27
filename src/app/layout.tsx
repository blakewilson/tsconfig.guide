import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "TSConfig Guide - Generate a modern TSConfig file from just a few toggles.",
  description:
    "TSConfig Guide enables you to generate a modern TSConfig file for your TypeScript project from just a few toggles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          "bg-slate-900 text-white min-h-screen",
          "bg-gradient-to-t to-slate-900 from-slate-950",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
