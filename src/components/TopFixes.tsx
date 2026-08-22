import { Zap, TrendingUp, ArrowUpRight } from 'lucide-react';
import type { Fix } from '../types/analysis';

interface TopFixesProps {
  fixes: Fix[];
}

function getImpactStyle(impact: string) {
  switch (impact) {
    case 'high':
      return {
        badge: 'text-rose-700 bg-rose-50 border-rose-200/80',
        icon: <Zap className="w-3 h-3" />,
        label: 'High impact',
      };
    case 'medium':
      return {
        badge: 'text-amber-700 bg-amber-50 border-amber-200/80',
        icon: <TrendingUp className="w-3 h-3" />,
        label: 'Medium impact',
      };
    default:
      return {
        badge: 'text-pink-700 bg-pink-50 border-pink-200/80',
        icon: <ArrowUpRight className="w-3 h-3" />,
        label: 'Low impact',
      };
  }
}

export default function TopFixes({ fixes }: TopFixesProps) {
  return (
    <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-pink-50">
        <h3 className="text-base font-bold text-gray-900">Prioritized Action Items</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Highest-impact improvements you can make to pass recruiter and ATS screening
        </p>
      </div>

      <div className="divide-y divide-pink-50">
        {fixes.map((fix) => {
          const impact = getImpactStyle(fix.impact);

          return (
            <div
              key={fix.rank}
              className="px-6 py-4 hover:bg-pink-50/25 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center border border-pink-100">
                  <span className="text-xs font-bold text-pink-700 tabular-nums">
                    {String(fix.rank).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {fix.title}
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border ${impact.badge}`}
                    >
                      {impact.icon}
                      {impact.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {fix.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
