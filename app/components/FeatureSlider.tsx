"use client";

import { useState, useEffect, useCallback } from "react";

const FEATURES = [
  {
    icon: "💉",
    title: "Vaccination Tracker",
    tagline: "Never miss a shot that matters.",
    description:
      "Because every vaccine is a promise you make to them — a future full of tail wags, purrs, and healthy mornings.",
    gradient: "from-orange-100 to-amber-50",
    accent: "#FF8A1F",
    badge: "Health",
  },
  {
    icon: "🥣",
    title: "Nutrition Guide",
    tagline: "Feed them right. Love them longer.",
    description:
      "The right meal at the right age is the most quiet, powerful act of love — and your pet feels every bite of it.",
    gradient: "from-green-50 to-emerald-50",
    accent: "#16A34A",
    badge: "Nutrition",
  },
  {
    icon: "👥",
    title: "Community Support",
    tagline: "You're never alone in this journey.",
    description:
      "Thousands of pet parents who understand the 3 AM worry, the first vet visit tears, and the joy of a healthy happy pet.",
    gradient: "from-purple-50 to-lavender-50",
    accent: "#8B5CF6",
    badge: "Community",
  },
  {
    icon: "🤖",
    title: "AI Pet Assistant",
    tagline: "Answers at 2 AM. Guidance always.",
    description:
      "Ask anything — symptoms, feeding schedules, vaccine doubts. Your pet's care companion, available every single moment.",
    gradient: "from-blue-50 to-sky-50",
    accent: "#0EA5E9",
    badge: "AI",
  },
  {
    icon: "🏷️",
    title: "Microchip Verification",
    tagline: "Their identity. Your peace of mind.",
    description:
      "Because the thought of losing them is unbearable — microchip verification ensures they always find their way home.",
    gradient: "from-pink-50 to-rose-50",
    accent: "#EC4899",
    badge: "Safety",
  },
  {
    icon: "📋",
    title: "30-Day Care Checklist",
    tagline: "The first month is everything.",
    description:
      "Guided day-by-day care for newborns — because those early weeks shape a lifetime of health, trust, and happiness.",
    gradient: "from-yellow-50 to-orange-50",
    accent: "#F59E0B",
    badge: "Newborn",
  },
  {
    icon: "👨‍⚕️",
    title: "Vet Consultation",
    tagline: "Expert care, just a tap away.",
    description:
      "Find trusted vets nearby, book appointments in seconds, and never second-guess a symptom alone again.",
    gradient: "from-teal-50 to-cyan-50",
    accent: "#0D9488",
    badge: "Consultation",
  },
];

const INTERVAL = 3800;

export default function FeatureSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % FEATURES.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const f = FEATURES[current];

  return (
    <div id="features" className="w-full flex flex-col items-center gap-6">
      {/* Slide card */}
      <div
        key={animKey}
        className="slide-enter w-full max-w-xl relative overflow-hidden"
        style={{
          borderRadius: "28px",
          background: `linear-gradient(145deg, rgba(255,253,252,0.82), rgba(255,243,238,0.7))`,
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1.5px solid rgba(255,255,255,0.82)",
          boxShadow:
            "0 20px 60px rgba(43,29,22,0.10), inset 0 1px 0 rgba(255,255,255,0.95)",
          padding: "36px 36px 32px",
          cursor: "pointer",
          minHeight: "220px",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Badge */}
        <span
          className="absolute top-5 right-5 text-xs font-700 px-3 py-1 rounded-full"
          style={{
            background: `${f.accent}18`,
            color: f.accent,
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.5px",
          }}
        >
          {f.badge}
        </span>

        {/* Blob glow */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
          style={{
            background: f.accent,
            filter: "blur(50px)",
            opacity: 0.12,
          }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
          style={{
            background: `${f.accent}15`,
            border: `1.5px solid ${f.accent}25`,
            boxShadow: `0 4px 16px ${f.accent}20`,
          }}
        >
          {f.icon}
        </div>

        {/* Title */}
        <h3
          className="text-xl mb-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: "#2B1D16",
            lineHeight: 1.25,
          }}
        >
          {f.title}
        </h3>

        {/* Tagline */}
        <p
          className="text-sm font-700 mb-3"
          style={{ color: f.accent, fontWeight: 700 }}
        >
          {f.tagline}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#5B5652", fontWeight: 500, maxWidth: "380px" }}
        >
          {f.description}
        </p>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${f.accent}, ${f.accent}88)`,
            animation: `growBar ${INTERVAL}ms linear`,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {FEATURES.map((_, i) => (
          <button
            key={i}
            className="dot rounded-full transition-all"
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background:
                i === current
                  ? "linear-gradient(135deg, #FF8A1F, #FFB347)"
                  : "rgba(43,29,22,0.15)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={`Go to ${FEATURES[i].title}`}
          />
        ))}
      </div>

      {/* Feature name hints */}
      <p
        className="text-xs font-600"
        style={{ color: "#A8A29E", fontWeight: 600 }}
      >
        {current + 1} / {FEATURES.length} features
      </p>

      <style jsx>{`
        @keyframes growBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
