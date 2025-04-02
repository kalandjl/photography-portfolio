import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import QualityWrapper from "@/app/QualityWrapper";

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
      </body>
    </html>
  );
}
