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
            className="text-sm font-semibold text-gray-800"
          >
            Job Description
          </label>
          <span className="px-2 py-0.5 text-xs font-semibold text-pink-700 bg-pink-50 border border-pink-200/60 rounded-full">
            Optional
          </span>
        </div>
        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-pink-600 transition-colors"
            aria-label="Clear job description"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-2">
        Adding a job description unlocks targeted keyword gap analysis and role match scoring.
      </p>

      <div
        className={`
          relative rounded-2xl border transition-all duration-200 bg-white
          ${
            isFocused
              ? 'border-pink-400 ring-4 ring-pink-100/70 shadow-sm'
              : 'border-pink-200/70 hover:border-pink-300'
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
          placeholder="Paste the target job description here..."
          rows={5}
          maxLength={MAX_CHARS}
          className="w-full px-4 py-3.5 text-sm text-gray-800 bg-transparent rounded-2xl resize-none placeholder:text-gray-400 focus:outline-none"
        />

        {/* Character count */}
        <div className="flex justify-end px-4 pb-2.5">
          <span
            className={`text-xs tabular-nums ${
              value.length > MAX_CHARS * 0.9
                ? 'text-rose-500 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
