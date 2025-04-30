import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perfect Strands",
  description: "Trend-Setting Wigs for Iconic Queens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
