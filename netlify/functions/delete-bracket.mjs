import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const data = await req.json();
    const { nickname, passcode } = data;

    if (!nickname || typeof nickname !== "string" || nickname.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Nickname is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const expectedPasscode = process.env.ADMIN_PASSCODE || "admin2026";
    if (passcode !== expectedPasscode) {
      return new Response(JSON.stringify({ error: "Invalid admin passcode" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }

    const slug = nickname
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const blobKey = `bracket:${slug}`;
    const store = getStore("world-cup-brackets");

    // Delete the blob
    await store.delete(blobKey);

    return new Response(JSON.stringify({ success: true, message: `Bracket for "${nickname}" deleted.` }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error deleting bracket:", error);
    return new Response(JSON.stringify({ error: "Server error deleting bracket" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
