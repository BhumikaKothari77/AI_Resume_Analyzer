import { useEffect, useState } from 'react';
import {
  Upload,
  FileSearch,
  ShieldCheck,
  Search,
  PenTool,
  FileOutput,
  Check,
} from 'lucide-react';
import { LOADING_STAGES } from '../types/analysis';

interface AnalysisProgressProps {
  currentStage: number;
}

const stageIcons = [Upload, FileSearch, ShieldCheck, Search, PenTool, FileOutput];

export default function AnalysisProgress({ currentStage }: AnalysisProgressProps) {
  const [animatedStage, setAnimatedStage] = useState(-1);

  useEffect(() => {
    // Small delay for smooth animation
    const timer = setTimeout(() => setAnimatedStage(currentStage), 100);
    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      {/* Pulsing ring animation */}
      <div className="relative mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/25">
          <FileSearch className="w-9 h-9 text-white" />
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-pink-400 animate-ping opacity-25" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Analyzing your resume...
      </h2>
      <p className="text-sm text-gray-400 mb-10">
        Extracting text, evaluating ATS compliance, and optimizing impact.
      </p>

      {/* Stages */}
      <div className="w-full max-w-sm space-y-3">
        {LOADING_STAGES.map((stage, index) => {
          const Icon = stageIcons[index];
          const isComplete = animatedStage > index;
          const isActive = animatedStage === index;

          return (
            <div
              key={stage.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 border
                ${
                  isComplete
                    ? 'bg-rose-50/50 border-rose-200/60'
                    : isActive
                    ? 'bg-pink-50 border-pink-300 shadow-sm shadow-pink-100'
                    : 'bg-white border-gray-100'
                }
              `}
            >
              {/* Status icon */}
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300
                  ${
                    isComplete
                      ? 'bg-rose-100 text-rose-700'
                      : isActive
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-gray-100 text-gray-300'
                  }
                `}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-sm font-medium transition-colors duration-300
                  ${
                    isComplete
                      ? 'text-rose-800'
                      : isActive
                      ? 'text-pink-700 font-semibold'
                      : 'text-gray-400'
                  }
                `}
              >
                {stage.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mt-8">
        <div className="h-2 bg-pink-100/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(
                ((animatedStage + 1) / LOADING_STAGES.length) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
