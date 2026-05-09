import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Sathi — Your Pet's Trusted Companion",
  description: "India's most caring pet app. Track vaccines, nutrition, vet visits and more — all in one place.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
