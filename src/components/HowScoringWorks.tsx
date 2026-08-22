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
      'Measures how easily applicant-tracking systems can parse your resume. Checks for tables, columns, non-standard headings, font issues, and structural elements that cause parsing failures.',
    color: 'text-pink-600 bg-pink-50 border border-pink-100',
  },
  {
    icon: Search,
    title: 'Keyword Match',
    description:
      'Measures how closely your resume\'s skills and technologies match the target job description. A higher match rate ensures your resume ranks top in recruiter searches.',
    color: 'text-rose-600 bg-rose-50 border border-rose-100',
  },
  {
    icon: PenTool,
    title: 'Bullet Quality',
    description:
      'Audits experience bullets for measurable business impact, strong power verbs, and clarity, transforming passive job duties into quantifiable achievements.',
    color: 'text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100',
  },
  {
    icon: LayoutList,
    title: 'Section Completeness',
    description:
      'Validates the presence of standard resume sections: Contact Info, Summary, Experience, Education, Skills, and Projects required by modern recruitment workflows.',
    color: 'text-pink-700 bg-pink-100/60 border border-pink-200',
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
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto border border-pink-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-pink-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900">How Scoring Works</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            Your overall score is a weighted combination of four categories, each
            evaluating a different aspect of your resume's effectiveness.
          </p>

          {categories.map((cat) => (
            <div key={cat.title} className="flex gap-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${cat.color}`}
              >
                <cat.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-pink-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors border border-pink-200/60"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
