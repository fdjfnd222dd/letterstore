import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import BackgroundCrosshair from "@/components/BackgroundCrosshair";
import CustomCursor from "@/components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Letter Store",
  description: "Letter Store. New NYC. Richmond, VA.",
  openGraph: {
    title: "Letter Store",
    description: "New NYC. Richmond, VA.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letter Store",
    description: "New NYC. Richmond, VA.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmMono.variable}`}>
      <body>
        <CartProvider>
          {/* Global background elements */}
          <BackgroundCrosshair />
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
