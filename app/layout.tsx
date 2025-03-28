import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import QualityWrapper from "@/app/QualityWrapper"; // New Client Component

export const metadata: Metadata = {
  title: "JMAI.PHOTOS",
  description: "Photography portfolio for Johnson Mai",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <QualityWrapper>{children}</QualityWrapper>
        <Footer />
        <div className="hidden h-128"></div>
        <div className="hidden h-144"></div>
        <div className="hidden h-160"></div>
        <div className="hidden h-192"></div>
        <div className="hidden h-256"></div>
      </body>
    </html>
  );
}
