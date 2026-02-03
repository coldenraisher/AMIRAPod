import { useEffect, useState } from 'react';
import { EpisodeList } from './components/EpisodeList';
import { Mic, Loader2, Code } from 'lucide-react';
import { fetchPodcastFeed } from './utils/rss';
import { Episode, mockEpisodes } from './data/mockPodcast';
import { EmbedModal } from './components/EmbedModal';

export function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const feedUrl = 'https://feeds.captivate.fm/the-ira-cafe/';
        const fetchedEpisodes = await fetchPodcastFeed(feedUrl);
        
        if (fetchedEpisodes.length > 0) {
          // Take only the 6 most recent episodes
          setEpisodes(fetchedEpisodes.slice(0, 6));
        } else {
          // Fallback to mock data if fetch fails (e.g. CORS)
          console.warn("Using mock data as fallback");
          setEpisodes(mockEpisodes.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to load episodes", err);
        setEpisodes(mockEpisodes.slice(0, 6));
      } finally {
        setLoading(false);
      }
    }

    loadEpisodes();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-2 rounded-lg text-white">
              <Mic size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">The IRA Cafe</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-violet-600 transition-colors">Episodes</a>
            <a href="#" className="hover:text-violet-600 transition-colors">About</a>
            <button 
              onClick={() => setIsEmbedModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
            >
              <Code size={16} />
              <span>Embed</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="bg-slate-50 py-12 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Episodes</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Welcome to The IRA Cafe, where we discuss everything about retirement accounts.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-violet-600" size={40} />
          </div>
        ) : (
          <EpisodeList 
            episodes={episodes}
            layout="list"
            title="show"
            se_num="default"
            title_tag="h2"
            image="above_title"
            image_size="large"
            content="excerpt"
            content_length={55}
            player="above_content"
            link="show"
            link_text="Listen to this episode"
            items_per_page={6} 
            pagination="hide"
          />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} The IRA Cafe. All rights reserved.</p>
        </div>
      </footer>

      <EmbedModal 
        isOpen={isEmbedModalOpen} 
        onClose={() => setIsEmbedModalOpen(false)} 
      />
    </div>
  );
}
