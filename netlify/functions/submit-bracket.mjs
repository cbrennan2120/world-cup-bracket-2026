import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const data = await req.json();
    const { nickname, groups, wildcards, knockouts, clientId } = data;

    // Validate request body
    if (!nickname || typeof nickname !== "string" || nickname.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Nickname is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (nickname.length > 25) {
      return new Response(JSON.stringify({ error: "Nickname must be 25 characters or less" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!clientId || typeof clientId !== "string") {
      return new Response(JSON.stringify({ error: "ClientId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!groups || !wildcards || !knockouts) {
      return new Response(JSON.stringify({ error: "Incomplete prediction data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const slug = nickname
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Invalid nickname characters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const blobKey = `bracket:${slug}`;
    const store = getStore("world-cup-brackets");

    // Check if bracket already exists
    let existing = null;
    try {
      existing = await store.get(blobKey, { type: "json" });
    } catch (err) {
      // Blob does not exist yet, proceed
    }

    if (existing) {
      // If it exists, check if clientId matches to prevent hijacking
      if (existing.clientId !== clientId) {
        return new Response(
          JSON.stringify({ error: "Nickname is already taken. Please choose another nickname." }),
          {
            status: 409,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }

    // Save prediction data
    const payload = {
      nickname: nickname.trim(),
      clientId,
      groups,
      wildcards,
      knockouts,
      updatedAt: new Date().toISOString()
    };

    await store.setJSON(blobKey, payload);

    return new Response(JSON.stringify({ success: true, message: "Bracket published successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error submitting bracket:", error);
    return new Response(JSON.stringify({ error: "Server error saving bracket" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
