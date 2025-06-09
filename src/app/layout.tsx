import type { Metadata } from "next";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Geist, Geist_Mono,Domine,Libre_Caslon_Display, Inter } from "next/font/google";
import "./globals.css";
// import GlobalBackground from "../components/GlobalBackground";
import { palmore } from "../fonts/palmore";
import { milkHoney } from "../fonts/milkHoney";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caslon = Libre_Caslon_Display({ subsets: ["latin"], variable: "--font-caslon",weight: "400" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const domine = Domine({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-domine", 
});
export const metadata: Metadata = {
  title: "Agathe Lejour – Portfolio",
  description: "Développeuse Web & Mobile Fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`h-full bg-pink-200 ${geistSans.variable} ${geistMono.variable} ${domine.variable} ${palmore.variable} ${milkHoney.variable}${inter.variable} ${caslon.variable}`}>
        <div className="h-full flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

