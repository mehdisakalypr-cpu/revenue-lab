// Inline SVG icons — no lucide/heroicons dep
import { CSSProperties } from "react";

const baseProps = (size: number, style?: CSSProperties) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  style,
});

export function IconCheck({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconX({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconArrowUp({ size = 14, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export function IconArrowDown({ size = 14, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

export function IconAlert({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconChart({ size = 18, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export function IconTrending({ size = 18, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function IconLock({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg {...baseProps(size, style)}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
