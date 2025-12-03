import { recordHit } from "./_utils";

export default async function handler(req) {
  await recordHit(req, "/api/admin", null);
  if (req.method === "POST") {
    return new Response(JSON.stringify({
      status: "error",
      message: "Admin write access denied"
    }), { status: 403, headers: { "Content-Type": "application/json" }});
  }
  return new Response(JSON.stringify({
    status: "ok",
    service: "internal-dashboard",
    version: "2.3.1",
    note: "Admin panel (restricted)"
  }), { status: 200, headers: { "Content-Type": "application/json" }});
}
