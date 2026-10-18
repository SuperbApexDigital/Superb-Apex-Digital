# Implementation Plan: Admin Team Profile Photo Upload & Management

Integrate an authentic, persistent Team Profile Photo Upload tool inside the private, password-protected `/Admin` portal. This allows the administrator to upload exact image files (Discord screenshots, custom headshots, or graphics) for every specialist on both teams, preview and manage them, and have them immediately visible to all site visitors in both cards and the fullscreen photo lightbox—while keeping Discord tags non-copyable and maintaining the hidden status of the admin portal.

---

## 1. User Alignment & Clarification Synthesis

From your confirmed responses:
- **Exact File Uploading**: You will be able to upload your exact image files directly from your computer for each specialist.
- **Admin Integration**: The photo upload tool will reside inside your private, password-protected `/Admin` portal (accessible only via URL, invisible in public navigation).
- **Zero Team Member Loss**: All 6 specialists of the **Networking Relations Team** (CaptainDav, KryonAce, KryonPyper, daveee, jamiu, temple) and all 4 specialists of **Partner Success & Escalations** (Alex Vance, Marcus Chen, Derrick Thorne, Elena Rostova) remain intact.
- **Strict Name Correspondence**: The name written on their profile corresponds identically to the name below it.
- **Zero Discord Tag Copying**: No copy buttons, icons, or clipboard triggers will exist for Discord handles.

---

## 2. Architecture & System Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        /Admin (Private Portal)                         │
│  [Password Auth: ApexAdmin2025]                                        │
│  ┌─────────────────────────┬────────────────────────────────────────┐  │
│  │ Client Reviews Tab      │ Team Profile Photos Tab (NEW)          │  │
│  │ (Approve / Reject)      │                                        │  │
│  └─────────────────────────┴────────────────────────────────────────┘  │
│                                │                                       │
│          Uploads Exact Image Files (Drag & Drop or File Picker)        │
│          Client-side Canvas Compression (~400x400px optimized WebP)   │
│                                │                                       │
│                                ▼                                       │
│               teamService (LocalStorage Persistence)                   │
│               Key: 'superb_apex_custom_avatars'                        │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │ Live Sync
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Public Team Page (/team)                         │
│  • Networking Relations Team (6 Specialists with exact names)          │
│  • Partner Success & Escalations (4 Specialists)                       │
│  • Direct Custom Photo Display                                         │
│  • Fullscreen Interactive Photo Lightbox (Zoom & Carousel)             │
│  • Clean Display-Only Discord Tags (No Copy Buttons)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Implementation Steps

### Step 1: Create `src/services/teamService.ts`
- Implement a dedicated persistence service that loads the baseline `TEAM_MEMBERS` from `agencyData.ts` and merges any administrator-uploaded custom avatars from `localStorage`.
- Provide helper methods:
  - `getTeamMembers()`: Returns the merged active team list.
  - `updateMemberAvatar(memberId: string, dataUrl: string)`: Saves a custom image for a specialist.
  - `removeMemberAvatar(memberId: string)`: Reverts a specialist to their default high-res generated asset.
  - `resetAllAvatars()`: Restores all team members to initial state.
  - Emits custom storage events so tabs or open views update in real-time.

### Step 2: Build the Admin Team Photo Management Panel in `src/pages/AdminPage.tsx`
- Add a new primary section in `/Admin`: **"Team Roster & Profile Photo Management"** with clear division grouping:
  - **Networking Relations Team** (CaptainDav, KryonAce, KryonPyper, daveee, jamiu, temple)
  - **Partner Success & Escalations** (Alex Vance, Marcus Chen, Derrick Thorne, Elena Rostova)
- For every specialist:
  - Shows current avatar thumbnail with an active indicator (Custom Uploaded vs Default Asset).
  - Drag-and-drop zone and file input button (`Upload New Photo`).
  - Instant client-side file reading and image resizing via HTML5 Canvas (ensuring fast load times and reliable browser storage).
  - Live crop/preview preview before saving.
  - "Save Photo" and "Revert to Default" actions with feedback toast alerts.
  - Shows their exact name and Discord tag to ensure 100% accurate correspondence.

### Step 3: Wire `src/pages/TeamPage.tsx` to Active Service
- Update `TeamPage.tsx` to source its roster from `teamService.getTeamMembers()`.
- Ensure custom uploaded photos render seamlessly across:
  - The circular specialist avatar on the card.
  - The Discord Profile Card preview modal.
  - The Fullscreen Lightbox Photo Viewer with Prev/Next cycling and thumbnail strip.
- Maintain strict compliance: no copy button, no click-to-copy, and names prominently displayed below photos.

---

## 4. Verification & Testing Checklist

1. **Password Gate**: Access `/Admin`, log in with personal password, and verify the new Team Photo Management tab renders cleanly.
2. **File Upload Testing**: Upload a test image for CaptainDav, KryonAce, and other members; verify that preview and save work without delay.
3. **Public View Synchronization**: Navigate to `/team` and confirm the uploaded image appears immediately on the card and in the fullscreen lightbox.
4. **No Copy Enforced**: Confirm Discord tags remain purely informational text with zero copy affordances.
5. **Revert Testing**: Test the "Revert to Default" button in `/Admin` to ensure fallback safety.
6. **Build Integrity**: Run `lint_applet` and `compile_applet` to guarantee clean TypeScript compilation.
