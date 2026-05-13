"use client";

import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg: "transparent", surface: "rgba(255,255,255,0.75)", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  green: "#16A34A", greenBg: "#F0FBF4",
  amber: "#B45309",  amberBg: "#FFFBEB",
  red: "#B91C1C",    redBg: "#FEF2F2",
  slate: "#475569",  slateBg: "#F8FAFC",
  orange: "#F97316",
};

const VACCINES = [
  { name: "Rabies",             date: "2025-04-10", due: "2026-04-10", status: "done",     badge: "Annual",  color: C.green, bg: C.greenBg },
  { name: "DHPPiL (5-in-1)",   date: "2025-02-14", due: "2026-02-14", status: "done",     badge: "Annual",  color: C.green, bg: C.greenBg },
  { name: "Bordetella",         date: null,         due: "2025-05-15", status: "overdue",  badge: "Overdue", color: C.red,   bg: C.redBg   },
  { name: "Leptospirosis",      date: null,         due: "2025-06-01", status: "upcoming", badge: "Due Soon",color: C.amber, bg: C.amberBg },
  { name: "Canine Influenza",   date: "2024-11-20", due: "2025-11-20", status: "done",     badge: "Annual",  color: C.green, bg: C.greenBg },
  { name: "Parvovirus Booster", date: "2025-01-05", due: "2028-01-05", status: "done",     badge: "3-Year",  color: C.green, bg: C.greenBg },
];

function formatDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function VaccinesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "upcoming" | "done">("all");
  const [petName, setPetName] = useState("Bruno");

  useEffect(() => {
    const n = localStorage.getItem("petName") || sessionStorage.getItem("petName");
    if (n) setPetName(n);
  }, []);

  const filtered = VACCINES.filter(v => {
    if (tab === "upcoming") return v.status === "upcoming" || v.status === "overdue";
    if (tab === "done") return v.status === "done";
    return true;
  });

  const doneCount    = VACCINES.filter(v => v.status === "done").length;
  const overdueCount = VACCINES.filter(v => v.status === "overdue").length;
  const upcomingCount= VACCINES.filter(v => v.status === "upcoming").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Header */}
      <div style={{ background: "transparent", padding: "20px 20px 0", borderBottom: "none" }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.navy, fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, marginBottom: "2px" }}>{petName}'s Health Record</p>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Vaccinations</h1>
          </div>
          <button style={{
            background: C.navy, color: "white", border: "none", borderRadius: "12px",
            padding: "10px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit",
          }}>+ Add</button>
        </div>

        {/* Summary pills */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <Stat label="Completed" value={doneCount}     color={C.green} bg={C.greenBg} />
          <Stat label="Due Soon"  value={upcomingCount} color={C.amber} bg={C.amberBg} />
          <Stat label="Overdue"   value={overdueCount}  color={C.red}   bg={C.redBg}   />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.grayLight}`, marginLeft: "-20px", paddingLeft: "20px" }}>
          {(["all", "upcoming", "done"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 16px 10px", fontSize: "13px",
              fontWeight: tab === t ? 800 : 600,
              color: tab === t ? C.navy : C.gray,
              borderBottom: tab === t ? `2px solid ${C.navy}` : "2px solid transparent",
              marginBottom: "-1px", fontFamily: "inherit",
            }}>
              {t === "upcoming" ? "Upcoming" : t === "done" ? "Completed" : "All"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>

        {/* Next due banner — muted */}
        {tab !== "done" && (
          <div style={{
            background: C.redBg, border: `1px solid #FECACA`,
            borderRadius: "16px", padding: "14px 16px", marginBottom: "16px",
            display: "flex", alignItems: "center", gap: "14px",
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={C.red} strokeWidth="1.8"/>
                <path d="M12 7v5M12 16h.01" stroke={C.red} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.red, margin: 0, letterSpacing: "0.5px" }}>OVERDUE</p>
              <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: "2px 0 0" }}>Bordetella — Was due 15 May 2025</p>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: C.red, whiteSpace: "nowrap" }}>Book Vet →</span>
          </div>
        )}

        {filtered.map((v, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: "14px", padding: "14px 16px",
            marginBottom: "8px", border: `1px solid ${C.grayLight}`,
            display: "flex", alignItems: "center", gap: "14px",
            boxShadow: "0 1px 4px rgba(18,16,58,0.04)",
          }}>
            {/* Status indicator */}
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {v.status === "done" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9l4 4 7-7" stroke={v.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : v.status === "overdue" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 5v4M9 12h.01" stroke={v.color} strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="9" r="7" stroke={v.color} strokeWidth="1.8"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke={v.color} strokeWidth="1.8"/>
                  <path d="M9 5v4l2.5 2" stroke={v.color} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: 0 }}>{v.name}</p>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px",
                  background: v.bg, color: v.color,
                }}>{v.badge}</span>
              </div>
              {v.date && (
                <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>Given: {formatDate(v.date)}</p>
              )}
              <p style={{
                fontSize: "11px", margin: 0, fontWeight: v.status !== "done" ? 700 : 400,
                color: v.status === "done" ? C.gray : v.color,
              }}>
                {v.status === "done" ? `Next due: ${formatDate(v.due)}` : `Due: ${formatDate(v.due)}`}
              </p>
            </div>

            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke={C.grayLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}

        {/* Download certificate */}
        <div style={{
          background: C.surface, borderRadius: "14px", padding: "14px 16px",
          border: `1.5px dashed ${C.grayLight}`, display: "flex", alignItems: "center", gap: "14px",
          marginTop: "4px",
        }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: C.slateBg, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={C.slate} strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke={C.slate} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>Vaccination Certificate</p>
            <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>Download official PDF record</p>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: C.slate }}>Export</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Stat({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  return (
    <div style={{
      flex: 1, background: bg, borderRadius: "12px", padding: "10px 12px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
      border: `1px solid ${color}18`,
    }}>
      <span style={{ fontSize: "20px", fontWeight: 800, color }}>{value}</span>
      <span style={{ fontSize: "11px", fontWeight: 600, color }}>{label}</span>
    </div>
  );
}
