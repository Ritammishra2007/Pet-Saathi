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
      <body style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#0f0f1a", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', sans-serif" }}>
        <div style={{
          maxWidth: "430px",
          minHeight: "100vh",
          margin: "0 auto",
          background: "linear-gradient(160deg, #E8D5C4 0%, #D9CFF5 40%, #C8E4F8 70%, #C8EDD8 100%)",
          position: "relative",
          boxShadow: "0 0 80px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
