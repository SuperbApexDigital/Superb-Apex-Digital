import React from 'react';
import { Review } from '../../types';
import { Star, ShieldCheck, Sparkles, MessageSquareQuote, CheckCircle2, CornerDownRight } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  showAdminActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onToggleFeatured?: (id: string) => void;
  onReply?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showAdminActions,
  onApprove,
  onReject,
  onToggleFeatured,
  onReply,
  onDelete,
}) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 border flex flex-col justify-between ${
        review.featured
          ? 'bg-gradient-to-b from-[#FFFFFF] to-[#F4F7FF] dark:from-[#151D2A] dark:to-[#121923] border-[#365DE8]/40 dark:border-[#6C8CFF]/40 shadow-md ring-1 ring-[#365DE8]/20'
          : 'bg-[#FFFFFF] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] shadow-xs hover:border-[#B2BDCB] dark:hover:border-[#3E4F66]'
      }`}
    >
      <div className="space-y-4">
        {/* Top meta row: Category, Featured Pill, Verified Badge, Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#EEF2F8] dark:bg-[#1C2636] text-[#365DE8] dark:text-[#6C8CFF]">
              {review.serviceCategory}
            </span>

            {review.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}

            {review.status === 'pending' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse">
                Pending Moderation
              </span>
            )}

            {review.status === 'rejected' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                Archived / Rejected
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[#526078] dark:text-[#B2BDCB] text-[11px]">
            {review.verifiedClient && (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium mr-1" title="Verified Client">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            )}
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-[#DCE3EE] dark:text-[#283343]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
            {review.rating}.0
          </span>
        </div>

        {/* Review Title & Body */}
        <div className="space-y-2">
          <h4 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA] leading-snug">
            "{review.title}"
          </h4>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            {review.comment}
          </p>
        </div>

        {/* Superb Apex Digital Official Reply */}
        {review.adminReply && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F7F8FC] dark:bg-[#182230] border border-[#DCE3EE] dark:border-[#283343] space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                <CornerDownRight className="w-3.5 h-3.5" />
                <span>{review.adminReply.author} Response</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <span className="text-[10px] text-[#526078] dark:text-[#B2BDCB]">
                {new Date(review.adminReply.repliedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <p className="text-[#324055] dark:text-[#CFD7E3] leading-relaxed italic pl-5">
              "{review.adminReply.message}"
            </p>
          </div>
        )}
      </div>

      {/* Client Profile Footer */}
      <div className="mt-6 pt-4 border-t border-[#DCE3EE]/70 dark:border-[#283343]/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs shrink-0"
            style={{ backgroundColor: review.avatarBgColor || '#365DE8' }}
          >
            {getInitials(review.clientName)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA] truncate">
              {review.clientName}
            </p>
            <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] truncate">
              {review.clientRole}
            </p>
          </div>
        </div>

        <MessageSquareQuote className="w-5 h-5 text-[#B2BDCB] dark:text-[#3E4F66] shrink-0" />
      </div>

      {/* Admin Action Controls (If in Admin Mode) */}
      {showAdminActions && (
        <div className="mt-4 pt-4 border-t border-[#DCE3EE] dark:border-[#283343] flex flex-wrap items-center gap-2">
          {review.status === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => onApprove?.(review.id)}
                className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                Approve & Publish
              </button>
              <button
                type="button"
                onClick={() => onReject?.(review.id)}
                className="py-1.5 px-3 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Reject
              </button>
            </>
          )}

          {review.status === 'approved' && (
            <>
              <button
                type="button"
                onClick={() => onToggleFeatured?.(review.id)}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  review.featured
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : 'bg-[#EEF2F8] dark:bg-[#1C2636] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                }`}
              >
                {review.featured ? 'Unfeature' : 'Feature'}
              </button>

              <button
                type="button"
                onClick={() => onReply?.(review.id)}
                className="py-1.5 px-2.5 rounded-lg text-xs font-medium bg-[#EEF2F8] dark:bg-[#1C2636] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] text-[#365DE8] dark:text-[#6C8CFF] transition-colors"
              >
                {review.adminReply ? 'Edit Reply' : 'Add Reply'}
              </button>

              <button
                type="button"
                onClick={() => onReject?.(review.id)}
                className="py-1.5 px-2.5 rounded-lg text-xs font-medium text-[#526078] hover:text-red-600 transition-colors"
              >
                Archive
              </button>
            </>
          )}

          {review.status === 'rejected' && (
            <button
              type="button"
              onClick={() => onApprove?.(review.id)}
              className="py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Restore & Approve
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete?.(review.id)}
            className="ml-auto py-1.5 px-2 text-xs text-red-500 hover:text-red-700 hover:underline"
            title="Delete permanently"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
