import React, { useState } from 'react';
import { ReviewFormData, ReviewServiceCategory } from '../../types';
import { reviewService } from '../../services/reviewService';
import { Star, X, CheckCircle, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
  defaultCategory?: ReviewServiceCategory;
}

const SERVICE_OPTIONS: ReviewServiceCategory[] = [
  'Discord Services',
  'Twitch Services',
  'YouTube Services',
  'Social Media Services',
  'Community Management',
  'Creator Branding',
  'Custom Project',
];

const RATING_LABELS: Record<number, string> = {
  5: 'Exceptional (5/5) — Exceeded all expectations',
  4: 'Very Good (4/5) — High quality and professional',
  3: 'Good (3/5) — Delivered agreed scope',
  2: 'Fair (2/5) — Scope had some revisions',
  1: 'Poor (1/5) — Did not meet expectations',
};

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
  defaultCategory = 'Discord Services',
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ReviewServiceCategory>(defaultCategory);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [verifiedClient, setVerifiedClient] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clientName.trim()) {
      setError('Please provide your name or organization handle.');
      return;
    }
    if (!title.trim()) {
      setError('Please provide a brief headline for your review.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 20) {
      setError('Please provide at least 20 characters of detailed review feedback.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData: ReviewFormData = {
        clientName: clientName.trim(),
        clientRole: clientRole.trim() || 'Verified Client',
        serviceCategory,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        verifiedClient,
      };

      reviewService.submitReview(formData);
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      onSubmitted?.();
    } catch (err) {
      console.error(err);
      setError('Failed to submit your review. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(5);
    setHoverRating(null);
    setClientName('');
    setClientRole('');
    setServiceCategory(defaultCategory);
    setTitle('');
    setComment('');
    setError(null);
    setSubmittedSuccessfully(false);
    onClose();
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F14]/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl my-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] shadow-2xl p-6 sm:p-8 text-[#172033] dark:text-[#F5F7FA]">
        {/* Close Button */}
        <button
          type="button"
          onClick={resetForm}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#526078] hover:text-[#172033] dark:text-[#B2BDCB] dark:hover:text-white bg-[#EEF2F8] dark:bg-[#1C2636] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submittedSuccessfully ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
                Review Submitted for Moderation!
              </h3>
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{clientName}</span>. Your rating and feedback have been sent to our administrative moderation queue. To protect review integrity against spam, it will be published live once verified by our admin.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] max-w-md mx-auto text-left text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating}.0 / 5.0 Star Rating</span>
              </div>
              <p className="font-bold text-[#172033] dark:text-[#F5F7FA]">"{title}"</p>
              <p className="text-[#526078] dark:text-[#B2BDCB] line-clamp-2">{comment}</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Ratings & Reviews</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
                Leave a Review for Superb Apex Digital
              </h3>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Share your authentic experience with our creator services, Discord deployments, or broadcast design.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Rating Selector */}
            <div className="space-y-2 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#182230] border border-[#DCE3EE] dark:border-[#283343]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA]">
                Overall Service Rating *
              </label>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(null)}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      className="p-1 rounded-md transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= activeRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#DCE3EE] dark:text-[#283343]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#526078] dark:text-[#B2BDCB] ml-2">
                  {RATING_LABELS[activeRating] || `${activeRating} / 5 Stars`}
                </span>
              </div>
            </div>

            {/* 2. Client Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  Your Name or Handle *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Scott or @VortexTwitch"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#151D2A] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  Title, Community, or Channel
                </label>
                <input
                  type="text"
                  placeholder="e.g. Founder, Guild Esports (20k members)"
                  value={clientRole}
                  onChange={(e) => setClientRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#151D2A] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-colors"
                />
              </div>
            </div>

            {/* 3. Service Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                Service Received *
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value as ReviewServiceCategory)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#151D2A] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-colors"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Review Headline / Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                Review Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Seamless Discord launch with zero permission issues"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#151D2A] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-colors"
              />
            </div>

            {/* 5. Review Comments */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                Detailed Review *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the deliverables, communication, technical quality, and overall impact on your community or stream..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#151D2A] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-colors leading-relaxed"
              />
            </div>

            {/* 6. Verification and Anti-Spam Notice */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#526078] dark:text-[#B2BDCB]">
                <input
                  type="checkbox"
                  checked={verifiedClient}
                  onChange={(e) => setVerifiedClient(e.target.checked)}
                  className="mt-0.5 rounded border-[#DCE3EE] text-[#365DE8] focus:ring-[#365DE8]"
                />
                <span>
                  I confirm that I am a client or collaborator of Superb Apex Digital and this review represents my honest feedback.
                </span>
              </label>

              <div className="p-3 rounded-xl bg-[#EEF2F8]/70 dark:bg-[#182230]/70 border border-[#DCE3EE] dark:border-[#283343] flex items-start gap-2 text-[11px] text-[#526078] dark:text-[#B2BDCB]">
                <ShieldCheck className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                <span>
                  <strong>Moderation Policy:</strong> All submissions are queued for admin moderation before public display to prevent spam and verify project authenticity.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-xs font-medium rounded-xl text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636] transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold rounded-xl text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rating & Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
