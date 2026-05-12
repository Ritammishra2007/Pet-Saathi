"use client";

import { useState, useRef, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { useRouter } from "next/navigation";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A", gray: "#8A8A9A",
  grayLight: "#E8E7F0", teal: "#0D9488", tealBg: "#F0FDFA",
  orange: "#F97316", orangeBg: "#FFF4EC",
};

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "Why is Bruno scratching so much?",
  "Is it safe to feed eggs to my dog?",
  "How often should I bathe a Golden Retriever?",
  "Bruno seems lethargic today — should I worry?",
];

const MOCK_RESPONSES: Record<string, string> = {
  default: "That's a great question about Bruno! Based on general veterinary guidelines, I'd recommend consulting your vet for a personalised assessment. In the meantime, keep monitoring his behaviour and ensure he stays hydrated. 🐾",
  scratch: "Excessive scratching in Golden Retrievers can be due to seasonal allergies, fleas, dry skin, or food sensitivities. Check for redness or rashes on the skin. If it persists more than 3 days, visit your vet. A fish-oil supplement can help with dry skin. 🩺",
  egg: "Yes! Cooked eggs are safe and nutritious for dogs — they're an excellent source of protein and amino acids. Avoid raw eggs (risk of Salmonella) and never add salt or seasoning. One egg every 2-3 days is a good amount for Bruno's size. ✅",
  bathe: "Golden Retrievers should be bathed every 4–6 weeks. More frequent bathing can strip natural oils from their coat. Use a dog-specific shampoo. Brush before and after bathing to prevent matting. Bruno's double coat needs thorough drying too! 🛁",
  lethargic: "Lethargy in dogs can be caused by heat, over-exercise, mild stomach upset, or something more serious. Check if he's eating and drinking normally. If lethargy lasts more than 24 hours, is accompanied by vomiting, or he refuses food — visit your vet immediately. 🚨",
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
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm Bruno's AI Health Assistant. Ask me anything about his diet, symptoms, behaviour, or general care. 🐾" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #0D9488, #0EA5E9)`,
        padding: "16px 20px 20px",
        boxShadow: "0 4px 20px rgba(13,148,136,0.25)",
      }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 700, fontFamily: "inherit", padding: 0, marginBottom: "12px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="rgba(255,255,255,0.8)" strokeWidth="2.2" strokeLinecap="round"/></svg>
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "14px",
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="17" r="3" stroke="white" strokeWidth="2"/>
              <path d="M12 16v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 800, color: "white", margin: 0 }}>AI Health Assistant</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#86EFAC" }} />
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", margin: 0, fontWeight: 600 }}>Online · Powered by Claude AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>

        {/* Suggestions — only when no user messages yet */}
        {messages.length === 1 && (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "8px" }}>QUICK QUESTIONS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  background: C.surface, border: `1px solid ${C.grayLight}`,
                  borderRadius: "12px", padding: "10px 14px",
                  textAlign: "left", cursor: "pointer",
                  fontSize: "12px", fontWeight: 600, color: C.navy,
                  fontFamily: "inherit",
                  boxShadow: "0 2px 8px rgba(18,16,58,0.04)",
                }}>
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "12px",
          }}>
            {msg.role === "ai" && (
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%",
                background: `linear-gradient(135deg, #0D9488, #0EA5E9)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", flexShrink: 0, marginRight: "8px", alignSelf: "flex-end",
              }}>🩺</div>
            )}
            <div style={{
              maxWidth: "75%",
              background: msg.role === "user"
                ? `linear-gradient(135deg, #0D9488, #0EA5E9)`
                : C.surface,
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 14px",
              boxShadow: "0 2px 10px rgba(18,16,58,0.08)",
              border: msg.role === "ai" ? `1px solid ${C.grayLight}` : "none",
            }}>
              <p style={{
                fontSize: "13px", fontWeight: 500, margin: 0, lineHeight: 1.5,
                color: msg.role === "user" ? "white" : C.navy,
              }}>{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: `linear-gradient(135deg, #0D9488, #0EA5E9)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
            }}>🩺</div>
            <div style={{
              background: C.surface, borderRadius: "18px 18px 18px 4px",
              padding: "12px 16px", border: `1px solid ${C.grayLight}`,
              display: "flex", gap: "4px", alignItems: "center",
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: C.teal, opacity: 0.6,
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: C.surface, borderTop: `1px solid ${C.grayLight}`,
        padding: "10px 16px 12px",
        marginBottom: "68px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: C.bg, borderRadius: "16px", padding: "8px 8px 8px 14px",
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Ask about Bruno's health..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: "13px", fontFamily: "inherit", color: C.navy,
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              width: "36px", height: "36px", borderRadius: "12px",
              background: input.trim() ? `linear-gradient(135deg, #0D9488, #0EA5E9)` : C.grayLight,
              border: "none", cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p style={{ fontSize: "10px", color: C.gray, textAlign: "center", margin: "6px 0 0", fontWeight: 500 }}>
          AI responses are for guidance only. Always consult your vet for medical decisions.
        </p>
      </div>

      <BottomNav />

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
