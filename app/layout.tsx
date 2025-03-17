"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import { doQualityCheck } from "@/lib/service/quality";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    let [qualityCheck, setQualityCheck] = useState<boolean>(true)

    useEffect(() => {

      const doAsync = async () => {
        setQualityCheck(await doQualityCheck("/"))
      }

      doAsync()
    }, [])

    return (
        <html lang="en">
            <body>  
                {qualityCheck ? 
                <>
                  {children}
                  <Footer />
                </>
                 : <></>
                }         
            </body>
        </html>
    );
}
