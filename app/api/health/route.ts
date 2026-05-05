import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const TIMEOUT_MS = 5000;

async function timed<T>(fn: () => Promise<T>) {
  const t0 = performance.now();
  try {
    await Promise.race([
      fn(),
      new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error("timeout")), TIMEOUT_MS)
      ),
    ]);
    return { status: "ok" as const, latency_ms: Math.round(performance.now() - t0), error: null };
  } catch (e) {
    return { status: "down" as const, latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

async function checkDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { status: "n/a" as const, latency_ms: null, error: "no supabase env" };
  return timed(async () => {
    const r = await fetch(`${url}/rest/v1/?select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!r.ok && r.status !== 404) throw new Error(`http ${r.status}`);
  });
}

async function checkAnthropic() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { status: "n/a" as const, latency_ms: null, error: "no anthropic key" };
  return timed(async () => {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "OPTIONS", cache: "no-store" });
    if (r.status >= 500) throw new Error(`upstream ${r.status}`);
  });
}

async function checkStorage() {
  if (!process.env.R2_ACCESS_KEY_ID && !process.env.BLOB_READ_WRITE_TOKEN) {
    return { status: "n/a" as const, latency_ms: null, error: "no storage configured" };
  }
  return { status: "ok" as const, latency_ms: 0, error: null };
}

export async function GET() {
  const t0 = performance.now();
  const [db, anthropic, storage] = await Promise.all([checkDb(), checkAnthropic(), checkStorage()]);

  const dbDown = db.status === "down";
  const downCount = [db, anthropic, storage].filter((c) => c.status === "down").length;
  let status: "ok" | "degraded" | "down" = "ok";
  if (dbDown || downCount >= 2) status = "down";
  else if (downCount === 1) status = "degraded";

  return NextResponse.json(
    {
      status,
      service: process.env.NEXT_PUBLIC_APP_NAME ?? "revenue-lab",
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? process.env.GIT_SHA ?? "unknown",
      ts: new Date().toISOString(),
      checks: { db, anthropic, storage },
      uptime_s: Math.round(process.uptime?.() ?? 0),
      total_latency_ms: Math.round(performance.now() - t0),
    },
    { status: status === "down" ? 503 : 200, headers: { "Cache-Control": "no-store, no-cache, max-age=0" } }
  );
}
