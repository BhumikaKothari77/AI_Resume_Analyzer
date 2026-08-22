import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalyzeButton from '../components/AnalyzeButton';
import HowScoringWorks from '../components/HowScoringWorks';
import { ShieldCheck } from 'lucide-react';

interface UploadPageProps {
  file: File | null;
  fileError: string | null;
  jobDescription: string;
  loading: boolean;
  onFileSelect: (file: File | null) => void;
  onFileError: (error: string | null) => void;
  onJobDescriptionChange: (jd: string) => void;
  onAnalyze: () => void;
}

export default function UploadPage({
  file,
  fileError,
  jobDescription,
  loading,
  onFileSelect,
  onFileError,
  onJobDescriptionChange,
  onAnalyze,
}: UploadPageProps) {
  const [howScoringOpen, setHowScoringOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/70 via-rose-50/20 to-white flex flex-col">
      {/* Navigation Header */}
      <Header onHowScoringWorks={() => setHowScoringOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Upload & JD Form Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-pink-100 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-500/5">
          <ResumeUploader
            file={file}
            fileError={fileError}
            onFileSelect={onFileSelect}
            onFileError={onFileError}
          />

          <JobDescriptionInput
            value={jobDescription}
            onChange={onJobDescriptionChange}
          />

          <AnalyzeButton
            disabled={!file || Boolean(fileError)}
            loading={loading}
            onClick={onAnalyze}
          />
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-20 pt-10 border-t border-pink-100">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200/70">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
              How ResumeAI Diagnoses Your Resume
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
              Engineered to emulate modern applicant tracking algorithms and senior hiring manager screening heuristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Provide your standard PDF, DOCX, or TXT file. Text is parsed instantly in your browser with zero data retention.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Target Role (Optional)</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Paste the job description to unlock deep keyword gap analysis, skill matching, and tailored positioning insights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Get Actionable Report</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Receive an immediate breakdown with quantifiable scores, prioritized top fixes, and one-click before/after bullet rewrites.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 py-6 text-center text-xs text-gray-400 bg-white/80">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} ResumeAI — Recruiter & ATS Intelligence</span>
          <span className="flex items-center gap-1 text-pink-700">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
            Zero permanent retention of parsed documents
          </span>
        </div>
      </footer>

      {/* How Scoring Works Modal */}
      <HowScoringWorks
        isOpen={howScoringOpen}
        onClose={() => setHowScoringOpen(false)}
      />
    </div>
  );
}
