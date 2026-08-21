// ── Analysis Types ──────────────────────────────────────────────────────────

export interface Issue {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  suggestion: string;
}

export interface BulletAnalysis {
  id: string;
  original: string;
  issue: string;
  issueTag: string;
  suggested: string;
}

export interface Fix {
  rank: number;
  title: string;
  explanation: string;
  impact: 'high' | 'medium' | 'low';
}

export interface CategoryScore {
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
}

export interface ATSFormatting extends CategoryScore {
  issues: Issue[];
}

export interface KeywordMatch {
  score: number | null;
  status: string;
  matched: string[];
  missing: string[];
}

export interface BulletQuality extends CategoryScore {
  bullets: BulletAnalysis[];
}

export interface SectionCompleteness extends CategoryScore {
  present: string[];
  missing: string[];
}

export interface AnalysisCategories {
  atsFormatting: ATSFormatting;
  keywordMatch: KeywordMatch;
  bulletQuality: BulletQuality;
  sectionCompleteness: SectionCompleteness;
}

export interface AnalysisMetadata {
  fileName: string;
  fileSize: number;
  hasJobDescription: boolean;
  analyzedAt: string;
}

export interface AnalysisResult {
  overallScore: number;
  verdict: string;
  categories: AnalysisCategories;
  topFixes: Fix[];
  metadata: AnalysisMetadata;
}

// ── Application State Types ─────────────────────────────────────────────────

export type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';

export interface LoadingStage {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export const LOADING_STAGES: Omit<LoadingStage, 'status'>[] = [
  { id: 'upload', label: 'Uploading resume...' },
  { id: 'extract', label: 'Extracting resume text...' },
  { id: 'ats', label: 'Checking ATS compatibility...' },
  { id: 'keywords', label: 'Analyzing skills and keywords...' },
  { id: 'bullets', label: 'Reviewing bullet points...' },
  { id: 'report', label: 'Preparing your report...' },
];

export interface FileValidationError {
  type: 'unsupported-format' | 'file-too-large' | 'corrupt-file';
  message: string;
}

export interface ApiError {
  type: 'network' | 'analysis-failed' | 'corrupt-resume' | 'unknown';
  message: string;
}
