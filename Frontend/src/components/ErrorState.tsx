import { AlertOctagon, WifiOff, RefreshCw, FileWarning } from 'lucide-react';
import type { ApiError } from '../types/analysis';

interface ErrorStateProps {
  error: ApiError | null;
  onRetry: () => void;
  onReset: () => void;
}

export default function ErrorState({ error, onRetry, onReset }: ErrorStateProps) {
  const isNetwork = error?.type === 'network';
  const isCorrupt = error?.type === 'corrupt-resume';

  const title = isNetwork
    ? 'Unable to connect to analysis service'
    : isCorrupt
    ? "We couldn't read this resume"
    : "We couldn't complete the analysis";

  const description =
    error?.message ||
    'An unexpected issue occurred while analyzing your resume. Please check your file or try again.';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-lg shadow-gray-100/50">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-6">
          {isNetwork ? (
            <WifiOff className="w-8 h-8" />
          ) : isCorrupt ? (
            <FileWarning className="w-8 h-8" />
          ) : (
            <AlertOctagon className="w-8 h-8" />
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm shadow-indigo-100"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            Upload Different File
          </button>
        </div>
      </div>
    </div>
  );
}
