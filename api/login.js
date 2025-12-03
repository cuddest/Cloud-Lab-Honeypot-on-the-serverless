import { recordHit } from "./utils.js";

export default async function handler(req) {
  let body = null;
  try { body = await req.json(); } catch (e) { }
  await recordHit(req, "/api/login", body);

  await new Promise(r => setTimeout(r, 250));
  return new Response(JSON.stringify({
    status: "error",
    message: "Invalid credentials",
    code: "AUTH_FAILED"
  }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}
