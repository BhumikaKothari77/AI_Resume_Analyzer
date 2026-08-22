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

  // Color based on score with pink/rose theme
  const getScoreColor = (s: number) => {
    if (s >= 85) return { stroke: '#f43f5e', bg: 'from-rose-50 via-pink-50 to-rose-100/60', text: 'text-rose-700' };
    if (s >= 70) return { stroke: '#ec4899', bg: 'from-pink-50 via-rose-50/60 to-pink-100/50', text: 'text-pink-700' };
    if (s >= 55) return { stroke: '#f59e0b', bg: 'from-amber-50 to-orange-100/50', text: 'text-amber-700' };
    return { stroke: '#e11d48', bg: 'from-rose-50 to-red-100/50', text: 'text-rose-800' };
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm`}>
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
              stroke="#fce7f3"
              strokeWidth="9"
              opacity="0.8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={colors.stroke}
              strokeWidth="9"
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
            <span className="text-xs text-pink-400 font-medium mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Score info */}
        <div className="text-center sm:text-left">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Overall ATS Readiness Score
          </h3>
          <p className={`mt-1.5 text-lg sm:text-xl font-semibold ${colors.text}`}>
            {verdict}
          </p>
        </div>
      </div>
    </div>
  );
}
