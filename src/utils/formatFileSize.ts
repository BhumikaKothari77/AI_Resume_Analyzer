/**
 * Formats bytes into a human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

/**
 * Returns the file extension in lowercase without the dot.
 */
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

/**
 * Validates that a file is PDF or DOCX and under 5 MB.
 */
export function validateResumeFile(
  file: File
): { valid: true } | { valid: false; error: string } {
  const ext = getFileExtension(file.name);
  const ALLOWED = ['pdf', 'docx', 'txt'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  if (!ALLOWED.includes(ext)) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a PDF, DOCX, or TXT resume.',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'Your resume is larger than 5 MB. Please upload a smaller file.',
    };
  }

  return { valid: true };
}

/**
 * Maps a numeric score to a status label.
 */
export function getScoreStatus(score: number): string {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'needs-improvement';
  return 'critical';
}

/**
 * Maps a status to a human-readable label.
 */
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'excellent':
      return 'Excellent';
    case 'good':
      return 'Good';
    case 'needs-improvement':
      return 'Needs Improvement';
    case 'critical':
      return 'Critical';
    default:
      return status;
  }
}

/**
 * Returns the verdict text based on overall score.
 */
export function getVerdict(score: number): string {
  if (score >= 90) return 'Excellent ATS readiness';
  if (score >= 75) return 'Strong foundation with room to improve';
  if (score >= 60) return 'Several important improvements recommended';
  return 'Your resume needs significant optimization';
}
