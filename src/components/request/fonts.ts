import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";

// Fonts for the "Request" UI. Exposed as CSS variables consumed by request.css.
export const rqHead = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--rq-head",
  display: "swap",
});

export const rqSans = DM_Sans({
  subsets: ["latin"],
  variable: "--rq-sans",
  display: "swap",
});

export const rqMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--rq-mono",
  display: "swap",
});

export const rqFontClasses = `${rqHead.variable} ${rqSans.variable} ${rqMono.variable}`;
