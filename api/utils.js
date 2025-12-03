import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export async function recordHit(req, endpoint, body = null) {
  const headers = req.headers || {};

  const hit = {
    endpoint,
    agent_id: (body && body.agent_id) || null,
    ip: req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || null,
    user_agent: headers["user-agent"] || null,
    method: req.method,
    path: req.url || endpoint,
    query_params: {},
    body: body || null,
    headers
  };

  if (supabase) {
    try {
      await supabase.from("honeypot_hits").insert(hit);
    } catch (e) {
      console.error("Supabase insert failed:", e);
      console.log("HIT:", JSON.stringify(hit));
    }
  } else {
    console.log("HONEYPOT HIT:", JSON.stringify(hit));
  }
}
