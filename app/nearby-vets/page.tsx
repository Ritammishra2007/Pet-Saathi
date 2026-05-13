"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";

const C = {
  bg: "transparent", surface: "#FFFFFF", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
  teal: "#0D9488", tealBg: "#F0FDFA",
  blue: "#2879B0", blueBg: "#EBF5FF",
};

const VETS = [
  { name: "PetCare Clinic",             address: "Andheri West · 0.8 km", rating: "4.8", reviews: "312", phone: "+919820111234", timing: "9 AM – 9 PM",  badge: "Open Now",       badgeColor: C.green,  badgeBg: C.greenBg,  speciality: "General + Surgery"  },
  { name: "Happy Paws Vet",             address: "Bandra · 2.1 km",       rating: "4.6", reviews: "198", phone: "+919920022345", timing: "10 AM – 8 PM", badge: "Microchip",      badgeColor: C.teal,   badgeBg: C.tealBg,   speciality: "General + Dentistry" },
  { name: "Dr. Mehra's Animal Hospital",address: "Juhu · 3.5 km",         rating: "4.9", reviews: "541", phone: "+919833455678", timing: "8 AM – 10 PM", badge: "Top Rated",      badgeColor: C.orange, badgeBg: C.orangeBg, speciality: "All Specialities"   },
  { name: "VetConnect Mumbai",          address: "Powai · 4.2 km",        rating: "4.5", reviews: "134", phone: "+919876543210", timing: "9 AM – 7 PM",  badge: "Home Visits",    badgeColor: C.blue,   badgeBg: C.blueBg,   speciality: "Home Visit Available"},
];

const FILTERS = ["All", "Open Now", "Home Visits", "Microchip", "Top Rated"];

export default function NearbyVetsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = VETS.filter(v =>
    (activeFilter === "All" || v.badge === activeFilter) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.address.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      <div style={{ background: "transparent", padding: "20px 20px 16px", borderBottom: "none" }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.navy, fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.navy} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: "0 0 14px" }}>Nearby Vets</h1>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: C.bg, borderRadius: "14px", padding: "10px 14px", marginBottom: "12px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={C.gray} strokeWidth="2"/><path d="M16.5 16.5l3.5 3.5" stroke={C.gray} strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clinics or area..." style={{ flex: 1, border: "none", background: "transparent", fontSize: "14px", fontWeight: 600, color: C.navy, fontFamily: "inherit", outline: "none" }} />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? C.navy : C.bg, color: activeFilter === f ? "white" : C.gray, border: "none", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Mock Map */}
      <div style={{ height: "200px", background: "#E8E7F0", margin: "0 16px 12px", borderRadius: "18px", position: "relative", overflow: "hidden", border: `1px solid ${C.grayLight}`, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        {/* Simplified Map UI */}
        <div style={{ position: "absolute", inset: 0, background: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/72.8777,19.0760,12,0/400x200?access_token=pk.eyJ1IjoiZGV2LW1hcGJveCIsImEiOiJjbTF4eXh4eHwwMHg0MmtzZ3h4eHh4eHh4In0')", backgroundSize: "cover" }} />
        
        {/* Pulse current location */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <div style={{ width: "12px", height: "12px", background: "#3B82F6", borderRadius: "50%", border: "2px solid white", boxShadow: "0 0 10px rgba(59,130,246,0.5)" }} />
          <div style={{ position: "absolute", inset: -8, border: "2px solid #3B82F6", borderRadius: "50%", opacity: 0.4, animation: "pulse 2s infinite" }} />
        </div>

        {/* Vet Pins */}
        {filtered.map((v, i) => (
          <div key={i} style={{ 
            position: "absolute", 
            top: `${20 + (i * 25)}%`, 
            left: `${30 + (i * 15)}%`,
            display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <div style={{ background: "white", padding: "4px 8px", borderRadius: "8px", fontSize: "10px", fontWeight: 800, color: C.navy, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "2px", whiteSpace: "nowrap" }}>
              {v.name}
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={v.badgeColor} stroke="white" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
        ))}

        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.4; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        `}</style>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {filtered.map((vet, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: "18px", padding: "16px", border: `1px solid ${C.grayLight}`, boxShadow: "0 2px 10px rgba(18,16,58,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: 0 }}>{vet.name}</p>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: vet.badgeBg, color: vet.badgeColor }}>{vet.badge}</span>
                </div>
                <p style={{ fontSize: "12px", color: C.gray, margin: "0 0 2px" }}>📍 {vet.address}</p>
                <p style={{ fontSize: "12px", color: C.gray, margin: 0 }}>🏥 {vet.speciality}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>⭐ {vet.rating}</p>
                <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{vet.reviews} reviews</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.gray} strokeWidth="1.8"/><path d="M12 7v5l2.5 2" stroke={C.gray} strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, margin: 0 }}>{vet.timing}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href={`tel:${vet.phone}`} style={{ flex: 1, padding: "11px", borderRadius: "12px", background: C.greenBg, border: `1px solid #BBF7D0`, color: C.green, fontSize: "13px", fontWeight: 800, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "inherit" }}>
                📞 Call
              </a>
              <button style={{ flex: 2, padding: "11px", borderRadius: "12px", background: C.navy, border: "none", color: "white", fontSize: "13px", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                Book Appointment →
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
