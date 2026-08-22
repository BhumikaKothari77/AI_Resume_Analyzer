import type { AnalysisResult } from '../types/analysis';

/**
 * Gets the active Gemini API key from localStorage or Vite environment variable.
 */
export function getGeminiApiKey(): string {
  const customKey = localStorage.getItem('gemini_api_key');
  if (customKey && customKey.trim().length > 0) {
    return customKey.trim();
  }
  return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
}

/**
 * Saves a user-provided Gemini API key to localStorage.
 */
export function setGeminiApiKey(key: string): void {
  if (key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

/**
 * Analyzes resume text against optional job description using Google Gemini API.
 */
export async function analyzeWithGemini(
  resumeText: string,
  jobDescription: string,
  fileName: string,
  fileSize: number
): Promise<AnalysisResult> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const hasJD = jobDescription.trim().length > 20;

  const systemInstruction = `
You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Analyze the following resume text meticulously. ${
    hasJD
      ? 'Compare the resume against the provided Job Description to evaluate keyword match, skills gap, and role relevance.'
      : 'Analyze the resume for general ATS compatibility, professional impact, bullet point strength, and completeness.'
  }

Respond ONLY with valid JSON matching this exact structure:
{
  "overallScore": number (0-100 calculated from ATS, sections, bullets, and keyword match),
  "verdict": string (one concise, punchy sentence summarizing candidate standing),
  "categories": {
    "atsFormatting": {
      "score": number (0-100),
      "status": "excellent" | "good" | "needs-improvement" | "critical",
      "issues": [
        {
          "id": "ats-1",
          "severity": "critical" | "warning" | "info",
          "title": string,
          "description": string,
          "suggestion": string
        }
      ]
    },
    "keywordMatch": {
      "score": ${hasJD ? 'number (0-100)' : 'null'},
      "status": "${hasJD ? 'needs-improvement' : 'unavailable'}" (or "excellent", "good", "critical"),
      "matched": string[] (skills and technologies actually present in resume${hasJD ? ' that match JD' : ''}),
      "missing": string[] (important skills/keywords ${hasJD ? 'from the JD missing in resume' : 'recommended for this profile'})
    },
    "bulletQuality": {
      "score": number (0-100),
      "status": "excellent" | "good" | "needs-improvement" | "critical",
      "bullets": [
        {
          "id": "bullet-1",
          "original": string (an exact or slightly trimmed bullet point taken directly from the candidate's resume),
          "issue": string (explanation of weak action verb, missing metrics, or passive phrasing),
          "issueTag": "Weak action verb" | "No measurable result" | "Passive language" | "Vague description",
          "suggested": string (an improved, quantifiable rewrite of that exact bullet point)
        }
      ]
    },
    "sectionCompleteness": {
      "score": number (0-100),
      "status": "excellent" | "good" | "needs-improvement" | "critical",
      "present": string[] (e.g. ["Contact Information", "Experience", "Education", "Skills"]),
      "missing": string[] (e.g. ["Projects", "Certifications", "Summary"])
    }
  },
  "topFixes": [
    {
      "rank": 1,
      "title": string,
      "explanation": string,
      "impact": "high" | "medium" | "low"
    }
  ]
}

CRITICAL RULES:
1. Under "bullets", select 2 to 4 ACTUAL weak bullet points from the candidate's resume text. Do NOT make up fictitious projects unless the resume has no bullets.
2. In "keywordMatch", if a Job Description is provided, extract real technical & domain keywords from the JD and check if they appear in the resume.
3. Calculate realistic scores: score > 85 for stellar resumes, 65-84 for average, < 65 for resumes needing significant rework.
4. Output must be strictly valid JSON without markdown code fences.
`;

  const userPrompt = `
=== RESUME FILE: ${fileName} (${fileSize} bytes) ===
${resumeText.slice(0, 15000)}

${
  hasJD
    ? `=== TARGET JOB DESCRIPTION ===\n${jobDescription.slice(0, 5000)}`
    : '=== TARGET JOB DESCRIPTION ===\n(None provided - general analysis)'
}
`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          { text: userPrompt },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('No response received from Gemini AI.');
  }

  const parsed = JSON.parse(rawText);

  return {
    ...parsed,
    metadata: {
      fileName,
      fileSize,
      hasJobDescription: hasJD,
      analyzedAt: new Date().toISOString(),
    },
  };
}
