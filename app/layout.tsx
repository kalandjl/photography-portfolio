import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import QualityWrapper from "@/app/QualityWrapper";
import Head from "next/head";

export const metadata: Metadata = {
  title: "JMAI.PHOTOS",
  description: "Photography portfolio for Johnson Mai",
  icons: {
    icon: "/whiteicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="The Rock" />
        <meta property="og:url" content="https://www.jmai.photos" />
        <meta property="og:image" content="https://www.jmai.photos/whiteicon.png" />
      </Head>
      <body className="overflow-x-hidden">
        <QualityWrapper>{children}</QualityWrapper>
        <Footer />
      </body>
    </html>
  );
}
