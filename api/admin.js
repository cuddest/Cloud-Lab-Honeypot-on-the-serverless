import { recordHit } from "./utils.js";

export default async function handler(req, res) {
  await recordHit(req, "/api/admin", null);
  
  if (req.method === "POST") {
    res.status(403).json({
      status: "error",
      message: "Admin write access denied"
    });
    return;
  }
  
  res.status(200).json({
    status: "ok",
    service: "internal-dashboard",
    version: "2.3.1",
    note: "Admin panel (restricted)"
  });
}
