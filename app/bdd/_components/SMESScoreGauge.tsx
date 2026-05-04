"use client";

// SMESScoreGauge — radial SVG arc gauge.
// Shows relative score 0-100% (our score / BICB average × 100).
// Colour follows the spec: <70% red, 70-90% warning, 90-100% gold, 100%+ success.

import { BRAND, relativeScoreToColor } from "./_bdd-types";

interface Props {
  /** 0..100+ (uncapped on the upper end so we can render >100% scenarios). */
  relativeScore: number;
  /** Optional sub-label under the big number. Defaults to "vs BICB moyenne". */
  caption?: string;
  /** Size in px (square). Defaults to 220. */
  size?: number;
}

/**
 * Render a radial arc filling from -135° to +135° (a 270° gauge sweep).
 * The pointer is computed from `relativeScore` clamped at 130% for visual headroom.
 */
export default function SMESScoreGauge({
  relativeScore,
  caption = "vs BICB moyenne",
  size = 220,
}: Props) {
  const clamped = Math.max(0, Math.min(130, relativeScore));
  const visualPct = clamped / 130; // 0..1
  const startAngle = -135;
  const endAngle = 135;
  const sweep = endAngle - startAngle; // 270
  const currentAngle = startAngle + sweep * visualPct;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 18;
  const strokeWidth = 16;
  const color = relativeScoreToColor(relativeScore);

  // Convert polar to cartesian (SVG rotates 0° = right, +clockwise; we use +0° = up)
  function polar(angleDeg: number): { x: number; y: number } {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(fromAngle: number, toAngle: number): string {
    const start = polar(fromAngle);
    const end = polar(toAngle);
    const largeArc = toAngle - fromAngle > 180 ? 1 : 0;
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  }

  const trackPath = arcPath(startAngle, endAngle);
  const fillPath =
    visualPct > 0 ? arcPath(startAngle, currentAngle) : null;

  const display = Math.round(relativeScore);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: BRAND.fontFamily,
      }}
      role="img"
      aria-label={`Score relatif ${display}% ${caption}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <path
          d={trackPath}
          fill="none"
          stroke={BRAND.surfaceAlt}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {fillPath ? (
          <path
            d={fillPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ) : null}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={Math.round(size * 0.22)}
          fontWeight={800}
          fill={color}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {display}%
        </text>
        <text
          x={cx}
          y={cy + size * 0.16}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={Math.round(size * 0.06)}
          fill={BRAND.textDim}
        >
          {caption}
        </text>
      </svg>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 10,
          fontSize: 10,
          color: BRAND.textSecondary,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>
          <span style={{ color: BRAND.error }}>■</span> &lt;70%
        </span>
        <span>
          <span style={{ color: BRAND.warning }}>■</span> 70-90%
        </span>
        <span>
          <span style={{ color: BRAND.gold }}>■</span> 90-100%
        </span>
        <span>
          <span style={{ color: BRAND.success }}>■</span> &gt;100%
        </span>
      </div>
    </div>
  );
}
