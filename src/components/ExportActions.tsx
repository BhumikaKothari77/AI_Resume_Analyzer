import { useState } from 'react';
import { Download, Copy, Check, Loader2, Share2 } from 'lucide-react';
import type { AnalysisResult } from '../types/analysis';
import { copyAnalysisText, exportToPDF } from '../utils/exportReport';

interface ExportActionsProps {
  result: AnalysisResult;
  containerId: string;
}

export default function ExportActions({ result, containerId }: ExportActionsProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopy = async () => {
    const success = await copyAnalysisText(result);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleExportPDF = async () => {
    try {
      setExporting(true);
      setErrorMsg(null);
      const safeName = (result.metadata.fileName || 'Resume_Analysis').replace(/\.[^/.]+$/, '');
      const success = await exportToPDF(containerId, `${safeName}_ATS_Report`);
      if (!success) {
        setErrorMsg('Failed to generate PDF. Please try again.');
      }
    } catch {
      setErrorMsg('Failed to export PDF.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-pink-50/40 border border-pink-100 rounded-2xl">
      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
        <Share2 className="w-4 h-4 text-pink-600" />
        <span>Share & Save this diagnostic breakdown</span>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Copy Analysis Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-pink-200 text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          aria-label="Copy entire analysis as text"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-pink-700">Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-500" />
              <span>Copy Analysis</span>
            </>
          )}
        </button>

        {/* Export PDF Button */}
        <button
          type="button"
          onClick={handleExportPDF}
          disabled={exporting}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 text-white hover:from-pink-600 hover:to-fuchsia-700 disabled:opacity-50 transition-all shadow-md shadow-pink-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          aria-label="Export report to PDF"
        >
          {exporting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Report (PDF)</span>
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="w-full text-xs text-rose-600 text-right mt-1">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
