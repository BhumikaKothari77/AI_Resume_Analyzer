import { X, BarChart3, Search, PenTool, LayoutList } from 'lucide-react';

interface HowScoringWorksProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  {
    icon: BarChart3,
    title: 'ATS Formatting',
    description:
      'Measures how easily applicant-tracking systems can parse your resume. Checks for tables, columns, images, non-standard headings, and other structural issues that might cause parsing failures.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Search,
    title: 'Keyword Match',
    description:
      'Measures how closely your resume\'s skills and keywords match the provided job description. A higher match rate means your resume is more likely to pass automated screening.',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: PenTool,
    title: 'Bullet Quality',
    description:
      'Looks for measurable impact, strong action verbs, clarity, and specificity in your experience bullet points. Weak bullets often lack quantifiable results or use passive language.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: LayoutList,
    title: 'Section Completeness',
    description:
      'Checks whether common resume sections — such as Contact Information, Summary, Experience, Education, Skills, and Certifications — are present in your resume.',
    color: 'text-emerald-600 bg-emerald-50',
  },
];

export default function HowScoringWorks({ isOpen, onClose }: HowScoringWorksProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="How scoring works"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900">How Scoring Works</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            Your overall score is a weighted combination of four categories, each
            evaluating a different aspect of your resume's effectiveness.
          </p>

          {categories.map((cat) => (
            <div key={cat.title} className="flex gap-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}
              >
                <cat.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
