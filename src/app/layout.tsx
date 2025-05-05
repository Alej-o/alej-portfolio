import type { Metadata } from "next";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Geist, Geist_Mono,Domine } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="fr">
  <body className={`${geistSans.variable} ${geistMono.variable} ${domine.variable} bg-orange-50 text-zinc-900 overflow-x-hidden`}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </body>
</html>

  );
}

