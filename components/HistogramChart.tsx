"use client";

import { useMemo } from "react";

interface Props {
  values: number[]; // sorted ascending
  height?: number;
  bins?: number;
}

export default function HistogramChart({ values, height = 200, bins = 24 }: Props) {
  const width = 720;
  const padL = 56;
  const padR = 16;
  const padT = 14;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const { binEdges, binCounts, vMin, vMax, maxCount } = useMemo(() => {
    if (values.length === 0) {
      return { binEdges: [0, 0], binCounts: [], vMin: 0, vMax: 0, maxCount: 0 };
    }
    const vMin = values[0];
    const vMax = values[values.length - 1];
    const w = (vMax - vMin) / bins || 1;
    const edges = Array.from({ length: bins + 1 }, (_, i) => vMin + i * w);
    const counts = new Array(bins).fill(0);
    for (const v of values) {
      let idx = Math.floor((v - vMin) / w);
      if (idx >= bins) idx = bins - 1;
      if (idx < 0) idx = 0;
      counts[idx]++;
    }
    return { binEdges: edges, binCounts: counts, vMin, vMax, maxCount: Math.max(...counts, 1) };
  }, [values, bins]);

  const binW = innerW / bins;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* y axis */}
      <line x1={padL} y1={padT} x2={padL} y2={height - padB} stroke="#2D1F4D" strokeWidth={1} />
      <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="#2D1F4D" strokeWidth={1} />

      {/* bars */}
      {binCounts.map((c, i) => {
        const h = (c / maxCount) * innerH;
        const x = padL + i * binW + 1;
        const y = height - padB - h;
        return <rect key={i} x={x} y={y} width={binW - 2} height={h} fill="#06B6D4" fillOpacity={0.7} />;
      })}

      {/* x labels: min, p50, max */}
      {[0, Math.floor(bins / 2), bins].map((i) => {
        const v = binEdges[Math.min(i, binEdges.length - 1)];
        return (
          <text
            key={i}
            x={padL + i * binW}
            y={height - padB + 14}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize={10}
          >
            €{Math.round(v).toLocaleString("fr-FR")}
          </text>
        );
      })}

      <text x={padL} y={padT - 2} fill="#D1D5DB" fontSize={10}>
        Distribution MRR final M36 ({values.length} runs)
      </text>
    </svg>
  );
}
