"use client";

import BottomNav from "../components/BottomNav";
import { useState } from "react";

const C = {
  bg: "transparent", surface: "rgba(255,255,255,0.75)", navy: "#12103A",
  gray: "#8A8A9A", grayLight: "#E8E7F0", orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4", blue: "#2879B0", blueBg: "#EBF5FF",
  purple: "#6D28D9", purpleBg: "#F5F0FF",
};

const TAG_OPTIONS = [
  { label: "Health",      color: C.green,  bg: C.greenBg  },
  { label: "Nutrition",   color: C.orange, bg: C.orangeBg },
  { label: "Training",    color: C.blue,   bg: C.blueBg   },
  { label: "Advice",      color: C.purple, bg: C.purpleBg },
  { label: "Lost & Found",color: "#DC2626",bg: "#FEF2F2"  },
];

const PET_TYPES = ["🐕 Dog", "🐈 Cat", "🐇 Rabbit", "🐦 Bird", "🐠 Fish", "🐹 Other"];

const AVATAR_COLORS = ["#4DA8DA","#F97316","#16A34A","#6D28D9","#DC2626","#0D9488"];

type Post = {
  id: number; author: string; initials: string; avatarBg: string;
  time: string; petType: string; tag: string; tagColor: string; tagBg: string;
  title: string; body: string; likes: number; replies: number; liked: boolean;
};

const INITIAL_POSTS: Post[] = [
  { id: 1, author: "Priya Sharma", initials: "PS", avatarBg: "#4DA8DA", time: "2h ago", petType: "🐕 Dog", tag: "Health", tagColor: C.green, tagBg: C.greenBg, title: "My golden retriever won't eat kibble anymore — any tips?", body: "Bruno has been refusing his regular Royal Canin for 3 days now. He eats treats just fine. Vet says he's healthy. Has anyone dealt with this?", likes: 24, replies: 11, liked: false },
  { id: 2, author: "Rahul Nair", initials: "RN", avatarBg: "#F97316", time: "5h ago", petType: "🐈 Cat", tag: "Advice", tagColor: C.purple, tagBg: C.purpleBg, title: "Best litter brands available in India?", body: "Moving to Bangalore next month and not sure which litter is available. Currently using Whisker's. Open to recommendations!", likes: 18, replies: 22, liked: true },
  { id: 3, author: "Ananya Singh", initials: "AS", avatarBg: "#16A34A", time: "Yesterday", petType: "🐕 Dog", tag: "Training", tagColor: C.blue, tagBg: C.blueBg, title: "Successful 30-day training milestone! 🎉", body: "Leo finally learned 'stay' and 'leave it' consistently. Used positive reinforcement only. Happy to share the schedule that worked for us.", likes: 63, replies: 31, liked: false },
  { id: 4, author: "Vijay Kumar", initials: "VK", avatarBg: "#6D28D9", time: "2 days ago", petType: "🐇 Rabbit", tag: "Nutrition", tagColor: C.orange, tagBg: C.orangeBg, title: "Safe vegetables for rabbits in Indian climate?", body: "I have a 8-month old Holland Lop. Struggling to find consistent hay supply. What fresh greens do you feed? Spinach seems too oxalate-rich.", likes: 9, replies: 8, liked: false },
];

const CATEGORIES = ["All", "Health", "Nutrition", "Training", "Advice", "Lost & Found"];

export default function CommunityPage() {
  const [active, setActive]   = useState("All");
  const [posts, setPosts]     = useState<Post[]>(INITIAL_POSTS);
  const [showModal, setShowModal] = useState(false);

  // New post form state
  const [title, setTitle]     = useState("");
  const [body, setBody]       = useState("");
  const [petType, setPetType] = useState("🐕 Dog");
  const [tag, setTag]         = useState(TAG_OPTIONS[0]);

  const toggleLike = (id: number) =>
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));

  const submitPost = () => {
    if (!title.trim() || !body.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Vishal Mishra",
      initials: "VM",
      avatarBg: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      time: "Just now",
      petType,
      tag: tag.label,
      tagColor: tag.color,
      tagBg: tag.bg,
      title: title.trim(),
      body: body.trim(),
      likes: 0,
      replies: 0,
      liked: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setTitle(""); setBody(""); setPetType("🐕 Dog"); setTag(TAG_OPTIONS[0]);
    setShowModal(false);
    setActive("All");
  };

  const filtered = active === "All" ? posts : posts.filter(p => p.tag === active);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>

      {/* Header */}
      <div style={{ background: C.surface, padding: "20px 20px 0", borderBottom: `1px solid ${C.grayLight}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div>
            <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, marginBottom: "2px" }}>Pet Parents Forum</p>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>Community</h1>
          </div>
          <button onClick={() => setShowModal(true)} style={{
            background: C.orange, color: "white", border: "none", borderRadius: "12px",
            padding: "10px 14px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit",
          }}>+ Post</button>
        </div>

        {/* Search bar */}
        <div style={{ background: C.bg, borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke={C.gray} strokeWidth="1.8"/>
            <path d="M11 11l3 3" stroke={C.gray} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: "13px", color: C.gray, fontWeight: 500 }}>Search discussions...</span>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "14px", scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: "20px",
              background: active === cat ? C.orange : C.bg,
              color: active === cat ? "white" : C.gray,
              border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 700,
              fontFamily: "inherit",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Trending banner */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ background: "linear-gradient(135deg, #12103A, #3D3A6B)", borderRadius: "16px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: 0 }}>TRENDING THIS WEEK</p>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "white", margin: 0, marginTop: "2px" }}>Managing pet anxiety during monsoon</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4l5 5-5 5" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Posts */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 80px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.gray }}>
            <p style={{ fontSize: "32px" }}>🐾</p>
            <p style={{ fontSize: "14px", fontWeight: 600 }}>No posts in this category yet.</p>
          </div>
        )}
        {filtered.map(post => (
          <div key={post.id} style={{ background: C.surface, borderRadius: "16px", padding: "14px 16px", marginBottom: "12px", boxShadow: "0 2px 12px rgba(18,16,58,0.05)", border: `1px solid ${C.grayLight}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: post.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "white", flexShrink: 0 }}>
                {post.initials}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: C.navy, margin: 0 }}>{post.author}</p>
                <p style={{ fontSize: "11px", color: C.gray, margin: 0 }}>{post.petType} · {post.time}</p>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: post.tagBg, color: post.tagColor }}>{post.tag}</span>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 800, color: C.navy, margin: 0, marginBottom: "6px", lineHeight: 1.3 }}>{post.title}</p>
            <p style={{ fontSize: "12px", color: C.gray, margin: 0, lineHeight: 1.5 }}>{post.body}</p>
            <div style={{ display: "flex", gap: "18px", marginTop: "12px", paddingTop: "10px", borderTop: `1px solid ${C.grayLight}` }}>
              <button onClick={() => toggleLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: post.liked ? C.orange : C.gray, fontFamily: "inherit" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill={post.liked ? C.orange : "none"}>
                  <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.15 2 7.15 2.55 7.75 3.4L8 3.75L8.25 3.4C8.85 2.55 9.85 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" stroke={post.liked ? C.orange : C.gray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {post.likes}
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: C.gray, fontFamily: "inherit" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8c0 3.314-2.686 6-6 6a5.97 5.97 0 01-3.5-1.126L2 13.5l.626-2.5A5.97 5.97 0 012 8c0-3.314 2.686-6 6-6s6 2.686 6 6z" stroke={C.gray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {post.replies} replies
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: C.gray, fontFamily: "inherit" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 2l4 4-4 4M2 10V9a4 4 0 014-4h8" stroke={C.gray} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />

      {/* ── New Post Modal ── */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(18,16,58,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-end",
        }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>

          <div style={{
            width: "100%", background: C.surface,
            borderRadius: "24px 24px 0 0",
            padding: "0 0 32px",
            maxHeight: "90vh", overflowY: "auto",
            animation: "slideUp 0.3s cubic-bezier(0.34,1.1,0.64,1)",
          }}>
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
              <div style={{ width: "40px", height: "4px", borderRadius: "10px", background: C.grayLight }} />
            </div>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 16px", borderBottom: `1px solid ${C.grayLight}` }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.navy, margin: 0 }}>New Post</h2>
              <button onClick={() => setShowModal(false)} style={{ background: C.bg, border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Pet type selector */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "8px" }}>MY PET</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {PET_TYPES.map(pt => (
                    <button key={pt} onClick={() => setPetType(pt)} style={{
                      padding: "6px 12px", borderRadius: "20px", cursor: "pointer",
                      background: petType === pt ? C.navy : C.bg,
                      color: petType === pt ? "white" : C.gray,
                      border: "none", fontSize: "12px", fontWeight: 700,
                      fontFamily: "inherit",
                    }}>{pt}</button>
                  ))}
                </div>
              </div>

              {/* Category selector */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "8px" }}>CATEGORY</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {TAG_OPTIONS.map(t => (
                    <button key={t.label} onClick={() => setTag(t)} style={{
                      padding: "6px 14px", borderRadius: "20px", cursor: "pointer",
                      background: tag.label === t.label ? t.color : t.bg,
                      color: tag.label === t.label ? "white" : t.color,
                      border: "none", fontSize: "12px", fontWeight: 700,
                      fontFamily: "inherit",
                    }}>{t.label}</button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "8px" }}>TITLE</p>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="What's your question or update?"
                  maxLength={120}
                  style={{
                    width: "100%", background: C.bg, border: `1.5px solid ${title ? C.orange : C.grayLight}`,
                    borderRadius: "14px", padding: "12px 14px",
                    fontSize: "14px", fontWeight: 600, color: C.navy,
                    fontFamily: "inherit", outline: "none",
                    boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                />
                <p style={{ fontSize: "11px", color: C.gray, textAlign: "right", margin: "4px 0 0" }}>{title.length}/120</p>
              </div>

              {/* Body */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: C.gray, letterSpacing: "0.6px", marginBottom: "8px" }}>DETAILS</p>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Share more details, context, or your experience..."
                  maxLength={500}
                  rows={4}
                  style={{
                    width: "100%", background: C.bg, border: `1.5px solid ${body ? C.orange : C.grayLight}`,
                    borderRadius: "14px", padding: "12px 14px",
                    fontSize: "13px", fontWeight: 500, color: C.navy,
                    fontFamily: "inherit", outline: "none",
                    resize: "none", boxSizing: "border-box", lineHeight: 1.5,
                    transition: "border-color 0.2s",
                  }}
                />
                <p style={{ fontSize: "11px", color: C.gray, textAlign: "right", margin: "4px 0 0" }}>{body.length}/500</p>
              </div>

              {/* Submit */}
              <button
                onClick={submitPost}
                disabled={!title.trim() || !body.trim()}
                style={{
                  width: "100%", padding: "15px",
                  background: title.trim() && body.trim()
                    ? `linear-gradient(135deg, ${C.orange}, #FF5F00)`
                    : C.grayLight,
                  color: title.trim() && body.trim() ? "white" : C.gray,
                  border: "none", borderRadius: "16px",
                  fontSize: "15px", fontWeight: 800, cursor: title.trim() && body.trim() ? "pointer" : "default",
                  fontFamily: "inherit",
                  boxShadow: title.trim() && body.trim() ? `0 8px 24px ${C.orange}40` : "none",
                  transition: "all 0.2s",
                }}
              >
                Publish Post 🐾
              </button>
            </div>
          </div>

          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to   { transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
