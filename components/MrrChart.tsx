"use client";

import { useMemo } from "react";

interface Props {
  p10: number[];
  p50: number[];
  p90: number[];
  height?: number;
}

export default function MrrChart({ p10, p50, p90, height = 280 }: Props) {
  const months = p50.length;
  const width = 720;
  const padL = 56;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const yMax = useMemo(() => {
    const m = Math.max(...p90, 1);
    return Math.ceil(m / 1000) * 1000;
  }, [p90]);

  const x = (m: number) => padL + (m / Math.max(1, months - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / yMax) * innerH;

  const bandPath = useMemo(() => {
    const top = p90.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
    const bottom = p10
      .map((v, i) => `L ${x(months - 1 - i)} ${y(p10[months - 1 - i])}`)
      .join(" ");
    return `${top} ${bottom} Z`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p10, p90, months, yMax]);

  const medianPath = useMemo(
    () => p50.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" "),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p50, yMax],
  );

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => (yMax * i) / yTicks);
  const monthTicks = [0, 6, 12, 18, 24, 30, 35];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* axes grid */}
      {tickValues.map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={width - padR} y2={y(v)} stroke="#1F1535" strokeWidth={1} />
          <text x={padL - 8} y={y(v) + 4} textAnchor="end" fill="#9CA3AF" fontSize={10}>
            €{Math.round(v).toLocaleString("fr-FR")}
          </text>
        </g>
      ))}
      {monthTicks.map((m) => (
        <text key={m} x={x(m)} y={height - padB + 16} textAnchor="middle" fill="#9CA3AF" fontSize={10}>
          M{m}
        </text>
      ))}

      {/* p10–p90 band */}
      <path d={bandPath} fill="#7C3AED" fillOpacity={0.2} stroke="none" />

      {/* median line */}
      <path d={medianPath} fill="none" stroke="#A78BFA" strokeWidth={2.5} strokeLinejoin="round" />

      {/* legend */}
      <g transform={`translate(${padL}, ${padT})`}>
        <rect x={0} y={-2} width={12} height={6} fill="#7C3AED" fillOpacity={0.2} />
        <text x={16} y={5} fill="#D1D5DB" fontSize={10}>
          Bande p10–p90 (intervalle 80%)
        </text>
        <line x1={150} y1={2} x2={170} y2={2} stroke="#A78BFA" strokeWidth={2.5} />
        <text x={174} y={5} fill="#D1D5DB" fontSize={10}>
          Médiane (p50)
        </text>
      </g>
    </svg>
  );
}
