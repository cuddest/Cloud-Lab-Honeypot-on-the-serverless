import { recordHit } from "./_utils";
  // endpoint mimics a config leak to make it look like they are into something while we are recording the requests
export default async function handler(req) {
  await recordHit(req, "/api/internal", null);


  return new Response(JSON.stringify({
    status: "error",
    message: "This endpoint is internal. Authentication required."
  }), { status: 403, headers: { "Content-Type": "application/json" }});
}
