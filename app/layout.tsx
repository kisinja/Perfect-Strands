import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import { Toaster } from "@/components/ui/sonner";
// Import your chat widget
import ChatWidget from "@/components/ChatWidget";
import FeatureIntroModal from "@/components/FeatureIntroModal";


export const metadata: Metadata = {
  title: "Perfect Strands",
  description: "Trend-Setting Wigs for Iconic Queens",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased relative">
        <WixClientContextProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          {/* Chat Widget - fixed on all pages */}
          <ChatWidget />

          <FeatureIntroModal />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#e60a95",
                border: "1px solid #f5c2e7",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                fontFamily: "Poppins, sans-serif",
                borderRadius: "1rem",
              },
              classNames: {
                toast: "transition duration-300 hover:scale-[1.02]",
                description: "text-sm text-gray-700",
                actionButton:
                  "bg-[#D4AF37] hover:bg-[#c59e2f] text-white px-3 py-1 rounded-full text-xs uppercase",
                cancelButton: "text-[lightpink] text-xs",
              },
            }}
          />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
