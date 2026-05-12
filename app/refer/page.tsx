"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
};

const REFERRALS = [
  { name: "Riya Sharma",   status: "Joined", date: "2 May 2025",   reward: "₹50" },
  { name: "Karan Mehta",   status: "Pending",date: "5 May 2025",   reward: "—"   },
];

export default function ReferPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const CODE = "PETSATHI-VISHAL";

  function copy() {
    navigator.clipboard.writeText(CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      <div style={{ background: C.surface, padding: "20px 20px 16px", borderBottom: `1px solid ${C.grayLight}` }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.navy, fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Refer a Friend</h1>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 24px" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #F97316, #FB923C)", borderRadius: "20px", padding: "28px 24px", textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "40px", margin: "0 0 10px" }}>🤝</p>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "white", margin: "0 0 8px" }}>Invite & Earn</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: "0 0 4px" }}>You get <strong>₹50</strong> for every friend who joins</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0 }}>They get <strong>₹25</strong> off their first month</p>
        </div>

        {/* Code */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "8px" }}>YOUR REFERRAL CODE</p>
        <div style={{ background: C.surface, borderRadius: "16px", padding: "16px", border: `1px solid ${C.grayLight}`, display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <p style={{ flex: 1, fontSize: "18px", fontWeight: 800, color: C.navy, letterSpacing: "2px", margin: 0 }}>{CODE}</p>
          <button onClick={copy} style={{ background: copied ? C.greenBg : C.orangeBg, color: copied ? C.green : C.orange, border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "13px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        {/* Share buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "WhatsApp", bg: "#25D366", emoji: "💬" },
            { label: "Instagram", bg: "#E1306C", emoji: "📸" },
            { label: "More",     bg: C.navy,    emoji: "📤" },
          ].map((b, i) => (
            <button key={i} style={{ flex: 1, padding: "12px 8px", borderRadius: "14px", background: b.bg, border: "none", color: "white", fontSize: "12px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "18px" }}>{b.emoji}</span>
              {b.label}
            </button>
          ))}
        </div>

        {/* Referral history */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "8px" }}>YOUR REFERRALS</p>
        <div style={{ background: C.surface, borderRadius: "18px", border: `1px solid ${C.grayLight}`, overflow: "hidden" }}>
          {REFERRALS.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: i < REFERRALS.length - 1 ? `1px solid ${C.grayLight}` : "none" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: C.orangeBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "14px", color: C.orange, flexShrink: 0 }}>
                {r.name[0]}
              </div>
              <div style={{ flex: 1, marginLeft: "12px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: C.navy, margin: "0 0 2px" }}>{r.name}</p>
                <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{r.date}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: r.status === "Joined" ? C.greenBg : C.bg, color: r.status === "Joined" ? C.green : C.gray }}>{r.status}</span>
                {r.reward !== "—" && <p style={{ fontSize: "12px", fontWeight: 800, color: C.orange, margin: "4px 0 0" }}>{r.reward} earned</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
