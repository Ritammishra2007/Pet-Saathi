"use client";

import { useState, useRef, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { useRouter } from "next/navigation";
import Image from "next/image";

const C = {
  bg: "#F8F9FA",
  surface: "#FFFFFF",
  navy: "#12103A",
  gray: "#8A8A9A",
  grayLight: "#E8E7F0",
  teal: "#0D9488",
  tealBg: "#F0FDFA",
  orange: "#F97316",
  orangeBg: "#FFF4EC",
  accent: "linear-gradient(135deg, #0D9488 0%, #0EA5E9 100%)",
};

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "Why is my pet scratching so much?",
  "Is it safe to feed eggs to my dog?",
  "How often should I bathe them?",
  "They seem lethargic today — should I worry?",
];

const MOCK_RESPONSES: Record<string, string> = {
  default: "That's a great question! Based on general veterinary guidelines, I'd recommend consulting your vet for a personalised assessment. In the meantime, keep monitoring behaviour and ensure hydration. 🐾",
  scratch: "Excessive scratching can be due to seasonal allergies, fleas, dry skin, or food sensitivities. Check for redness or rashes on the skin. If it persists more than 3 days, visit your vet. A fish-oil supplement can help with dry skin. 🩺",
  egg: "Yes! Cooked eggs are safe and nutritious for dogs — they're an excellent source of protein and amino acids. Avoid raw eggs (risk of Salmonella) and never add salt or seasoning. One egg every 2-3 days is a good amount for medium sizes. ✅",
  bathe: "Dogs should generally be bathed every 4–6 weeks. More frequent bathing can strip natural oils from their coat. Use a dog-specific shampoo. Brush before and after bathing to prevent matting. Thorough drying is essential! 🛁",
  lethargic: "Lethargy can be caused by heat, over-exercise, mild stomach upset, or something more serious. Check if eating/drinking is normal. If lethargy lasts more than 24 hours, is accompanied by vomiting, or refusal of food — visit your vet immediately. 🚨",
};

function getResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("scratch")) return MOCK_RESPONSES.scratch;
  if (t.includes("egg")) return MOCK_RESPONSES.egg;
  if (t.includes("bathe") || t.includes("bath")) return MOCK_RESPONSES.bathe;
  if (t.includes("lethargic") || t.includes("tired") || t.includes("lazy")) return MOCK_RESPONSES.lethargic;
  return MOCK_RESPONSES.default;
}

export default function AssistantPage() {
  const router = useRouter();
  const [petName, setPetName] = useState("your pet");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = (k: string) => localStorage.getItem(k) || sessionStorage.getItem(k);
    const name = g("petName") || "your pet";
    setPetName(name);
    setMessages([{ role: "ai", text: `Hi! I'm ${name}'s AI Health Assistant. Ask me anything about ${name}'s diet, symptoms, behaviour, or general care. 🐾` }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: getResponse(text) }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Be Vietnam Pro', sans-serif" }}>

      {/* Premium Header */}
      <div style={{
        background: C.accent,
        padding: "16px 20px 24px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(13, 148, 136, 0.2)",
      }}>
        {/* Decorative Blobs */}
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(20px)" }} />
        <div style={{ position: "absolute", bottom: "-30px", left: "-10px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", filter: "blur(15px)" }} />

        <button onClick={() => router.back()} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "10px", padding: "6px 10px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "6px", color: "white",
          fontSize: "12px", fontWeight: 700, fontFamily: "inherit",
          marginBottom: "16px", backdropFilter: "blur(10px)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="3" strokeLinecap="round" /></svg>
          Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "50px", height: "50px", borderRadius: "16px",
            background: "rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4)",
          }}>
            <div style={{ width: "36px", height: "36px", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <img
                src="/ai-logo.png"
                alt="AI"
                style={{ width: "36px", height: "44px", objectFit: "cover", objectPosition: "top center", filter: "invert(1)" }}
              />
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.5px" }}>AI Health Assistant</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80" }} />
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", margin: 0, fontWeight: 600 }}>Active · Expert Guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 120px" }}>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "1px", marginBottom: "12px", textAlign: "center" }}>QUICK SUGGESTIONS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  background: "white", border: `1px solid ${C.grayLight}`,
                  borderRadius: "16px", padding: "14px 16px",
                  textAlign: "left", cursor: "pointer",
                  fontSize: "13px", fontWeight: 600, color: C.navy,
                  fontFamily: "inherit",
                  boxShadow: "0 4px 12px rgba(18,16,58,0.03)",
                  transition: "transform 0.2s",
                }}>
                  ✨ {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "16px",
            gap: "10px",
          }}>
            {msg.role === "ai" && (
              <div style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden", border: `1px solid ${C.grayLight}`,
              }}>
                <img src="/ai-logo.png" alt="AI" style={{ width: "24px", height: "30px", objectFit: "cover", objectPosition: "top center" }} />
              </div>
            )}
            <div style={{
              maxWidth: "80%",
              background: msg.role === "user" ? C.teal : "white",
              color: msg.role === "user" ? "white" : C.navy,
              borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "4px 20px 20px 20px",
              padding: "12px 16px",
              boxShadow: "0 4px 15px rgba(18,16,58,0.06)",
              border: msg.role === "ai" ? `1px solid ${C.grayLight}` : "none",
            }}>
              <p style={{
                fontSize: "14px", fontWeight: 500, margin: 0, lineHeight: 1.55,
              }}>{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.grayLight}` }}>
              <img src="/ai-logo.png" alt="AI" style={{ width: "24px", height: "30px", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            <div style={{
              background: "white", borderRadius: "4px 20px 20px 20px",
              padding: "14px 18px", border: `1px solid ${C.grayLight}`,
              display: "flex", gap: "6px", alignItems: "center",
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: C.teal, opacity: 0.5,
                  animation: `bounce 1.4s infinite ease-in-out ${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div style={{
        position: "fixed",
        bottom: "68px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "12px 16px 20px",
        borderTop: `1px solid ${C.grayLight}`,
        zIndex: 10,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "#F1F5F9", borderRadius: "20px", padding: "6px 6px 6px 16px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder={`Ask about ${petName}...`}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: "14px", fontWeight: 500, color: C.navy,
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              width: "40px", height: "40px", borderRadius: "16px",
              background: input.trim() ? C.teal : C.grayLight,
              border: "none", cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p style={{ fontSize: "10px", color: C.gray, textAlign: "center", marginTop: "8px", fontWeight: 600, letterSpacing: "0.3px" }}>
          Guidance only. For emergencies, contact a vet.
        </p>
      </div>

      <BottomNav />

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.3; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
