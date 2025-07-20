import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Providers from "./provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alumni Portal Admin Panel",
  description: "Admin Panel of Alumni Network Portal of IIITS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased mx-auto min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="flex-grow">{children}</main>
          <Toaster
            position="top-right"
            expand={true}
            richColors
            closeButton
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
