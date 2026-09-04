"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/types";

export function LanguageDocumentSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
