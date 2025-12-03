import { recordHit } from "./utils.js";

// endpoint mimics a config leak to make it look like they are into something while we are recording the requests
export default async function handler(req, res) {
  await recordHit(req, "/api/internal", null);

  res.status(403).json({
    status: "error",
    message: "This endpoint is internal. Authentication required."
  });
}
