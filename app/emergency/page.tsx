"use client";

import BottomNav from "../components/BottomNav";
import { useState } from "react";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0", orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4", red: "#DC2626", redBg: "#FEF2F2",
  blue: "#2879B0", blueBg: "#EBF5FF", purple: "#6D28D9",
};

const VETS = [
  { name: "Dr. Sonal Mehta", clinic: "PawCare Animal Hospital", distance: "0.8 km", status: "Open", rating: "4.9", phone: "+91 98200 12345" },
  { name: "Dr. Arun Sharma", clinic: "City Pet Clinic", distance: "1.4 km", status: "Open", rating: "4.7", phone: "+91 98765 54321" },
  { name: "Dr. Priya Iyer", clinic: "Happy Paws Veterinary", distance: "2.1 km", status: "Closed", rating: "4.8", phone: "+91 90009 11111" },
];

const TIPS = [
  { icon: "🩸", title: "Heavy Bleeding", text: "Apply gentle pressure with clean cloth. Do not remove cloth — add more on top." },
  { icon: "🤢", title: "Vomiting / Diarrhoea", text: "Withhold food for 2–4 hours. Keep water available. See vet if persists >12h." },
  { icon: "💊", title: "Possible Poisoning", text: "Note substance ingested. Do NOT induce vomiting unless directed by vet." },
  { icon: "🌡️", title: "Heatstroke", text: "Move to shade/cool area. Wet paws, ears, neck with cool (not ice cold) water." },
  { icon: "🦴", title: "Fracture / Limping", text: "Minimise movement. Do NOT straighten limb. Carry pet to vet immediately." },
];

export default function EmergencyPage() {
  const [aiText, setAiText] = useState("");
  const [response, setResponse] = useState("");

  const simulateAi = () => {
    if (!aiText.trim()) return;
    setResponse("Based on your description, this may indicate mild gastrointestinal irritation. Keep Bruno calm, withhold food for 2 hours, and ensure fresh water is available. If symptoms worsen or persist beyond 6 hours, visit a vet immediately. 🩺");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>

      {/* Emergency header */}
      <div style={{
        background: `linear-gradient(145deg, #CC1F1F, ${C.red})`,
        padding: "28px 20px 20px",
      }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.65)", margin: "0 0 4px" }}>Bruno is in trouble?</p>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "white", margin: 0 }}>Emergency Help 🆘</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", margin: "6px 0 0", fontWeight: 500 }}>Fast access to vets, first aid, and AI guidance.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 20px" }}>

        {/* SOS + Call buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <button style={{
            flex: 1, padding: "16px", borderRadius: "16px",
            background: C.red, color: "white", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            boxShadow: `0 8px 24px ${C.red}50`,
          }}>
            <span style={{ fontSize: "24px" }}>📞</span>
            <span style={{ fontSize: "13px", fontWeight: 800 }}>Call Nearest Vet</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>Dr. Sonal · 0.8 km</span>
          </button>
          <button style={{
            flex: 1, padding: "16px", borderRadius: "16px",
            background: C.orange, color: "white", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            boxShadow: `0 8px 24px ${C.orange}50`,
          }}>
            <span style={{ fontSize: "24px" }}>🗺️</span>
            <span style={{ fontSize: "13px", fontWeight: 800 }}>Navigate to Vet</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>Open in Maps</span>
          </button>
        </div>

        {/* AI Symptom Checker */}
        <div style={{
          background: C.surface, borderRadius: "18px", padding: "16px",
          boxShadow: "0 2px 12px rgba(18,16,58,0.06)", border: `1px solid ${C.grayLight}`,
          marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "12px",
              background: "linear-gradient(135deg, #12103A, #3D3A6B)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>🤖</div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: 0 }}>AI Symptom Checker</p>
              <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>Describe Bruno's symptoms</p>
            </div>
          </div>

          <textarea
            value={aiText}
            onChange={e => setAiText(e.target.value)}
            placeholder="e.g. Bruno is vomiting and seems lethargic since morning..."
            style={{
              width: "100%", background: C.bg, border: "none", borderRadius: "12px",
              padding: "12px", fontSize: "13px", fontFamily: "'Nunito', sans-serif",
              color: C.navy, resize: "none", minHeight: "80px", outline: "none",
              boxSizing: "border-box",
            }}
          />

          {response && (
            <div style={{
              background: C.blueBg, borderRadius: "12px", padding: "12px 14px",
              marginTop: "10px", border: `1px solid ${C.blue}30`,
            }}>
              <p style={{ fontSize: "12px", color: C.blue, fontWeight: 700, margin: "0 0 4px" }}>AI Response</p>
              <p style={{ fontSize: "12px", color: C.navy, margin: 0, lineHeight: 1.5 }}>{response}</p>
            </div>
          )}

          <button
            onClick={simulateAi}
            style={{
              width: "100%", marginTop: "10px", padding: "12px",
              background: `linear-gradient(135deg, #12103A, #3D3A6B)`,
              color: "white", border: "none", borderRadius: "12px",
              fontSize: "13px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Get AI Guidance →
          </button>
        </div>

        {/* Nearby Vets */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", marginBottom: "10px" }}>NEARBY VETS</p>
        {VETS.map((vet, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: "16px", padding: "14px 16px",
            marginBottom: "10px", boxShadow: "0 2px 12px rgba(18,16,58,0.05)",
            border: `1px solid ${C.grayLight}`,
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "14px",
              background: vet.status === "Open" ? C.greenBg : C.redBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", flexShrink: 0,
            }}>🏥</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{vet.name}</p>
              <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{vet.clinic}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: C.gray }}>{vet.distance}</span>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px",
                  background: vet.status === "Open" ? C.greenBg : C.redBg,
                  color: vet.status === "Open" ? C.green : C.red,
                }}>{vet.status}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: C.gray }}>⭐ {vet.rating}</span>
              </div>
            </div>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: vet.status === "Open" ? C.orangeBg : C.grayLight,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 15l4-4m0 0l1.5-6L15 3l-2 7.5-6 1.5z" stroke={vet.status === "Open" ? C.orange : C.gray} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}

        {/* First Aid Tips */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.8px", margin: "16px 0 10px" }}>QUICK FIRST AID</p>
        {TIPS.map((tip, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: "14px", padding: "12px 14px",
            marginBottom: "8px", boxShadow: "0 2px 8px rgba(18,16,58,0.04)",
            border: `1px solid ${C.grayLight}`,
            display: "flex", gap: "12px", alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{tip.icon}</span>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{tip.title}</p>
              <p style={{ fontSize: "12px", color: C.gray, margin: "3px 0 0", lineHeight: 1.5 }}>{tip.text}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
