import { ArrowLeft, FileText, Briefcase, Calendar } from 'lucide-react';
import type { AnalysisMetadata } from '../types/analysis';
import { formatFileSize } from '../utils/formatFileSize';

interface ResultsHeaderProps {
  metadata: AnalysisMetadata;
  onReset: () => void;
}

export default function ResultsHeader({ metadata, onReset }: ResultsHeaderProps) {
  const formattedDate = new Date(metadata.analyzedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Diagnostic Scorecard
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Resume Analysis
        </h1>

        {/* Metadata Badges */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100/80 font-medium">
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span className="truncate max-w-[200px] sm:max-w-xs" title={metadata.fileName}>
              {metadata.fileName}
            </span>
            {metadata.fileSize > 0 && (
              <span className="text-gray-400">({formatFileSize(metadata.fileSize)})</span>
            )}
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium ${
              metadata.hasJobDescription
                ? 'bg-violet-50 text-violet-700 border border-violet-100'
                : 'bg-gray-100/80 text-gray-600'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>
              {metadata.hasJobDescription
                ? 'Role-targeted match active'
                : 'General ATS audit (no JD)'}
            </span>
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <button
        type="button"
        onClick={onReset}
        className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-2xs hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Analyze another resume"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Analyze another resume</span>
      </button>
    </div>
  );
}
