"use client";

import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg: "transparent", surface: "rgba(255,255,255,0.75)", navy: "#12103A",
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
  {
    icon: "🩸", title: "Heavy Bleeding",
    text: "Apply gentle pressure with clean cloth. Do not remove cloth — add more on top.",
    detail: [
      "Use a clean cloth or bandage and apply firm, steady pressure on the wound.",
      "Do NOT lift the cloth — if soaked, place another on top.",
      "Elevate the injured limb above heart level if possible.",
      "Keep your pet calm and still to slow blood flow.",
      "Rush to a vet immediately — do not wait to see if it stops.",
    ],
    warning: "If bleeding doesn't slow within 5 minutes, go to emergency vet NOW.",
  },
  {
    icon: "🤢", title: "Vomiting / Diarrhoea",
    text: "Withhold food for 2–4 hours. Keep water available. See vet if persists >12h.",
    detail: [
      "Withhold food for 2–4 hours to rest the stomach.",
      "Always keep fresh water available to prevent dehydration.",
      "After 4 hours, offer a small amount of plain boiled chicken and rice.",
      "Monitor for blood in vomit or stool — this is serious.",
      "If your pet is lethargic or vomiting more than 3 times, see a vet.",
    ],
    warning: "If symptoms persist beyond 12 hours or worsen, visit a vet immediately.",
  },
  {
    icon: "💊", title: "Possible Poisoning",
    text: "Note substance ingested. Do NOT induce vomiting unless directed by vet.",
    detail: [
      "Stay calm — identify the substance ingested and the amount if possible.",
      "Do NOT induce vomiting unless explicitly instructed by a vet.",
      "Common pet toxins: grapes, chocolate, onions, xylitol, rat poison.",
      "Call a vet or poison helpline immediately with the substance name.",
      "Bring the packaging or a photo of it to the vet.",
    ],
    warning: "Time is critical with poisoning — call a vet before doing anything else.",
  },
  {
    icon: "🌡️", title: "Heatstroke",
    text: "Move to shade/cool area. Wet paws, ears, neck with cool (not ice cold) water.",
    detail: [
      "Move your pet to a cool, shaded or air-conditioned area immediately.",
      "Wet their paws, ears, and neck with cool (NOT ice cold) water.",
      "Offer small sips of water — do not force them to drink.",
      "Place a wet towel under them, not over them.",
      "Fan the pet while keeping them wet.",
    ],
    warning: "Heatstroke can be fatal within minutes. Get to a vet as fast as possible.",
  },
  {
    icon: "🦴", title: "Fracture / Limping",
    text: "Minimise movement. Do NOT straighten limb. Carry pet to vet immediately.",
    detail: [
      "Keep your pet as still and calm as possible.",
      "Do NOT try to straighten or splint the limb yourself.",
      "Gently wrap the area in a soft cloth to provide light support.",
      "Carry your pet — do not let them walk on the injured limb.",
      "Use a flat surface like a board to transport larger pets.",
    ],
    warning: "Any suspected fracture needs immediate X-ray and vet assessment.",
  },
];

export default function EmergencyPage() {
  const router = useRouter();
  const [petName, setPetName] = useState("Bruno");
  const [aiText, setAiText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTip, setSelectedTip] = useState<typeof TIPS[0] | null>(null);

  useEffect(() => {
    const g = (k: string) => localStorage.getItem(k) || sessionStorage.getItem(k);
    setPetName(g("petName") || "Bruno");
  }, []);

  const simulateAi = () => {
    if (!aiText.trim()) return;
    setResponse("");
    setLoading(true);
    setTimeout(() => {
      setResponse(`Based on your description ("${aiText.trim()}"), this may indicate mild gastrointestinal irritation. Keep ${petName} calm, withhold food for 2 hours, and ensure fresh water is available. If symptoms worsen or persist beyond 6 hours, visit a vet immediately. 🩺`);
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Emergency header */}
      <div style={{
        background: "linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0.85) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(220,38,38,0.15)",
        padding: "16px 20px 16px",
      }}>
        <button onClick={() => router.back()} style={{
          background: "none", border: "none", cursor: "pointer", display: "flex",
          alignItems: "center", gap: "6px", color: C.gray, fontSize: "13px",
          fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "12px",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke={C.gray} strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.red, boxShadow: `0 0 6px ${C.red}` }} />
          <p style={{ fontSize: "12px", fontWeight: 700, color: C.red, margin: 0, letterSpacing: "0.4px" }}>EMERGENCY</p>
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Emergency Help</h1>
        <p style={{ fontSize: "13px", color: C.gray, margin: "4px 0 0", fontWeight: 400 }}>Fast access to vets, first aid, and AI guidance.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>

        {/* SOS + Call buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <button style={{
            flex: 1, padding: "14px", borderRadius: "14px",
            background: C.redBg, color: C.navy,
            border: `1px solid rgba(220,38,38,0.2)`,
            borderLeft: `3px solid ${C.red}`,
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            boxShadow: "0 2px 10px rgba(220,38,38,0.08)",
          }}>
            <span style={{ fontSize: "22px" }}>📞</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.red }}>Call Nearest Vet</span>
            <span style={{ fontSize: "11px", color: C.gray }}>Dr. Sonal · 0.8 km</span>
          </button>
          <button style={{
            flex: 1, padding: "14px", borderRadius: "14px",
            background: C.orangeBg, color: C.navy,
            border: `1px solid rgba(249,115,22,0.2)`,
            borderLeft: `3px solid ${C.orange}`,
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            boxShadow: "0 2px 10px rgba(249,115,22,0.08)",
          }}>
            <span style={{ fontSize: "22px" }}>🗺️</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: C.orange }}>Navigate to Vet</span>
            <span style={{ fontSize: "11px", color: C.gray }}>Open in Maps</span>
          </button>
        </div>

        {/* AI Symptom Checker */}
        <div style={{ marginBottom: "16px" }}>
          {/* Header — matches dashboard AI card */}
          <div style={{
            background: "linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)",
            borderRadius: "18px 18px 0 0", padding: "14px 16px",
            display: "flex", alignItems: "center", gap: "14px",
            boxShadow: "0 4px 16px rgba(13,148,136,0.25)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -14, right: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -12, right: -8, width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="17" r="3" stroke="white" strokeWidth="2"/>
                <path d="M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "white", margin: 0 }}>AI Symptom Checker</p>
                <span style={{ fontSize: "9px", fontWeight: 800, color: "#CCFBF1", background: "rgba(204,251,241,0.2)", borderRadius: "6px", padding: "2px 6px", letterSpacing: "0.5px" }}>AI</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", fontWeight: 400, margin: 0 }}>Describe {petName}&apos;s symptoms</p>
            </div>
          </div>

          {/* Input body */}
          <div style={{
            background: C.surface, borderRadius: "0 0 18px 18px", padding: "14px 16px",
            border: `1px solid ${C.grayLight}`, borderTop: "none",
            boxShadow: "0 4px 16px rgba(18,16,58,0.06)",
          }}>
            <textarea
              value={aiText}
              onChange={e => setAiText(e.target.value)}
              placeholder={`e.g. ${petName} is vomiting and seems lethargic since morning...`}
              style={{
                width: "100%", background: "rgba(255,255,255,0.5)", border: `1px solid ${C.grayLight}`,
                borderRadius: "12px", padding: "12px", fontSize: "13px", fontFamily: "inherit",
                color: C.navy, resize: "none", minHeight: "80px", outline: "none",
                boxSizing: "border-box",
              }}
            />

            {(loading || response) && (
              <div style={{
                background: "rgba(13,148,136,0.07)", borderRadius: "12px", padding: "12px 14px",
                marginTop: "10px", border: "1px solid rgba(13,148,136,0.15)",
              }}>
                <p style={{ fontSize: "12px", color: "#0D9488", fontWeight: 700, margin: "0 0 4px" }}>AI Response</p>
                <p style={{ fontSize: "12px", color: loading ? C.gray : C.navy, margin: 0, lineHeight: 1.5 }}>
                  {loading ? "Analysing symptoms..." : response}
                </p>
              </div>
            )}

            <button
              onClick={simulateAi}
              disabled={loading}
              style={{
                width: "100%", marginTop: "10px", padding: "13px",
                background: loading ? C.grayLight : "linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)",
                color: loading ? C.gray : "white", border: "none", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700, cursor: loading ? "default" : "pointer",
                fontFamily: "inherit", boxShadow: loading ? "none" : "0 4px 14px rgba(13,148,136,0.3)",
              }}
            >
              {loading ? "Analysing..." : "Get AI Guidance →"}
            </button>
          </div>
        </div>

        {/* Nearby Vets */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.navy, letterSpacing: "0.8px", marginBottom: "10px" }}>NEARBY VETS</p>
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
              background: vet.status === "Open" ? "#FEF9C3" : C.grayLight,
              border: "1px solid rgba(0,0,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={C.navy} stroke={C.navy} strokeWidth="1"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
          </div>
        ))}

        {/* First Aid Tips */}
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.navy, letterSpacing: "0.8px", margin: "16px 0 10px" }}>QUICK FIRST AID</p>
        {TIPS.map((tip, i) => (
          <div key={i} onClick={() => setSelectedTip(tip)} style={{
            background: C.surface, borderRadius: "14px", padding: "12px 14px",
            marginBottom: "8px", boxShadow: "0 2px 8px rgba(18,16,58,0.04)",
            border: `1px solid ${C.grayLight}`,
            display: "flex", gap: "12px", alignItems: "center", cursor: "pointer",
          }}>
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{tip.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{tip.title}</p>
              <p style={{ fontSize: "12px", color: C.gray, margin: "2px 0 0" }}>{tip.text.slice(0, 48)}…</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M5 3l4 4-4 4" stroke={C.gray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Tip detail modal */}
      {selectedTip && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end" }}
          onClick={() => setSelectedTip(null)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{
            position: "relative", width: "100%", maxWidth: "430px", margin: "0 auto",
            background: "#fff", borderRadius: "24px 24px 0 0",
            padding: "20px 20px 100px", maxHeight: "80vh", overflowY: "auto",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: "36px", height: "4px", background: C.grayLight, borderRadius: "10px", margin: "0 auto 16px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "32px" }}>{selectedTip.icon}</span>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.navy, margin: 0 }}>{selectedTip.title}</h2>
            </div>

            <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "10px" }}>STEPS TO FOLLOW</p>
            {selectedTip.detail.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                  background: C.orangeBg, border: `1px solid rgba(249,115,22,0.2)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: C.orange }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: "13px", color: C.navy, margin: 0, lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}

            <div style={{
              marginTop: "16px", background: C.redBg, borderRadius: "12px",
              padding: "12px 14px", border: `1px solid rgba(220,38,38,0.15)`,
              display: "flex", gap: "10px", alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "16px" }}>⚠️</span>
              <p style={{ fontSize: "12px", color: C.red, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{selectedTip.warning}</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
