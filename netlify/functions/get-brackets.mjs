import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const store = getStore("world-cup-brackets");
    console.log("get-brackets: calling store.list()...");
    const { blobs } = await store.list();
    console.log("get-brackets: store.list() returned blobs:", blobs);

    // Fetch JSON contents in parallel
    const promises = blobs
      .map(b => {
        try {
          return { key: b.key, decodedKey: decodeURIComponent(b.key) };
        } catch (e) {
          return { key: b.key, decodedKey: b.key };
        }
      })
      .filter(item => item.decodedKey.startsWith("bracket:"))
      .map(async (item) => {
        try {
          const bracketData = await store.get(item.decodedKey, { type: "json" });
          if (bracketData) {
            // Strip out sensitive clientId
            const { clientId, ...publicData } = bracketData;
            return publicData;
          }
        } catch (err) {
          console.error(`Error loading blob ${item.decodedKey}:`, err);
        }
        return null;
      });

    const resolved = await Promise.all(promises);
    const publicBrackets = resolved.filter(item => item !== null);

    return new Response(JSON.stringify(publicBrackets), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });

  } catch (error) {
    console.error("Error fetching brackets list:", error);
    return new Response(JSON.stringify({ error: "Server error listing brackets" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
