import { useState, useCallback } from 'react';
import type { AnalysisResult, AnalysisState, ApiError } from '../types/analysis';
import { analyzeResume } from '../services/analyzerApi';

interface UseAnalysisReturn {
  // State
  file: File | null;
  jobDescription: string;
  analysisState: AnalysisState;
  currentStage: number;
  result: AnalysisResult | null;
  error: ApiError | null;
  fileError: string | null;

  // Actions
  setFile: (file: File | null) => void;
  setJobDescription: (jd: string) => void;
  setFileError: (error: string | null) => void;
  startAnalysis: () => Promise<void>;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [currentStage, setCurrentStage] = useState(-1);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const startAnalysis = useCallback(async () => {
    if (!file) return;

    setAnalysisState('uploading');
    setError(null);
    setCurrentStage(0);

    try {
      setAnalysisState('analyzing');

      const analysisResult = await analyzeResume(
        file,
        jobDescription,
        (stageIndex) => setCurrentStage(stageIndex)
      );

      setResult(analysisResult);
      setAnalysisState('success');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'We couldn\'t complete the analysis. Please try again.';

      setError({
        type: message.includes('connect') ? 'network' : 'analysis-failed',
        message,
      });
      setAnalysisState('error');
    }
  }, [file, jobDescription]);

  const reset = useCallback(() => {
    setFile(null);
    setJobDescription('');
    setAnalysisState('idle');
    setCurrentStage(-1);
    setResult(null);
    setError(null);
    setFileError(null);
  }, []);

  return {
    file,
    jobDescription,
    analysisState,
    currentStage,
    result,
    error,
    fileError,
    setFile,
    setJobDescription,
    setFileError,
    startAnalysis,
    reset,
  };
}
