import type { Metadata } from "next";
import "./globals.css";
//import { Poppins } from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Perfect Strands",
  description: "Trend-Setting Wigs for Iconic Queens",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` scroll-smooth`}>
      <body className="font-sans bg-white antialiased">
        <WixClientContextProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-left" />
        </WixClientContextProvider>
      </body>
    </html>
  );
}