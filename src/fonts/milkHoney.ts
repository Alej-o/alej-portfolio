// src/fonts/milkHoney.ts
import localFont from "next/font/local";

export const milkHoney = localFont({
  variable: "--font-milk-honey",    
  src: [
    {
      path: "./MilkHoney.otf",       
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});
