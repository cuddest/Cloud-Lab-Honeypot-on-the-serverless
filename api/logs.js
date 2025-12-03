import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export default async function handler(req) {
  if (!supabase) {
    return new Response(JSON.stringify({ error: "No DB configured" }), { status: 500, headers: { "Content-Type": "application/json" }});
  }

  const limit = Math.min(100, parseInt(req.url.split("limit=")[1] || "20", 10));
  const { data, error } = await supabase.from("honeypot_hits").select("*").order("created_at", { ascending: false }).limit(limit);

  if (error) {
    console.error("Supabase read error:", error);
    return new Response(JSON.stringify({ error: "DB read failed" }), { status: 500, headers: { "Content-Type": "application/json" }});
  }

  return new Response(JSON.stringify({ beacons: data }), { status: 200, headers: { "Content-Type": "application/json" }});
}
