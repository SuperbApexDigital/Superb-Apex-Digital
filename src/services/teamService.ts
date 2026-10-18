import { TEAM_MEMBERS } from '../data/agencyData';
import { TeamMember } from '../types';

const STORAGE_KEY_CUSTOM_AVATARS = 'superb_apex_team_custom_avatars';
const STORAGE_EVENT_NAME = 'superb_apex_team_avatar_updated';

export class TeamService {
  private customAvatars: Record<string, string> = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_AVATARS);
      if (stored) {
        this.customAvatars = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load custom team avatars from localStorage', e);
      this.customAvatars = {};
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_AVATARS, JSON.stringify(this.customAvatars));
      window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
    } catch (e) {
      console.error('Failed to save custom team avatars to localStorage', e);
    }
  }

  /**
   * Returns the list of team members with custom uploaded avatars merged
   */
  public getTeamMembers(): TeamMember[] {
    return TEAM_MEMBERS.map((member) => {
      const customAvatar = this.customAvatars[member.id];
      if (customAvatar) {
        return {
          ...member,
          avatarUrl: customAvatar,
        };
      }
      return member;
    });
  }

  /**
   * Returns a single member by ID
   */
  public getMemberById(id: string): TeamMember | undefined {
    const list = this.getTeamMembers();
    return list.find((m) => m.id === id);
  }

  /**
   * Check if a member has a custom uploaded avatar
   */
  public hasCustomAvatar(id: string): boolean {
    return Boolean(this.customAvatars[id]);
  }

  /**
   * Update or upload a custom avatar data URL for a specialist
   */
  public updateMemberAvatar(memberId: string, avatarDataUrl: string): boolean {
    if (!memberId || !avatarDataUrl) return false;
    this.customAvatars[memberId] = avatarDataUrl;
    this.saveToStorage();
    return true;
  }

  /**
   * Remove custom avatar and revert to factory default image
   */
  public removeMemberAvatar(memberId: string): boolean {
    if (this.customAvatars[memberId]) {
      delete this.customAvatars[memberId];
      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Reset all avatars to initial default
   */
  public resetAllAvatars(): void {
    this.customAvatars = {};
    this.saveToStorage();
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
   * Max dimension 500x500 to keep localStorage fast, lightweight, and high-fidelity
   */
  public static async compressImageFile(file: File, maxDim = 500, quality = 0.88): Promise<string> {
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
