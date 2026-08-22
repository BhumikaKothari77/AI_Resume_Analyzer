import { useEffect, useState } from 'react';
import { BarChart3, Search, PenTool, LayoutList } from 'lucide-react';
import { getStatusLabel } from '../utils/formatFileSize';

interface CategoryData {
  label: string;
  score: number | null;
  status: string;
  icon: typeof BarChart3;
}

interface CategoryBreakdownProps {
  atsFormatting: { score: number; status: string };
  keywordMatch: { score: number | null; status: string };
  bulletQuality: { score: number; status: string };
  sectionCompleteness: { score: number; status: string };
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'excellent':
      return 'text-rose-700 bg-rose-50 border border-rose-200/60';
    case 'good':
      return 'text-pink-700 bg-pink-50 border border-pink-200/60';
    case 'needs-improvement':
      return 'text-amber-700 bg-amber-50 border border-amber-200/60';
    case 'critical':
      return 'text-red-700 bg-red-50 border border-red-200/60';
    default:
      return 'text-gray-500 bg-gray-50';
  }
}

function getBarColor(status: string): string {
  switch (status) {
    case 'excellent':
      return 'bg-gradient-to-r from-pink-500 to-rose-600';
    case 'good':
      return 'bg-gradient-to-r from-pink-400 to-pink-500';
    case 'needs-improvement':
      return 'bg-amber-500';
    case 'critical':
      return 'bg-rose-600';
    default:
      return 'bg-gray-300';
  }
}

function CategoryCard({ label, score, status, icon: Icon }: CategoryData) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(score ?? 0), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const displayScore = score !== null;

  return (
    <div className="bg-white border border-pink-100/80 rounded-2xl p-5 hover:shadow-md hover:border-pink-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{label}</span>
        </div>
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(
            status
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      </div>

      {displayScore ? (
        <>
          <div className="flex items-baseline gap-1 mb-2.5">
            <span className="text-2xl font-bold text-gray-900 tabular-nums">
              {score}
            </span>
            <span className="text-xs text-pink-400 font-medium">/ 100</span>
          </div>

          <div className="h-2 bg-pink-50 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(
                status
              )}`}
              style={{ width: `${animatedWidth}%` }}
            />
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-400 mt-2">
          Add a job description to calculate target keyword alignment.
        </p>
      )}
    </div>
  );
}

export default function CategoryBreakdown({
  atsFormatting,
  keywordMatch,
  bulletQuality,
  sectionCompleteness,
}: CategoryBreakdownProps) {
  const categories: CategoryData[] = [
    {
      label: 'ATS Formatting',
      score: atsFormatting.score,
      status: atsFormatting.status,
      icon: BarChart3,
    },
    {
      label: 'Keyword Match',
      score: keywordMatch.score,
      status: keywordMatch.score !== null ? keywordMatch.status : 'unavailable',
      icon: Search,
    },
    {
      label: 'Bullet Quality',
      score: bulletQuality.score,
      status: bulletQuality.status,
      icon: PenTool,
    },
    {
      label: 'Section Completeness',
      score: sectionCompleteness.score,
      status: sectionCompleteness.status,
      icon: LayoutList,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.label} {...cat} />
      ))}
    </div>
  );
}
