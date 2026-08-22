import type { AnalysisResult } from '../types/analysis';
import { extractTextFromDocument } from '../utils/documentParser';
import { analyzeWithGemini, getGeminiApiKey } from './geminiService';
import { analyzeDocumentLocally } from './localAnalyzer';

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

/**
 * Normalizes a raw API response into the AnalysisResult interface.
 */
export function normalizeAnalysisResponse(raw: Record<string, unknown>): AnalysisResult {
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
 * Real Multi-Tier Analysis Pipeline:
 *
 * 1. Extract raw document text (PDF, DOCX, TXT) in the browser
 * 2. Stage-by-stage progression (Extracting → ATS → Keywords → Bullets → Report)
 * 3. Engine Dispatch:
 *    a) Google Gemini AI (if API key is present)
 *    b) n8n Webhook (if WEBHOOK_URL is configured)
 *    c) Built-in Smart Local NLP Analyzer (zero-config dynamic engine)
 */
export async function analyzeResume(
  file: File,
  jobDescription: string,
  onStageChange: (stageIndex: number) => void
): Promise<AnalysisResult> {
  const hasJD = jobDescription.trim().length > 20;

  // ── Stage 0: Uploading ──────────────────────────────────────────────────
  onStageChange(0);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // ── Stage 1: Document Parsing / Text Extraction ────────────────────────
  onStageChange(1);
  let extractedDoc;
  try {
    extractedDoc = await extractTextFromDocument(file);
  } catch (err) {
    console.error('Failed to parse document text:', err);
    throw new Error(`Unable to read ${file.name}. Please ensure the file is not password-protected.`);
  }

  if (!extractedDoc.text || extractedDoc.text.trim().length < 15) {
    throw new Error(`No readable text found in ${file.name}. If this is a scanned PDF image, please use a text-based PDF or DOCX file.`);
  }

  // ── Stage 2 & 3: ATS & Keyword Matching ─────────────────────────────────
  onStageChange(2);
  await new Promise((resolve) => setTimeout(resolve, 350));
  onStageChange(3);

  // ── Mode A: Google Gemini AI ────────────────────────────────────────────
  const geminiKey = getGeminiApiKey();
  if (geminiKey) {
    try {
      onStageChange(4);
      const geminiResult = await analyzeWithGemini(
        extractedDoc.text,
        jobDescription,
        file.name,
        file.size
      );
      onStageChange(5);
      await new Promise((resolve) => setTimeout(resolve, 300));
      return normalizeAnalysisResponse(geminiResult as unknown as Record<string, unknown>);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to dynamic local NLP engine:', err);
    }
  }

  // ── Mode B: n8n Webhook ─────────────────────────────────────────────────
  if (WEBHOOK_URL) {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('extractedText', extractedDoc.text);
      if (hasJD) {
        formData.append('jobDescription', jobDescription);
      }

      onStageChange(4);
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const raw = await response.json();
        onStageChange(5);
        return normalizeAnalysisResponse(raw);
      }
    } catch (err) {
      console.warn('Webhook failed, falling back to dynamic local NLP engine:', err);
    }
  }

  // ── Mode C: Built-in Smart Local NLP & ATS Analyzer ─────────────────────
  onStageChange(4); // Reviewing bullet points
  await new Promise((resolve) => setTimeout(resolve, 500));

  const localResult = analyzeDocumentLocally(
    extractedDoc,
    jobDescription,
    file.name,
    file.size
  );

  onStageChange(5); // Preparing report
  await new Promise((resolve) => setTimeout(resolve, 350));

  return localResult;
}
