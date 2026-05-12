"use client";

import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Image from "next/image";
import Link from "next/link";

const C = {
  bg: "transparent", surface: "rgba(255,255,255,0.75)", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
  teal: "#0D9488", tealBg: "#F0FDFA",
  blue: "#2879B0", blueBg: "#EBF5FF",
  red: "#DC2626",
};

const SETTINGS = [
  { icon: "⚙️", label: "Account Settings",  href: "/settings"  },
  { icon: "🔒", label: "Privacy & Security", href: "/privacy"   },
  { icon: "📦", label: "Subscription Plan",  href: "/plan", badge: "Free" },
  { icon: "❓", label: "Help & Support",     href: "/help"      },
];

export default function ProfilePage() {
  const [petName, setPetName]   = useState("Your Pet");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge]     = useState("");
  const [wantsChecklist, setWantsChecklist] = useState(false);

  const [userName, setUserName] = useState("Your Name");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("City");

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: "", email: "", city: "" });

  useEffect(() => {
    // Pet data from sessionStorage
    const name  = sessionStorage.getItem("petName")    || "Your Pet";
    const breed = sessionStorage.getItem("petBreed")   || "";
    const ageVal= sessionStorage.getItem("petAgeValue")|| "";
    const ageUnit=sessionStorage.getItem("petAgeUnit") || "";
    const cl    = sessionStorage.getItem("wantsChecklist") === "true";
    setPetName(name);
    setPetBreed(breed);
    setPetAge(ageVal ? `${ageVal} ${ageUnit}` : "");
    setWantsChecklist(cl);

    // User profile from localStorage
    const n = localStorage.getItem("userName")  || "Your Name";
    const e = localStorage.getItem("userEmail") || "";
    const c = localStorage.getItem("userCity")  || "City";
    setUserName(n);
    setUserEmail(e);
    setUserCity(c);
  }, []);

  function openEdit() {
    setDraft({ name: userName, email: userEmail, city: userCity });
    setEditing(true);
  }

  function saveEdit() {
    const n = draft.name.trim()  || "Your Name";
    const e = draft.email.trim();
    const c = draft.city.trim()  || "City";
    localStorage.setItem("userName",  n);
    localStorage.setItem("userEmail", e);
    localStorage.setItem("userCity",  c);
    setUserName(n);
    setUserEmail(e);
    setUserCity(c);
    setEditing(false);
  }

  const petTypeEmoji = sessionStorage && typeof window !== "undefined"
    ? sessionStorage.getItem("petTypeEmoji") || "🐕"
    : "🐕";
  const petType = sessionStorage && typeof window !== "undefined"
    ? sessionStorage.getItem("petType") || "Dog"
    : "Dog";

  const MENU = [
    { icon: "🐾", label: "My Pets",        sub: `${petName} · Add member`,      color: C.orange, bg: C.orangeBg, href: "/my-pets"        },
    { icon: "📋", label: "Health Records", sub: "Vaccinations, vet visits",      color: C.teal,   bg: C.tealBg,   href: "/health-records" },
    { icon: "🔔", label: "Notifications",  sub: "Manage alerts",                 color: C.blue,   bg: C.blueBg,   href: "/notifications"  },
    { icon: "📍", label: "Nearby Vets",    sub: "Find vets around you",          color: C.green,  bg: C.greenBg,  href: "/nearby-vets"    },
    { icon: null, label: "Microchip & ID", sub: `${petName} · Tap to verify`,   color: C.teal,   bg: C.tealBg,   href: "/microchip"      },
    { icon: "🤝", label: "Refer a Friend", sub: "Invite pet parents",            color: C.orange, bg: C.orangeBg, href: "/refer"          },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Edit modal */}
      {editing && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end",
        }} onClick={() => setEditing(false)}>
          <div style={{
            width: "100%", maxWidth: "430px", margin: "0 auto",
            background: "white", borderRadius: "24px 24px 0 0",
            padding: "24px 20px 40px",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <p style={{ fontSize: "17px", fontWeight: 800, color: C.navy, margin: 0 }}>Edit Profile</p>
              <button onClick={() => setEditing(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: C.gray }}>✕</button>
            </div>

            {[
              { label: "Full Name", key: "name", placeholder: "Your name", type: "text" },
              { label: "Email", key: "email", placeholder: "your@email.com", type: "email" },
              { label: "City", key: "city", placeholder: "Your city", type: "text" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" }}>{f.label}</p>
                <input
                  type={f.type}
                  value={draft[f.key as keyof typeof draft]}
                  onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: "12px",
                    border: `1.5px solid ${C.grayLight}`, fontSize: "14px", fontWeight: 500,
                    color: C.navy, outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            <button onClick={saveEdit} style={{
              width: "100%", padding: "14px", borderRadius: "14px",
              background: C.orange, color: "white", fontSize: "15px",
              fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit",
              marginTop: "4px",
            }}>Save Changes</button>
          </div>
        </div>
      )}

      <div style={{ background: C.surface, borderBottom: `1px solid ${C.grayLight}`, padding: "24px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", border: `3px solid ${C.orangeBg}` }}>
              <Image src="/profile_picture.jpg" alt="Profile" width={72} height={72}
                style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div style={{
              position: "absolute", bottom: 1, right: 1,
              width: "20px", height: "20px", borderRadius: "50%",
              background: C.orange, border: "2px solid white",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.navy, margin: 0 }}>{userName}</h2>
            {userEmail && <p style={{ fontSize: "12px", color: C.gray, margin: "2px 0 8px", fontWeight: 400 }}>{userEmail}</p>}
            <div style={{ display: "flex", gap: "6px", marginTop: userEmail ? 0 : "8px" }}>
              <span style={{ background: C.orangeBg, color: C.orange, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{petTypeEmoji} {petType} Parent</span>
              <span style={{ background: "rgba(255,255,255,0.6)", color: C.gray, fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>{userCity}</span>
            </div>
          </div>

          <button onClick={openEdit} style={{
            background: C.surface, border: `1px solid ${C.grayLight}`,
            borderRadius: "10px", padding: "8px 14px", cursor: "pointer",
            fontSize: "12px", fontWeight: 700, color: C.navy, fontFamily: "inherit",
          }}>Edit</button>
        </div>

        <div style={{ display: "flex", background: "rgba(255,255,255,0.5)", borderRadius: "16px", padding: "12px 0" }}>
          {[{ label: "Pets", value: "1" }, { label: "Posts", value: "7" }, { label: "Days Active", value: "42" }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${C.grayLight}` : "none" }}>
              <p style={{ fontSize: "20px", fontWeight: 800, color: C.orange, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: C.gray, margin: 0, fontWeight: 400 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>

        {/* Pet card */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            background: C.surface, borderRadius: "18px 18px 0 0", padding: "14px 16px",
            boxShadow: "0 2px 12px rgba(18,16,58,0.06)", border: `1px solid ${C.grayLight}`,
            borderBottom: "none", display: "flex", alignItems: "center", gap: "14px",
          }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden" }}>
                <Image src="/profile_picture.jpg" alt={petName} width={56} height={56}
                  style={{ objectFit: "cover", objectPosition: "center 20%", width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "absolute", bottom: -2, right: -2, width: "16px", height: "16px", borderRadius: "50%", background: C.green, border: "2px solid white" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: 0 }}>{petName}</p>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: C.gray, margin: 0 }}>
                {petBreed}{petAge ? ` · ${petAge}` : ""}
              </p>
            </div>
            {wantsChecklist && (
              <div style={{ background: C.orangeBg, borderRadius: "10px", padding: "6px 10px", textAlign: "center" }}>
                <p style={{ fontSize: "10px", color: C.orange, fontWeight: 700, margin: 0 }}>30-Day</p>
                <p style={{ fontSize: "10px", color: C.orange, fontWeight: 700, margin: 0 }}>Plan ✓</p>
              </div>
            )}
          </div>

          <Link href="/my-pets?add=true" style={{ textDecoration: "none" }}>
            <div style={{
              background: C.surface, borderRadius: "0 0 18px 18px", padding: "12px 16px",
              border: `1px solid ${C.grayLight}`, borderTop: `1px dashed ${C.grayLight}`,
              display: "flex", alignItems: "center", gap: "12px", cursor: "pointer",
            }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "12px",
                background: C.orangeBg, border: `1.5px dashed ${C.orange}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: C.orange, margin: 0 }}>Add Another Pet</p>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "auto" }}>
                <path d="M5 3l4 4-4 4" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>

        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "8px" }}>MY ACCOUNT</p>
        <div style={{
          background: C.surface, borderRadius: "18px",
          boxShadow: "0 2px 12px rgba(18,16,58,0.06)", border: `1px solid ${C.grayLight}`,
          overflow: "hidden", marginBottom: "16px",
        }}>
          {MENU.map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "13px 16px",
                borderBottom: i < MENU.length - 1 ? `1px solid ${C.grayLight}` : "none",
                cursor: "pointer",
              }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "12px",
                  background: item.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>
                  {item.icon === null
                    ? <Image src="/microchip.png" alt="Microchip" width={22} height={22} />
                    : item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: C.navy, margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{item.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke={C.grayLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "8px" }}>SETTINGS</p>
        <div style={{
          background: C.surface, borderRadius: "18px",
          boxShadow: "0 2px 12px rgba(18,16,58,0.06)", border: `1px solid ${C.grayLight}`,
          overflow: "hidden", marginBottom: "16px",
        }}>
          {SETTINGS.map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "13px 16px",
                borderBottom: i < SETTINGS.length - 1 ? `1px solid ${C.grayLight}` : "none",
                cursor: "pointer",
              }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: C.navy, margin: 0 }}>{item.label}</p>
                </div>
                {"badge" in item && item.badge && (
                  <span style={{ background: C.greenBg, color: C.green, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{item.badge}</span>
                )}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke={C.grayLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <button style={{
          width: "100%", padding: "14px", borderRadius: "14px",
          background: "#FEF2F2", border: "1px solid #FECACA",
          color: C.red, fontSize: "14px", fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
        }}>Sign Out</button>
      </div>

      <BottomNav />
    </div>
  );
}
