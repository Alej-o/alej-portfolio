import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import PageTransitionProvider from "@/components/animations/PageTransition";
import "./globals.css";

import { Libre_Caslon_Display, EB_Garamond } from "next/font/google";

const caslon = Libre_Caslon_Display({
  subsets: ["latin"],
  variable: "--font-caslon",
  weight: "400",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Agathe Lejour – Portfolio",
  description: "Développeuse front-end créative",
  keywords: ["Agathe Lejour", "Développeuse front-end", "creative developer", "portfolio", "web"],
  authors: [{ name: "Agathe Lejour", url: "https://agathelejour.fr" }],
  creator: "Agathe Lejour",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`min-h-screen flex flex-col bg-beige ${caslon.variable} ${ebGaramond.variable}`}
      >
        <PageTransitionProvider>
          {/* Navigation principale */}
          <Header />

          {/* Contenu principal de la page */}
          <main id="main" className="flex-1 w-full relative" role="main">
            <SmoothScroll />
            {children}
          </main>

          {/* Pied de page */}
          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
