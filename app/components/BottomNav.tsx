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
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "430px",
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
      zIndex: 100,
    }}>

      {/* ── HOME ── */}
      <Tab href="/dashboard" label="Home" active={on("/dashboard")}>
        <MaskIcon src="/nav-icons/home.png" active={on("/dashboard")} />
      </Tab>

      {/* ── VACCINE ── */}
      <Tab href="/vaccines" label="Vaccines" active={on("/vaccines")}>
        <MaskIcon src="/nav-icons/vaccine.png" active={on("/vaccines")} />
      </Tab>

      {/* ── EMERGENCY ── */}
      <Tab href="/emergency" label="Emergency" active={on("/emergency")}>
        <MaskIcon src="/nav-icons/shield.png" active={on("/emergency")} />
      </Tab>

      {/* ── COMMUNITY ── */}
      <Tab href="/community" label="Community" active={on("/community")}>
        <MaskIcon src="/nav-icons/community.png" active={on("/community")} />
      </Tab>

      {/* ── PROFILE ── */}
      <Tab href="/profile" label="Profile" active={on("/profile")}>
        <MaskIcon src="/nav-icons/dog.png" active={on("/profile")} />
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

function MaskIcon({ src, active, isWhite }: { src: string, active?: boolean, isWhite?: boolean }) {
  const color = isWhite ? "white" : (active ? ORANGE : GRAY);
  return (
    <div style={{
      width: "26px", height: "26px",
      backgroundColor: color,
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center"
    }} />
  );
}
