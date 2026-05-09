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
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#1a1a2e" }}>
        <div style={{
          maxWidth: "430px",
          minHeight: "100vh",
          margin: "0 auto",
          background: "#F4F2EF",
          position: "relative",
          boxShadow: "0 0 60px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
