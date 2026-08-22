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
        accept=".pdf,.docx"
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
                ? 'border-indigo-400 bg-indigo-50/60 scale-[1.01]'
                : fileError
                ? 'border-red-300 bg-red-50/30 hover:border-red-400'
                : 'border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'
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
              ${isDragOver ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}
            `}
          >
            <Upload className="w-6 h-6" />
          </div>

          <div className="text-center">
            <p className="text-base font-semibold text-gray-700">
              {isDragOver ? 'Drop your resume here' : 'Drop your resume here'}
            </p>
            <p className="mt-1.5 text-sm text-gray-400">
              PDF or DOCX • Maximum 5 MB
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            Browse files
          </span>
        </label>
      ) : (
        /* ── Selected File Card ──────────────────────────────────── */
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm animate-fade-in">
          {/* File icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-indigo-600" />
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
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
            <FileCheck className="w-3.5 h-3.5" />
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
