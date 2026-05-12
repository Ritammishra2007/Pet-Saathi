"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneFrame from "./PhoneFrame";
import BottomNav from "./BottomNav";
import { useState, useEffect } from "react";

/* ── Color tokens ── */
const C = {
  bg:        "transparent",
  surface:   "rgba(255,255,255,0.55)",
  navy:      "#151B54",
  navyLight: "#3D3A6B",
  gray:      "#7A7A8A",
  grayLight: "rgba(232,231,240,0.6)",
  orange:    "#FF9F2D",
  orangeBg:  "rgba(255,159,45,0.12)",
  green:     "#34C759",
  greenBg:   "rgba(52,199,89,0.12)",
  red:       "#FF3B30",
  redBg:     "rgba(255,59,48,0.1)",
  purple:    "#6D28D9",
  purpleBg:  "rgba(109,40,217,0.1)",
};

// New random ID on every JS module load (i.e. every page reload).
// Stays the same during SPA navigation within the same session.
const PAGE_LOAD_ID = Math.random().toString(36).slice(2);

/** Call this before router.push("/dashboard") to mark sessionStorage as belonging to this load. */
export function preserveDashboardData() {
  sessionStorage.setItem("_pageLoadId", PAGE_LOAD_ID);
}

export default function DashboardScreen() {
  const router = useRouter();
  const [petName,  setPetName]  = useState("Bruno");
  const [petBreed, setPetBreed] = useState("Golden Retriever");
  const [petAge,   setPetAge]   = useState("12 May 2024");
  const [chipVerified, setChipVerified] = useState(false);
  const [chipId, setChipId] = useState("");
  const [wantsChecklist, setWantsChecklist] = useState(true);

  function syncFromStorage() {
    const name    = sessionStorage.getItem("petName");
    const breed   = sessionStorage.getItem("petBreed");
    const ageVal  = sessionStorage.getItem("petAgeValue");
    const ageUnit = sessionStorage.getItem("petAgeUnit");
    const chip    = sessionStorage.getItem("chipVerified");
    const id      = sessionStorage.getItem("chipId");
    if (name)  setPetName(name);
    if (breed) setPetBreed(breed);
    if (ageVal && ageUnit) setPetAge(`${ageVal} ${ageUnit} old`);
    setChipVerified(chip === "true");
    if (id) setChipId(id);
    const cl = sessionStorage.getItem("wantsChecklist");
    if (cl !== null) setWantsChecklist(cl === "true");
  }

  useEffect(() => {
    // If the stored ID doesn't match the current module's ID, it's a page reload → clear
    if (sessionStorage.getItem("_pageLoadId") !== PAGE_LOAD_ID) {
      sessionStorage.clear();
    }
    syncFromStorage();
    window.addEventListener("focus", syncFromStorage);
    return () => window.removeEventListener("focus", syncFromStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflow: "hidden", position: "relative" }}>
        {/* Ambient background blobs */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,159,45,0.18) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "40%", left: "-80px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(52,199,89,0.12) 0%, transparent 70%)", filter: "blur(25px)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative", zIndex: 1, paddingBottom: "80px" }}>

          {/* ── HEADER ── */}
          <div style={{ padding: "18px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.navy, fontFamily: "inherit" }}>
                Hello, {petName}'s Parent 👋
              </h2>
            </div>
            <div style={{ position: "relative" }}>
              <button style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: C.surface, border: `1px solid ${C.grayLight}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={C.navyLight} strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={C.navyLight} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div style={{
                position: "absolute", top: "-3px", right: "-3px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: C.red, border: "2px solid white",
                fontSize: "8px", fontWeight: 900, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "inherit",
              }}>3</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "6px 16px 20px" }}>

            {/* ── PET PROFILE CARD ── */}
            <Card style={{
              background: "linear-gradient(135deg, rgba(255,248,240,0.75) 0%, rgba(255,220,160,0.5) 100%)",
              boxShadow: "0 16px 48px rgba(255,159,45,0.22), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>

                {/* Left */}
                <div style={{ flex: 1 }}>
                  {/* Name row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <h1 style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "32px", fontWeight: 700, color: C.navy, lineHeight: 1,
                    }}>{petName}</h1>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%", background: C.green,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, boxShadow: `0 2px 6px ${C.green}40`,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Breed + DOB */}
                  <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <p style={{ fontSize: "10px", color: C.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Breed</p>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: C.navyLight }}>{petBreed || "—"}</p>
                    </div>
                    <div style={{ width: "1px", background: C.grayLight }} />
                    <div>
                      <p style={{ fontSize: "10px", color: C.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Age</p>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: C.navyLight }}>{petAge}</p>
                    </div>
                  </div>

                  {/* Microchip */}
                  <div
                    onClick={() => { if (!chipVerified) router.push("/microchip"); }}
                    style={{
                      background: chipVerified ? C.greenBg : "#FFFBEB",
                      border: `1px solid ${chipVerified ? "#BBF7D0" : "#FDE68A"}`,
                      borderRadius: "12px", padding: "10px 12px",
                      display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                    }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "9px", background: C.surface,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Image src="/microchip.png" alt="Microchip" width={36} height={36} />
                    </div>
                    <div style={{ flex: 1 }}>
                      {chipVerified ? (
                        <>
                          <p style={{ fontSize: "12px", fontWeight: 800, color: C.green, margin: 0 }}>Microchip Verified</p>
                          <p style={{ fontSize: "10px", color: C.gray, fontWeight: 600, marginTop: "1px" }}>ID: {chipId || "—"}</p>
                        </>
                      ) : (
                        <>
                          <p style={{ fontSize: "12px", fontWeight: 800, color: "#B45309", margin: 0 }}>Verify Your Pet</p>
                          <p style={{ fontSize: "10px", color: "#92400E", fontWeight: 600, marginTop: "1px" }}>Tap to register chip ID</p>
                        </>
                      )}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke={chipVerified ? C.gray : "#B45309"} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Right — photo */}
                <div style={{ flexShrink: 0, position: "relative" }}>
                  <div style={{
                    width: "100px", height: "100px", borderRadius: "50%",
                    overflow: "hidden", border: `3px solid ${C.surface}`,
                    boxShadow: "0 4px 16px rgba(18,16,58,0.14)",
                  }}>
                    <Image
                      src="/profile_picture.jpg"
                      alt={petName} width={100} height={100}
                      style={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: "center 20%" }} />
                  </div>
                  <button style={{
                    position: "absolute", bottom: "2px", right: "2px",
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: C.surface, border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke={C.gray} strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="13" r="4" stroke={C.gray} strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Card>

            {/* ── NEXT VACCINE ── */}
            <Link href="/vaccines" style={{ textDecoration: "none" }}>
              <Card style={{ background: "linear-gradient(135deg, rgba(255,248,240,0.8) 0%, rgba(255,220,160,0.55) 100%)", boxShadow: "0 16px 48px rgba(255,159,45,0.2), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: C.orangeBg, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Image src="/rabies_vaccine_icon.png" alt="Vaccine" width={36} height={36} style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "10px", fontWeight: 800, color: C.orange, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "3px" }}>
                      Next Vaccine
                    </p>
                    <p style={{ fontSize: "17px", fontWeight: 800, color: C.navy, fontFamily: "inherit", marginBottom: "4px" }}>
                      Rabies Vaccine
                    </p>
                    <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600 }}>12 May 2025</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke={C.grayLight} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    <span style={{
                      fontSize: "11px", fontWeight: 700, color: C.red,
                      background: C.redBg, border: `1px solid #FECACA`,
                      borderRadius: "20px", padding: "4px 10px", whiteSpace: "nowrap",
                    }}>Due Tomorrow</span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* ── 30-DAY CHECKLIST ── */}
            {wantsChecklist && <Link href="/checklist" style={{ textDecoration: "none" }}>
              <Card style={{ background: "linear-gradient(135deg, rgba(240,251,244,0.8) 0%, rgba(200,245,220,0.6) 100%)", boxShadow: "0 16px 48px rgba(52,199,89,0.2), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: C.greenBg, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Image src="/checklist.png" alt="Checklist" width={40} height={40} style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "10px", fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "3px" }}>
                      Checklist
                    </p>
                    <p style={{ fontSize: "17px", fontWeight: 800, color: C.navy, fontFamily: "inherit", marginBottom: "7px" }}>
                      30 Days Checklist
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <p style={{ fontSize: "11px", color: C.gray, fontWeight: 600, whiteSpace: "nowrap" }}>3 tasks left</p>
                      <div style={{ flex: 1, height: "5px", background: C.grayLight, borderRadius: "10px", overflow: "hidden" }}>
                        <div style={{ width: "60%", height: "100%", background: C.green, borderRadius: "10px" }} />
                      </div>
                      <p style={{ fontSize: "11px", fontWeight: 800, color: C.green, whiteSpace: "nowrap" }}>60%</p>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke={C.grayLight} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </Card>
            </Link>}

            {/* ── TODAY ── */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", padding: "0 2px" }}>
                <p style={{ fontSize: "16px", fontWeight: 800, color: C.navy, fontFamily: "inherit" }}>Today</p>
                <button style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: C.purple, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "2px" }}>
                  View all
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", alignItems: "stretch" }}>

                {/* Nutrition */}
                <Link href="/nutrition" style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{
                    background: "rgba(255,248,240,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "24px", padding: "16px",
                    boxShadow: "0 12px 36px rgba(255,159,45,0.18), 0 4px 12px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.7)",
                    flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px", background: C.orangeBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Image src="/food.png" alt="Nutrition" width={38} height={38} style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, marginBottom: "3px" }}>Nutrition Guide</p>
                      <p style={{ fontSize: "11px", color: C.gray, fontWeight: 500, lineHeight: 1.4 }}>Daily feeding recommendations</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{
                        width: "22px", height: "22px", borderRadius: "50%", background: C.orangeBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Vaccination */}
                <Link href="/vaccines" style={{ textDecoration: "none", display: "flex" }}>
                  <div style={{
                    background: "rgba(245,240,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "24px", padding: "16px",
                    boxShadow: "0 12px 36px rgba(109,40,217,0.15), 0 4px 12px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.7)",
                    flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px", background: C.purpleBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="14" width="4" height="7" rx="1.5" fill="#C4B5FD"/>
                        <rect x="8" y="10" width="4" height="11" rx="1.5" fill="#A78BFA"/>
                        <rect x="14" y="6" width="4" height="15" rx="1.5" fill={C.purple}/>
                        <path d="M4 12l6-5 6-4" stroke={C.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="16" cy="3" r="2" fill={C.purple}/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, marginBottom: "4px" }}>Vaccination Tracker</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.green }} />
                        <p style={{ fontSize: "11px", color: C.gray, fontWeight: 600 }}>Up to date</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{
                        width: "22px", height: "22px", borderRadius: "50%", background: C.purpleBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
            </div>

            {/* ── AI ASSISTANT ── */}
            <Link href="/assistant" style={{ textDecoration: "none" }}>
              <div style={{
                background: "linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)",
                borderRadius: "18px", padding: "16px 18px",
                display: "flex", alignItems: "center", gap: "14px",
                boxShadow: "0 8px 24px rgba(13,148,136,0.30)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Decorative cross — medical feel */}
                <div style={{
                  position: "absolute", top: -14, right: 20,
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)", pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: -12, right: -8,
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", pointerEvents: "none",
                }} />

                {/* Stethoscope icon box */}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="18" cy="17" r="3" stroke="white" strokeWidth="2"/>
                    <path d="M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>

                <div style={{ flex: 1, zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: "white", fontFamily: "inherit", margin: 0 }}>
                      AI Health Assistant
                    </p>
                    <span style={{
                      fontSize: "9px", fontWeight: 800, color: "#CCFBF1",
                      background: "rgba(204,251,241,0.2)", borderRadius: "6px",
                      padding: "2px 6px", letterSpacing: "0.5px",
                    }}>AI</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>
                    Ask anything about {petName}&apos;s health
                  </p>
                </div>

                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </Link>

            {/* ── COMMUNITY ── */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, fontFamily: "inherit" }}>Community</p>
                <button style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, color: C.orange, cursor: "pointer", fontFamily: "inherit" }}>
                  See all →
                </button>
              </div>
              {[
                { initials: "PS", name: "Priya S.", time: "2h ago", q: "My 3-month pup won't eat dry food — any tips?", replies: 8, color: "#FFF4EC" },
                { initials: "AM", name: "Arjun M.", time: "5h ago", q: "Best vet in Pune for first vaccination?", replies: 14, color: "#F5F0FF" },
              ].map((post, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px",
                  paddingTop: i > 0 ? "12px" : "0",
                  borderTop: i > 0 ? `1px solid ${C.grayLight}` : "none",
                }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: post.color, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 800, color: C.navyLight,
                    fontFamily: "inherit",
                  }}>{post.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "3px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: C.navy }}>{post.name}</span>
                      <span style={{ fontSize: "11px", color: C.gray }}>· {post.time}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: C.gray, fontWeight: 500, lineHeight: 1.45 }}>{post.q}</p>
                    <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, marginTop: "5px" }}>
                      {post.replies} replies
                    </p>
                  </div>
                </div>
              ))}
            </Card>

          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.58)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderRadius: "28px",
      padding: "18px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
      border: "1.5px solid rgba(255,255,255,0.75)",
      ...style,
    }}>
      {children}
    </div>
  );
}
