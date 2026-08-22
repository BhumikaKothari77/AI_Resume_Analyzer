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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col">
      {/* Navigation Header */}
      <Header onHowScoringWorks={() => setHowScoringOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Upload & JD Form Card */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/80">
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
        <section id="how-it-works" className="mt-20 pt-10 border-t border-gray-200/60">
          <div className="text-center mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
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
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Provide your standard PDF or DOCX file. Our engine parses structural formatting, font styles, columns, and section headers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Target Role (Optional)</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Paste the job description of your dream role to unlock deep keyword gap analysis, skill matching, and tailored positioning insights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
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
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400 bg-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} ResumeAI — Recruiter & ATS Intelligence</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
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
