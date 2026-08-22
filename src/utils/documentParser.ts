import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure pdfjs worker for Vite
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch {
  // Fallback to CDN worker if dynamic import resolution differs
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

export interface ExtractedDocument {
  text: string;
  pageCount: number;
  wordCount: number;
  charCount: number;
  fileType: 'pdf' | 'docx' | 'txt' | 'other';
  rawLines: string[];
}

/**
 * Extracts raw text and structure from an uploaded File (PDF, DOCX, TXT, MD).
 */
export async function extractTextFromDocument(file: File): Promise<ExtractedDocument> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    return extractPdfText(file);
  } else if (fileName.endsWith('.docx')) {
    return extractDocxText(file);
  } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
    return extractPlainText(file);
  } else {
    // Try plain text extraction for other extensions
    return extractPlainText(file);
  }
}

/**
 * Extracts text from PDF using pdfjs-dist.
 */
async function extractPdfText(file: File): Promise<ExtractedDocument> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // Join items preserving line flow
    let lastY: number | null = null;
    let pageString = '';

    for (const item of textContent.items) {
      if ('str' in item) {
        const textItem = item as { str: string; transform: number[] };
        const currentY = textItem.transform[5];
        
        if (lastY !== null && Math.abs(currentY - lastY) > 5) {
          pageString += '\n';
        } else if (pageString.length > 0 && !pageString.endsWith(' ') && !textItem.str.startsWith(' ')) {
          pageString += ' ';
        }
        
        pageString += textItem.str;
        lastY = currentY;
      }
    }

    pageTexts.push(pageString);
  }

  const fullText = pageTexts.join('\n\n').trim();
  const rawLines = fullText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;

  return {
    text: fullText,
    pageCount: numPages,
    wordCount,
    charCount: fullText.length,
    fileType: 'pdf',
    rawLines,
  };
}

/**
 * Extracts text from DOCX using mammoth.
 */
async function extractDocxText(file: File): Promise<ExtractedDocument> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const fullText = result.value.trim();
  const rawLines = fullText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;

  return {
    text: fullText,
    pageCount: Math.max(1, Math.ceil(wordCount / 400)), // Approximate page count
    wordCount,
    charCount: fullText.length,
    fileType: 'docx',
    rawLines,
  };
}

/**
 * Extracts text from plain text or markdown files.
 */
async function extractPlainText(file: File): Promise<ExtractedDocument> {
  const fullText = (await file.text()).trim();
  const rawLines = fullText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;

  return {
    text: fullText,
    pageCount: Math.max(1, Math.ceil(wordCount / 400)),
    wordCount,
    charCount: fullText.length,
    fileType: file.name.toLowerCase().endsWith('.docx') ? 'docx' : 'txt',
    rawLines,
  };
}
