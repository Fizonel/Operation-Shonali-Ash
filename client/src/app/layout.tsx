import type { Metadata } from "next";
import "./globals.css";
import "./rainbowkit.css";
import { Web3Provider } from "@/providers/Web3Provider";

export const metadata: Metadata = {
  title: "ShonaliChain - কৃষি সরবরাহ চেইন",
  description: "Transparent agricultural supply chain for Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
