"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneFrame from "./PhoneFrame";
import { preserveDashboardData } from "./DashboardScreen";

/* ─── Types ─── */
type Step = "auth" | "phone" | "otp" | "petType" | "petDetails" | "newPetQ" | "checklistQ" | "welcome";

interface PetData {
  type: string;
  typeEmoji: string;
  name: string;
  breed: string;
  ageValue: string;
  ageUnit: "weeks" | "months" | "years";
  isNewPet: boolean | null;
  wantsChecklist: boolean | null;
}

/* ─── Pet types ─── */
const PET_TYPES = [
  { label: "Dog", emoji: "🐶", image: "/puppy2.webp" },
  { label: "Cat", emoji: "🐱", image: "/cat_picture.jpg" },
  { label: "Other", emoji: "🐾", image: "/rabbit.webp" },
];

const OTHER_PETS = [
  { label: "Bird", emoji: "🐦" },
  { label: "Rabbit", emoji: "🐰" },
  { label: "Fish", emoji: "🐠" },
  { label: "Hamster", emoji: "🐹" },
  { label: "Turtle", emoji: "🐢" },
  { label: "Guinea Pig", emoji: "🐾" },
  { label: "Snake", emoji: "🐍" },
  { label: "Parrot", emoji: "🦜" },
  { label: "Lizard", emoji: "🦎" },
  { label: "Ferret", emoji: "🐾" },
];

/* ─── Progress map ─── */
const STEP_INDEX: Record<Step, number> = {
  auth: 0, phone: 1, otp: 2, petType: 3, petDetails: 4,
  newPetQ: 5, checklistQ: 6, welcome: 7,
};
const TOTAL_STEPS = 7;

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("auth");
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [pet, setPet] = useState<PetData>({
    type: "", typeEmoji: "", name: "", breed: "", ageValue: "", ageUnit: "months",
    isNewPet: null, wantsChecklist: null,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otherSearch, setOtherSearch] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const go = (next: Step, direction: "forward" | "back" = "forward") => {
    setDir(direction);
    setStep(next);
  };

  /* ── Send OTP (mock) ── */
  const sendOtp = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setOtpSent(true);
    setLoading(false);
    go("otp");
  };

  /* ── Verify OTP (mock) ── */
  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    go("petType");
  };

  /* ── OTP input handler ── */
  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  /* ── Save & go to dashboard ── */
  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const petData: Record<string, string> = {
      petName: pet.name || "",
      petType: pet.type || "",
      petTypeEmoji: pet.typeEmoji || "",
      petBreed: pet.breed || "",
      petAgeValue: pet.ageValue || "",
      petAgeUnit: pet.ageUnit,
      wantsChecklist: String(pet.wantsChecklist === true),
    };
    // Clear chip data from a previous session
    ["chipId", "chipVerified"].forEach(k => {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    });
    Object.entries(petData).forEach(([k, v]) => {
      sessionStorage.setItem(k, v);
      localStorage.setItem(k, v);
    });
    preserveDashboardData();
    router.push("/dashboard");
  };

  const progress = STEP_INDEX[step];

  return (
    <PhoneFrame>
      <div className={`flow-wrap ${dir === "forward" ? "enter-fwd" : "enter-back"}`} key={step}>

        {/* Progress bar */}
        {step !== "auth" && step !== "welcome" && (
          <div className="progress-area">
            <button className="back-btn" onClick={() => {
              const prev: Record<Step, Step> = {
                phone: "auth", otp: "phone", petType: "otp",
                petDetails: "petType", newPetQ: "petDetails",
                checklistQ: "newPetQ", welcome: "checklistQ", auth: "auth",
              };
              go(prev[step], "back");
            }}>
              <span style={{ fontSize: "20px" }}>←</span>
            </button>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(progress / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ════ STEP: AUTH CHOICE ════ */}
        {step === "auth" && (
          <div className="step-content center-step">
            <div className="auth-hero">
              <Image src="/landing_page.jpg" alt="Pets" fill
                style={{ objectFit: "cover", objectPosition: "center top" }} priority />
              <div className="auth-hero-fade" />

              {/* Headline */}
              <div className="auth-logo-wrap">
                <h1 className="auth-headline">
                  Your pet&apos;s best life<br />
                  <span style={{ color: "#fff", WebkitTextFillColor: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>starts here.</span>
                </h1>
                <div style={{ width: "60px", height: "3px", background: "#FF8A1F", borderRadius: "4px", marginTop: "6px" }} />
              </div>
            </div>

            <div className="auth-sheet">
              {/* Google */}
              <button className="social-btn" onClick={() => go("petType")}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="divider"><span>or</span></div>

              {/* Phone */}
              <button className="phone-auth-btn" onClick={() => go("phone")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="white" strokeWidth="2" /><circle cx="12" cy="18" r="1" fill="white" /></svg>
                Continue with Phone
              </button>

              {/* Privacy note */}
              <div style={{ background: "#F4F2EF", borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>🔒</span>
                <p style={{ fontSize: "11px", color: "#6B7B8D", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>We respect your privacy. Your data is safe with us.</p>
              </div>

              <p className="terms-text">
                By continuing you agree to our{" "}
                <span style={{ color: "#FF8A1F", fontWeight: 700 }}>Terms</span> &amp;{" "}
                <span style={{ color: "#FF8A1F", fontWeight: 700 }}>Privacy Policy</span>
              </p>
            </div>
          </div>
        )}

        {/* ════ STEP: PHONE NUMBER ════ */}
        {step === "phone" && (
          <div className="step-content pad-step">
            <div className="step-icon-wrap">
              <span style={{ fontSize: "40px" }}>📱</span>
            </div>
            <h2 className="step-title">What&apos;s your number?</h2>
            <p className="step-subtitle">
              We&apos;ll send a one-time code to verify your identity.
            </p>

            <div className="phone-input-wrap">
              <div className="country-code">
                <Image src="/india-flag.png" alt="IN" width={20} height={14}
                  style={{ borderRadius: "2px" }}
                  onError={() => { }} />
                <span style={{ fontWeight: 700, color: "#2B1D16", fontSize: "15px" }}>+91</span>
              </div>
              <input
                className="phone-input"
                type="tel"
                placeholder="Enter mobile number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <p className="hint-text">We will send an OTP to this number</p>

            <div style={{ flex: 1 }} />

            <button
              className={`primary-btn ${phone.length === 10 ? "active" : "disabled"}`}
              onClick={sendOtp}
              disabled={phone.length !== 10 || loading}
            >
              {loading ? <span className="spinner" /> : "Send OTP →"}
            </button>
          </div>
        )}

        {/* ════ STEP: OTP ════ */}
        {step === "otp" && (
          <div className="step-content pad-step">
            <div className="step-icon-wrap otp-icon">
              <span style={{ fontSize: "38px" }}>🔐</span>
            </div>
            <h2 className="step-title">Enter the code</h2>
            <p className="step-subtitle">
              Sent to <strong style={{ color: "#FF8A1F" }}>+91 {phone}</strong>
            </p>

            <div className="otp-row">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  className={`otp-box ${digit ? "otp-filled" : ""}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKey(i, e)}
                />
              ))}
            </div>

            <p className="hint-text">
              Didn&apos;t receive it?{" "}
              <button
                className="link-btn"
                onClick={() => { setOtp(["", "", "", "", "", ""]); sendOtp(); }}
              >
                Resend OTP
              </button>
            </p>

            <div style={{ flex: 1 }} />

            <button
              className={`primary-btn ${otp.join("").length === 6 ? "active" : "disabled"}`}
              onClick={verifyOtp}
              disabled={otp.join("").length !== 6 || loading}
            >
              {loading ? <span className="spinner" /> : "Verify & Continue →"}
            </button>
          </div>
        )}

        {/* ════ STEP: PET TYPE ════ */}
        {step === "petType" && (
          <div className="step-content pad-step">
            <h2 className="step-title" style={{ marginTop: "8px" }}>
              What kind of pet do you have?
            </h2>
            <p className="step-subtitle">
              Pick your furry (or feathery!) family member.
            </p>

            <div className="pet-type-list">
              {/* Dog & Cat bars */}
              {PET_TYPES.filter(p => p.label !== "Other").map((p) => (
                <button
                  key={p.label}
                  className={`pet-type-bar ${pet.type === p.label ? "selected" : ""}`}
                  onClick={() => { setPet({ ...pet, type: p.label, typeEmoji: p.emoji }); setOtherSearch(""); }}
                >
                  <div className="pet-bar-photo">
                    <Image src={p.image} alt={p.label} fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="pet-bar-label">{p.label}</span>
                  <div className={`pet-bar-check ${pet.type === p.label ? "checked" : ""}`}>
                    {pet.type === p.label && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}

              {/* Other — expands into search dropdown */}
              <div className={`other-wrap ${pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "" ? "other-active" : ""}`}>
                <button
                  className={`pet-type-bar ${pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "" ? "selected" : ""}`}
                  onClick={() => { setPet({ ...pet, type: "Other", typeEmoji: "🐾" }); setOtherSearch(""); }}
                >
                  <div className="pet-bar-photo">
                    <Image src="/rabbit.webp" alt="Other" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="pet-bar-label">
                    {pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "" && pet.type !== "Other"
                      ? pet.type : "Other"}
                  </span>
                  <div className={`pet-bar-check ${pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "" ? "checked" : ""}`}>
                    {pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "" && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Dropdown — visible when Other is selected */}
                {(pet.type === "Other" || (pet.type !== "Dog" && pet.type !== "Cat" && pet.type !== "")) && (
                  <div className="other-dropdown">
                    <div className="other-search-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="#A8A29E" strokeWidth="2" />
                        <path d="M16.5 16.5l3.5 3.5" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <input
                        className="other-search"
                        placeholder="Search your pet..."
                        value={otherSearch}
                        onChange={e => setOtherSearch(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="other-list">
                      {OTHER_PETS.filter(o =>
                        o.label.toLowerCase().includes(otherSearch.toLowerCase())
                      ).map(o => (
                        <button
                          key={o.label}
                          className={`other-option ${pet.type === o.label ? "selected" : ""}`}
                          onClick={() => setPet({ ...pet, type: o.label, typeEmoji: o.emoji })}
                        >
                          <span style={{ fontSize: "20px" }}>{o.emoji}</span>
                          <span className="other-option-label">{o.label}</span>
                          {pet.type === o.label && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7l3 3 6-6" stroke="#FF8A1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <button
              className={`primary-btn ${pet.type ? "active" : "disabled"}`}
              onClick={() => go("petDetails")}
              disabled={!pet.type}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ════ STEP: PET DETAILS ════ */}
        {step === "petDetails" && (
          <div className="step-content" style={{ display: "flex", flexDirection: "column" }}>

            {/* Hero banner with pet photo */}
            <div className="details-hero">
              <Image
                src={pet.type.toLowerCase() === "cat" ? "/cat_picture.jpg" : "/dog_detail.jpg"}
                alt={pet.type} fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }} />
              <div className="details-hero-fade" />
            </div>

            {/* Card sheet over image */}
            <div className="details-sheet">
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#1A2535", margin: "0 0 4px", fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Tell us about them
              </h2>
              <p style={{ fontSize: "13px", color: "#A8A29E", fontWeight: 600, margin: "0 0 20px" }}>
                We&apos;ll build a personalised care plan
              </p>

              {/* Name */}
              <div className="details-field">
                <label className="details-label">Pet&apos;s Name <span style={{ color: "#FF8A1F" }}>*</span></label>
                <input
                  className="details-input"
                  type="text"
                  placeholder="e.g. Bruno, Mochi, Coco"
                  value={pet.name}
                  onChange={(e) => setPet({ ...pet, name: e.target.value })}
                />
              </div>

              {/* Breed */}
              <div className="details-field">
                <label className="details-label">Breed <span style={{ color: "#FF8A1F", fontWeight: 700 }}>*</span></label>
                <input
                  className="details-input"
                  type="text"
                  placeholder="e.g. Golden Retriever, Persian"
                  value={pet.breed}
                  onChange={(e) => setPet({ ...pet, breed: e.target.value })}
                />
              </div>

              {/* Age */}
              <div className="details-field">
                <label className="details-label">Age <span style={{ color: "#FF8A1F" }}>*</span></label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
                  {[
                    { label: "0–8 weeks",   value: "4",  unit: "weeks"  },
                    { label: "2–6 months",  value: "3",  unit: "months" },
                    { label: "6–12 months", value: "9",  unit: "months" },
                    { label: "1–3 years",   value: "2",  unit: "years"  },
                    { label: "3–7 years",   value: "5",  unit: "years"  },
                    { label: "7+ years",    value: "8",  unit: "years"  },
                  ].map((opt) => {
                    const isSelected = pet.ageValue === opt.value && pet.ageUnit === opt.unit;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setPet({ ...pet, ageValue: opt.value, ageUnit: opt.unit as "weeks" | "months" | "years" })}
                        style={{
                          padding: "10px 16px", borderRadius: "50px",
                          border: `2px solid ${isSelected ? "#FF8A1F" : "#E8E7F0"}`,
                          background: isSelected ? "#FFF4EC" : "white",
                          color: isSelected ? "#FF8A1F" : "#6B7280",
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: "13px", cursor: "pointer", fontFamily: "inherit",
                          transition: "all 0.18s ease",
                          boxShadow: isSelected ? "0 4px 12px rgba(255,138,31,0.15)" : "none",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ flex: 1 }} />

              <button
                className={`primary-btn ${pet.name && pet.breed && pet.ageValue ? "active" : "disabled"}`}
                onClick={() => {
                  const val = parseFloat(pet.ageValue);
                  let isNew = false;
                  if (pet.ageUnit === "weeks" && val <= 8) isNew = true;
                  else if (pet.ageUnit === "months" && val <= 2) isNew = true;
                  const updatedPet = { ...pet, isNewPet: isNew };
                  setPet(updatedPet);
                  // Go directly to checklistQ if newborn, else welcome
                  isNew ? go("checklistQ") : go("welcome");
                }}
                disabled={!pet.name || !pet.breed || !pet.ageValue}
                style={{ marginTop: "24px" }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ════ STEP: NEW PET QUESTION ════ */}
        {step === "newPetQ" && (
          <div className="step-content" style={{ display: "flex", flexDirection: "column", background: "#FAFAF7" }}>

            {/* Illustration */}
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 40px" }}>
              <Image src="/pets.png" alt="Pets" width={390} height={260} style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 0 18px rgba(255,138,31,0.4)) drop-shadow(0 0 36px rgba(22,163,74,0.25))" }} />
            </div>

            {/* Question */}
            <div style={{ padding: "18px 24px 0" }}>
              <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#12103A", lineHeight: 1.35, margin: "0 0 10px", fontFamily: "inherit" }}>
                Is <span style={{ color: "#FF8A1F", background: "#FFF4EC", borderRadius: "8px", padding: "0 6px" }}>{pet.name || "your pet"}</span> a{" "}
                <span style={{ background: "linear-gradient(135deg,#FF8A1F,#FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>newborn</span> pet? 🐾
              </h2>
              <p style={{ fontSize: "13px", color: "#8A8A9A", lineHeight: 1.7, margin: "0 0 18px", borderLeft: "3px solid #FF8A1F", paddingLeft: "10px" }}>
                We&apos;ll personalize baby-pet care tips, feeding schedules, vaccines and the 30-day checklist. 🧡
              </p>
            </div>

            {/* Cards */}
            <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Yes — newborn */}
              <button
                onClick={() => { setPet({ ...pet, isNewPet: true }); }}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: pet.isNewPet === true ? "linear-gradient(135deg, #F0FBF4, #E6F9EE)" : "white",
                  border: `2px solid ${pet.isNewPet === true ? "#16A34A" : "#EBEBF0"}`,
                  borderRadius: "20px", padding: "18px 16px", cursor: "pointer", textAlign: "left", width: "100%",
                  boxShadow: pet.isNewPet === true ? "0 4px 16px rgba(22,163,74,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "#D4F0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>🌱</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: pet.isNewPet === true ? "#16A34A" : "#12103A", margin: "0 0 3px", fontFamily: "inherit" }}>
                    Yes, {pet.name || "my pet"} is a newborn
                  </p>
                  <p style={{ fontSize: "12px", color: "#9A9AAA", margin: 0 }}>Just born or very young 🌱</p>
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: pet.isNewPet === true ? "#16A34A" : "transparent", border: `2px solid ${pet.isNewPet === true ? "#16A34A" : "#D0D0DC"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {pet.isNewPet === true && <span style={{ color: "white", fontSize: "13px", fontWeight: 800 }}>✓</span>}
                </div>
              </button>

              {/* No — settled */}
              <button
                onClick={() => { setPet({ ...pet, isNewPet: false, wantsChecklist: false }); }}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: pet.isNewPet === false ? "linear-gradient(135deg, #F5F0FF, #EDE8FF)" : "white",
                  border: `2px solid ${pet.isNewPet === false ? "#8B5CF6" : "#EBEBF0"}`,
                  borderRadius: "20px", padding: "18px 16px", cursor: "pointer", textAlign: "left", width: "100%",
                  boxShadow: pet.isNewPet === false ? "0 4px 16px rgba(139,92,246,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image src="/golden.webp" alt="Dog" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: "#12103A", margin: "0 0 3px", fontFamily: "inherit" }}>
                    No, {pet.name || "my pet"} is not a newborn
                  </p>
                  <p style={{ fontSize: "12px", color: "#9A9AAA", margin: 0 }}>Already growing and settled 🏡</p>
                </div>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: pet.isNewPet === false ? "#8B5CF6" : "transparent", border: `2px solid ${pet.isNewPet === false ? "#8B5CF6" : "#D0D0DC"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {pet.isNewPet === false && <span style={{ color: "white", fontSize: "13px", fontWeight: 800 }}>✓</span>}
                </div>
              </button>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ padding: "20px" }}>
              <button
                className={`primary-btn ${pet.isNewPet !== undefined ? "active" : "disabled"}`}
                style={{ background: pet.isNewPet !== undefined ? "linear-gradient(135deg, #FF8A1F, #FFB347)" : undefined, position: "relative", overflow: "hidden" }}
                onClick={() => pet.isNewPet === true ? go("checklistQ") : go("welcome")}
                disabled={pet.isNewPet === undefined}
              >
                <span style={{ position: "absolute", left: "16px", fontSize: "18px", opacity: 0.25 }}>🐾</span>
                Continue →
                <span style={{ position: "absolute", right: "16px", fontSize: "18px", opacity: 0.25 }}>🐾</span>
              </button>
            </div>
          </div>
        )}

        {/* ════ STEP: CHECKLIST OPT-IN ════ */}
        {step === "checklistQ" && (
          <div className="step-content pad-step">
            <div className="step-icon-wrap" style={{ background: "linear-gradient(135deg,#FFF3E8,#FFE5C8)" }}>
              <span style={{ fontSize: "38px" }}>📋</span>
            </div>
            <h2 className="step-title">
              Would you like a guided<br />
              <span className="orange-text">30-Day Care Plan</span>?
            </h2>
            <p className="step-subtitle">
              A day-by-day guide covering vaccinations, feeding, deworming, hygiene, and the first vet visit — built for {pet.name || "your pet"}&apos;s early weeks.
            </p>

            {/* Preview card */}
            <div className="checklist-preview">
              <p className="preview-heading">What&apos;s included</p>
              {[
                { icon: "💉", text: "First vaccination schedule" },
                { icon: "🥣", text: "Feeding setup & portion guide" },
                { icon: "💊", text: "Deworming reminders" },
                { icon: "🛁", text: "Hygiene & sleep setup" },
                { icon: "👨‍⚕️", text: "First vet visit guidance" },
              ].map((item) => (
                <div key={item.text} className="preview-row">
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <span className="preview-text">{item.text}</span>
                  <span style={{ color: "#16A34A", fontWeight: 800, fontSize: "13px" }}>✓</span>
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Yes */}
            <button
              className="primary-btn active"
              onClick={() => {
                setPet({ ...pet, wantsChecklist: true });
                go("welcome");
              }}
            >
              Yes, activate my 30-Day Plan 🌱
            </button>

            {/* Skip */}
            <button
              className="skip-btn"
              onClick={() => {
                setPet({ ...pet, wantsChecklist: false });
                go("welcome");
              }}
            >
              Skip for now
            </button>
          </div>
        )}

        {/* ════ STEP: WELCOME ════ */}
        {step === "welcome" && (
          <div className="step-content welcome-step">
            {/* Confetti blobs */}
            <div className="confetti-blob b1" />
            <div className="confetti-blob b2" />
            <div className="confetti-blob b3" />

            <div className="welcome-inner">
              {/* Pet photo circle */}
              <div className="welcome-pet-circle">
                {PET_TYPES.find(p => p.label === pet.type)?.image ? (
                  <Image
                    src={PET_TYPES.find(p => p.label === pet.type)!.image!}
                    alt={pet.type} fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: "52px" }}>{pet.typeEmoji}</span>
                )}
                <div className="welcome-badge">🐾</div>
              </div>

              <h2 className="welcome-title">
                Welcome,{" "}
                <span className="orange-text">{pet.name || "little one"}</span>!
              </h2>
              <p className="welcome-sub">
                {pet.name ? `${pet.name}'s` : "Your pet's"} care journey begins now. We&apos;re so happy you&apos;re here.
              </p>

              {/* Summary card */}
              <div className="summary-card">
                {[
                  { icon: "🐾", label: "Type", val: pet.type },
                  { icon: "🏷️", label: "Name", val: pet.name },
                  pet.breed ? { icon: "📋", label: "Breed", val: pet.breed } : null,
                  { icon: "📅", label: "Age", val: `${pet.ageValue} ${pet.ageUnit}` },
                  pet.wantsChecklist
                    ? { icon: "🌱", label: "Plan", val: "30-Day Care ✓" }
                    : null,
                ]
                  .filter(Boolean)
                  .map((row) => (
                    <div key={row!.label} className="summary-row">
                      <span style={{ fontSize: "16px" }}>{row!.icon}</span>
                      <span className="summary-label">{row!.label}</span>
                      <span className="summary-val">{row!.val}</span>
                    </div>
                  ))}
              </div>

              <button
                className="primary-btn active welcome-btn"
                onClick={finish}
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : "Go to my Dashboard 🏠"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ════ Styles ════ */}
      <style jsx>{`
        /* ── Wrapper & animation ── */
        .flow-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.38s cubic-bezier(0.34,1.1,0.64,1) forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Progress ── */
        .progress-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px 6px;
        }
        .back-btn {
          background: none; border: none; cursor: pointer;
          color: #5B5652; padding: 4px; display: flex; align-items: center;
        }
        .progress-track {
          flex: 1;
          height: 4px;
          background: #EDE8E3;
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF8A1F, #FFB347);
          border-radius: 10px;
          transition: width 0.4s ease;
        }
        .progress-label {
          font-size: 11px;
          font-weight: 700;
          color: #A8A29E;
          min-width: 28px;
          text-align: right;
        }

        /* ── Step layouts ── */
        .step-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pad-step { padding: 20px 24px 24px; }

        /* ── Pet Details redesign ── */
        .details-hero {
          position: relative;
          height: 240px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .details-hero-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0) 40%,
            rgba(255,255,255,0.5) 75%,
            #ffffff 100%
          );
          z-index: 2;
        }
        .details-hero-badge {
          position: absolute;
          bottom: 20px;
          left: 24px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 20px;
          padding: 8px 16px;
        }
        .details-sheet {
          flex: 1;
          background: white;
          border-radius: 28px 28px 0 0;
          margin-top: -24px;
          position: relative;
          z-index: 10;
          padding: 24px 24px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
        }
        .details-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .details-label {
          font-size: 12px;
          font-weight: 800;
          color: #5A6B7A;
          letter-spacing: 0.4px;
          font-family: inherit;
        }
        .details-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1.5px solid #EDE8E3;
          font-size: 15px;
          font-weight: 600;
          color: #1A2535;
          background: #FAFAF9;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .details-input:focus { border-color: #FF8A1F; background: white; }
        .center-step { padding: 0; }

        /* ── Auth step ── */
        .auth-hero {
          position: relative;
          height: 440px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .auth-hero-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.1) 0%,
            rgba(0,0,0,0.05) 30%,
            rgba(0,0,0,0.35) 65%,
            rgba(0,0,0,0.55) 100%
          );
          z-index: 2;
        }
        .auth-logo-wrap {
          position: absolute;
          bottom: 56px;
          left: 0; right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 3;
          padding: 0 28px;
        }
        .logo-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,138,31,0.15);
          border: 1px solid rgba(255,138,31,0.3);
          color: #FF8A1F;
          font-size: 12px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 10px;
          backdrop-filter: blur(8px);
        }
        .auth-headline {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 34px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.5);
        }
        .auth-sheet {
          flex: 1;
          padding: 28px 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #ffffff;
          border-radius: 28px 28px 0 0;
          margin-top: -28px;
          position: relative;
          z-index: 10;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.06);
        }
        .sheet-label {
          text-align: center;
          font-size: 13px;
          color: #A8A29E;
          font-weight: 600;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 15px;
          border-radius: 16px;
          background: white;
          border: 1.5px solid #E8E3DE;
          font-size: 15px;
          font-weight: 700;
          color: #2B1D16;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 2px 8px rgba(43,29,22,0.06);
          transition: all 0.2s ease;
        }
        .social-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(43,29,22,0.1); }
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #C4BAB4;
          font-size: 12px;
          font-weight: 600;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: #EDE8E3;
        }
        .phone-auth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 15px;
          border-radius: 16px;
          background: linear-gradient(135deg, #FF8A1F, #FFB347);
          border: none;
          font-size: 15px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 6px 18px rgba(255,138,31,0.4);
          transition: all 0.2s ease;
        }
        .phone-auth-btn:hover { transform: translateY(-1px); }
        .terms-text {
          text-align: center;
          font-size: 11px;
          color: #A8A29E;
          font-weight: 500;
          line-height: 1.6;
        }

        /* ── Shared form elements ── */
        .step-icon-wrap {
          width: 68px;
          height: 68px;
          background: linear-gradient(135deg, #FFF3E8, #FFE5C8);
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 14px rgba(255,138,31,0.2);
        }
        .step-title {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #1A2535;
          line-height: 1.25;
          margin-bottom: 8px;
        }
        .step-subtitle {
          font-size: 14px;
          color: #7A8898;
          font-weight: 500;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        /* ── Phone input ── */
        .phone-input-wrap {
          display: flex;
          align-items: center;
          background: white;
          border: 1.5px solid #EDE8E3;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(43,29,22,0.05);
          transition: border-color 0.2s;
        }
        .phone-input-wrap:focus-within { border-color: #FF8A1F; }
        .country-code {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          border-right: 1.5px solid #EDE8E3;
          height: 52px;
          flex-shrink: 0;
        }
        .phone-input {
          flex: 1;
          height: 52px;
          padding: 0 16px;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          color: #1A2535;
          background: transparent;
          letter-spacing: 1px;
        }

        /* ── OTP ── */
        .otp-icon { background: linear-gradient(135deg, #E8F5FF, #D0EEFF); }
        .otp-row {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 16px;
        }
        .otp-box {
          width: 48px;
          height: 56px;
          border-radius: 14px;
          border: 1.5px solid #EDE8E3;
          background: white;
          text-align: center;
          font-size: 22px;
          font-weight: 800;
          font-family: inherit;
          color: #1A2535;
          outline: none;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(43,29,22,0.05);
        }
        .otp-box:focus { border-color: #FF8A1F; box-shadow: 0 0 0 3px rgba(255,138,31,0.15); }
        .otp-filled { border-color: #16A34A; background: #EDFAF2; }
        .hint-text { font-size: 13px; color: #A8A29E; font-weight: 500; text-align: center; }
        .link-btn { background: none; border: none; color: #FF8A1F; font-weight: 700; font-size: 13px; cursor: pointer; font-family: inherit; }

        /* ── Pet type grid ── */
        .pet-type-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .pet-type-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          border: 2px solid #EDE8E3;
          border-radius: 18px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(43,29,22,0.05);
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .pet-type-bar.selected {
          border-color: #FF8A1F;
          background: #FFF8F2;
          box-shadow: 0 4px 16px rgba(255,138,31,0.18);
        }
        .pet-bar-photo {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pet-bar-label {
          flex: 1;
          font-size: 16px;
          font-weight: 800;
          color: #1A2535;
        }
        .pet-bar-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #EDE8E3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .pet-bar-check.checked {
          background: #FF8A1F;
          border-color: #FF8A1F;
        }
        .other-wrap { display: flex; flex-direction: column; gap: 0; }
        .other-dropdown {
          background: white;
          border: 1.5px solid #EDE8E3;
          border-top: none;
          border-radius: 0 0 18px 18px;
          overflow: hidden;
          margin-top: -6px;
        }
        .other-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid #F0ECE8;
        }
        .other-search {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          font-weight: 600;
          color: #1A2535;
          font-family: inherit;
          background: transparent;
        }
        .other-search::placeholder { color: #A8A29E; }
        .other-list {
          max-height: 200px;
          overflow-y: auto;
        }
        .other-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 16px;
          background: none;
          border: none;
          border-bottom: 1px solid #F5F2EF;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: background 0.15s ease;
        }
        .other-option:last-child { border-bottom: none; }
        .other-option:hover { background: #FFF8F2; }
        .other-option.selected { background: #FFF8F2; }
        .other-option-label {
          flex: 1;
          font-size: 14px;
          font-weight: 700;
          color: #1A2535;
        }
        /* keep check-badge for legacy */
        .check-badge {
          display: none;
          font-weight: 800;
        }

        /* ── Pet details form ── */
        .form-stack { display: flex; flex-direction: column; gap: 16px; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 12px; font-weight: 800; color: #5B5652; letter-spacing: 0.3px; }
        .field-input {
          background: white;
          border: 1.5px solid #EDE8E3;
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          color: #1A2535;
          outline: none;
          transition: border-color 0.2s;
          box-shadow: 0 2px 6px rgba(43,29,22,0.04);
        }
        .field-input:focus { border-color: #FF8A1F; }
        .field-input::placeholder { color: #C4BAB4; font-weight: 500; }
        .age-row { display: flex; gap: 10px; align-items: center; }
        .age-num { width: 90px; flex-shrink: 0; }
        .age-unit-group { display: flex; gap: 6px; }
        .unit-btn {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1.5px solid #EDE8E3;
          background: white;
          font-size: 12px;
          font-weight: 700;
          color: #7A8898;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .unit-active {
          background: linear-gradient(135deg, #FF8A1F, #FFB347);
          border-color: #FF8A1F;
          color: white;
          box-shadow: 0 3px 10px rgba(255,138,31,0.3);
        }
        .young-hint {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: linear-gradient(135deg, #FFF3E8, #FFE5C8);
          border-radius: 14px;
          padding: 12px 14px;
          border: 1px solid rgba(255,138,31,0.2);
        }
        .young-hint p { font-size: 12px; color: #5B5652; font-weight: 500; line-height: 1.5; }

        /* ── Primary button ── */
        .primary-btn {
          width: 100%;
          padding: 17px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 800;
          font-family: inherit;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .primary-btn.active {
          background: linear-gradient(135deg, #FF8A1F, #FFB347);
          color: white;
          box-shadow: 0 8px 22px rgba(255,138,31,0.4);
        }
        .primary-btn.active:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(255,138,31,0.5); }
        .primary-btn.disabled { background: #EDE8E3; color: #C4BAB4; cursor: not-allowed; }

        /* ── Spinner ── */
        .spinner {
          display: inline-block;
          width: 20px; height: 20px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Welcome ── */
        .welcome-step {
          background: linear-gradient(160deg, #FFF8F2 0%, #F5F0EB 100%);
          padding: 0;
          overflow: hidden;
        }
        .confetti-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .b1 { width: 200px; height: 200px; background: #FF8A1F; opacity: 0.12; top: -40px; right: -40px; }
        .b2 { width: 160px; height: 160px; background: #4DA8DA; opacity: 0.1; bottom: 20%; left: -30px; }
        .b3 { width: 120px; height: 120px; background: #16A34A; opacity: 0.1; bottom: 10%; right: 10%; }
        .welcome-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px 28px;
          gap: 16px;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .welcome-pet-circle {
          position: relative;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          overflow: visible;
          border: 4px solid white;
          box-shadow: 0 12px 36px rgba(43,29,22,0.14);
        }
        .welcome-pet-circle > :global(img) { border-radius: 50%; }
        .welcome-badge {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 32px; height: 32px;
          background: #FF8A1F;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .welcome-title {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #1A2535;
          line-height: 1.2;
        }
        .welcome-sub {
          font-size: 14px;
          color: #7A8898;
          font-weight: 500;
          max-width: 280px;
          line-height: 1.5;
        }
        .summary-card {
          width: 100%;
          background: white;
          border-radius: 20px;
          padding: 16px 20px;
          box-shadow: 0 4px 20px rgba(43,29,22,0.08);
          border: 1px solid rgba(255,255,255,0.9);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .summary-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .summary-label {
          font-size: 12px;
          color: #A8A29E;
          font-weight: 700;
          min-width: 50px;
        }
        .summary-val {
          font-size: 14px;
          font-weight: 800;
          color: #1A2535;
          margin-left: auto;
        }
        .welcome-btn { width: 100%; }
        .orange-text {
          background: linear-gradient(135deg, #FF8A1F, #FFB347);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Choice cards (newPetQ) ── */
        .choice-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: white;
          border: 2px solid #EDE8E3;
          border-radius: 20px;
          padding: 16px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(43,29,22,0.05);
        }
        .choice-card:hover { border-color: #FFB347; transform: translateY(-1px); }
        .choice-selected {
          border-color: #FF8A1F !important;
          background: #FFF8F2 !important;
          box-shadow: 0 4px 16px rgba(255,138,31,0.18) !important;
        }
        .choice-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .choice-text { flex: 1; }
        .choice-title {
          font-size: 14px;
          font-weight: 800;
          color: #1A2535;
          margin-bottom: 3px;
        }
        .choice-desc {
          font-size: 12px;
          color: #7A8898;
          font-weight: 500;
          line-height: 1.4;
        }
        .choice-radio {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #EDE8E3;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .radio-active {
          border-color: #FF8A1F;
          background: radial-gradient(circle, #FF8A1F 50%, transparent 50%);
          box-shadow: 0 0 0 2px rgba(255,138,31,0.2);
        }

        /* ── Checklist preview ── */
        .checklist-preview {
          background: white;
          border-radius: 20px;
          padding: 16px 18px;
          box-shadow: 0 4px 16px rgba(43,29,22,0.07);
          border: 1.5px solid #EDE8E3;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .preview-heading {
          font-size: 11px;
          font-weight: 800;
          color: #A8A29E;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .preview-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .preview-text {
          flex: 1;
          font-size: 13px;
          font-weight: 600;
          color: #2B1D16;
        }
        .skip-btn {
          background: none;
          border: none;
          color: #A8A29E;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          padding: 8px;
          text-align: center;
          width: 100%;
        }
        .skip-btn:hover { color: #7A8898; }
      `}</style>
    </PhoneFrame>
  );
}
