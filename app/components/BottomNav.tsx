"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const ORANGE = "#FF9F2D";
const GRAY   = "#9CA3AF";
const ACTIVE_BG = "rgba(255,159,45,0.12)";
const ACTIVE_LABEL = "#FF9F2D";

export default function BottomNav() {
  const pathname = usePathname();
  const on = (href: string) => pathname === href;

  return (
    <div style={{
      height: "68px",
      background: "rgba(255,255,255,0.7)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      borderTop: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: "4px",
      flexShrink: 0,
    }}>

      {/* ── HOME ── */}
      <Tab href="/dashboard" label="Home" active={on("/dashboard")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home.png" alt="Home" width={26} height={26} style={{ objectFit: "contain", display: "block" }} />
      </Tab>

      {/* ── VACCINE ── */}
      <Tab href="/vaccines" label="Vaccines" active={on("/vaccines")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/vaccine.png" alt="Vaccines" width={26} height={26} style={{ objectFit: "contain", display: "block" }} />
      </Tab>

      {/* ── EMERGENCY (centre floating) ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", marginTop: "-14px" }}>
        <Link href="/emergency" style={{ textDecoration: "none" }}>
          <div style={{
            width: "54px", height: "54px", borderRadius: "50%",
            background: `linear-gradient(145deg, #FF7A30, ${ORANGE})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 6px 20px ${ORANGE}60, 0 0 0 4px ${ORANGE}20`,
          }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="11.5" y="5" width="3" height="16" rx="1.5" fill="white"/>
              <rect x="5" y="11.5" width="16" height="3" rx="1.5" fill="white"/>
            </svg>
          </div>
        </Link>
        <span style={{ fontSize: "10px", fontWeight: 700, color: ORANGE, fontFamily: "inherit" }}>Emergency</span>
      </div>

      {/* ── COMMUNITY ── */}
      <Tab href="/community" label="Community" active={on("/community")}>
        <Image src="/community-icon.png" alt="Community" width={26} height={26} />
      </Tab>

      {/* ── PROFILE ── */}
      <Tab href="/profile" label="Profile" active={on("/profile")}>
        <Image src="/profile-dog.png" alt="Profile" width={26} height={26} />
      </Tab>

    </div>
  );
}

function Tab({ href, label, active, children }: {
  href: string; label: string; active: boolean; children: React.ReactNode;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "3px", minWidth: "52px",
        background: active ? ACTIVE_BG : "transparent",
        borderRadius: "14px",
        padding: "5px 8px",
        transition: "background 0.2s ease",
      }}>
        {children}
        <span style={{
          fontSize: "10px", fontWeight: 700,
          color: active ? ACTIVE_LABEL : GRAY,
          fontFamily: "inherit",
        }}>
          {label}
        </span>
      </div>
    </Link>
  );
}
