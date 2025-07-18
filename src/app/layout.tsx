// app/layout.tsx
import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
// import SmoothScroll from "@/components/animations/SmoothScroll";
import PageTransitionProvider from "@/components/animations/PageTransition"
import "./globals.css";

import { Geist, Geist_Mono, Domine, Libre_Caslon_Display, Inter,EB_Garamond } from "next/font/google";
import { palmore } from "../fonts/palmore";
import { milkHoney } from "../fonts/milkHoney";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caslon = Libre_Caslon_Display({ subsets: ["latin"], variable: "--font-caslon", weight: "400" });
const domine = Domine({ subsets: ["latin"], weight: "400", variable: "--font-domine" });
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400"], 
});
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}
export const metadata: Metadata = {
  title: "Agathe Lejour – Portfolio",
  description: "Développeuse front-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full ">
      <body
        className={`min-h-screen flex flex-col bg-beige 
        ${geistSans.variable} ${geistMono.variable} ${domine.variable} 
        ${palmore.variable} ${milkHoney.variable} ${inter.variable} ${caslon.variable} ${ebGaramond.variable}`}
      >
    <PageTransitionProvider>
        <Header />
       <main className="flex-1">
              {children}
        </main>
        <Footer />
        </PageTransitionProvider>
      </body>
       
    </html>
  );
}
