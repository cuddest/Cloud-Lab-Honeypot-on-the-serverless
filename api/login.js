import { recordHit } from "./utils.js";

export default async function handler(req, res) {
  let body = null;
  if (req.body) {
    body = req.body;
  }
  
  await recordHit(req, "/api/login", body);

  await new Promise(r => setTimeout(r, 250));
  
  res.status(401).json({
    status: "error",
    message: "Invalid credentials",
    code: "AUTH_FAILED"
  });
}
