import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, FileCheck, X, AlertCircle } from 'lucide-react';
import { formatFileSize } from '../utils/formatFileSize';
import { validateResumeFile, getFileExtension } from '../utils/formatFileSize';

interface ResumeUploaderProps {
  file: File | null;
  fileError: string | null;
  onFileSelect: (file: File | null) => void;
  onFileError: (error: string | null) => void;
}

export default function ResumeUploader({
  file,
  fileError,
  onFileSelect,
  onFileError,
}: ResumeUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (selectedFile: File) => {
      const result = validateResumeFile(selectedFile);
      if (result.valid) {
        onFileError(null);
        onFileSelect(selectedFile);
      } else {
        onFileError(result.error);
        onFileSelect(null);
      }
    },
    [onFileSelect, onFileError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
      // Reset input so re-selecting the same file works
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleFile]
  );

  const removeFile = useCallback(() => {
    onFileSelect(null);
    onFileError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onFileSelect, onFileError]);

  const ext = file ? getFileExtension(file.name).toUpperCase() : '';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleInputChange}
        className="sr-only"
        id="resume-upload"
        aria-label="Upload resume file"
      />

      {!file ? (
        /* ── Empty / Drop Zone ──────────────────────────────────────── */
        <label
          htmlFor="resume-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center gap-4 p-10 sm:p-14
            border-2 border-dashed rounded-2xl cursor-pointer
            transition-all duration-200 ease-out
            ${
              isDragOver
                ? 'border-pink-500 bg-pink-100/60 scale-[1.01] shadow-lg shadow-pink-500/10'
                : fileError
                ? 'border-red-300 bg-red-50/30 hover:border-red-400'
                : 'border-pink-200/80 bg-pink-50/30 hover:border-pink-400 hover:bg-pink-50/60 shadow-xs'
            }
          `}
          role="button"
          tabIndex={0}
          aria-describedby={fileError ? 'file-error' : undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200
              ${isDragOver ? 'bg-pink-200 text-pink-700' : 'bg-pink-100/70 text-pink-600'}
            `}
          >
            <Upload className="w-6 h-6" />
          </div>

          <div className="text-center">
            <p className="text-base font-semibold text-gray-800">
              {isDragOver ? 'Drop your resume right here' : 'Drop your resume here'}
            </p>
            <p className="mt-1.5 text-sm text-gray-500">
              PDF, DOCX, or TXT • Maximum 5 MB
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-pink-700 bg-white border border-pink-200 hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all shadow-xs">
            Browse files
          </span>
        </label>
      ) : (
        /* ── Selected File Card ──────────────────────────────────── */
        <div className="flex items-center gap-4 p-5 bg-white border border-pink-200/80 rounded-2xl shadow-sm animate-fade-in">
          {/* File icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center border border-pink-100">
            <FileText className="w-6 h-6 text-pink-600" />
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate" title={file.name}>
              {file.name}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              {ext} • {formatFileSize(file.size)}
            </p>
          </div>

          {/* Ready badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 border border-pink-200/60 text-pink-700 rounded-full text-xs font-medium">
            <FileCheck className="w-3.5 h-3.5 text-pink-600" />
            Ready
          </div>

          {/* Remove button */}
          <button
            onClick={removeFile}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove file"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

      {/* ── Error Message ──────────────────────────────────────────── */}
      {fileError && (
        <div
          id="file-error"
          role="alert"
          className="mt-3 flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 animate-fade-in"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{fileError}</span>
        </div>
      )}

      {/* ── Privacy Note ───────────────────────────────────────────── */}
      <p className="mt-4 text-center text-xs text-gray-400">
        Your resume is processed for analysis and is not intended for long-term storage.
      </p>
    </div>
  );
}
