// Pure CSS animation helpers — no framer-motion dep needed
"use client";
import { ReactNode } from "react";

export function FadeUpOnView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div
      style={{
        animation: `fadeUp 0.6s ease-out ${delay}s both`,
      }}
    >
      {children}
    </div>
  );
}

export function PulseGlow({ children, color = "#C9A84C" }: { children: ReactNode; color?: string }) {
  return (
    <div
      style={{
        animation: `pulseGlow 2s ease-in-out infinite`,
        boxShadow: `0 0 20px ${color}40`,
      }}
    >
      {children}
    </div>
  );
}

export function GlobalKeyframes() {
  return (
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.25); }
        50% { box-shadow: 0 0 32px rgba(201,168,76,0.55); }
      }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  );
}
