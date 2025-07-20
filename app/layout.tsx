
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

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
          <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
