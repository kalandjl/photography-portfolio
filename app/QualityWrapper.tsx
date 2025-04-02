"use client"
import { use, useEffect, useState } from "react";
import { doQualityCheck } from "@/lib/service/quality";

export default function QualityWrapper({ children }: { children: React.ReactNode }) {
  const [qualityCheck, setQualityCheck] = useState<boolean>(true);
  const [devToolsDetected, setDevToolsDetected] = useState(false);

  useEffect(() => {
    const doAsync = async () => {
      setQualityCheck(await doQualityCheck("/"));
    };
    doAsync();
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
      const checkDevTools = () => {
        const threshold = 50;
        const start = performance.now();
        debugger;
        const duration = performance.now() - start;

        console.log(duration)
        
        if (duration > threshold) {
          console.warn("use client");
          setDevToolsDetected(true);
        }
      };

      const handleResizeOrBlur = () => {

        if (
          window.outerWidth - window.innerWidth > 100 ||
          window.outerHeight - window.innerHeight > 100
        ) {
          console.warn("use client");
          setDevToolsDetected(true);
        }
      };
      
      window.addEventListener("resize", handleResizeOrBlur);
      window.addEventListener("blur", handleResizeOrBlur);
      checkDevTools();

      return () => {
        window.removeEventListener("resize", handleResizeOrBlur);
        window.removeEventListener("blur", handleResizeOrBlur);
      };
    }
  }, []);

  useEffect(() => {}, [devToolsDetected])

  return <>{qualityCheck && !devToolsDetected ? children : null}</>;
}