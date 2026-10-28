// Using CORS proxy to bypass Netlify browser restriction on free mirrors
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const TARGET_URL = "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json";

// Fallback mock news in case the public API fails or is down
const FALLBACK_ARTICLES = [
  {
    id: "sports-fallback-1",
    title: "India Dominate Day 1 of Test Match with Record Opening Partnership",
    description: "Opener batters showcase incredible resilience and stroke-play, setting a massive total on the scoreboard.",
    url: "#",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    source: "Sports Wire India",
    publishedAt: new Date().toISOString(),
    category: "sports"
  },
  {
    id: "sports-fallback-2",
    title: "Premier League: Thrilling Comeback Victory Secures Top 4 Spot",
    description: "An injury-time winner sends the home fans into absolute raptures as the title race heats up.",
    url: "#",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    source: "Global Sports News",
    publishedAt: new Date().toISOString(),
    category: "sports"
  },
  {
    id: "sports-fallback-3",
    title: "T20 Series Opener: Deadly Bowling Spell Tears Through Top Order",
    description: "Fast bowlers make full use of the morning swing conditions to dismantle the opposition batting lineup.",
    url: "#",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b75cda?auto=format&fit=crop&w=800&q=80",
    source: "Cricket Live",
    publishedAt: new Date().toISOString(),
    category: "sports"
  },
  {
    id: "sports-fallback-4",
    title: "Grand Slam Preview: Seeded Players Ready for Epic Showdowns",
    description: "The stage is set for an unforgettable fortnight of tennis action with world-class athletes in top form.",
    url: "#",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80",
    source: "Tennis Weekly",
    publishedAt: new Date().toISOString(),
    category: "sports"
  }
];

export async function fetchHeadlines(category = "sports") {
  try {
    const res = await fetch(CORS_PROXY + encodeURIComponent(TARGET_URL));
    if (!res.ok) {
      throw new Error(`News request failed: ${res.status}`);
    }
    const data = await res.json();
    
    const articles = (data.articles || [])
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a, i) => ({
        id: `${category}-${i}-${a.publishedAt || i}`,
        title: a.title,
        description: a.description || "Read full coverage on official sports portal.",
        url: a.url,
        image: a.urlToImage || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        source: a.source?.name || "Sports Wire",
        publishedAt: a.publishedAt,
        category,
      }));

    // If API returns empty articles, use fallback
    if (articles.length === 0) {
      return FALLBACK_ARTICLES;
    }

    return articles;
  } catch (err) {
    console.warn("API fetch failed, switching to fallback sports articles:", err.message);
    // Return robust fallback articles so UI never breaks on Netlify
    return FALLBACK_ARTICLES;
  }
}

export const CATEGORIES = ["sports"];
