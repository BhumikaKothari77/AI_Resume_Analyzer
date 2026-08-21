import { useState } from 'react';
import Header from '../components/Header';
import ResultsHeader from '../components/ResultsHeader';
import ScoreCard from '../components/ScoreCard';
import CategoryBreakdown from '../components/CategoryBreakdown';
import TopFixes from '../components/TopFixes';
import ATSSection from '../components/ATSSection';
import KeywordMatch from '../components/KeywordMatch';
import SectionCompleteness from '../components/SectionCompleteness';
import BulletAnalysis from '../components/BulletAnalysis';
import ExportActions from '../components/ExportActions';
import HowScoringWorks from '../components/HowScoringWorks';
import type { AnalysisResult } from '../types/analysis';

interface ResultsPageProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsPage({ result, onReset }: ResultsPageProps) {
  const [howScoringOpen, setHowScoringOpen] = useState(false);
  const REPORT_CONTAINER_ID = 'resume-diagnostic-report';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col">
      {/* Navigation Header */}
      <Header onHowScoringWorks={() => setHowScoringOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Export & Copy Toolbar */}
        <div className="mb-6">
          <ExportActions result={result} containerId={REPORT_CONTAINER_ID} />
        </div>

        {/* Printable/Exportable Diagnostic Report Section */}
        <div
          id={REPORT_CONTAINER_ID}
          className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/80 space-y-8"
        >
          {/* Results Header */}
          <ResultsHeader metadata={result.metadata} onReset={onReset} />

          {/* Overall Score Card */}
          <ScoreCard score={result.overallScore} verdict={result.verdict} />

          {/* 4 Category Breakdown Cards */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Performance by Category
            </h2>
            <CategoryBreakdown
              atsFormatting={result.categories.atsFormatting}
              keywordMatch={result.categories.keywordMatch}
              bulletQuality={result.categories.bulletQuality}
              sectionCompleteness={result.categories.sectionCompleteness}
            />
          </div>

          {/* Top 3-5 Fixes */}
          {result.topFixes.length > 0 && <TopFixes fixes={result.topFixes} />}

          {/* Expandable Diagnostic Sections */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Detailed Diagnostic Breakdown
            </h2>

            {/* ATS Formatting */}
            <ATSSection issues={result.categories.atsFormatting.issues} />

            {/* Keyword Match */}
            <KeywordMatch
              keywordMatch={result.categories.keywordMatch}
              hasJobDescription={result.metadata.hasJobDescription}
            />

            {/* Section Completeness */}
            <SectionCompleteness
              sectionCompleteness={result.categories.sectionCompleteness}
            />

            {/* Bullet Point Rewrites */}
            <BulletAnalysis bullets={result.categories.bulletQuality.bullets} />
          </div>
        </div>

        {/* Bottom CTA / Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Ready to test an updated resume?</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Make your edits based on the recommendations above and re-scan anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm"
          >
            Analyze Another Resume
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400 bg-white mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} ResumeAI — Recruiter & ATS Intelligence</span>
          <span>Professional Resume Diagnostic Report</span>
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
