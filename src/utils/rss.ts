import { Episode } from '../data/mockPodcast';

export async function fetchPodcastFeed(url: string): Promise<Episode[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    
    const items = Array.from(xml.querySelectorAll("item"));
    
    return items.map((item, index) => {
      const title = item.querySelector("title")?.textContent || "Untitled Episode";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      // Try to find content:encoded, if not fallback to description
      const contentEncoded = item.getElementsByTagName("content:encoded")[0]?.textContent;
      const excerpt = (contentEncoded || description).replace(/<[^>]*>/g, '').slice(0, 300) + "...";
      
      const enclosure = item.querySelector("enclosure");
      const audioUrl = enclosure?.getAttribute("url") || "";
      
      const itunesImage = item.getElementsByTagName("itunes:image")[0];
      const image = itunesImage?.getAttribute("href") || 
                    xml.querySelector("image > url")?.textContent || 
                    "";
                    
      const itunesDuration = item.getElementsByTagName("itunes:duration")[0]?.textContent || "";
      
      const itunesSeason = item.getElementsByTagName("itunes:season")[0]?.textContent;
      const itunesEpisode = item.getElementsByTagName("itunes:episode")[0]?.textContent;
      
      const link = item.querySelector("link")?.textContent || "";

      return {
        id: `ep-${index}`, // RSS doesn't always have a unique ID, use index or guid if available
        title,
        date: pubDate,
        duration: itunesDuration,
        season: itunesSeason ? parseInt(itunesSeason) : 0,
        episode: itunesEpisode ? parseInt(itunesEpisode) : 0,
        image,
        excerpt, // Using excerpt for description
        audioUrl,
        link
      };
    });
  } catch (error) {
    console.error("Error fetching podcast feed:", error);
    return [];
  }
}
