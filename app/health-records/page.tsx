"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import BottomNav from "../components/BottomNav";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
  teal: "#0D9488", tealBg: "#F0FDFA",
  blue: "#2879B0", blueBg: "#EBF5FF",
  red: "#DC2626", redBg: "#FEF2F2",
  amber: "#B45309", amberBg: "#FFFBEB",
};

const SECTIONS = [
  { icon: "💉", label: "Vaccinations",     sub: "6 records · Next due May 15",  color: C.teal,   bg: C.tealBg,   href: "/vaccines" },
  { icon: "🩺", label: "Vet Visits",       sub: "Last visit: 3 Apr 2025",        color: C.blue,   bg: C.blueBg,   href: "/vet-visits" },
  { icon: "💊", label: "Medications",      sub: "1 active prescription",         color: C.amber,  bg: C.amberBg,  href: "/medications" },
  { icon: "⚖️", label: "Weight Log",       sub: "28 kg · Updated 1 May",         color: C.green,  bg: C.greenBg,  href: "/weight" },
  { icon: "🦷", label: "Dental Records",   sub: "Next cleaning due Jun 2025",    color: C.orange, bg: C.orangeBg, href: "/dental" },
  { icon: "🧬", label: "Allergy & Notes",  sub: "No known allergies",            color: C.red,    bg: C.redBg,    href: "/allergies" },
];

export default function HealthRecordsPage() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      <div style={{ background: C.surface, padding: "20px 20px 16px", borderBottom: `1px solid ${C.grayLight}` }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.gray, fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.gray} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: "0 0 2px" }}>Bruno · Golden Retriever</p>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Health Records</h1>
      </div>

      {/* Health score banner */}
      <div style={{ margin: "16px 16px 0", background: "linear-gradient(135deg, #0D9488, #0EA5E9)", borderRadius: "18px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "28px" }}>❤️</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", fontWeight: 600, margin: "0 0 2px" }}>Overall Health Score</p>
          <p style={{ fontSize: "26px", fontWeight: 800, color: "white", margin: "0 0 4px" }}>92 / 100</p>
          <div style={{ height: "5px", background: "rgba(255,255,255,0.25)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: "92%", height: "100%", background: "white", borderRadius: "10px" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "8px" }}>CATEGORIES</p>
        <div style={{ background: C.surface, borderRadius: "18px", border: `1px solid ${C.grayLight}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(18,16,58,0.06)" }}>
          {SECTIONS.map((s, i) => (
            <Link key={i} href={s.href} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderBottom: i < SECTIONS.length - 1 ? `1px solid ${C.grayLight}` : "none", cursor: "pointer" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: C.navy, margin: "0 0 2px" }}>{s.label}</p>
                  <p style={{ fontSize: "12px", color: C.gray, margin: 0 }}>{s.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={C.grayLight} strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </Link>
          ))}
        </div>

        <button style={{ width: "100%", marginTop: "16px", padding: "14px", borderRadius: "14px", background: C.tealBg, border: `1px solid #99F6E4`, color: C.teal, fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          📄 Download Full Report (PDF)
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
