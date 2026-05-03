import { NextRequest, NextResponse } from "next/server";
import { simulate, type SimulationParams } from "@/lib/monte-carlo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { params?: SimulationParams; nRuns?: number };
    if (!body.params) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }
    const nRuns = Math.min(Math.max(body.nRuns ?? 1000, 100), 5000);
    const result = simulate(body.params, nRuns);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
