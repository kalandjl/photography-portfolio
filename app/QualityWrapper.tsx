"use client";

import { useEffect, useState } from "react";
import { doQualityCheck } from "@/lib/service/quality";

export default function QualityWrapper({ children }: { children: React.ReactNode }) {
  let [qualityCheck, setQualityCheck] = useState<boolean>(true);

  useEffect(() => {
    const doAsync = async () => {
      setQualityCheck(await doQualityCheck("/"));
    };
    doAsync();
  }, []);

  return <>{qualityCheck ? children : null}</>;
}