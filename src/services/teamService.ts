import { collection, doc, onSnapshot, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
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
  private isFirestoreSynced = false;
  private subscribers: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    this.initFirestoreListener();
    this.syncWithServer();

    // Automatically synchronize on mobile devices when returning to foreground
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

  /**
   * Listen to real-time changes in Firestore collection `team_members`
   * Every device (mobile, desktop, new visitors) receives updates instantaneously.
   */
  private initFirestoreListener(): void {
    if (typeof window === 'undefined') return;

    try {
      const colRef = collection(db, 'team_members');

      onSnapshot(
        colRef,
        async (snapshot) => {
          if (snapshot.empty) {
            // First time running against empty Firestore database: seed with baseline team members
            await this.seedBaselineToFirestore();
            return;
          }

          const remoteMembers: TeamMember[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as TeamMember;
            if (data && data.id && data.name) {
              remoteMembers.push(data);
            }
          });

          if (remoteMembers.length > 0) {
            // Sort by orderIndex to preserve exact layout
            remoteMembers.sort((a, b) => {
              const orderA = typeof (a as any).orderIndex === 'number' ? (a as any).orderIndex : 999;
              const orderB = typeof (b as any).orderIndex === 'number' ? (b as any).orderIndex : 999;
              return orderA - orderB;
            });

            this.members = remoteMembers;
            this.isFirestoreSynced = true;
            this.saveToStorage(false);
            this.notifySubscribers();
          }
        },
        (error) => {
          console.warn('Firestore onSnapshot listener fallback:', error);
          handleFirestoreError(error, OperationType.GET, 'team_members');
        }
      );
    } catch (e) {
      console.warn('Could not initialize Firestore team listener:', e);
    }
  }

  /**
   * Seed baseline team members into Firestore if the cloud database is newly provisioned
   */
  public async seedBaselineToFirestore(): Promise<void> {
    try {
      for (let i = 0; i < TEAM_MEMBERS.length; i++) {
        const m = TEAM_MEMBERS[i];
        const memberPayload = {
          ...m,
          orderIndex: i,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'team_members', m.id), memberPayload);
      }
      this.isFirestoreSynced = true;
    } catch (err) {
      console.error('Error seeding baseline team members to Firestore:', err);
    }
  }

  private notifySubscribers(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
    }
    this.subscribers.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    });
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
   * Syncs roster with the server & Firestore so all devices (mobile phones, tablets, PCs)
   * immediately see the exact same uploaded profile images and member details.
   */
  public async syncWithServer(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
      this.isServerSyncing = true;

      // 1. Fetch from Firestore if needed
      try {
        const snapshot = await getDocs(collection(db, 'team_members'));
        if (!snapshot.empty) {
          const remoteMembers: TeamMember[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as TeamMember;
            if (data && data.id && data.name) {
              remoteMembers.push(data);
            }
          });

          remoteMembers.sort((a, b) => {
            const orderA = typeof (a as any).orderIndex === 'number' ? (a as any).orderIndex : 999;
            const orderB = typeof (b as any).orderIndex === 'number' ? (b as any).orderIndex : 999;
            return orderA - orderB;
          });

          this.members = remoteMembers;
          this.saveToStorage(false);
          this.notifySubscribers();
          return true;
        }
      } catch (err) {
        console.warn('Firestore direct fetch attempt fallback:', err);
      }

      // 2. Fallback to local server endpoint
      const res = await fetch('/api/team', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.members) && data.members.length > 0) {
          const currentJson = JSON.stringify(this.members);
          const serverJson = JSON.stringify(data.members);
          if (currentJson !== serverJson) {
            this.members = data.members;
            this.saveToStorage(false);
            this.notifySubscribers();
          }
          return true;
        }
      }

      if (this.members.length > 0) {
        await this.pushToServer();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Server sync unavailable, using local cache:', err);
      return false;
    } finally {
      this.isServerSyncing = false;
    }
  }

  /**
   * Push current roster to server backup
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
      console.warn('Failed to push team roster to server backup', err);
      return false;
    }
  }

  /**
   * Force push current roster to Cloud Firestore and server
   * Guarantees mobile devices and all new visitors immediately receive all profile photos & edits.
   */
  public async forcePushToCloud(): Promise<boolean> {
    this.saveToStorage(false);
    let firestoreSuccess = true;

    try {
      for (let i = 0; i < this.members.length; i++) {
        const m = this.members[i];
        const payload = {
          ...m,
          orderIndex: i,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, 'team_members', m.id), payload, { merge: true });
      }
    } catch (err) {
      console.error('Firestore cloud force push warning:', err);
      firestoreSuccess = false;
    }

    const serverOk = await this.pushToServer();
    return firestoreSuccess || serverOk;
  }

  private saveToStorage(push = true): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_ROSTER, JSON.stringify(this.members));
      this.notifySubscribers();
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
   * Check if a member has a custom uploaded avatar
   */
  public hasCustomAvatar(id: string): boolean {
    const member = this.getMemberById(id);
    if (!member) return false;
    const original = TEAM_MEMBERS.find((m) => m.id === id);
    if (!original) return Boolean(member.avatarUrl);
    return member.avatarUrl !== original.avatarUrl;
  }

  /**
   * Add a new person to a team and sync to Firestore and local storage
   */
  public async addMember(memberData: Omit<TeamMember, 'id' | 'initials'> & { initials?: string }): Promise<TeamMember> {
    const prefix = memberData.department === 'Networking Relations Team' ? 'nrt-custom' : 'pse-custom';
    const newId = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const initials = memberData.initials || computeInitials(memberData.name);

    const newMember: TeamMember & { orderIndex: number; updatedAt: string } = {
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
      orderIndex: this.members.length,
      updatedAt: new Date().toISOString(),
    };

    this.members.push(newMember);
    this.saveToStorage(true);

    try {
      await setDoc(doc(db, 'team_members', newMember.id), newMember);
    } catch (err) {
      console.warn('Firestore setDoc notice on addMember:', err);
      handleFirestoreError(err, OperationType.CREATE, `team_members/${newMember.id}`);
    }

    return newMember;
  }

  /**
   * Edit/update any existing team member's details
   */
  public async updateMember(id: string, updates: Partial<TeamMember>): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return false;

    const current = this.members[index];
    const newName = updates.name !== undefined ? updates.name.trim() : current.name;
    const newInitials = updates.name !== undefined ? computeInitials(newName) : (updates.initials || current.initials);

    const updatedDoc = {
      ...current,
      ...updates,
      name: newName,
      initials: newInitials,
      updatedAt: new Date().toISOString(),
    };

    this.members[index] = updatedDoc;
    this.saveToStorage(true);

    try {
      await setDoc(doc(db, 'team_members', id), updatedDoc, { merge: true });
      return true;
    } catch (err) {
      console.warn('Firestore setDoc notice on updateMember:', err);
      handleFirestoreError(err, OperationType.UPDATE, `team_members/${id}`);
    }
  }

  /**
   * Update specifically the name of an existing team member
   */
  public async updateMemberName(id: string, newName: string): Promise<boolean> {
    return this.updateMember(id, { name: newName });
  }

  /**
   * Update or upload a custom avatar data URL for a specialist
   */
  public async updateMemberAvatar(memberId: string, avatarDataUrl: string): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === memberId);
    if (index === -1) return false;

    this.members[index] = {
      ...this.members[index],
      avatarUrl: avatarDataUrl,
    };

    this.saveToStorage(true);

    try {
      await setDoc(
        doc(db, 'team_members', memberId),
        {
          avatarUrl: avatarDataUrl,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.warn('Firestore setDoc notice on updateMemberAvatar:', err);
      handleFirestoreError(err, OperationType.UPDATE, `team_members/${memberId}`);
    }
  }

  /**
   * Remove custom avatar and revert to factory default image
   */
  public async removeMemberAvatar(memberId: string): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === memberId);
    if (index === -1) return false;

    const original = TEAM_MEMBERS.find((m) => m.id === memberId);
    const targetUrl = original ? original.avatarUrl : '';

    this.members[index] = {
      ...this.members[index],
      avatarUrl: targetUrl,
    };

    this.saveToStorage(true);

    try {
      await setDoc(
        doc(db, 'team_members', memberId),
        {
          avatarUrl: targetUrl,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.warn('Firestore setDoc notice on removeMemberAvatar:', err);
      handleFirestoreError(err, OperationType.UPDATE, `team_members/${memberId}`);
    }
  }

  /**
   * Delete a team member
   */
  public async deleteMember(id: string): Promise<boolean> {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.members.splice(index, 1);
    this.saveToStorage(true);

    try {
      await deleteDoc(doc(db, 'team_members', id));
      return true;
    } catch (err) {
      console.warn('Firestore deleteDoc notice on deleteMember:', err);
      handleFirestoreError(err, OperationType.DELETE, `team_members/${id}`);
    }
  }

  /**
   * Reset all team members back to initial default roster in Firestore and local storage
   */
  public async resetAllToDefault(): Promise<void> {
    this.members = TEAM_MEMBERS.map((m, idx) => ({ ...m, orderIndex: idx }));
    this.saveToStorage(true);

    try {
      await this.seedBaselineToFirestore();
      if (typeof window !== 'undefined') {
        fetch('/api/team/reset', { method: 'POST' }).catch(() => {});
      }
    } catch (err) {
      console.error('Error resetting roster in Firestore:', err);
    }
  }

  public async resetAllAvatars(): Promise<void> {
    await this.resetAllToDefault();
  }

  /**
   * Subscribe to updates (reactive re-rendering across components)
   */
  public subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    if (typeof window !== 'undefined') {
      window.addEventListener(STORAGE_EVENT_NAME, callback);
    }
    return () => {
      this.subscribers.delete(callback);
      if (typeof window !== 'undefined') {
        window.removeEventListener(STORAGE_EVENT_NAME, callback);
      }
    };
  }

  /**
   * Helper utility to compress an image file client-side using Canvas
   * Max dimension 380x380 to keep ultra-fast, lightweight, and sharp on mobile & retina screens.
   */
  public static async compressImageFile(file: File, maxDim = 380, quality = 0.82): Promise<string> {
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
