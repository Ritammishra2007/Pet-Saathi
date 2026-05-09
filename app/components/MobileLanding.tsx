"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    icon: "💉",
    color: "#4DA8DA",
    bg: "linear-gradient(135deg, #E8F5FF, #D0EEFF)",
    title: "Track Vaccinations",
    desc: "Never miss a dose that protects them.",
  },
  {
    icon: "🥣",
    color: "#16A34A",
    bg: "linear-gradient(135deg, #EDFAF2, #D4F5E2)",
    title: "Nutrition Guide",
    desc: "Feed them right at every stage of life.",
  },
  {
    icon: "👥",
    color: "#8B5CF6",
    bg: "linear-gradient(135deg, #F3EEFF, #E8DDFF)",
    title: "Community Support",
    desc: "A family of pet lovers, always with you.",
  },
  {
    icon: "🏷️",
    color: "#FF8A1F",
    bg: "linear-gradient(135deg, #FFF3E8, #FFE5C8)",
    title: "Verify Your Pet",
    desc: "Microchip & ID safety for peace of mind.",
  },
  {
    icon: "🤖",
    color: "#0EA5E9",
    bg: "linear-gradient(135deg, #E8F7FF, #CEEEFF)",
    title: "AI Care Assistant",
    desc: "Instant answers, anytime your pet needs help.",
  },
];

export default function MobileLanding() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % SLIDES.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <>
      <div className="phone-outer">
        <div className="phone-shell">

          {/* Hero image area */}
          <div className="hero-area">
            {/* Gradient overlay on image */}
            <div className="hero-gradient" />

            {/* Main photo — dog + cat together */}
            <Image
              src="/dog-cat.webp"
              alt="Happy dog and cat"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />

            {/* Floating pet badge top-right */}
            <div className="badge-top-right">
              <span style={{ fontSize: "16px" }}>🐾</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>4.9★</span>
            </div>

            {/* App title overlay at bottom of image */}
            <div className="hero-title-overlay">
              <h1 className="app-title">
                Pet-Sathi<span style={{ color: "#FF8A1F" }}>.</span>
              </h1>
              <p className="app-subtitle">India&apos;s pet care companion</p>
            </div>
          </div>

          {/* Bottom sheet content */}
          <div className="bottom-sheet">

            {/* Mini pet avatars row */}
            <div className="avatar-row">
              <div className="avatar-wrap">
                <Image src="/golden.webp" alt="Golden" width={40} height={40}
                  style={{ objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <div className="avatar-wrap">
                <Image src="/kitten.webp" alt="Kitten" width={40} height={40}
                  style={{ objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <div className="avatar-wrap">
                <Image src="/puppy2.webp" alt="Puppy" width={40} height={40}
                  style={{ objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <div className="avatar-wrap">
                <Image src="/hero-pets.webp" alt="Pets" width={40} height={40}
                  style={{ objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <div
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF8A1F,#FFB347)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid white",
                  fontSize: "11px", fontWeight: 800, color: "white",
                  flexShrink: 0,
                }}
              >
                10K+
              </div>
              <p style={{ fontSize: "12px", color: "#6B7B8D", fontWeight: 600, marginLeft: "6px" }}>
                pet parents trust us
              </p>
            </div>

            {/* Feature card slider */}
            <div key={animKey} className="feature-card slide-enter"
              style={{ borderLeft: `3px solid ${slide.color}` }}>
              <div className="feature-icon-box" style={{ background: slide.bg }}>
                <span style={{ fontSize: "22px" }}>{slide.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p className="feature-title">{slide.title}</p>
                <p className="feature-desc">{slide.desc}</p>
              </div>
            </div>

            {/* Dots */}
            <div className="dots-row">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`dot ${i === current ? "dot-active" : ""}`}
                />
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* CTA */}
            <Link href="/onboarding" style={{ textDecoration: "none", width: "100%" }}>
              <button className="cta-btn">Get Started</button>
            </Link>

            <p className="login-text">
              Already have an account?{" "}
              <Link href="/login" className="login-link">Log in</Link>
            </p>

          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Outer wrapper ── */
        .phone-outer {
          min-height: 100vh;
          background: #F5F0EB;
          display: flex;
          flex-direction: column;
          font-family: 'Nunito', sans-serif;
        }

        /* ── Phone shell ── */
        .phone-shell {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F5F0EB;
          min-height: 100vh;
        }

        /* ── Hero image ── */
        .hero-area {
          position: relative;
          height: 420px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.05) 40%,
            rgba(245,240,235,0.85) 85%,
            rgba(245,240,235,1) 100%
          );
          z-index: 2;
        }

        .badge-top-right {
          position: absolute;
          top: 16px;
          right: 18px;
          z-index: 10;
          background: rgba(255,138,31,0.85);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 6px 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(255,138,31,0.4);
        }

        .hero-title-overlay {
          position: absolute;
          bottom: 20px;
          left: 0; right: 0;
          text-align: center;
          z-index: 10;
          padding: 0 24px;
        }

        .app-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 700;
          color: #1A2535;
          letter-spacing: -0.5px;
          line-height: 1;
          text-shadow: 0 2px 12px rgba(255,255,255,0.5);
        }

        .app-subtitle {
          font-size: 13px;
          color: #5A6B7A;
          font-weight: 600;
          margin-top: 4px;
          letter-spacing: 0.3px;
        }

        /* ── Bottom sheet ── */
        .bottom-sheet {
          flex: 1;
          background: #F5F0EB;
          display: flex;
          flex-direction: column;
          padding: 18px 20px 14px;
          gap: 14px;
        }

        /* ── Avatar row ── */
        .avatar-row {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .avatar-wrap {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2.5px solid white;
          overflow: hidden;
          margin-right: -8px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        /* ── Feature card ── */
        .feature-card {
          background: white;
          border-radius: 18px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 20px rgba(43,29,22,0.07);
          border: 1px solid rgba(255,255,255,0.95);
          min-height: 76px;
        }

        .feature-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-title {
          font-weight: 800;
          font-size: 14px;
          color: #1A2535;
          margin-bottom: 3px;
          font-family: 'Nunito', sans-serif;
        }

        .feature-desc {
          font-size: 12px;
          color: #7A8898;
          font-weight: 500;
          line-height: 1.4;
        }

        /* ── Dots ── */
        .dots-row {
          display: flex;
          justify-content: center;
          gap: 5px;
          align-items: center;
        }

        .dot {
          height: 6px;
          width: 6px;
          border-radius: 10px;
          background: rgba(43,29,22,0.15);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .dot-active {
          width: 22px;
          background: #4DA8DA;
        }

        /* ── CTA button ── */
        .cta-btn {
          width: 100%;
          padding: 17px;
          border-radius: 16px;
          background: linear-gradient(135deg, #4DA8DA 0%, #2879B0 100%);
          color: white;
          font-size: 16px;
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(77,168,218,0.45);
          letter-spacing: 0.3px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px rgba(77,168,218,0.5);
        }
        .cta-btn:active { transform: scale(0.98); }

        /* ── Login ── */
        .login-text {
          text-align: center;
          font-size: 13px;
          color: #7A8898;
          font-weight: 500;
        }
        .login-link {
          color: #4DA8DA;
          font-weight: 700;
          text-decoration: none;
        }

        /* ── Home indicator ── */
        .home-indicator {
          width: 120px;
          height: 4px;
          background: rgba(43,29,22,0.15);
          border-radius: 10px;
          align-self: center;
        }

        /* ── Slide animation ── */
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        .slide-enter { animation: slideIn 0.4s cubic-bezier(0.34,1.2,0.64,1) forwards; }

        /* ── On actual phone — go fullscreen ── */
        @media (max-width: 430px) {
          .phone-outer {
            padding: 0;
            background: #F5F0EB;
          }
          .phone-shell {
            width: 100vw;
            min-height: 100svh;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </>
  );
}
