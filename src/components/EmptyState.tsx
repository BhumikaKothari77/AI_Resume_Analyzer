import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-10 text-center flex flex-col items-center justify-center p-6 bg-pink-50/20 rounded-2xl border border-dashed border-pink-200">
      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3 border border-pink-100">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-1.5 rounded-xl text-xs font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors border border-pink-200/60"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
