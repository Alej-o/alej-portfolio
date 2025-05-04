import type { Metadata } from "next";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-orange-50 text-zinc-900">
        <Header />
        <main className="min-h-[80vh] px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

