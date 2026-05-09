"use client";

import BottomNav from "../components/BottomNav";
import { useState } from "react";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A", gray: "#8A8A9A",
  grayLight: "#E8E7F0", orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4", blue: "#2879B0", blueBg: "#EBF5FF",
  teal: "#0D9488", tealBg: "#F0FDFA", red: "#DC2626", redBg: "#FEF2F2",
};

const MEALS = [
  {
    time: "Morning", emoji: "🌅",
    items: [
      { name: "Royal Canin Puppy", amount: "1 cup (120g)", note: "Main meal", color: C.orange, bg: C.orangeBg },
      { name: "Fresh Water", amount: "Unlimited", note: "Always available", color: C.blue, bg: C.blueBg },
    ],
  },
  {
    time: "Afternoon", emoji: "☀️",
    items: [
      { name: "Boiled Chicken", amount: "50g", note: "Protein snack", color: C.teal, bg: C.tealBg },
      { name: "Carrot sticks", amount: "2-3 pieces", note: "Healthy treat", color: C.green, bg: C.greenBg },
    ],
  },
  {
    time: "Evening", emoji: "🌙",
    items: [
      { name: "Royal Canin Puppy", amount: "1 cup (120g)", note: "Main meal", color: C.orange, bg: C.orangeBg },
      { name: "Fish Oil Supplement", amount: "1 capsule", note: "Omega-3", color: C.blue, bg: C.blueBg },
    ],
  },
];

const AVOID = [
  { name: "Chocolate", reason: "Toxic — theobromine poisoning", emoji: "🍫" },
  { name: "Onion & Garlic", reason: "Damages red blood cells", emoji: "🧅" },
  { name: "Grapes & Raisins", reason: "Can cause kidney failure", emoji: "🍇" },
  { name: "Xylitol", reason: "Found in gum, very toxic", emoji: "🍬" },
];

const TIPS = [
  { icon: "💧", tip: "Ensure fresh water is always accessible, especially in Indian summers." },
  { icon: "⚖️", tip: "Weigh food portions — free feeding leads to obesity in Retrievers." },
  { icon: "🌡️", tip: "Reduce meal size in peak summer. Dogs eat less in heat." },
  { icon: "🥩", tip: "Home-cooked meals? Consult your vet for a balanced recipe." },
];

const TABS = ["Schedule", "Avoid", "Tips"];

export default function NutritionPage() {
  const [tab, setTab] = useState("Schedule");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.grayLight}` }}>
        <div style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, marginBottom: "2px" }}>Bruno · Golden Retriever · 1yr</p>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Nutrition Guide</h1>
        </div>

        {/* Calorie summary */}
        <div style={{ display: "flex", gap: "10px", padding: "14px 20px 0" }}>
          {[
            { label: "Daily Calories", value: "900 kcal", color: C.orange, bg: C.orangeBg },
            { label: "Protein", value: "28%", color: C.teal, bg: C.tealBg },
            { label: "Meals/Day", value: "2", color: C.green, bg: C.greenBg },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: s.bg, borderRadius: "12px", padding: "10px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: "10px", fontWeight: 600, color: s.color, margin: 0, opacity: 0.8 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", marginTop: "14px", borderBottom: `2px solid ${C.grayLight}`, marginLeft: 0, paddingLeft: "20px" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 16px 10px", fontSize: "13px",
              fontWeight: tab === t ? 800 : 600,
              color: tab === t ? C.orange : C.gray,
              borderBottom: tab === t ? `2px solid ${C.orange}` : "2px solid transparent",
              marginBottom: "-2px", fontFamily: "'Nunito', sans-serif",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 20px" }}>

        {tab === "Schedule" && (
          <>
            {/* Vet tip banner */}
            <div style={{
              background: `linear-gradient(135deg, ${C.teal}, #0EA5E9)`,
              borderRadius: "16px", padding: "14px 16px", marginBottom: "16px",
              display: "flex", gap: "12px", alignItems: "center",
              boxShadow: `0 6px 20px ${C.teal}30`,
            }}>
              <span style={{ fontSize: "26px" }}>🩺</span>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.8)", margin: 0 }}>VET RECOMMENDED</p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "white", margin: 0, marginTop: "2px" }}>
                  Feed twice daily at fixed times for digestive health.
                </p>
              </div>
            </div>

            {MEALS.map((meal, mi) => (
              <div key={mi} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{meal.emoji}</span>
                  <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{meal.time}</p>
                </div>
                {meal.items.map((item, ii) => (
                  <div key={ii} style={{
                    background: C.surface, borderRadius: "14px", padding: "12px 14px",
                    marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px",
                    boxShadow: "0 2px 8px rgba(18,16,58,0.05)", border: `1px solid ${C.grayLight}`,
                  }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "12px",
                      background: item.bg, display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0 }}>{item.name}</p>
                      <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{item.note}</p>
                    </div>
                    <span style={{
                      fontSize: "11px", fontWeight: 700, color: item.color,
                      background: item.bg, padding: "4px 10px", borderRadius: "20px",
                    }}>{item.amount}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {tab === "Avoid" && (
          <>
            <div style={{
              background: C.redBg, border: `1px solid #FECACA`, borderRadius: "14px",
              padding: "12px 14px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center",
            }}>
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <p style={{ fontSize: "12px", color: C.red, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                These foods are dangerous for dogs. Keep them completely out of reach.
              </p>
            </div>
            {AVOID.map((item, i) => (
              <div key={i} style={{
                background: C.surface, borderRadius: "14px", padding: "14px 16px",
                marginBottom: "10px", display: "flex", alignItems: "center", gap: "14px",
                boxShadow: "0 2px 8px rgba(18,16,58,0.05)", border: `1px solid ${C.grayLight}`,
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px", background: C.redBg,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0,
                }}>{item.emoji}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: 0 }}>{item.name}</p>
                  <p style={{ fontSize: "12px", color: C.red, margin: 0, fontWeight: 500 }}>{item.reason}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "Tips" && (
          <>
            {TIPS.map((t, i) => (
              <div key={i} style={{
                background: C.surface, borderRadius: "14px", padding: "14px 16px",
                marginBottom: "10px", display: "flex", gap: "14px", alignItems: "flex-start",
                boxShadow: "0 2px 8px rgba(18,16,58,0.05)", border: `1px solid ${C.grayLight}`,
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "12px", background: C.tealBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", flexShrink: 0,
                }}>{t.icon}</div>
                <p style={{ fontSize: "13px", color: C.navy, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{t.tip}</p>
              </div>
            ))}
            <div style={{
              background: `linear-gradient(135deg, ${C.green}, #059669)`,
              borderRadius: "16px", padding: "16px", marginTop: "6px",
              boxShadow: `0 6px 20px ${C.green}30`,
            }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "white", margin: 0 }}>🩺 Book a Nutrition Consultation</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", margin: "4px 0 12px" }}>
                Get a personalised diet plan from a certified vet nutritionist.
              </p>
              <button style={{
                background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "10px", padding: "8px 16px", color: "white",
                fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito', sans-serif",
              }}>Find a Nutritionist →</button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
