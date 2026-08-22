import { useState } from 'react';
import { Search, CheckCircle2, XCircle, ChevronDown, ChevronUp, FileQuestion } from 'lucide-react';
import type { KeywordMatch as KeywordMatchType } from '../types/analysis';

interface KeywordMatchProps {
  keywordMatch: KeywordMatchType;
  hasJobDescription: boolean;
}

export default function KeywordMatch({ keywordMatch, hasJobDescription }: KeywordMatchProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { score, matched, missing } = keywordMatch;

  return (
    <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-xs">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-pink-50/30 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900">Keyword & Skill Match</h3>
              {hasJobDescription && score !== null && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200/80">
                  {score}% match
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {hasJobDescription
                ? `${matched.length} matched • ${missing.length} missing from target job`
                : 'Job description comparison'}
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg text-gray-400 hover:text-pink-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-pink-50">
          {!hasJobDescription || score === null ? (
            /* Empty State for No Job Description */
            <div className="py-8 text-center flex flex-col items-center justify-center bg-pink-50/20 rounded-2xl p-6 border border-dashed border-pink-200 mt-2">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                <FileQuestion className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Keyword matching unavailable</h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
                Add a job description to see keyword and skill matching. Providing target job requirements allows us to calculate your exact keyword overlap and identify critical gaps.
              </p>
            </div>
          ) : (
            <div className="space-y-6 mt-3">
              {/* Matched Keywords */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Matched Skills & Keywords ({matched.length})
                  </h4>
                </div>
                {matched.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matched.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-pink-50/80 text-pink-800 border border-pink-200 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No direct matching keywords found.</p>
                )}
              </div>

              {/* Missing Keywords */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Missing Target Keywords ({missing.length})
                  </h4>
                </div>
                {missing.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {missing.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-pink-700 font-medium">All target keywords are present in your resume!</p>
                )}
                <p className="text-xs text-gray-400 mt-2.5">
                  Tip: Naturally incorporate missing terms into your experience bullets or skills section where truthfully applicable.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
