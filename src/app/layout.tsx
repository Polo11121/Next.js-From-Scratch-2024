import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
