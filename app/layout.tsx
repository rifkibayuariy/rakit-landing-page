import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html lang="id" className="bg-neutral-950 text-neutral-50 antialiased">
      <body className={urbanist.className}>
        <SmoothScroll>{children}</SmoothScroll>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
