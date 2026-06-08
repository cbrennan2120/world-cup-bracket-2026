export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const reqBody = await req.text();
    const { passcode } = JSON.parse(reqBody);

    const expectedPasscode = process.env.ADMIN_PASSCODE || (process.env.NETLIFY_DEV ? "admin2026" : null);
    if (!expectedPasscode) {
      console.error("ADMIN_PASSCODE environment variable is not configured on the server.");
      return new Response(JSON.stringify({ error: "Server configuration error. Admin access is disabled until ADMIN_PASSCODE is set in Netlify." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (passcode !== expectedPasscode) {
      return new Response(JSON.stringify({ error: "Invalid admin passcode" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Verify passcode error:", err);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};
