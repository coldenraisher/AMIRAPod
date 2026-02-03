import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Share2 } from 'lucide-react';

interface PodcastPlayerProps {
  audioUrl: string;
  duration?: string;
}

export function PodcastPlayer({ audioUrl, duration }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-full my-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="flex-1 flex flex-col justify-center h-10">
          <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-violet-600 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500 font-medium">
            <span>00:00</span>
            <span>{duration || "00:00"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 transition-colors hidden sm:block">
            <Download size={18} />
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 transition-colors hidden sm:block">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
