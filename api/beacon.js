import { recordHit } from "./_utils";

export default async function handler(req, res) {
  let body = null;
  try { body = await req.json(); } catch(e){ /* ignore */ }

  await recordHit(req, "/api/beacon", body);
  return new Response(JSON.stringify({ status: "ok", note: "Beacon logged" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
