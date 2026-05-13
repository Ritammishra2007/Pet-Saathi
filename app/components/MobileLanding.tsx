"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  { icon: "💉", color: "#4DA8DA", bg: "transparent", title: "Track Vaccinations", desc: "Never miss a dose that protects them." },
  { icon: "🥣", color: "#16A34A", bg: "transparent", title: "Nutrition Guide", desc: "Feed them right at every stage of life." },
  { icon: "👥", color: "#8B5CF6", bg: "transparent", title: "Community Support", desc: "A family of pet lovers, always with you." },
  { icon: "🏷️", color: "#F97316", bg: "transparent", title: "Verify Your Pet", desc: "Microchip & ID safety for peace of mind." },
  { icon: "🤖", color: "#0EA5E9", bg: "transparent", title: "AI Care Assistant", desc: "Instant answers, anytime your pet needs help." },
];

const AVATARS = ["/golden.webp", "/kitten.webp", "/puppy2.webp"];

export default function MobileLanding() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        setAnimKey(k => k + 1);
        return next;
      });
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "inherit", background: "transparent" }}>

      {/* ── Hero photo section (top ~58%) ── */}
      <div style={{ position: "relative", height: "58vh", flexShrink: 0 }}>
        <Image src="/landing_page.jpg" alt="Pet Sathi" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />

        {/* Gradient: clear top → white fade at bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.7) 80%, #ffffff 100%)",
        }} />
      </div>

      {/* ── Bottom content ── */}
      <div style={{ flex: 1, background: "#ffffff", padding: "18px 20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Avatar row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {AVATARS.map((src, i) => (
            <div key={i} style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: "2.5px solid white", marginRight: "-10px", boxShadow: "0 2px 8px rgba(0,0,0,0.14)", flexShrink: 0 }}>
              <Image src={src} alt="Pet" width={42} height={42} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
          ))}
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#F97316", border: "2.5px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "white", flexShrink: 0, marginLeft: "2px", boxShadow: "0 2px 8px rgba(249,115,22,0.4)" }}>
            10K+
          </div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#12103A", marginLeft: "12px" }}>Pet parents trust us</p>
        </div>

        {/* Feature card */}
        <div key={animKey} style={{
          background: "white", borderRadius: "16px", padding: "14px 16px",
          display: "flex", alignItems: "center", gap: "14px",
          borderLeft: `4px solid ${slide.color}`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          border: `1px solid rgba(0,0,0,0.06)`,
          borderLeftWidth: "4px", borderLeftColor: slide.color,
          animation: "slideCard 0.4s cubic-bezier(0.34,1.2,0.64,1) forwards",
        }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: slide.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
            {slide.icon}
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "#12103A", margin: "0 0 3px" }}>{slide.title}</p>
            <p style={{ fontSize: "12px", color: "#8A8A9A", margin: 0, lineHeight: 1.4 }}>{slide.desc}</p>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              height: "7px", width: i === current ? "26px" : "7px",
              borderRadius: "10px", border: "none", cursor: "pointer", padding: 0,
              background: i === current ? "#F97316" : "rgba(18,16,58,0.15)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "4px", width: "100%" }}>
          <Link href="/onboarding" style={{ textDecoration: "none", display: "block" }}>
            <button style={{
              width: "100%", padding: "17px", borderRadius: "16px",
              background: "linear-gradient(135deg, #FF9F2D 0%, #FF8A1F 100%)",
              color: "white", fontSize: "17px", fontWeight: 800,
              border: "none", cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 8px 24px rgba(255,159,45,0.4)",
            }}>
              Get Started
            </button>
          </Link>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#6B7B8D", fontWeight: 500, marginTop: "12px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#FF9F2D", fontWeight: 700, textDecoration: "none" }}>Log in</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideCard {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
