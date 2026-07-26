import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  weight: ['200', '300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "SkillSwap",
  description: "Swap your skills with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
