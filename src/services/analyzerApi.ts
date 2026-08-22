import type { AnalysisResult } from '../types/analysis';
import { mockAnalysisResult, mockAnalysisResultNoJD } from '../data/mockData';

const MOCK_MODE = import.meta.env.VITE_USE_MOCK_API === 'true';
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

/**
 * Simulates staged analysis delay for mock mode.
 * Calls the onStageChange callback at each stage.
 */
async function simulateMockAnalysis(
  hasJobDescription: boolean,
  onStageChange: (stageIndex: number) => void
): Promise<AnalysisResult> {
  const delays = [800, 1200, 1500, 1800, 1400, 1000]; // ms per stage

  for (let i = 0; i < delays.length; i++) {
    onStageChange(i);
    await new Promise((resolve) => setTimeout(resolve, delays[i]));
  }

  return hasJobDescription ? mockAnalysisResult : mockAnalysisResultNoJD;
}

/**
 * Normalizes a raw API response into the AnalysisResult interface.
 * This is the single transformation layer — if n8n returns a slightly
 * different structure, only this function needs to change.
 */
export function normalizeAnalysisResponse(raw: Record<string, unknown>): AnalysisResult {
  // For now, assume the API returns data matching our interface.
  // Add field mapping / defaults here when integrating with n8n.
  const result = raw as unknown as AnalysisResult;

  return {
    overallScore: result.overallScore ?? 0,
    verdict: result.verdict ?? '',
    categories: {
      atsFormatting: {
        score: result.categories?.atsFormatting?.score ?? 0,
        status: result.categories?.atsFormatting?.status ?? 'critical',
        issues: result.categories?.atsFormatting?.issues ?? [],
      },
      keywordMatch: {
        score: result.categories?.keywordMatch?.score ?? null,
        status: result.categories?.keywordMatch?.status ?? 'unavailable',
        matched: result.categories?.keywordMatch?.matched ?? [],
        missing: result.categories?.keywordMatch?.missing ?? [],
      },
      bulletQuality: {
        score: result.categories?.bulletQuality?.score ?? 0,
        status: result.categories?.bulletQuality?.status ?? 'critical',
        bullets: result.categories?.bulletQuality?.bullets ?? [],
      },
      sectionCompleteness: {
        score: result.categories?.sectionCompleteness?.score ?? 0,
        status: result.categories?.sectionCompleteness?.status ?? 'critical',
        present: result.categories?.sectionCompleteness?.present ?? [],
        missing: result.categories?.sectionCompleteness?.missing ?? [],
      },
    },
    topFixes: result.topFixes ?? [],
    metadata: {
      fileName: result.metadata?.fileName ?? 'Unknown',
      fileSize: result.metadata?.fileSize ?? 0,
      hasJobDescription: result.metadata?.hasJobDescription ?? false,
      analyzedAt: result.metadata?.analyzedAt ?? new Date().toISOString(),
    },
  };
}

/**
 * Sends the resume and optional job description for analysis.
 *
 * Architecture:
 *   UI → analyzeResume() → mock response OR n8n webhook
 *                        → normalizeAnalysisResponse()
 *                        → AnalysisResult → React UI
 */
export async function analyzeResume(
  file: File,
  jobDescription: string,
  onStageChange: (stageIndex: number) => void
): Promise<AnalysisResult> {
  const hasJD = jobDescription.trim().length > 20;

  // ── Mock Mode ──────────────────────────────────────────────────────────
  if (MOCK_MODE || !WEBHOOK_URL) {
    return simulateMockAnalysis(hasJD, onStageChange);
  }

  // ── Real Mode — n8n Webhook ────────────────────────────────────────────
  onStageChange(0); // "Uploading resume..."

  const formData = new FormData();
  formData.append('resume', file);
  if (hasJD) {
    formData.append('jobDescription', jobDescription);
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Analysis failed with status ${response.status}`);
    }

    const raw = await response.json();
    return normalizeAnalysisResponse(raw);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the analysis service.');
    }
    throw error;
  }
}
