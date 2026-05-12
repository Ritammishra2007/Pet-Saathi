"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BottomNav from "../components/BottomNav";
import { preserveDashboardData } from "../components/DashboardScreen";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A",
  navyLight: "#3D3A6B", gray: "#8A8A9A", grayLight: "#E8E7F0",
  green: "#16A34A", greenBg: "#F0FBF4",
  amber: "#B45309", amberBg: "#FFFBEB",
  orange: "#F97316", orangeBg: "#FFF4EC",
  teal: "#0D9488", tealBg: "#F0FDFA",
  red: "#DC2626",
};

const VETS = [
  {
    name: "PetCare Clinic",
    address: "Andheri West, Mumbai · 0.8 km",
    rating: "4.8",
    reviews: "312",
    phone: "+91 98201 11234",
    timing: "9 AM – 9 PM",
    badge: "Microchip Available",
    badgeColor: C.teal,
    badgeBg: C.tealBg,
  },
  {
    name: "Happy Paws Vet",
    address: "Bandra, Mumbai · 2.1 km",
    rating: "4.6",
    reviews: "198",
    phone: "+91 99200 22345",
    timing: "10 AM – 8 PM",
    badge: "Open Now",
    badgeColor: C.green,
    badgeBg: C.greenBg,
  },
  {
    name: "Dr. Mehra's Animal Hospital",
    address: "Juhu, Mumbai · 3.5 km",
    rating: "4.9",
    reviews: "541",
    phone: "+91 98334 55678",
    timing: "8 AM – 10 PM",
    badge: "Top Rated",
    badgeColor: C.orange,
    badgeBg: C.orangeBg,
  },
];

export default function MicrochipPage() {
  const router = useRouter();
  const [flow, setFlow] = useState<"choose" | "register" | "vets">("choose");
  const [chipId, setChipId] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (chipId.length !== 15) {
      setError("Microchip ID must be exactly 15 digits");
      return;
    }
    sessionStorage.setItem("chipId", chipId);
    sessionStorage.setItem("chipVerified", "true");
    localStorage.setItem("chipId", chipId);
    localStorage.setItem("chipVerified", "true");
    setSaved(true);
    setTimeout(() => { preserveDashboardData(); router.push("/dashboard"); }, 1400);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Header */}
      <div style={{ background: C.surface, padding: "20px 20px 20px", borderBottom: `1px solid ${C.grayLight}` }}>
        <button
          onClick={() => flow === "choose" ? router.back() : setFlow("choose")}
          style={{
            background: "none", border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", gap: "6px", color: C.gray, fontSize: "13px", fontWeight: 700,
            fontFamily: "inherit", padding: 0, marginBottom: "14px",
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke={C.gray} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "14px", background: C.amberBg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Image src="/microchip.png" alt="Microchip" width={34} height={34} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0 }}>Pet Identity</p>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>
              {flow === "vets" ? "Find a Vet" : "Microchip Registration"}
            </h1>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 24px" }}>

        {/* ── CHOOSE FLOW ── */}
        {flow === "choose" && (
          <>
            <p style={{ fontSize: "14px", color: C.gray, fontWeight: 600, lineHeight: 1.6, marginBottom: "24px" }}>
              A microchip is a permanent ID for your pet — about the size of a grain of rice. It helps reunite lost pets with their families.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Already chipped */}
              <button
                onClick={() => setFlow("register")}
                style={{
                  background: C.surface, border: `1.5px solid ${C.grayLight}`,
                  borderRadius: "18px", padding: "20px 18px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "16px", textAlign: "left",
                  fontFamily: "inherit", width: "100%",
                }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px", background: C.greenBg,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke={C.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke={C.green} strokeWidth="1.8"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: "0 0 4px" }}>Already Microchipped</p>
                  <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                    My pet has a chip — I want to register the ID
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke={C.grayLight} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Not chipped */}
              <button
                onClick={() => setFlow("vets")}
                style={{
                  background: C.surface, border: `1.5px solid ${C.grayLight}`,
                  borderRadius: "18px", padding: "20px 18px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "16px", textAlign: "left",
                  fontFamily: "inherit", width: "100%",
                }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px", background: C.amberBg,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4M12 16h.01" stroke={C.amber} strokeWidth="2.2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke={C.amber} strokeWidth="1.8"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: "0 0 4px" }}>Not Microchipped Yet</p>
                  <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                    Find a nearby vet to get my pet chipped
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke={C.grayLight} strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Info card */}
            <div style={{
              background: C.tealBg, border: `1px solid #99F6E4`,
              borderRadius: "16px", padding: "16px", marginTop: "24px",
              display: "flex", gap: "12px", alignItems: "flex-start",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                <circle cx="12" cy="12" r="9" stroke={C.teal} strokeWidth="1.8"/>
                <path d="M12 8v1M12 12v4" stroke={C.teal} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={{ fontSize: "12px", color: C.teal, fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
                Microchipping is a one-time procedure and is mandatory for dogs in many Indian cities. It takes only a few seconds and is virtually painless.
              </p>
            </div>
          </>
        )}

        {/* ── REGISTER CHIP ID ── */}
        {flow === "register" && !saved && (
          <>
            <p style={{ fontSize: "14px", color: C.gray, fontWeight: 600, lineHeight: 1.6, marginBottom: "24px" }}>
              Enter the 15-digit ISO microchip ID found on your pet's microchip certificate or vet records.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 800, color: C.navyLight, letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                MICROCHIP ID
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={chipId}
                onChange={e => { setChipId(e.target.value.replace(/\D/g, "").slice(0, 15)); setError(""); }}
                placeholder="e.g. 985141000012345"
                maxLength={15}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: "14px",
                  border: `1.5px solid ${error ? C.red : C.grayLight}`,
                  fontSize: "16px", fontWeight: 700, color: C.navy, background: C.surface,
                  fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                  letterSpacing: "1px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                {error
                  ? <p style={{ fontSize: "12px", color: C.red, fontWeight: 600, margin: 0 }}>{error}</p>
                  : <span />
                }
                <p style={{ fontSize: "12px", fontWeight: 600, color: chipId.length === 15 ? C.green : C.gray, margin: 0 }}>
                  {chipId.length}/15
                </p>
              </div>
            </div>

            <div style={{
              background: C.greenBg, border: `1px solid #BBF7D0`,
              borderRadius: "14px", padding: "14px 16px", marginBottom: "24px",
              display: "flex", gap: "12px", alignItems: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M9 12l2 2 4-4" stroke={C.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke={C.green} strokeWidth="1.8"/>
              </svg>
              <p style={{ fontSize: "12px", color: C.green, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                Your chip ID is stored securely and only visible to you and your vet.
              </p>
            </div>

            <button
              onClick={handleSave}
              style={{
                width: "100%", padding: "15px", borderRadius: "14px",
                background: C.navy, border: "none", color: "white",
                fontSize: "15px", fontWeight: 800, cursor: "pointer",
                fontFamily: "inherit",
              }}>
              Save & Verify →
            </button>
          </>
        )}

        {/* Success state */}
        {flow === "register" && saved && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", gap: "16px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%", background: C.greenBg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 20l8 8 16-16" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 800, color: C.navy, margin: 0 }}>Microchip Verified!</p>
            <p style={{ fontSize: "13px", color: C.gray, fontWeight: 600, textAlign: "center" }}>
              ID <strong style={{ color: C.navy }}>{chipId}</strong> has been saved to your profile.
            </p>
            <p style={{ fontSize: "12px", color: C.gray }}>Redirecting to dashboard…</p>
          </div>
        )}

        {/* ── NEARBY VETS ── */}
        {flow === "vets" && (
          <>
            <div style={{
              background: C.amberBg, border: `1px solid #FDE68A`,
              borderRadius: "14px", padding: "14px 16px", marginBottom: "20px",
              display: "flex", gap: "12px", alignItems: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke={C.amber} strokeWidth="1.8"/>
                <circle cx="12" cy="10" r="3" stroke={C.amber} strokeWidth="1.8"/>
              </svg>
              <p style={{ fontSize: "12px", color: C.amber, fontWeight: 700, margin: 0 }}>
                Showing vets near Mumbai who offer microchipping
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {VETS.map((vet, i) => (
                <div key={i} style={{
                  background: C.surface, borderRadius: "18px", padding: "16px",
                  border: `1px solid ${C.grayLight}`,
                  boxShadow: "0 2px 10px rgba(18,16,58,0.05)",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: 0 }}>{vet.name}</p>
                        <span style={{
                          fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px",
                          background: vet.badgeBg, color: vet.badgeColor,
                        }}>{vet.badge}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0 }}>{vet.address}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>⭐ {vet.rating}</p>
                      <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{vet.reviews} reviews</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke={C.gray} strokeWidth="1.8"/>
                      <path d="M12 7v5l2.5 2" stroke={C.gray} strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0 }}>{vet.timing}</p>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <a
                      href={`tel:${vet.phone.replace(/\s/g, "")}`}
                      style={{
                        flex: 1, padding: "11px", borderRadius: "12px",
                        background: C.greenBg, border: `1px solid #BBF7D0`,
                        color: C.green, fontSize: "13px", fontWeight: 800,
                        textDecoration: "none", textAlign: "center",
                        fontFamily: "inherit",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.12 12 19.79 19.79 0 011.08 3.4 2 2 0 013.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91A16 16 0 0015.1 16.9l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={C.green} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Call
                    </a>
                    <button
                      style={{
                        flex: 2, padding: "11px", borderRadius: "12px",
                        background: C.navy, border: "none",
                        color: "white", fontSize: "13px", fontWeight: 800,
                        cursor: "pointer", fontFamily: "inherit",
                      }}>
                      Book Appointment →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      <BottomNav />
    </div>
  );
}
