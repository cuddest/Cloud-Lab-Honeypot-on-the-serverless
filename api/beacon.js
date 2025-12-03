import { recordHit } from "./utils.js";

export default async function handler(req, res) {
  let body = null;
  if (req.body) {
    body = req.body;
  }

  await recordHit(req, "/api/beacon", body);
  res.status(200).json({ status: "ok", note: "Beacon logged" });
}
