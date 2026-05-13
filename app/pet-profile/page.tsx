"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const C = {
  bg: "#F8FAFC",
  navy: "#12103A",
  gray: "#64748B",
  orange: "#F97316",
  orangeBg: "#FFF4EC",
  green: "#16A34A",
  greenBg: "#F0FBF4",
  white: "#FFFFFF",
  border: "#E2E8F0"
};

export default function PetPublicProfile() {
  const [pet, setPet] = useState({
    name: "Bruno",
    breed: "Golden Retriever",
    age: "2 yrs",
    type: "Dog",
    emoji: "🐕",
    owner: "Your Name",
    city: "City"
  });

  useEffect(() => {
    const g = (k: string) => localStorage.getItem(k) || sessionStorage.getItem(k);
    const name = g("petName") || "Bruno";
    const breed = g("petBreed") || "Golden Retriever";
    const ageVal = g("petAgeValue") || "2";
    const ageUnit = g("petAgeUnit") || "yrs";
    const owner = localStorage.getItem("userName") || "Your Name";
    const city = localStorage.getItem("userCity") || "City";
    
    setPet({
      name,
      breed,
      age: ageVal ? `${ageVal} ${ageUnit}` : "",
      type: g("petType") || "Dog",
      emoji: g("petTypeEmoji") || "🐕",
      owner,
      city
    });
  }, []);

  const router = useRouter();

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: C.bg, 
      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      padding: "24px 20px"
    }}>
      <div style={{ maxWidth: "430px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <button onClick={() => router.back()} style={{
            background: "white", border: "1.5px solid #E2E8F0", borderRadius: "12px",
            width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 style={{ fontSize: "17px", fontWeight: 800, color: C.navy, margin: 0 }}>Pet Identity</h1>
          <div style={{ width: "40px" }} />
        </div>

        {/* Pet Card */}
        <div style={{
          background: C.white, borderRadius: "28px", padding: "32px 24px",
          boxShadow: "0 10px 25px rgba(18,16,58,0.05)", border: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
        }}>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <div style={{ 
              width: "120px", height: "120px", borderRadius: "32px", overflow: "hidden",
              border: "4px solid white", boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
            }}>
              <Image src="/profile_picture.jpg" alt={pet.name} width={120} height={120}
                style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            <div style={{ 
              position: "absolute", bottom: -5, right: -5, width: "32px", height: "32px", 
              borderRadius: "50%", background: C.green, border: "3px solid white",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: 900, color: C.navy, margin: "0 0 4px" }}>{pet.name}</h2>
          <p style={{ fontSize: "15px", color: C.gray, fontWeight: 600, margin: "0 0 24px" }}>{pet.breed} • {pet.age}</p>

          <div style={{ 
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%",
            marginBottom: "32px"
          }}>
            <div style={{ background: "#F1F5F9", padding: "16px", borderRadius: "18px", textAlign: "left" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.5px" }}>Pet Type</p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: C.navy, margin: 0 }}>{pet.emoji} {pet.type}</p>
            </div>
            <div style={{ background: "#F1F5F9", padding: "16px", borderRadius: "18px", textAlign: "left" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.5px" }}>Status</p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: C.green, margin: 0 }}>Verified ✓</p>
            </div>
            <div style={{ background: "#F1F5F9", padding: "16px", borderRadius: "18px", textAlign: "left", gridColumn: "span 2" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, textTransform: "uppercase", marginBottom: "4px", letterSpacing: "0.5px" }}>Owner Details</p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: C.navy, margin: 0 }}>{pet.owner} • {pet.city}</p>
            </div>
          </div>

          <div style={{ 
            width: "100%", height: "2px", background: "linear-gradient(to right, transparent, #E2E8F0, transparent)",
            marginBottom: "32px"
          }} />

          <p style={{ fontSize: "13px", color: C.gray, fontWeight: 600, lineHeight: 1.6, marginBottom: "24px" }}>
            This QR ID helps anyone who finds your pet to contact you instantly and see important medical information.
          </p>

          <button style={{
            width: "100%", padding: "16px", borderRadius: "16px",
            background: C.navy, color: "white", fontSize: "16px", fontWeight: 800,
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
          }}>
            Contact Owner
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </button>
        </div>


      </div>
    </div>
  );
}
