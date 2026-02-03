import { useState } from 'react';
import { format } from 'date-fns';
import { Episode } from '../data/mockPodcast';
import { PodcastPlayer } from './PodcastPlayer';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
  layout?: 'list' | 'grid';
  title?: 'show' | 'hide';
  se_num?: 'default' | 'hide'; // season/episode number
  title_tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  image?: 'above_title' | 'below_title' | 'left' | 'right' | 'hide';
  image_size?: 'large' | 'medium' | 'small';
  content?: 'full' | 'excerpt' | 'hide';
  content_length?: number;
  player?: 'above_content' | 'below_content' | 'hide';
  link?: 'show' | 'hide';
  link_text?: string;
  items_per_page?: number;
  pagination?: 'numbers' | 'load_more' | 'hide';
}

export function EpisodeList({
  episodes,
  layout = 'list',
  title = 'show',
  se_num = 'default',
  title_tag = 'h2',
  image = 'above_title',
  image_size = 'large',
  content = 'excerpt',
  content_length = 55,
  player = 'above_content',
  link = 'show',
  link_text = 'Listen to this episode',
  items_per_page = 10,
  pagination = 'numbers',
}: EpisodeListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination logic
  const totalPages = Math.ceil(episodes.length / items_per_page);
  const startIndex = (currentPage - 1) * items_per_page;
  const currentEpisodes = episodes.slice(startIndex, startIndex + items_per_page);

  const TitleTag = title_tag as React.ElementType;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (pagination !== 'numbers' || totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2 mt-8 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-violet-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-8 ${layout === 'grid' ? 'grid-layout' : 'list-layout'}`}>
      <div className="space-y-6">
        {currentEpisodes.map((ep) => (
          <article 
            key={ep.id} 
            className="group flex flex-col md:flex-row h-auto md:h-[300px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image Section */}
            {image !== 'hide' && (
              <div className="shrink-0 p-4 md:p-6 flex items-center justify-center bg-slate-50 md:bg-transparent">
                <div className={`overflow-hidden rounded-lg shadow-sm ${
                  image_size === 'large' ? 'w-48 h-48' : 
                  image_size === 'medium' ? 'w-32 h-32' : 'w-24 h-24'
                }`}>
                  <img 
                    src={ep.image} 
                    alt={ep.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="flex-1 p-4 md:p-6 md:pl-0 flex flex-col overflow-y-auto min-w-0">
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-violet-500" />
                    {format(new Date(ep.date), 'MMM d, yyyy')}
                  </span>
                  {se_num === 'default' && (
                    <>
                      <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />
                      <span className="hidden md:block">S{ep.season} E{ep.episode}</span>
                    </>
                  )}
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-violet-500" />
                    {ep.duration}
                  </span>
                </div>

                {title === 'show' && (
                  <TitleTag className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-2">
                    <a href={ep.link}>{ep.title}</a>
                  </TitleTag>
                )}
              </div>

              {player === 'above_content' && (
                <div className="mb-4 shrink-0">
                   <PodcastPlayer audioUrl={ep.audioUrl} duration={ep.duration} />
                </div>
              )}

              {content !== 'hide' && (
                <div className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
                  {content === 'excerpt' ? (
                    <p className="line-clamp-3 md:line-clamp-none">
                      {ep.excerpt.split(' ').slice(0, content_length).join(' ')}
                      {ep.excerpt.split(' ').length > content_length ? '...' : ''}
                    </p>
                  ) : (
                    <p>{ep.excerpt}</p>
                  )}
                </div>
              )}

              {player === 'below_content' && (
                <div className="mt-auto shrink-0 pt-4">
                  <PodcastPlayer audioUrl={ep.audioUrl} duration={ep.duration} />
                </div>
              )}

              {link === 'show' && (
                <div className="mt-auto pt-2">
                  <a 
                    href={ep.link} 
                    className="inline-flex items-center text-sm font-bold text-violet-600 hover:text-violet-800 uppercase tracking-wide transition-colors"
                  >
                    {link_text} <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
}
