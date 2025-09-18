export default async function handler(req, res) {
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
