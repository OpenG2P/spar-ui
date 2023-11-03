import Favicon from "/public/img/favicon.ico";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Social Payments Account Registry",
  description: "SPAR ID Account Mapper",
  icons: [{rel: "icon", url: Favicon.src}],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
