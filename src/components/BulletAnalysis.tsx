import { useState } from 'react';
import { PenTool, Copy, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import type { BulletAnalysis as BulletAnalysisType } from '../types/analysis';

interface BulletAnalysisProps {
  bullets: BulletAnalysisType[];
}

export default function BulletAnalysis({ bullets }: BulletAnalysisProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Bullet Point Analysis & Rewrites</h3>
            <p className="text-xs text-gray-500">
              Transform weak descriptions into measurable, high-impact achievements
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
          {bullets.length} suggested rewrite{bullets.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {bullets.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-800">All bullet points look strong!</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Your resume experience bullets already incorporate strong action verbs and measurable results.
            </p>
          </div>
        ) : (
          bullets.map((bullet, idx) => (
            <div
              key={bullet.id}
              className="rounded-xl border border-gray-200/80 bg-white shadow-2xs overflow-hidden"
            >
              {/* Card Header: Issue Tag & Description */}
              <div className="px-5 py-3 bg-gray-50/80 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">#{idx + 1}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/70 text-amber-800">
                    <AlertCircle className="w-3 h-3" />
                    {bullet.issueTag}
                  </span>
                </div>
                <p className="text-xs text-gray-500 italic">{bullet.issue}</p>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {/* BEFORE Column */}
                <div className="p-5 bg-rose-50/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Original (Before)
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-mono bg-white/70 p-3 rounded-lg border border-rose-100">
                    "{bullet.original}"
                  </p>
                </div>

                {/* AFTER Column */}
                <div className="p-5 bg-emerald-50/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Suggested Rewrite (After)
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bullet.id, bullet.suggested)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                          copiedId === bullet.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
                        }`}
                        title="Copy rewritten bullet"
                        aria-label="Copy rewritten bullet point"
                      >
                        {copiedId === bullet.id ? (
                          <>
                            <Check className="w-3 h-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 leading-relaxed font-medium bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
                      "{bullet.suggested}"
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Includes action verb, specific scope & quantified outcome</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
