"use client";

import BottomNav from "../components/BottomNav";
import { useState } from "react";

const C = {
  bg: "#F4F2EF", surface: "#FFFFFF", navy: "#12103A", gray: "#8A8A9A",
  grayLight: "#E8E7F0", orange: "#F97316", orangeBg: "#FFF4EC",
  green: "#16A34A", greenBg: "#F0FBF4", blue: "#2879B0", blueBg: "#EBF5FF",
  teal: "#0D9488", tealBg: "#F0FDFA", purple: "#6D28D9", purpleBg: "#F5F0FF",
};

type Task = { id: number; day: number; title: string; desc: string; done: boolean; category: string; color: string; bg: string };

const INITIAL_TASKS: Task[] = [
  { id: 1,  day: 1,  title: "Vet welcome check-up", desc: "Full body examination and weight record", done: true,  category: "Health",    color: C.teal,   bg: C.tealBg },
  { id: 2,  day: 1,  title: "Set up sleeping area", desc: "Crate or bed in a quiet, warm corner", done: true,  category: "Comfort",   color: C.blue,   bg: C.blueBg },
  { id: 3,  day: 2,  title: "First meal at home", desc: "Stick to previous food — no sudden changes", done: true,  category: "Nutrition", color: C.orange, bg: C.orangeBg },
  { id: 4,  day: 3,  title: "Introduce collar & ID tag", desc: "Ensure it fits — 2 fingers gap", done: true,  category: "Safety",    color: C.purple, bg: C.purpleBg },
  { id: 5,  day: 5,  title: "Begin toilet training", desc: "Take outside every 2 hours, reward success", done: true,  category: "Training",  color: C.green,  bg: C.greenBg },
  { id: 6,  day: 7,  title: "Socialisation walk", desc: "Short 10-min walk, new sights & sounds", done: false, category: "Training",  color: C.green,  bg: C.greenBg },
  { id: 7,  day: 10, title: "First vaccination booster", desc: "Confirm schedule with your vet", done: false, category: "Health",    color: C.teal,   bg: C.tealBg },
  { id: 8,  day: 14, title: "Introduce grooming routine", desc: "Brush coat, check ears & paws weekly", done: false, category: "Grooming",  color: C.blue,   bg: C.blueBg },
  { id: 9,  day: 14, title: "Transition to new food", desc: "Mix old + new food over 7 days", done: false, category: "Nutrition", color: C.orange, bg: C.orangeBg },
  { id: 10, day: 21, title: "Puppy training class", desc: "Enrol in a local obedience class", done: false, category: "Training",  color: C.green,  bg: C.greenBg },
  { id: 11, day: 21, title: "Deworming dose", desc: "Administer as per vet recommendation", done: false, category: "Health",    color: C.teal,   bg: C.tealBg },
  { id: 12, day: 25, title: "Microchip registration", desc: "Register microchip to your details online", done: false, category: "Safety",    color: C.purple, bg: C.purpleBg },
  { id: 13, day: 30, title: "30-day health review", desc: "Final check-up — weight, diet, behaviour", done: false, category: "Health",    color: C.teal,   bg: C.tealBg },
];

const CATEGORIES = ["All", "Health", "Nutrition", "Training", "Grooming", "Safety", "Comfort"];

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState("All");

  const toggle = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.category === filter);
  const doneCount = tasks.filter(t => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  const groupedByDay = filtered.reduce<Record<number, Task[]>>((acc, t) => {
    (acc[t.day] = acc[t.day] || []).push(t);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.grayLight}` }}>
        <div style={{ padding: "20px 20px 14px" }}>
          <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600, marginBottom: "2px" }}>Bruno · New Pet Plan</p>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.navy, margin: 0 }}>30-Day Checklist</h1>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{
            background: `linear-gradient(135deg, ${C.green}, #059669)`,
            borderRadius: "16px", padding: "14px 16px",
            boxShadow: `0 6px 20px ${C.green}25`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "white", margin: 0 }}>Overall Progress</p>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "white" }}>{progress}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: "10px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "white", borderRadius: "10px", transition: "width 0.4s ease" }} />
            </div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", margin: "8px 0 0", fontWeight: 600 }}>
              {doneCount} of {tasks.length} tasks completed · {tasks.length - doneCount} remaining
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingLeft: "20px", paddingBottom: "14px", scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: "20px",
              background: filter === cat ? C.green : C.bg,
              color: filter === cat ? "white" : C.gray,
              border: "none", cursor: "pointer",
              fontSize: "12px", fontWeight: 700, fontFamily: "'Nunito', sans-serif",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 20px" }}>
        {Object.entries(groupedByDay).map(([day, dayTasks]) => (
          <div key={day} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{
                background: C.navy, borderRadius: "8px", padding: "3px 10px",
                fontSize: "11px", fontWeight: 800, color: "white",
              }}>Day {day}</div>
              <div style={{ flex: 1, height: "1px", background: C.grayLight }} />
              <span style={{ fontSize: "11px", color: C.gray, fontWeight: 600 }}>
                {dayTasks.filter(t => t.done).length}/{dayTasks.length} done
              </span>
            </div>

            {dayTasks.map(task => (
              <div key={task.id} onClick={() => toggle(task.id)} style={{
                background: C.surface, borderRadius: "14px", padding: "13px 14px",
                marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px",
                boxShadow: "0 2px 8px rgba(18,16,58,0.05)", border: `1px solid ${C.grayLight}`,
                cursor: "pointer", opacity: task.done ? 0.75 : 1,
                transition: "opacity 0.2s",
              }}>
                {/* Checkbox */}
                <div style={{
                  width: "24px", height: "24px", borderRadius: "8px", flexShrink: 0,
                  background: task.done ? C.green : C.surface,
                  border: task.done ? "none" : `2px solid ${C.grayLight}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  {task.done && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                {/* Category dot */}
                <div style={{
                  width: "38px", height: "38px", borderRadius: "11px",
                  background: task.bg, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: task.color }} />
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: "13px", fontWeight: 800, color: C.navy, margin: 0,
                    textDecoration: task.done ? "line-through" : "none",
                  }}>{task.title}</p>
                  <p style={{ fontSize: "11px", color: C.gray, margin: 0, marginTop: "2px" }}>{task.desc}</p>
                </div>

                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px",
                  background: task.bg, color: task.color, flexShrink: 0,
                }}>{task.category}</span>
              </div>
            ))}
          </div>
        ))}

        {progress === 100 && (
          <div style={{
            background: `linear-gradient(135deg, ${C.green}, #059669)`,
            borderRadius: "18px", padding: "20px", textAlign: "center",
            boxShadow: `0 8px 24px ${C.green}30`,
          }}>
            <p style={{ fontSize: "32px", margin: 0 }}>🎉</p>
            <p style={{ fontSize: "18px", fontWeight: 800, color: "white", margin: "8px 0 4px" }}>All Done!</p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", margin: 0 }}>Bruno has completed his 30-day care plan. You're an amazing pet parent!</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
