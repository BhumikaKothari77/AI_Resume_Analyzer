import { useState, useEffect } from 'react';
import { FileText, HelpCircle, X, ChevronDown, Sparkles, Key } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';
import { getGeminiApiKey } from '../services/geminiService';

interface HeaderProps {
  onHowScoringWorks: () => void;
}

export default function Header({ onHowScoringWorks }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(Boolean(getGeminiApiKey()));
  }, [isApiKeyModalOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-100/70 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-md shadow-pink-500/20">
                <FileText className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Resume<span className="text-pink-600">AI</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-2">
              <a
                href="#how-it-works"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 rounded-lg hover:bg-pink-50/60 transition-colors"
              >
                How it works
              </a>
              <button
                onClick={onHowScoringWorks}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 rounded-lg hover:bg-pink-50/60 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                How scoring works
              </button>

              {/* AI Mode Selector / API Key Button */}
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className={`ml-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 shadow-sm ${
                  hasApiKey
                    ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                    : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
                }`}
                title="Configure Google Gemini API key or use built-in smart analyzer"
              >
                {hasApiKey ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    <span>Gemini AI Active</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5 text-pink-600" />
                    <span>AI Settings</span>
                  </>
                )}
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-1.5 text-xs font-semibold rounded-lg border border-pink-200 bg-pink-50 text-pink-700"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-pink-50/60 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4 border-t border-pink-100 pt-2 animate-fade-in space-y-1">
              <a
                href="#how-it-works"
                className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-pink-600 rounded-lg hover:bg-pink-50/60 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <button
                onClick={() => {
                  onHowScoringWorks();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-pink-600 rounded-lg hover:bg-pink-50/60 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                How scoring works
              </button>
              <button
                onClick={() => {
                  setIsApiKeyModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-pink-600 hover:bg-pink-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {hasApiKey ? 'Gemini AI Settings (Active)' : 'Configure Gemini API Key'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => {
          setIsApiKeyModalOpen(false);
          setHasApiKey(Boolean(getGeminiApiKey()));
        }}
      />
    </>
  );
}
