import { useState } from 'react';
import { X } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_CHARS = 5000;

export default function JobDescriptionInput({
  value,
  onChange,
}: JobDescriptionInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <label
            htmlFor="job-description"
            className="text-sm font-semibold text-gray-700"
          >
            Job Description
          </label>
          <span className="px-2 py-0.5 text-xs font-medium text-gray-400 bg-gray-100 rounded-full">
            Optional
          </span>
        </div>
        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear job description"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-2">
        Adding a job description improves keyword and skill matching.
      </p>

      <div
        className={`
          relative rounded-xl border transition-all duration-200
          ${
            isFocused
              ? 'border-indigo-300 ring-2 ring-indigo-100'
              : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <textarea
          id="job-description"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              onChange(e.target.value);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Paste the job description here..."
          rows={5}
          maxLength={MAX_CHARS}
          className="w-full px-4 py-3 text-sm text-gray-700 bg-transparent rounded-xl resize-none placeholder:text-gray-300 focus:outline-none"
        />

        {/* Character count */}
        <div className="flex justify-end px-4 pb-2.5">
          <span
            className={`text-xs tabular-nums ${
              value.length > MAX_CHARS * 0.9
                ? 'text-amber-500'
                : 'text-gray-300'
            }`}
          >
            {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
