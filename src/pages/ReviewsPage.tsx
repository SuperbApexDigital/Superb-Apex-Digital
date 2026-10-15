import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { ReviewSubmissionModal } from '../components/reviews/ReviewSubmissionModal';
import { reviewService } from '../services/reviewService';
import { Review, ReviewServiceCategory } from '../types';
import {
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  ThumbsUp,
} from 'lucide-react';

const CATEGORIES: ('All' | ReviewServiceCategory)[] = [
  'All',
  'Discord Services',
  'Twitch Services',
  'YouTube Services',
  'Social Media Services',
  'Community Management',
  'Creator Branding',
];

export const ReviewsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | ReviewServiceCategory>('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState(reviewService.getStats());

  const loadReviews = () => {
    setReviews(reviewService.getApprovedReviews());
    setStats(reviewService.getStats());
  };

  useEffect(() => {
    loadReviews();

    const handleUpdate = () => {
      loadReviews();
    };

    window.addEventListener('sad_reviews_updated', handleUpdate);
    return () => {
      window.removeEventListener('sad_reviews_updated', handleUpdate);
    };
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesCategory =
        selectedCategory === 'All' || r.serviceCategory === selectedCategory;
      const matchesRating = selectedRating === 'All' || r.rating === selectedRating;
      return matchesCategory && matchesRating;
    });
  }, [reviews, selectedCategory, selectedRating]);

  return (
    <div className="w-full space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="rounded-3xl bg-gradient-to-br from-[#FFFFFF] via-[#F4F7FF] to-[#E9EFFD] dark:from-[#121923] dark:via-[#151D2A] dark:to-[#0D131C] border border-[#DCE3EE] dark:border-[#283343] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#365DE8]/10 text-[#365DE8] dark:bg-[#6C8CFF]/15 dark:text-[#6C8CFF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Client Ratings & Reviews</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA] leading-tight">
                Authentic Experiences from Creators & Brands
              </h1>

              <p className="text-sm sm:text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed max-w-xl">
                Every review represents verified client engagements—from large-scale Discord community overhauls and esports broadcasts to viral thumbnail workflows and complete creator rebrands.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-sm"
                >
                  <Star className="w-4 h-4 fill-current mr-2" />
                  <span>Leave a Rating & Review</span>
                </button>
              </div>
            </div>

            {/* Right Column: Rating Summary Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#182230] p-6 sm:p-7 border border-[#DCE3EE] dark:border-[#283343] shadow-md space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#526078] dark:text-[#B2BDCB]">
                      Client Satisfaction Score
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
                        {stats.averageRating}
                      </span>
                      <span className="text-sm font-semibold text-[#526078] dark:text-[#B2BDCB]">
                        / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-[#526078] dark:text-[#B2BDCB] mt-1 font-medium">
                      Based on {stats.approvedCount} verified client ratings
                    </span>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="space-y-2 pt-2 border-t border-[#DCE3EE]/70 dark:border-[#283343]/70">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = stats.distribution[stars] || 0;
                    const percent =
                      stats.approvedCount > 0 ? (count / stats.approvedCount) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-2 text-xs">
                        <span className="w-8 font-semibold text-[#526078] dark:text-[#B2BDCB] shrink-0">
                          {stars} ★
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-[#EEF2F8] dark:bg-[#121923] overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-[11px] text-[#526078] dark:text-[#B2BDCB]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#526078] dark:text-[#B2BDCB]">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    100% Verified Deliverables
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <ThumbsUp className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                    Zero Spam Policy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & CONTROLS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DCE3EE] dark:border-[#283343]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-[#526078] dark:text-[#B2BDCB] mr-2 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14] shadow-xs'
                    : 'bg-[#FFFFFF] dark:bg-[#121923] text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636] border border-[#DCE3EE] dark:border-[#283343]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Star Filter Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">Rating:</span>
            <select
              value={selectedRating}
              onChange={(e) =>
                setSelectedRating(e.target.value === 'All' ? 'All' : Number(e.target.value))
              }
              className="px-3 py-1.5 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#121923] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-1 focus:ring-[#365DE8]"
            >
              <option value="All">All Ratings ({reviews.length})</option>
              <option value={5}>5 Stars Only</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2F8] dark:bg-[#1C2636] flex items-center justify-center mx-auto text-[#526078] dark:text-[#B2BDCB]">
              <Star className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                No reviews found for this selection
              </h3>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Try selecting "All Services" or submit the first review for this category!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-colors"
            >
              Leave a Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>

      {/* 4. VERIFICATION & TRUST POLICY CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#365DE8] dark:text-[#6C8CFF]">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Review Integrity Guarantee</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
                100% Moderated, Authentic Client Testimonials
              </h3>
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                We never fabricate reviews, solicit automated bots, or hide constructive client feedback. Every submitted review undergoes administrative approval by the Superb Apex Digital leadership team before publication to maintain verified project authenticity.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Verified Project Engagement
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Password-Protected Admin Moderation
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Transparent Agency Responses
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] rounded-xl transition-all shadow-xs"
              >
                <span>Write a Client Review</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => navigate('quote')}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-semibold text-[#172033] dark:text-[#F5F7FA] bg-[#EEF2F8] dark:bg-[#182230] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] rounded-xl transition-colors"
              >
                <span>Scope Your Project</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={() => {
          loadReviews();
        }}
      />
    </div>
  );
};
