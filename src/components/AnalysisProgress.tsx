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
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <FileSearch className="w-9 h-9 text-white" />
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-indigo-400 animate-ping opacity-20" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Analyzing your resume...
      </h2>
      <p className="text-sm text-gray-400 mb-10">
        This usually takes less than 30 seconds.
      </p>

      {/* Stages */}
      <div className="w-full max-w-sm space-y-3">
        {LOADING_STAGES.map((stage, index) => {
          const Icon = stageIcons[index];
          const isComplete = animatedStage > index;
          const isActive = animatedStage === index;
          const isPending = animatedStage < index;

          return (
            <div
              key={stage.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500
                ${isComplete ? 'bg-emerald-50' : isActive ? 'bg-indigo-50' : 'bg-gray-50'}
              `}
            >
              {/* Status icon */}
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                  ${
                    isComplete
                      ? 'bg-emerald-100 text-emerald-600'
                      : isActive
                      ? 'bg-indigo-100 text-indigo-600'
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
                      ? 'text-emerald-700'
                      : isActive
                      ? 'text-indigo-700'
                      : 'text-gray-400'
                  }
                `}
              >
                {stage.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mt-8">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700 ease-out"
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
