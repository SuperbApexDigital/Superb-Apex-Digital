# Security Specification: Superb Apex Digital Firestore Rules

## 1. Data Invariants
- **Public Read Access**: Anyone visiting the site (mobile, desktop, new visitors) can view team members (`/team_members/{memberId}`).
- **Document ID Integrity**: Member document ID must be a valid sanitized string matching `^[a-zA-Z0-9_\-]+$` and `<= 128` characters.
- **Payload Validation**: Any write to `/team_members/{memberId}` must validate that:
  - Required fields `id`, `name`, `role`, `department` are present and non-empty strings.
  - Length limits are enforced: `name` <= 100, `role` <= 100, `department` <= 100, `bio` <= 2000, `discordTag` <= 100, `initials` <= 10, `avatarUrl` <= 1000000 bytes (permitting optimized Base64 thumbnails).
  - Array bounds: `focusAreas` <= 20 items, `discordRoles` <= 20 items.
  - Document ID matches `data.id`.

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Missing Required Name**: Payload without `name` field.
2. **Missing Required Role**: Payload without `role` field.
3. **Missing Required Department**: Payload without `department` field.
4. **Mismatched ID**: Document ID in path differs from `data.id`.
5. **Path Traversal / Malicious ID**: Doc ID contains illegal characters (e.g. `../../root`).
6. **Name Buffer Overflow**: Name string longer than 100 characters.
7. **Bio Denial-of-Wallet**: Bio string longer than 2000 characters.
8. **Invalid Avatar URL Size**: Avatar data string longer than 1,000,000 characters.
9. **Focus Areas Array Explosion**: Array with more than 20 items.
10. **Unbounded Discord Roles Array**: Array with more than 20 items.
11. **Type Confusion on OrderIndex**: Passing string instead of number for `orderIndex`.
12. **Type Confusion on isCustom**: Passing string instead of boolean for `isCustom`.

## 3. Test Runner
Defined in `firestore.rules.test.ts`.
