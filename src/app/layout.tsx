import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA Pro X1 — Premium Wireless Headphones",
  description:
    "Experience studio-grade sound with adaptive noise cancellation, 40-hour battery life, and cinematic design. AURA Pro X1 headphones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&f[]=cabinet-grotesk@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5]">{children}</body>
    </html>
  );
}
