import { Zap, TrendingUp, ArrowUpRight } from 'lucide-react';
import type { Fix } from '../types/analysis';

interface TopFixesProps {
  fixes: Fix[];
}

function getImpactStyle(impact: string) {
  switch (impact) {
    case 'high':
      return {
        badge: 'text-red-700 bg-red-50 border-red-100',
        icon: <Zap className="w-3 h-3" />,
        label: 'High impact',
      };
    case 'medium':
      return {
        badge: 'text-amber-700 bg-amber-50 border-amber-100',
        icon: <TrendingUp className="w-3 h-3" />,
        label: 'Medium impact',
      };
    default:
      return {
        badge: 'text-blue-700 bg-blue-50 border-blue-100',
        icon: <ArrowUpRight className="w-3 h-3" />,
        label: 'Low impact',
      };
  }
}

export default function TopFixes({ fixes }: TopFixesProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Top Fixes</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Highest-impact improvements you can make right now
        </p>
      </div>

      <div className="divide-y divide-gray-50">
        {fixes.map((fix) => {
          const impact = getImpactStyle(fix.impact);

          return (
            <div
              key={fix.rank}
              className="px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-400 tabular-nums">
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
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${impact.badge}`}
                    >
                      {impact.icon}
                      {impact.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
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
