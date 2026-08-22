import { useEffect, useState } from 'react';

interface ScoreCardProps {
  score: number;
  verdict: string;
}

export default function ScoreCard({ score, verdict }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * score);
      setAnimatedScore(current);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  // Color based on score
  const getScoreColor = (s: number) => {
    if (s >= 90) return { stroke: '#10b981', bg: 'from-emerald-50 to-emerald-100/50', text: 'text-emerald-700' };
    if (s >= 75) return { stroke: '#6366f1', bg: 'from-indigo-50 to-violet-100/50', text: 'text-indigo-700' };
    if (s >= 60) return { stroke: '#f59e0b', bg: 'from-amber-50 to-amber-100/50', text: 'text-amber-700' };
    return { stroke: '#ef4444', bg: 'from-red-50 to-red-100/50', text: 'text-red-700' };
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 sm:p-8 border border-white/60`}>
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg width="140" height="140" viewBox="0 0 120 120" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              opacity="0.3"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={colors.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold tabular-nums ${colors.text}`}>
              {animatedScore}
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Score info */}
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Overall Resume Score
          </h3>
          <p className={`mt-1.5 text-lg sm:text-xl font-semibold ${colors.text}`}>
            {verdict}
          </p>
        </div>
      </div>
    </div>
  );
}
