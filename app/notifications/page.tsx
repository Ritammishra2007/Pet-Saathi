"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
  blue: "#2879B0", blueBg: "#EBF5FF",
  red: "#DC2626", redBg: "#FEF2F2",
  amber: "#B45309", amberBg: "#FFFBEB",
};

const ALERTS = [
  { title: "Vaccine Reminder",    desc: "Bordetella due in 3 days",        time: "2h ago",  icon: "💉", color: C.red,    bg: C.redBg,    unread: true  },
  { title: "Vet Appointment",     desc: "Tomorrow 11:00 AM – PetCare Clinic",time: "5h ago", icon: "🩺", color: C.blue,   bg: C.blueBg,   unread: true  },
  { title: "Checklist Task",      desc: "Day 12 task: Socialisation walk",  time: "1d ago",  icon: "✅", color: C.green,  bg: C.greenBg,  unread: false },
  { title: "Community Reply",     desc: "Priya replied to your post",       time: "1d ago",  icon: "💬", color: C.orange, bg: C.orangeBg, unread: false },
  { title: "Health Tip",          desc: "Bruno's coat needs brushing this week", time: "2d ago", icon: "🐾", color: C.amber, bg: C.amberBg, unread: false },
];

const PREFS = [
  { label: "Vaccine Reminders",    key: "vaccine"    },
  { label: "Vet Appointments",     key: "vet"        },
  { label: "Daily Checklist",      key: "checklist"  },
  { label: "Community Activity",   key: "community"  },
  { label: "Health Tips",          key: "tips"       },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "settings">("all");
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ vaccine: true, vet: true, checklist: true, community: false, tips: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>

      <div style={{ background: C.surface, padding: "20px 20px 0", borderBottom: `1px solid ${C.grayLight}` }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.gray, fontSize: "13px", fontWeight: 700, fontFamily: "'Nunito', sans-serif", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.gray} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: "0 0 16px" }}>Notifications</h1>
        <div style={{ display: "flex", borderBottom: `1px solid ${C.grayLight}`, marginLeft: "-20px", paddingLeft: "20px" }}>
          {(["all", "settings"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 16px 10px", fontSize: "13px", fontWeight: tab === t ? 800 : 600, color: tab === t ? C.navy : C.gray, borderBottom: tab === t ? `2px solid ${C.navy}` : "2px solid transparent", marginBottom: "-1px", fontFamily: "'Nunito', sans-serif" }}>
              {t === "all" ? "All" : "Settings"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 24px" }}>
        {tab === "all" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {ALERTS.map((a, i) => (
              <div key={i} style={{ background: C.surface, borderRadius: "16px", padding: "14px 16px", border: `1px solid ${a.unread ? a.color + "40" : C.grayLight}`, display: "flex", gap: "14px", alignItems: "flex-start", boxShadow: "0 1px 6px rgba(18,16,58,0.04)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{a.title}</p>
                    {a.unread && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: a.color, flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: "12px", color: C.gray, margin: "0 0 4px", lineHeight: 1.4 }}>{a.desc}</p>
                  <p style={{ fontSize: "11px", color: C.gray, margin: 0, fontWeight: 600 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div>
            <p style={{ fontSize: "13px", color: C.gray, fontWeight: 600, marginBottom: "16px", lineHeight: 1.5 }}>
              Choose which notifications you want to receive for Bruno.
            </p>
            <div style={{ background: C.surface, borderRadius: "18px", border: `1px solid ${C.grayLight}`, overflow: "hidden" }}>
              {PREFS.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px", borderBottom: i < PREFS.length - 1 ? `1px solid ${C.grayLight}` : "none" }}>
                  <p style={{ flex: 1, fontSize: "14px", fontWeight: 700, color: C.navy, margin: 0 }}>{p.label}</p>
                  <div
                    onClick={() => setPrefs(prev => ({ ...prev, [p.key]: !prev[p.key] }))}
                    style={{ width: "46px", height: "26px", borderRadius: "13px", background: prefs[p.key] ? C.green : C.grayLight, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                    <div style={{ position: "absolute", top: "3px", left: prefs[p.key] ? "23px" : "3px", width: "20px", height: "20px", borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
