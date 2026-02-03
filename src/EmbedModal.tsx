import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedModal({ isOpen, onClose }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const iframeCode = `<iframe src="https://your-website.com/podcast-player.html" width="100%" height="600" frameborder="0" loading="lazy" title="Podcast Player"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Embed Podcast Player</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <p className="font-semibold mb-1">Option 1: Iframe (Recommended)</p>
            <ol className="list-decimal list-inside space-y-1 opacity-90 mb-3">
              <li>Upload the built <code>index.html</code> file to your server.</li>
              <li>Replace the URL in the code below with the link to your uploaded file.</li>
              <li>Paste the code into your website.</li>
            </ol>
            
            <p className="font-semibold mb-1">Option 2: Direct Paste</p>
            <p className="opacity-90">
              Since this is a single-file build, you can also open <code>index.html</code> in a text editor, copy everything, and paste it directly into a "Custom HTML" block or compatible shortcode box.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Iframe Embed Code
            </label>
            <div className="relative">
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                {iframeCode}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && (
              <p className="text-green-600 text-xs mt-2 font-medium flex items-center gap-1">
                <Check size={12} /> Copied to clipboard!
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
