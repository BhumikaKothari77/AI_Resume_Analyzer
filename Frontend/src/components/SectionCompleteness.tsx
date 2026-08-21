import { useState } from 'react';
import { LayoutList, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, CheckCheck } from 'lucide-react';
import type { SectionCompleteness as SectionCompletenessType } from '../types/analysis';

interface SectionCompletenessProps {
  sectionCompleteness: SectionCompletenessType;
}

const SECTION_DESCRIPTIONS: Record<string, string> = {
  'Contact Information': 'Allows recruiters to contact you directly via phone, email, and location.',
  Summary: 'Provides a quick 2-3 sentence elevator pitch summarizing your core expertise.',
  Experience: 'Chronological work history demonstrating proven track record and impact.',
  Education: 'Academic credentials, degrees, and relevant institutional background.',
  Skills: 'Categorized list of technical, domain, and soft skill proficiencies for ATS scanning.',
  Certifications: 'Industry credentials and accredited qualifications that validate specialized knowledge.',
  Projects: 'Hands-on demonstrations of engineering work, open source contributions, or portfolio pieces.',
  Awards: 'Recognitions, honors, and notable career achievements.',
};

export default function SectionCompleteness({ sectionCompleteness }: SectionCompletenessProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { present, missing } = sectionCompleteness;
  const allPresent = missing.length === 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/75 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <LayoutList className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900">Section Completeness</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                {present.length} of {present.length + missing.length} detected
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {allPresent
                ? 'All recommended sections present'
                : `${missing.length} recommended section${missing.length > 1 ? 's' : ''} missing`}
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-50">
          {allPresent ? (
            <div className="py-6 text-center flex flex-col items-center justify-center bg-emerald-50/30 rounded-xl p-4 border border-emerald-100/50 mt-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <CheckCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">All standard resume sections detected</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Your resume includes all key structural blocks required by modern recruitment workflows.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mt-2">
              {/* Missing Sections Alert */}
              {missing.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Missing Recommended Sections ({missing.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {missing.map((sec) => (
                      <div key={sec} className="bg-white/80 p-2.5 rounded-lg border border-amber-200/40">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Missing: {sec}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 pl-3">
                          {SECTION_DESCRIPTIONS[sec] || 'Adding this section can provide recruiters with clearer evaluation criteria.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detected Sections Grid */}
              <div>
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5">
                  Detected Sections ({present.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {present.map((sec) => (
                    <div
                      key={sec}
                      className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50/40 text-xs font-medium text-gray-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
