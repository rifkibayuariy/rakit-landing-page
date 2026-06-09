import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rakit | Digital Business & Custom IoT",
  description: "Jasa custom project microcontroller, IoT, dan 3D Printing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="bg-neutral-950 text-neutral-50 antialiased">
      <body className={urbanist.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
