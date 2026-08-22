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
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Resume<span className="text-indigo-600">AI</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-2">
              <a
                href="#how-it-works"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                How it works
              </a>
              <button
                onClick={onHowScoringWorks}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                How scoring works
              </button>

              {/* AI Mode Selector / API Key Button */}
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className={`ml-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 shadow-sm ${
                  hasApiKey
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                }`}
                title="Configure Google Gemini API key or use built-in smart analyzer"
              >
                {hasApiKey ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gemini AI Active</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5 text-indigo-600" />
                    <span>AI Settings</span>
                  </>
                )}
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-1.5 text-xs font-semibold rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
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
            <div className="sm:hidden pb-4 border-t border-gray-100 pt-2 animate-fade-in space-y-1">
              <a
                href="#how-it-works"
                className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <button
                onClick={() => {
                  onHowScoringWorks();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                How scoring works
              </button>
              <button
                onClick={() => {
                  setIsApiKeyModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5"
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
