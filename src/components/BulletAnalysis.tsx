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
    <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-pink-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Bullet Point Analysis & Rewrites</h3>
            <p className="text-xs text-gray-500">
              Transform weak descriptions into measurable, high-impact achievements
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200/80">
          {bullets.length} suggested rewrite{bullets.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {bullets.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
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
              className="rounded-2xl border border-pink-100 bg-white shadow-2xs overflow-hidden"
            >
              {/* Card Header: Issue Tag & Description */}
              <div className="px-5 py-3 bg-pink-50/30 border-b border-pink-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-pink-400">#{idx + 1}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100/70 text-rose-800">
                    <AlertCircle className="w-3 h-3" />
                    {bullet.issueTag}
                  </span>
                </div>
                <p className="text-xs text-gray-500 italic">{bullet.issue}</p>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-pink-100">
                {/* BEFORE Column */}
                <div className="p-5 bg-rose-50/15">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Original (Before)
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed font-mono bg-white p-3 rounded-xl border border-rose-100">
                    "{bullet.original}"
                  </p>
                </div>

                {/* AFTER Column */}
                <div className="p-5 bg-pink-50/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                        Suggested Rewrite (After)
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(bullet.id, bullet.suggested)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          copiedId === bullet.id
                            ? 'bg-pink-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-700 border border-pink-200 shadow-2xs'
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
                    <p className="text-sm text-gray-900 leading-relaxed font-medium bg-white p-3 rounded-xl border border-pink-200/80 shadow-2xs">
                      "{bullet.suggested}"
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-700 font-medium">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Includes power verb, specific scope & quantified outcome</span>
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
