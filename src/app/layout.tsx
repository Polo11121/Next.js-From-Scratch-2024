import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
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
      <AuthProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </AuthProvider>
      <ToastContainer />
    </body>
  </html>
);

export default RootLayout;
