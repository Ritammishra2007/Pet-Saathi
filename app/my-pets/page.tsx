"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "../components/BottomNav";

const C = {
  bg: "transparent", surface: "rgba(255,255,255,0.75)", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0",
  orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4",
  red: "#DC2626",
};

const PETS = [
  { name: "Bruno", breed: "Golden Retriever", age: "2 yrs", gender: "Male", img: "/profile_picture.jpg", active: true },
];

export default function MyPetsPage() {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBreed, setNewBreed] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      <div style={{ background: C.surface, padding: "20px 20px 16px", borderBottom: `1px solid ${C.grayLight}` }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: C.gray, fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={C.gray} strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>My Pets</h1>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 24px" }}>

        {PETS.map((pet, i) => (
          <div key={i} style={{ background: C.surface, borderRadius: "18px", padding: "16px", border: `1px solid ${C.grayLight}`, boxShadow: "0 2px 10px rgba(18,16,58,0.05)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "18px", overflow: "hidden" }}>
                <Image src={pet.img} alt={pet.name} width={64} height={64} style={{ objectFit: "cover", objectPosition: "center 20%", width: "100%", height: "100%" }} />
              </div>
              {pet.active && <div style={{ position: "absolute", bottom: -2, right: -2, width: "14px", height: "14px", borderRadius: "50%", background: C.green, border: "2px solid white" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "16px", fontWeight: 800, color: C.navy, margin: "0 0 2px" }}>{pet.name}</p>
              <p style={{ fontSize: "12px", color: C.gray, margin: 0 }}>{pet.breed} · {pet.age} · {pet.gender}</p>
            </div>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <div style={{ background: C.bg, borderRadius: "10px", padding: "8px 12px", fontSize: "12px", fontWeight: 700, color: C.navy }}>View →</div>
            </Link>
          </div>
        ))}

        {/* Add pet card */}
        <button onClick={() => setShowAdd(true)} style={{ width: "100%", background: C.surface, border: `1.5px dashed ${C.orange}`, borderRadius: "18px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "inherit" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: C.orangeBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <p style={{ fontSize: "14px", fontWeight: 800, color: C.orange, margin: 0 }}>Add Another Pet</p>
          <p style={{ fontSize: "12px", color: C.gray, margin: 0 }}>Dogs, cats, birds and more</p>
        </button>
      </div>

      {/* Add pet bottom sheet */}
      {showAdd && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div onClick={() => setShowAdd(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "24px 24px 0 0", padding: "24px 20px 100px" }}>
            <div style={{ width: "40px", height: "4px", background: C.grayLight, borderRadius: "10px", margin: "0 auto 20px" }} />
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.navy, margin: "0 0 20px" }}>Add New Pet</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 800, color: C.gray, display: "block", marginBottom: "6px" }}>PET NAME *</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Mochi, Luna" style={{ width: "100%", padding: "13px 16px", borderRadius: "14px", border: `1.5px solid ${C.grayLight}`, fontSize: "15px", fontWeight: 600, color: C.navy, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 800, color: C.gray, display: "block", marginBottom: "6px" }}>BREED (OPTIONAL)</label>
                <input value={newBreed} onChange={e => setNewBreed(e.target.value)} placeholder="e.g. Persian, Labrador" style={{ width: "100%", padding: "13px 16px", borderRadius: "14px", border: `1.5px solid ${C.grayLight}`, fontSize: "15px", fontWeight: 600, color: C.navy, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => setShowAdd(false)} disabled={!newName} style={{ width: "100%", padding: "15px", borderRadius: "14px", background: newName ? C.navy : C.grayLight, border: "none", color: newName ? "white" : C.gray, fontSize: "15px", fontWeight: 800, cursor: newName ? "pointer" : "default", fontFamily: "inherit", marginTop: "4px" }}>
                Continue to Setup →
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
