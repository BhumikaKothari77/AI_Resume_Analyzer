import { useState, useEffect } from 'react';
import { X, Sparkles, Key, Check, AlertCircle, ExternalLink, Shield } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getGeminiApiKey());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setGeminiApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    setGeminiApiKey('');
    setIsSaved(true);
  };

  const hasActiveKey = Boolean(apiKey.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-pink-100 animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 via-rose-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">AI Engine Settings</h3>
              <p className="text-xs text-gray-500">Configure Google Gemini AI or use the built-in analyzer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Engine Status Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              hasActiveKey
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-pink-50/80 border-pink-200/80 text-pink-900'
            }`}
          >
            {hasActiveKey ? (
              <Check className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-sm">
                {hasActiveKey ? 'Gemini AI Mode Enabled' : 'Smart Built-in NLP Engine Active'}
              </p>
              <p className="mt-0.5 text-gray-600">
                {hasActiveKey
                  ? 'Resumes are analyzed directly by Google Gemini 1.5 Flash for deep context awareness, custom rewrites, and ATS gap scoring.'
                  : 'Analyzing resumes using the built-in algorithmic engine (150+ skill dictionary, section auditor, and metric detection). No API key required.'}
              </p>
            </div>
          </div>

          {/* Key Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Key className="w-4 h-4 text-pink-500" />
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-mono"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1 hover:underline"
              >
                Get a free Gemini API key
                <ExternalLink className="w-3 h-3" />
              </a>
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-gray-500 hover:text-rose-600 transition-colors"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2.5 text-xs text-gray-500 bg-pink-50/30 border border-pink-100 p-3 rounded-2xl">
            <Shield className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
            <span>
              Your API key and resume data are processed directly in your browser and never stored on any intermediate server.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-200/60 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 rounded-xl shadow-md shadow-pink-500/20 transition-all flex items-center gap-1.5"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved!
              </>
            ) : (
              'Save & Apply'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
