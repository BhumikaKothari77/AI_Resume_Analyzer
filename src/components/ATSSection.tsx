import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Issue } from '../types/analysis';

interface ATSSectionProps {
  issues: Issue[];
}

function getSeverityBadge(severity: Issue['severity']) {
  switch (severity) {
    case 'critical':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
        label: 'Critical Issue',
      };
    case 'warning':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        label: 'Needs Attention',
      };
    case 'info':
    default:
      return {
        bg: 'bg-pink-50 text-pink-700 border-pink-200',
        icon: <Info className="w-4 h-4 text-pink-600" />,
        label: 'Minor Suggestion',
      };
  }
}

export default function ATSSection({ issues }: ATSSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">ATS Formatting & Parsing</h3>
            <p className="text-xs text-gray-500">
              {issues.length > 0
                ? `${issues.length} potential formatting issue${issues.length > 1 ? 's' : ''} detected`
                : 'No formatting issues detected'}
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
          {issues.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">No major ATS formatting issues detected</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Your resume structure adheres to standard parsing conventions with clean layout and typography.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mt-2">
              {issues.map((issue) => {
                const badge = getSeverityBadge(issue.severity);
                return (
                  <div
                    key={issue.id}
                    className="p-4 rounded-xl border border-pink-100/70 bg-pink-50/20 hover:bg-pink-50/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">{issue.title}</h4>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}
                      >
                        {badge.icon}
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      {issue.description}
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-pink-100 text-xs sm:text-sm text-gray-700 shadow-xs">
                      <span className="font-semibold text-pink-700 mr-1">Suggested action:</span>
                      {issue.suggestion}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
