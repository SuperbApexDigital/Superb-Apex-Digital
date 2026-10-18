import { TEAM_MEMBERS } from '../data/agencyData';
import { TeamMember } from '../types';

const STORAGE_KEY_ROSTER = 'superb_apex_team_roster_v2';
const STORAGE_KEY_CUSTOM_AVATARS = 'superb_apex_team_custom_avatars';
const STORAGE_EVENT_NAME = 'superb_apex_team_avatar_updated';

function computeInitials(name: string): string {
  if (!name) return 'SA';
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export class TeamService {
  private members: TeamMember[] = [];
  private isServerSyncing = false;

  constructor() {
    this.loadFromStorage();
    this.syncWithServer();

    // On mobile devices, automatically refresh roster when returning to the tab or app
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.syncWithServer();
        }
      });
      window.addEventListener('focus', () => {
        this.syncWithServer();
      });
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') {
      this.members = [...TEAM_MEMBERS];
      return;
    }

    try {
      const storedRoster = localStorage.getItem(STORAGE_KEY_ROSTER);
      if (storedRoster) {
        const parsed = JSON.parse(storedRoster);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.members = parsed;
          return;
        }
      }

      // Check legacy custom avatars to migrate
      let legacyAvatars: Record<string, string> = {};
      const storedAvatars = localStorage.getItem(STORAGE_KEY_CUSTOM_AVATARS);
      if (storedAvatars) {
        try {
          legacyAvatars = JSON.parse(storedAvatars);
        } catch {
          // ignore
        }
      }

      // Initialize from baseline TEAM_MEMBERS
      this.members = TEAM_MEMBERS.map((m) => {
        if (legacyAvatars[m.id]) {
          return {
            ...m,
            avatarUrl: legacyAvatars[m.id],
          };
        }
        return { ...m };
      });

      this.saveToStorage(false);
    } catch (e) {
      console.warn('Failed to load team roster from localStorage', e);
      this.members = [...TEAM_MEMBERS];
    }
  }

  /**
   * Syncs roster with the server so all devices (mobile phones, tablets, PCs)
   * immediately see the exact same uploaded profile images and member details.
   */
  public async syncWithServer(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      this.isServerSyncing = true;
      const res = await fetch('/api/team', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.members) && data.members.length > 0) {
          // If server data differs from our current state, update and notify
          const currentJson = JSON.stringify(this.members);
          const serverJson = JSON.stringify(data.members);
          if (currentJson !== serverJson) {
            this.members = data.members;
            localStorage.setItem(STORAGE_KEY_ROSTER, serverJson);
            window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
          }
          return true;
        }
      }

      // If server does not have custom roster yet, push our current members to server
      if (this.members.length > 0) {
        await this.pushToServer();
        return true;
      }
      return false;
    } catch (err) {
      // Offline fallback: rely on localStorage
      console.warn('Server sync unavailable, using local cache:', err);
      return false;
    } finally {
      this.isServerSyncing = false;
    }
  }

  /**
   * Push current roster (including all newly uploaded photos) to server so mobile devices receive them
   */
  public async pushToServer(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      const res = await fetch('/api/team/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: this.members }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Failed to push team roster to server', err);
      return false;
    }
  }

  /**
   * Force push current roster to cloud to make sure mobile devices immediately receive all photos
   */
  public async forcePushToCloud(): Promise<boolean> {
    this.saveToStorage(false);
    return await this.pushToServer();
  }

  private saveToStorage(push = true): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_ROSTER, JSON.stringify(this.members));
      window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
      if (push) {
        this.pushToServer().catch(() => {});
      }
    } catch (e) {
      console.error('Failed to save team roster to localStorage', e);
    }
  }

  /**
   * Returns current list of team members
   */
  public getTeamMembers(): TeamMember[] {
    return [...this.members];
  }

  /**
   * Returns a single member by ID
   */
  public getMemberById(id: string): TeamMember | undefined {
    return this.members.find((m) => m.id === id);
  }

  /**
   * Check if a member has a custom uploaded avatar (data URL or non-default)
   */
  public hasCustomAvatar(id: string): boolean {
    const member = this.getMemberById(id);
    if (!member) return false;
    const original = TEAM_MEMBERS.find((m) => m.id === id);
    if (!original) return Boolean(member.avatarUrl);
    return member.avatarUrl !== original.avatarUrl;
  }

  /**
   * Add a new person to a team
   */
  public addMember(memberData: Omit<TeamMember, 'id' | 'initials'> & { initials?: string }): TeamMember {
    const prefix = memberData.department === 'Networking Relations Team' ? 'nrt-custom' : 'pse-custom';
    const newId = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const initials = memberData.initials || computeInitials(memberData.name);

    const newMember: TeamMember = {
      ...memberData,
      id: newId,
      initials,
      isCustom: true,
      bannerGradient:
        memberData.bannerGradient ||
        (memberData.department === 'Networking Relations Team'
          ? 'from-blue-700 via-indigo-950 to-slate-950'
          : 'from-purple-800 via-violet-950 to-slate-950'),
      discordRoles: memberData.discordRoles && memberData.discordRoles.length > 0
        ? memberData.discordRoles
        : [memberData.department === 'Networking Relations Team' ? 'Networking Specialist' : 'Partner Success Specialist'],
      focusAreas: memberData.focusAreas && memberData.focusAreas.length > 0
        ? memberData.focusAreas
        : ['Client Solutions', 'Direct Outreach', 'Dedicated Support'],
      status: memberData.status || 'Active Lead',
    };

    this.members.push(newMember);
    this.saveToStorage();
    return newMember;
  }

  /**
   * Edit/update any existing team member's details (name, role, discord tag, bio, etc.)
   */
  public updateMember(id: string, updates: Partial<TeamMember>): boolean {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return false;

    const current = this.members[index];
    const newName = updates.name !== undefined ? updates.name.trim() : current.name;
    const newInitials = updates.name !== undefined ? computeInitials(newName) : (updates.initials || current.initials);

    this.members[index] = {
      ...current,
      ...updates,
      name: newName,
      initials: newInitials,
    };

    this.saveToStorage();
    return true;
  }

  /**
   * Update specifically the name of an existing team member
   */
  public updateMemberName(id: string, newName: string): boolean {
    return this.updateMember(id, { name: newName });
  }

  /**
   * Update or upload a custom avatar data URL for a specialist
   */
  public updateMemberAvatar(memberId: string, avatarDataUrl: string): boolean {
    const index = this.members.findIndex((m) => m.id === memberId);
    if (index === -1) return false;

    this.members[index] = {
      ...this.members[index],
      avatarUrl: avatarDataUrl,
    };

    this.saveToStorage();
    return true;
  }

  /**
   * Remove custom avatar and revert to factory default image
   */
  public removeMemberAvatar(memberId: string): boolean {
    const index = this.members.findIndex((m) => m.id === memberId);
    if (index === -1) return false;

    const original = TEAM_MEMBERS.find((m) => m.id === memberId);
    this.members[index] = {
      ...this.members[index],
      avatarUrl: original ? original.avatarUrl : undefined,
    };

    this.saveToStorage();
    return true;
  }

  /**
   * Delete a team member
   */
  public deleteMember(id: string): boolean {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.members.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  /**
   * Reset all team members back to initial default roster
   */
  public resetAllToDefault(): void {
    this.members = TEAM_MEMBERS.map((m) => ({ ...m }));
    this.saveToStorage();
    if (typeof window !== 'undefined') {
      fetch('/api/team/reset', { method: 'POST' }).catch(() => {});
    }
  }

  /**
   * Reset all avatars only (legacy compatibility)
   */
  public resetAllAvatars(): void {
    this.resetAllToDefault();
  }

  /**
   * Subscribe to updates (for reactive re-rendering across components)
   */
  public subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(STORAGE_EVENT_NAME, callback);
    return () => {
      window.removeEventListener(STORAGE_EVENT_NAME, callback);
    };
  }

  /**
   * Helper utility to compress an image file client-side using Canvas
   * Max dimension 420x420 to keep fast, lightweight, and crystal-clear on mobile & retina screens.
   */
  public static async compressImageFile(file: File, maxDim = 420, quality = 0.85): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image file'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}

export const teamService = new TeamService();
