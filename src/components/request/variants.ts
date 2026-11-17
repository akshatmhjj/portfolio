"use client";

import { useEffect, useState } from "react";

/**
 * Reads a `?key=value` URL parameter after mount so the design variants can be compared
 * live (for example `/?hero=2` or `/work?work=3`). Temporary: remove once a variant is chosen.
 */
export function useQueryVariant(key: string, fallback: string): string {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(key);
    if (v) setValue(v);
  }, [key]);
  return value;
}
