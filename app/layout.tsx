import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Shopping, Elevated",
  description:
    "Discover curated collections of premium products. Shop the latest trends with free shipping on orders over $75.",
  keywords: ["shop", "ecommerce", "fashion", "lifestyle", "premium"],
  openGraph: {
    title: "Lumière — Modern Shopping, Elevated",
    description: "Discover curated collections of premium products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#f5f5f5] text-[#1a1a2e] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}