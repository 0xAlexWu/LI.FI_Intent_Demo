import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intent Checkout Demo",
  description: "A lightweight LI.FI Intents education demo from routes to outcomes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
