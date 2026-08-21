import { useAnalysis } from './hooks/useAnalysis';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import AnalysisProgress from './components/AnalysisProgress';
import ErrorState from './components/ErrorState';

export default function App() {
  const {
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
  } = useAnalysis();

  if (analysisState === 'uploading' || analysisState === 'analyzing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <AnalysisProgress currentStage={currentStage} />
      </div>
    );
  }

  if (analysisState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
        <ErrorState
          error={error}
          onRetry={startAnalysis}
          onReset={reset}
        />
      </div>
    );
  }

  if (analysisState === 'success' && result) {
    return <ResultsPage result={result} onReset={reset} />;
  }

  // Default: Upload / Landing screen
  return (
    <UploadPage
      file={file}
      fileError={fileError}
      jobDescription={jobDescription}
      loading={false}
      onFileSelect={setFile}
      onFileError={setFileError}
      onJobDescriptionChange={setJobDescription}
      onAnalyze={startAnalysis}
    />
  );
}
