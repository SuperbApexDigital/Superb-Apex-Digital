import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { reviewService } from '../services/reviewService';
import { teamService, TeamService } from '../services/teamService';
import { Review, ReviewStatus, TeamMember, TeamDepartment } from '../types';
import { DiscordAvatar } from '../components/DiscordAvatar';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Star,
  Eye,
  EyeOff,
  LogOut,
  ArrowRight,
  MessageSquare,
  CornerDownRight,
  RefreshCw,
  Download,
  AlertCircle,
  Sliders,
  Check,
  Upload,
  Camera,
  RotateCcw,
  Users,
  FileImage,
} from 'lucide-react';
import { ApexLogo } from '../components/common/ApexLogo';

const AUTH_STORAGE_KEY = 'sad_admin_session_auth';

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tab state: 'pending' | 'approved' | 'rejected' | 'team_photos' | 'settings'
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'team_photos' | 'settings'>('pending');

  // Reviews Data
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState(reviewService.getStats());

  // Team Roster & Profile Photos Data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => teamService.getTeamMembers());
  const [uploadingMemberId, setUploadingMemberId] = useState<string | null>(null);
  const [teamDeptFilter, setTeamDeptFilter] = useState<'All' | TeamDepartment>('All');

  // Reply modal / drawer state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('Superb Apex Team');

  // Password Change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);

  // Toast / feedback state
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const loadData = () => {
    setReviews(reviewService.getAllReviews());
    setStats(reviewService.getStats());
    setTeamMembers(teamService.getTeamMembers());
  };

  // Team Photo Handlers
  const handlePhotoUpload = async (memberId: string, file: File) => {
    if (!file) return;
    try {
      setUploadingMemberId(memberId);
      const compressedDataUrl = await TeamService.compressImageFile(file, 500, 0.9);
      teamService.updateMemberAvatar(memberId, compressedDataUrl);
      setTeamMembers(teamService.getTeamMembers());
      const m = teamMembers.find((item) => item.id === memberId);
      showNotice(`Custom profile photo uploaded for ${m?.name || 'specialist'}! Live across the site.`);
    } catch (err) {
      console.error('Error uploading photo:', err);
      showNotice('Failed to process image file. Please use a PNG, JPG, or WebP image.');
    } finally {
      setUploadingMemberId(null);
    }
  };

  const handleRevertPhoto = (memberId: string) => {
    const m = teamMembers.find((item) => item.id === memberId);
    teamService.removeMemberAvatar(memberId);
    setTeamMembers(teamService.getTeamMembers());
    showNotice(`Reverted ${m?.name || 'specialist'} photo to default asset.`);
  };

  const handleResetAllTeamPhotos = () => {
    if (window.confirm('Are you sure you want to revert all team photos back to their original default assets?')) {
      teamService.resetAllAvatars();
      setTeamMembers(teamService.getTeamMembers());
      showNotice('All team member avatars have been reset to default.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleUpdate = () => {
      if (isAuthenticated) loadData();
    };
    window.addEventListener('sad_reviews_updated', handleUpdate);
    return () => window.removeEventListener('sad_reviews_updated', handleUpdate);
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (reviewService.verifyAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
      }
      setPasswordInput('');
      loadData();
      showNotice('Welcome to the Superb Apex Digital Admin Portal');
    } else {
      setAuthError('Incorrect personal admin password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setPasswordInput('');
    setAuthError(null);
  };

  // Approve / Accept Review
  const handleApprove = (id: string) => {
    const success = reviewService.approveReview(id);
    if (success) {
      loadData();
      showNotice('Review approved and published live to public site!');
    }
  };

  // Reject / Archive Review
  const handleReject = (id: string) => {
    const success = reviewService.rejectReview(id);
    if (success) {
      loadData();
      showNotice('Review moved to archived / rejected.');
    }
  };

  // Toggle Featured
  const handleToggleFeatured = (id: string) => {
    const success = reviewService.toggleFeatured(id);
    if (success) {
      loadData();
      showNotice('Updated featured status.');
    }
  };

  // Delete Review
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      const success = reviewService.deleteReview(id);
      if (success) {
        loadData();
        showNotice('Review deleted permanently.');
      }
    }
  };

  // Open Reply Modal
  const openReplyModal = (review: Review) => {
    setReplyingReviewId(review.id);
    setReplyMessage(review.adminReply?.message || '');
    setReplyAuthor(review.adminReply?.author || 'Superb Apex Team');
  };

  // Save Reply
  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReviewId || !replyMessage.trim()) return;

    reviewService.addAdminReply(replyingReviewId, replyMessage, replyAuthor);
    setReplyingReviewId(null);
    setReplyMessage('');
    loadData();
    showNotice('Official response posted to review.');
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeSuccess(null);
    setPasswordChangeError(null);

    if (newPassword !== confirmPassword) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }

    const res = reviewService.changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordChangeSuccess('Personal admin password successfully updated!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordChangeError(res.error || 'Failed to update password.');
    }
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reviews, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `superb-apex-reviews-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default reviews
  const handleResetDefaults = () => {
    if (window.confirm('Reset all reviews to default initial verified set?')) {
      reviewService.resetToDefault();
      loadData();
      showNotice('Reset reviews to default.');
    }
  };

  // Filtered lists
  const pendingList = reviews.filter((r) => r.status === 'pending');
  const approvedList = reviews.filter((r) => r.status === 'approved');
  const rejectedList = reviews.filter((r) => r.status === 'rejected');

  // ==========================================
  // VIEW 1: PASSWORD LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 shadow-xl text-[#172033] dark:text-[#F5F7FA] space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#365DE8]/10 text-[#365DE8] dark:bg-[#6C8CFF]/15 dark:text-[#6C8CFF] flex items-center justify-center mx-auto border border-[#365DE8]/20">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Admin Review Portal</h1>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                Superb Apex Digital review approval and moderation backend. Enter your personal admin password to access.
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA]">
                Personal Admin Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter your personal password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          {/* Password Helper Card */}
          <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#182230] border border-[#DCE3EE] dark:border-[#283343] text-xs space-y-2 text-[#526078] dark:text-[#B2BDCB]">
            <div className="flex items-center gap-2 text-[#365DE8] dark:text-[#6C8CFF] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Personal Admin Access Credentials</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Default master password: <code className="px-1.5 py-0.5 rounded bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] font-mono font-bold text-[#172033] dark:text-[#F5F7FA]">ApexAdmin2025</code>
            </p>
            <p className="text-[11px] leading-relaxed">
              You can personalize or change this password at any time inside the <strong>Settings</strong> tab once logged in.
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('reviews')}
              className="text-xs text-[#365DE8] dark:text-[#6C8CFF] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Return to Public Reviews</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#172033] dark:text-[#F5F7FA]">
      {/* Toast Notification Banner */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE3EE] dark:border-[#283343]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Session Active (Authenticated)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Review Approval & Moderation Backend
          </h1>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
            Approve client reviews, manage featured ratings, post official agency responses, and configure your password.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('reviews')}
            className="px-3.5 py-2 text-xs font-medium rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230] text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-white transition-colors"
          >
            Public Reviews Page
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Log Out</span>
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Pending Card */}
        <div
          onClick={() => setActiveTab('pending')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'pending'
              ? 'ring-2 ring-[#365DE8] dark:ring-[#6C8CFF]'
              : 'hover:border-[#B2BDCB] dark:hover:border-[#3E4F66]'
          } ${
            stats.pendingCount > 0
              ? 'bg-amber-500/10 border-amber-500/30'
              : 'bg-white dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Pending Approvals
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              {stats.pendingCount}
            </span>
            {stats.pendingCount > 0 && (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] mt-1">
            Submitted reviews awaiting decision
          </p>
        </div>

        {/* Approved Card */}
        <div
          onClick={() => setActiveTab('approved')}
          className={`p-5 rounded-2xl bg-white dark:bg-[#121923] border transition-all cursor-pointer ${
            activeTab === 'approved'
              ? 'ring-2 ring-[#365DE8] dark:ring-[#6C8CFF]'
              : 'border-[#DCE3EE] dark:border-[#283343] hover:border-[#B2BDCB] dark:hover:border-[#3E4F66]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Approved & Live
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              {stats.approvedCount}
            </span>
            <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">Live on site</span>
          </div>
          <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] mt-1">
            Active verified client reviews
          </p>
        </div>

        {/* Team Profile Photos Card (NEW) */}
        <div
          onClick={() => setActiveTab('team_photos')}
          className={`p-5 rounded-2xl bg-white dark:bg-[#121923] border transition-all cursor-pointer ${
            activeTab === 'team_photos'
              ? 'ring-2 ring-[#365DE8] dark:ring-[#6C8CFF]'
              : 'border-[#DCE3EE] dark:border-[#283343] hover:border-[#B2BDCB] dark:hover:border-[#3E4F66]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#365DE8] dark:text-[#6C8CFF] uppercase tracking-wider">
              Team Photos
            </span>
            <Camera className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              {teamMembers.length}
            </span>
            <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">Specialists</span>
          </div>
          <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] mt-1">
            Upload custom Discord profile images
          </p>
        </div>

        {/* Average Rating Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#526078] dark:text-[#B2BDCB] uppercase tracking-wider">
              Average Rating
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              {stats.averageRating}
            </span>
            <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">/ 5.0</span>
          </div>
          <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] mt-1">
            Across {stats.approvedCount} public reviews
          </p>
        </div>

        {/* Rejected / Archived Card */}
        <div
          onClick={() => setActiveTab('rejected')}
          className={`p-5 rounded-2xl bg-white dark:bg-[#121923] border transition-all cursor-pointer ${
            activeTab === 'rejected'
              ? 'ring-2 ring-[#365DE8] dark:ring-[#6C8CFF]'
              : 'border-[#DCE3EE] dark:border-[#283343] hover:border-[#B2BDCB] dark:hover:border-[#3E4F66]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#526078] dark:text-[#B2BDCB] uppercase tracking-wider">
              Archived
            </span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              {stats.rejectedCount}
            </span>
          </div>
          <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB] mt-1">
            Archived client submissions
          </p>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-[#DCE3EE] dark:border-[#283343] pb-3 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'pending'
              ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
              : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Approvals</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 dark:bg-black/20">
            {pendingList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'approved'
              ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
              : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Approved (Live)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 dark:bg-black/20">
            {approvedList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('team_photos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'team_photos'
              ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
              : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Team Profile Photos</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            {teamMembers.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'rejected'
              ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
              : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Archived</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 dark:bg-black/20">
            {rejectedList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'settings'
              ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
              : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Security & Password</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. PENDING APPROVALS QUEUE */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Pending Client Reviews Requiring Admin Decision ({pendingList.length})
            </h2>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
              Accepting a review will immediately publish it to the live website.
            </p>
          </div>

          {pendingList.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold">All caught up! Zero pending reviews.</h3>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Any new reviews submitted by clients will appear here for your review and approval.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingList.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl p-6 bg-white dark:bg-[#121923] border-2 border-amber-500/40 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {review.serviceCategory}
                      </span>
                      <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= review.rating ? 'fill-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA] ml-1">
                        {review.rating}.0 Stars
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                        "{review.title}"
                      </h4>
                      <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] mt-1 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    <div className="pt-2 text-xs text-[#526078] dark:text-[#B2BDCB] flex items-center gap-2">
                      <span className="font-bold text-[#172033] dark:text-[#F5F7FA]">
                        {review.clientName}
                      </span>
                      <span>•</span>
                      <span>{review.clientRole}</span>
                    </div>
                  </div>

                  {/* Decision Controls */}
                  <div className="pt-4 border-t border-[#DCE3EE] dark:border-[#283343] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleApprove(review.id)}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Accept</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(review.id)}
                      className="py-2.5 px-4 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-900/40 transition-colors"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(review.id)}
                      className="py-2.5 px-2.5 text-xs text-[#526078] hover:text-red-600"
                      title="Delete permanently"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. APPROVED (LIVE) REVIEWS */}
      {activeTab === 'approved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Approved Live Reviews ({approvedList.length})</h2>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
              These reviews are actively visible to clients and visitors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedList.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl p-6 bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#EEF2F8] dark:bg-[#1C2636] text-[#365DE8] dark:text-[#6C8CFF]">
                      {review.serviceCategory}
                    </span>
                    {review.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= review.rating ? 'fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA] ml-1">
                      {review.rating}.0
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
                    "{review.title}"
                  </h4>
                  <p className="text-xs text-[#526078] dark:text-[#B2BDCB] line-clamp-3 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="text-[11px] text-[#526078] dark:text-[#B2BDCB]">
                    <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">
                      {review.clientName}
                    </span>{' '}
                    — {review.clientRole}
                  </div>

                  {review.adminReply && (
                    <div className="p-2.5 rounded-lg bg-[#F7F8FC] dark:bg-[#182230] text-[11px] border border-[#DCE3EE] dark:border-[#283343]">
                      <span className="font-bold text-[#365DE8] dark:text-[#6C8CFF] block">
                        Our Reply:
                      </span>
                      <p className="italic text-[#526078] dark:text-[#B2BDCB]">
                        "{review.adminReply.message}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Live Management Actions */}
                <div className="pt-3 border-t border-[#DCE3EE] dark:border-[#283343] flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(review.id)}
                    className={`py-1.5 px-2.5 rounded-lg font-medium border ${
                      review.featured
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                        : 'bg-white dark:bg-[#182230] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                    }`}
                  >
                    {review.featured ? 'Unfeature' : 'Feature'}
                  </button>

                  <button
                    type="button"
                    onClick={() => openReplyModal(review)}
                    className="py-1.5 px-2.5 rounded-lg font-medium bg-[#EEF2F8] dark:bg-[#182230] text-[#365DE8] dark:text-[#6C8CFF]"
                  >
                    {review.adminReply ? 'Edit Reply' : 'Reply'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(review.id)}
                    className="py-1.5 px-2.5 rounded-lg font-medium text-[#526078] hover:text-red-600"
                  >
                    Archive
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(review.id)}
                    className="ml-auto text-[#526078] hover:text-red-600"
                    title="Delete permanently"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. REJECTED / ARCHIVED REVIEWS */}
      {activeTab === 'rejected' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Archived Reviews ({rejectedList.length})</h2>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
              Hidden from visitors. You can restore them anytime or delete permanently.
            </p>
          </div>

          {rejectedList.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343]">
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">No archived reviews.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rejectedList.map((review) => (
                <div
                  key={review.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#172033] dark:text-[#F5F7FA]">
                      {review.clientName} ({review.serviceCategory})
                    </span>
                    <span className="text-red-500 font-semibold">Archived</span>
                  </div>
                  <p className="text-xs text-[#526078] dark:text-[#B2BDCB] line-clamp-2">
                    "{review.title}" — {review.comment}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(review.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                    >
                      Restore & Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(review.id)}
                      className="px-3 py-1.5 rounded-lg text-xs text-red-500 hover:underline"
                    >
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TEAM PROFILE PHOTOS & ROSTER MANAGEMENT TAB */}
      {activeTab === 'team_photos' && (
        <div className="space-y-8">
          {/* Section Header & Subtitle */}
          <div className="rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#365DE8]/10 text-[#365DE8] dark:bg-[#6C8CFF]/15 dark:text-[#6C8CFF] border border-[#365DE8]/20">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Team Profile Photo Management Suite</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Upload & Swap Team Profile Images
                </h2>
                <p className="text-xs text-[#526078] dark:text-[#B2BDCB] max-w-2xl leading-relaxed">
                  Upload your exact Discord profile images, screenshots, or portraits directly from your computer. Any uploaded photo is instantly optimized and appears immediately on the public Team page, profile cards, and the fullscreen photo lightbox.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('team')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#EEF2F8] hover:bg-[#E2E8F0] dark:bg-[#182230] dark:hover:bg-[#202c3e] text-[#172033] dark:text-[#F5F7FA] border border-[#DCE3EE] dark:border-[#283343] transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                  <span>Preview Public Team Page</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAllTeamPhotos}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors flex items-center gap-1.5"
                  title="Revert all specialists back to initial default photos"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Default</span>
                </button>
              </div>
            </div>

            {/* Division Filter Tabs */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#DCE3EE] dark:border-[#283343] overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setTeamDeptFilter('All')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  teamDeptFilter === 'All'
                    ? 'bg-[#172033] text-white dark:bg-white dark:text-[#0B0F14]'
                    : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
                }`}
              >
                All Specialists ({teamMembers.length})
              </button>

              <button
                type="button"
                onClick={() => setTeamDeptFilter('Networking Relations Team')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  teamDeptFilter === 'Networking Relations Team'
                    ? 'bg-[#365DE8] text-white dark:bg-[#6C8CFF] dark:text-[#0B0F14]'
                    : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
                }`}
              >
                <span>Networking Relations Team (6)</span>
              </button>

              <button
                type="button"
                onClick={() => setTeamDeptFilter('Partner Success & Escalations')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  teamDeptFilter === 'Partner Success & Escalations'
                    ? 'bg-[#6D4AE6] text-white dark:bg-[#9B8AFB] dark:text-[#0B0F14]'
                    : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1C2636]'
                }`}
              >
                <span>Partner Success & Escalations (4)</span>
              </button>
            </div>
          </div>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers
              .filter((m) => teamDeptFilter === 'All' || m.department === teamDeptFilter)
              .map((member) => {
                const hasCustom = teamService.hasCustomAvatar(member.id);
                const isUploading = uploadingMemberId === member.id;
                const isNetworking = member.department === 'Networking Relations Team';

                return (
                  <div
                    key={member.id}
                    className="rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#365DE8]/40 dark:hover:border-[#6C8CFF]/40 transition-all"
                  >
                    {/* Member Header */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        {/* Circular Avatar */}
                        <div className="relative">
                          <DiscordAvatar
                            name={member.name}
                            initials={member.initials}
                            avatarUrl={member.avatarUrl}
                            theme={member.avatarTheme}
                            size="xl"
                            showStatus={true}
                            status={member.status}
                          />
                          {hasCustom && (
                            <span
                              title="Custom photo file is active"
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121923] flex items-center justify-center text-[9px] text-white font-bold"
                            >
                              ✓
                            </span>
                          )}
                        </div>

                        {/* Status badge */}
                        <div className="text-right space-y-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              hasCustom
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : 'bg-[#EEF2F8] dark:bg-[#1C2636] text-[#526078] dark:text-[#8A99AD] border border-[#DCE3EE] dark:border-[#283343]'
                            }`}
                          >
                            {hasCustom ? 'Custom File Active' : 'Default Asset'}
                          </span>
                          <span className="block text-[10px] font-semibold text-[#526078] dark:text-[#8A99AD]">
                            {isNetworking ? 'Networking Team' : 'Partner Success'}
                          </span>
                        </div>
                      </div>

                      {/* EXACT NAME PROMINENTLY BELOW AVATAR */}
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
                            {member.name}
                          </h3>
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#5865F2]/10 text-[#5865F2] dark:bg-[#5865F2]/20 dark:text-[#8E9BFF] border border-[#5865F2]/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Discord</span>
                          </span>
                        </div>

                        {/* Discord Handle (Strictly non-copyable display) */}
                        <div className="text-xs font-mono text-[#526078] dark:text-[#8A99AD] bg-[#EEF2F8] dark:bg-[#18212F] px-2 py-0.5 rounded-md inline-block border border-[#DCE3EE] dark:border-[#283548]">
                          {member.discordTag}
                        </div>

                        <p className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] pt-1">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-xs text-[#526078] dark:text-[#B2BDCB] line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    {/* Photo Action Controls */}
                    <div className="p-4 bg-[#F8FAFC] dark:bg-[#18212F] border-t border-[#DCE3EE] dark:border-[#283548] flex flex-col gap-2">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        id={`file-input-${member.id}`}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handlePhotoUpload(member.id, file);
                            e.target.value = '';
                          }
                        }}
                      />

                      {/* Upload Button */}
                      <label
                        htmlFor={`file-input-${member.id}`}
                        className={`w-full py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isUploading
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-[#365DE8] hover:bg-[#2e50cb] text-white shadow-xs'
                        }`}
                      >
                        {isUploading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Compressing & Saving...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{hasCustom ? 'Replace Custom Photo' : 'Upload Exact Image File'}</span>
                          </>
                        )}
                      </label>

                      {/* Revert Button if Custom Photo Exists */}
                      {hasCustom && (
                        <button
                          type="button"
                          onClick={() => handleRevertPhoto(member.id)}
                          className="w-full py-1.5 px-3 text-xs font-semibold rounded-xl text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#1F2B3D] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Revert to Default Asset</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 5. SECURITY & PERSONAL PASSWORD TAB */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Password Change Form */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#365DE8] dark:text-[#6C8CFF]">
                <KeyRound className="w-4 h-4" />
                <span>Admin Credentials Management</span>
              </div>
              <h2 className="text-xl font-bold">Change Your Personal Admin Password</h2>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Update the password required to unlock and approve reviews. Ensure your new password is secure.
              </p>
            </div>

            {passwordChangeSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passwordChangeSuccess}</span>
              </div>
            )}

            {passwordChangeError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordChangeError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password..."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  New Personal Password (minimum 6 characters) *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  Confirm New Personal Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230] text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-xs"
              >
                Save New Password
              </button>
            </form>
          </div>

          {/* Backup & Data Reset Options */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold">Data Backup & Maintenance</h3>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Export data or restore original demonstration reviews.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleExportJson}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-[#DCE3EE] dark:border-[#283343] bg-[#F7F8FC] dark:bg-[#182230] hover:bg-[#EEF2F8] dark:hover:bg-[#202c3e] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Export All Reviews (JSON Backup)</span>
              </button>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset to Seed Reviews</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#182230] text-[11px] text-[#526078] dark:text-[#B2BDCB] space-y-1.5 border border-[#DCE3EE] dark:border-[#283343]">
              <span className="font-bold text-[#172033] dark:text-[#F5F7FA] block">
                How GitHub Pages & Client Persistence Works:
              </span>
              <p>
                When deployed on static GitHub Pages, all approved reviews, moderation statuses, and your personalized password remain securely persisted in your browser's persistent storage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL REPLY MODAL */}
      {replyingReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Superb Apex Digital Response</span>
              </h3>
              <button
                type="button"
                onClick={() => setReplyingReviewId(null)}
                className="text-xs text-[#526078] hover:text-black dark:text-[#B2BDCB] dark:hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold">Author Name</label>
                <input
                  type="text"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold">Response Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write an appreciative official response to the client..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE3EE] dark:border-[#283343] bg-white dark:bg-[#182230]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyingReviewId(null)}
                  className="px-4 py-2 text-xs rounded-xl text-[#526078] hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] rounded-xl"
                >
                  Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
