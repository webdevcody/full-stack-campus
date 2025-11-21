# Feature 002: User Profiles and Member Directory

## Priority: HIGH (Core Community Feature)

## Dependencies: Feature 001 (User Authentication)

## Status: 🔄 To Be Implemented

## Overview

A public member directory where community members can discover and connect with each other. Users can view profiles, see member activity, and optionally reach out to other members.

## Core Requirements

### 1. Member Directory Page

- Grid/list view of all community members
- Search functionality (by name, skills, interests, location)
- Filter by:
  - Skills/technologies
  - Interests
  - Location
  - Availability status
  - Profile completion
- Sort by:
  - Recently joined
  - Most active
  - Alphabetical
- Pagination for large member lists

### 2. Individual Profile Pages

- Public profile view (`/members/:id`)
- Display:
  - Profile picture/avatar
  - Name and bio
  - Location
  - Skills and interests
  - Social links (if public)
  - Availability status
  - Join date
  - Activity stats (optional):
    - Posts/questions answered
    - Events attended
    - Community contributions
- Profile visibility controls:
  - Public (visible to all)
  - Members-only (visible to authenticated members)
  - Private (hidden from directory)

### 3. Profile Actions

- "Send Message" button (links to Feature 006: Private Messaging)
- "View Profile" link
- Follow/friend functionality (optional for MVP)
- Report user functionality (for moderation)

### 4. Profile Editing

- Edit own profile page
- Upload/change profile picture
- Update bio, location, skills, interests
- Manage social links
- Control profile visibility
- Save changes with validation

## Database Schema

```typescript
// Extend user table (from Feature 001)
// Add indexes for search performance
export const userProfileIndexes = {
  // Indexes for search
  skillsIndex: index("user_skills_idx").on(user.skills),
  interestsIndex: index("user_interests_idx").on(user.interests),
  locationIndex: index("user_location_idx").on(user.location),
};

// Optional: Activity tracking table
export const userActivity = pgTable("user_activity", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(), // 'post', 'reply', 'event', etc.
  activityId: text("activity_id").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create member directory route (`/members`)
- [ ] Build member directory component with search/filter
- [ ] Create individual profile page route (`/members/:id`)
- [ ] Build profile display component
- [ ] Create profile edit page (`/settings/profile`)
- [ ] Implement profile picture upload
- [ ] Add search functionality (full-text search on name, bio)
- [ ] Add filtering by skills, interests, location
- [ ] Add sorting options
- [ ] Implement profile visibility controls
- [ ] Add activity tracking (optional for MVP)
- [ ] Create profile card component for directory
- [ ] Add pagination for member list
- [ ] Style profile pages with modern UI

## API Endpoints Needed

```
GET /api/members - List all members (with filters)
GET /api/members/:id - Get member profile
PUT /api/members/:id - Update own profile
GET /api/members/search?q=query - Search members
GET /api/members/filters - Get available filter options
```

## UI/UX Considerations

- Profile cards should be visually appealing
- Show profile completion percentage
- Highlight active members
- Show "online" status if implementing real-time features
- Responsive design for mobile
- Loading states and skeletons
- Empty states for no results

## Related Features

- Feature 001: User Authentication (prerequisite)
- Feature 006: Private Messaging (integration point)
- Feature 010: Activity Feed (can show member activity)
- Feature 015: Notifications (notify on profile views, if desired)

## Notes

- Consider privacy: respect profile visibility settings
- Profile pictures should be optimized/resized
- Search should be performant (consider full-text search or Algolia/Meilisearch)
- Activity tracking is optional for MVP but adds value
- Consider adding "verified" badges for special members
