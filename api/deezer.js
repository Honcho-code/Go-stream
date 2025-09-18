export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins (or restrict to your domain)
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { endpoint } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: "Missing endpoint query" });
    }

    const url = `https://api.deezer.com/${endpoint}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Deezer Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch Deezer API" });
  }
}
