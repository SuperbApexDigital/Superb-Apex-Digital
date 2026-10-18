import { Review, ReviewFormData, ReviewStatus } from '../types';
import { computeAdminHash, DEFAULT_ADMIN_HASH } from '../utils/crypto';

const REVIEWS_STORAGE_KEY = 'sad_client_reviews_v1';
const ADMIN_HASH_STORAGE_KEY = 'sad_admin_pwd_hash_v2';

const AVATAR_BG_COLORS = [
  '#365DE8', // Apex Blue
  '#10B981', // Emerald
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

export const INITIAL_SEEDED_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    clientName: 'Marcus Vance',
    clientRole: 'Founder, Guild & Glory Gaming (35k Members)',
    avatarBgColor: '#365DE8',
    serviceCategory: 'Discord Services',
    rating: 5,
    title: 'Flawless server overhaul with zero permission leaks',
    comment:
      'Superb Apex Digital completely reconstructed our 35,000-member community server. They engineered an airtight role hierarchy, automated verification gates against raid bots, and deployed responsive ticket channels for our staff. Highly organized, security-minded, and extremely fast.',
    createdAt: '2026-09-18T14:32:00Z',
    status: 'approved',
    featured: true,
    verifiedClient: true,
    adminReply: {
      message:
        'Thank you Marcus! Structuring your 35k community hierarchy and staff SOPs was an absolute pleasure. Best wishes with the upcoming tournament!',
      repliedAt: '2026-09-19T09:15:00Z',
      author: 'Superb Apex Team',
    },
  },
  {
    id: 'rev-02',
    clientName: 'Elena "Kaelen" Rostova',
    clientRole: 'Twitch Partner & Variety Streamer',
    avatarBgColor: '#8B5CF6',
    serviceCategory: 'Twitch Services',
    rating: 5,
    title: 'Transformed my broadcast aesthetic and stream engagement',
    comment:
      'The broadcast package they built—custom animated stinger transitions, event alert boxes, responsive OBS scenes, and dynamic chat panels—elevated my entire stream. The team even provided an OBS configuration walk-through so everything worked seamlessly on day one.',
    createdAt: '2026-09-24T18:45:00Z',
    status: 'approved',
    featured: true,
    verifiedClient: true,
  },
  {
    id: 'rev-03',
    clientName: 'Julian Croft',
    clientRole: 'Lead Creator, Apex Tech Lab (420k Subs)',
    avatarBgColor: '#EC4899',
    serviceCategory: 'YouTube Services',
    rating: 5,
    title: 'CTR jumped from 4.2% to 8.9% within first 3 weeks',
    comment:
      'Their YouTube thumbnail design system and vertical Shorts editing workflow have been game-changing. High-contrast typography, clear focal points, and zero fluff. Turnaround times are reliably within 24 hours. The highest ROI creative investment we made this year.',
    createdAt: '2026-10-02T11:20:00Z',
    status: 'approved',
    featured: true,
    verifiedClient: true,
    adminReply: {
      message:
        'Huge congratulations on hitting the 400k milestone Julian! Excited to keep scaling your channel metrics together.',
      repliedAt: '2026-10-02T16:40:00Z',
      author: 'Superb Apex Team',
    },
  },
  {
    id: 'rev-04',
    clientName: 'Derrick Zhao',
    clientRole: 'Operations Director, Pulse Studio & Brand Lab',
    avatarBgColor: '#10B981',
    serviceCategory: 'Community Management',
    rating: 5,
    title: 'Peace of mind with 24/7 moderation and active dispute handling',
    comment:
      'Having Superb Apex Digital oversee our daily Discord and community moderation brought incredible stability. Their dispute escalation protocol, rule enforcement, and weekly sentiment reports gave our leadership complete peace of mind without having to micromanage.',
    createdAt: '2026-10-06T15:10:00Z',
    status: 'approved',
    featured: false,
    verifiedClient: true,
  },
  {
    id: 'rev-05',
    clientName: 'Aria Thorne',
    clientRole: 'Independent Content Creator & Podcaster',
    avatarBgColor: '#F59E0B',
    serviceCategory: 'Creator Branding',
    rating: 5,
    title: 'Delivered an iconic visual identity and commercial sponsor kit',
    comment:
      'They created my full branding kit: primary & secondary logos, typography guides, hex color tokens, and a commercial media kit. Two weeks after deploying the kit, I signed my first five-figure annual brand partnership. Worth every single penny.',
    createdAt: '2026-10-09T20:00:00Z',
    status: 'approved',
    featured: false,
    verifiedClient: true,
  },
  {
    id: 'rev-06',
    clientName: 'Samira Patel',
    clientRole: 'Founder, Nova Creative Collective',
    avatarBgColor: '#06B6D4',
    serviceCategory: 'Social Media Services',
    rating: 5,
    title: 'Top-tier Figma templates and viral TikTok cutdowns',
    comment:
      'Exceptional creative direction and multi-platform templates. We received customizable design files for Instagram, X, and YouTube Shorts that stay true to our brand guidelines. Fast communication and genuine professionalism.',
    createdAt: '2026-10-11T13:45:00Z',
    status: 'approved',
    featured: false,
    verifiedClient: true,
  },
  {
    id: 'rev-sample-pending',
    clientName: 'Tyler Henderson',
    clientRole: 'Community Lead, Rift Esports League',
    avatarBgColor: '#6366F1',
    serviceCategory: 'Discord Services',
    rating: 5,
    title: 'Incredible onboarding and bot configuration for tournament',
    comment:
      'Superb Apex Digital helped us set up automated tournament registration channels and player verification bots. Fast response time and stellar documentation for our volunteer mods.',
    createdAt: '2026-10-14T08:30:00Z',
    status: 'pending',
    featured: false,
    verifiedClient: true,
  },
];

class ReviewService {
  private getStorage(): Review[] {
    if (typeof window === 'undefined') return INITIAL_SEEDED_REVIEWS;
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (!stored) {
        // Seed initial data
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_REVIEWS));
        return INITIAL_SEEDED_REVIEWS;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Error reading reviews from localStorage:', err);
      return INITIAL_SEEDED_REVIEWS;
    }
  }

  private saveStorage(reviews: Review[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
      // Notify active tabs or components
      window.dispatchEvent(new CustomEvent('sad_reviews_updated', { detail: { reviews } }));
    } catch (err) {
      console.error('Error saving reviews to localStorage:', err);
    }
  }

  // Get all reviews
  public getAllReviews(): Review[] {
    return this.getStorage();
  }

  // Get approved reviews only (for public display)
  public getApprovedReviews(): Review[] {
    return this.getStorage()
      .filter((r) => r.status === 'approved')
      .sort((a, b) => {
        // Featured reviews come first, then most recent
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  // Get pending reviews for moderation
  public getPendingReviews(): Review[] {
    return this.getStorage()
      .filter((r) => r.status === 'pending')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Get review statistics
  public getStats() {
    const all = this.getStorage();
    const approved = all.filter((r) => r.status === 'approved');
    const pending = all.filter((r) => r.status === 'pending');
    const rejected = all.filter((r) => r.status === 'rejected');

    const totalRatings = approved.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = approved.length > 0 ? (totalRatings / approved.length).toFixed(1) : '5.0';

    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    approved.forEach((r) => {
      if (distribution[r.rating] !== undefined) {
        distribution[r.rating]++;
      }
    });

    return {
      total: all.length,
      approvedCount: approved.length,
      pendingCount: pending.length,
      rejectedCount: rejected.length,
      averageRating: parseFloat(averageRating),
      distribution,
    };
  }

  // Submit client review (Client facing - starts as 'pending')
  public submitReview(formData: ReviewFormData): Review {
    const reviews = this.getStorage();
    const randomColor = AVATAR_BG_COLORS[Math.floor(Math.random() * AVATAR_BG_COLORS.length)];

    const newReview: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      clientName: formData.clientName.trim(),
      clientRole: formData.clientRole.trim() || 'Verified Client',
      avatarBgColor: randomColor,
      serviceCategory: formData.serviceCategory,
      rating: Math.min(5, Math.max(1, formData.rating)),
      title: formData.title.trim(),
      comment: formData.comment.trim(),
      createdAt: new Date().toISOString(),
      status: 'pending', // Pending approval by admin!
      featured: false,
      verifiedClient: formData.verifiedClient ?? true,
    };

    reviews.unshift(newReview);
    this.saveStorage(reviews);
    return newReview;
  }

  // Admin: Approve review (Accept)
  public approveReview(id: string): boolean {
    const reviews = this.getStorage();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    reviews[idx] = {
      ...reviews[idx],
      status: 'approved',
    };
    this.saveStorage(reviews);
    return true;
  }

  // Admin: Reject review
  public rejectReview(id: string): boolean {
    const reviews = this.getStorage();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    reviews[idx] = {
      ...reviews[idx],
      status: 'rejected',
      featured: false,
    };
    this.saveStorage(reviews);
    return true;
  }

  // Admin: Toggle Featured status
  public toggleFeatured(id: string): boolean {
    const reviews = this.getStorage();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    reviews[idx] = {
      ...reviews[idx],
      featured: !reviews[idx].featured,
    };
    this.saveStorage(reviews);
    return true;
  }

  // Admin: Delete review permanently
  public deleteReview(id: string): boolean {
    const reviews = this.getStorage();
    const filtered = reviews.filter((r) => r.id !== id);
    if (filtered.length === reviews.length) return false;
    this.saveStorage(filtered);
    return true;
  }

  // Admin: Reply to review
  public addAdminReply(id: string, message: string, author = 'Superb Apex Team'): boolean {
    const reviews = this.getStorage();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    reviews[idx] = {
      ...reviews[idx],
      adminReply: {
        message: message.trim(),
        repliedAt: new Date().toISOString(),
        author,
      },
    };
    this.saveStorage(reviews);
    return true;
  }

  // Admin: Reset to default seeded reviews
  public resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_REVIEWS));
    window.dispatchEvent(new CustomEvent('sad_reviews_updated', { detail: { reviews: INITIAL_SEEDED_REVIEWS } }));
  }

  // Admin Password Security via Salted Cryptographic Hash
  public getStoredAdminHash(): string {
    if (typeof window === 'undefined') return DEFAULT_ADMIN_HASH;
    // Clear legacy plaintext storage if any existed
    try {
      if (localStorage.getItem('sad_admin_password_v1')) {
        localStorage.removeItem('sad_admin_password_v1');
      }
    } catch {
      // ignore
    }
    const stored = localStorage.getItem(ADMIN_HASH_STORAGE_KEY);
    return stored || DEFAULT_ADMIN_HASH;
  }

  public verifyAdminPassword(password: string): boolean {
    if (!password) return false;
    const computed = computeAdminHash(password);
    const expected = this.getStoredAdminHash();
    return computed === expected;
  }

  public changeAdminPassword(oldPassword: string, newPassword: string): { success: boolean; error?: string } {
    if (!this.verifyAdminPassword(oldPassword)) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    if (typeof window !== 'undefined') {
      const newHash = computeAdminHash(newPassword);
      localStorage.setItem(ADMIN_HASH_STORAGE_KEY, newHash);
    }
    return { success: true };
  }
}

export const reviewService = new ReviewService();
