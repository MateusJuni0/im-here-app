import type { Metadata } from "next";
import { ConciergeProvider } from "@/components/ConciergeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Im Here | Nocturnal Gold",
  description: "Elite Travel Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-gold/30">
        <ConciergeProvider>
          {children}
        </ConciergeProvider>
      </body>
    </html>
  );
}