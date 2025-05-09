// src/fonts/palmore.ts
import localFont from "next/font/local";

export const palmore = localFont({
  variable: "--font-palmore",
  src: [
    {
      path: "./Palmore-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    
    {
      path: "./Palmore-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
