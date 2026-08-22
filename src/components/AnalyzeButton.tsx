import { Sparkles, Loader2 } from 'lucide-react';

interface AnalyzeButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function AnalyzeButton({
  disabled,
  loading,
  onClick,
}: AnalyzeButtonProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          group relative flex items-center justify-center gap-2.5
          px-8 py-3.5 text-base font-semibold rounded-xl
          transition-all duration-200 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
          ${
            disabled || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md'
          }
        `}
        aria-label={loading ? 'Analyzing resume' : 'Analyze resume'}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
        )}
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  );
}
