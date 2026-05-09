"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled
          ? "rgba(255,253,252,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,215,181,0.4)"
          : "none",
        boxShadow: scrolled
          ? "0 4px 24px rgba(43,29,22,0.06)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg font-black transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #FF8A1F, #FFB347)",
              boxShadow: "0 4px 12px rgba(255,138,31,0.4)",
              color: "#fff",
            }}
          >
            🐾
          </div>
          <span
            className="text-xl font-black"
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: "#2B1D16",
              letterSpacing: "-0.3px",
            }}
          >
            Pet <span style={{ color: "#FF8A1F" }}>Sathi</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Community", "Consultation"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-600 transition-colors duration-200 hover:text-orange-500"
              style={{ color: "#5B5652", fontWeight: 600 }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/onboarding">
          <button
            className="btn-primary px-5 py-2.5 text-sm"
            style={{ fontSize: "14px" }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}
