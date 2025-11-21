# Feature 010: Activity Feed

## Priority: MEDIUM (Engagement Feature)
## Dependencies: Feature 001 (Authentication), Feature 004 (CMS), Feature 005 (Forum), Feature 007 (Events)
## Status: 🔄 To Be Implemented

## Overview
A centralized activity feed that shows recent community activity including new content, forum posts, events, and member activity. This helps users stay engaged and discover new content.

## Core Requirements

### 1. Activity Types

#### Content Activity
- New content published
- Content updated
- Content viewed (popular content)

#### Forum Activity
- New posts
- Popular posts
- Recent replies
- Accepted answers

#### Event Activity
- New events created
- Upcoming events
- Event reminders

#### Member Activity
- New members joined
- Member milestones (optional)
- Profile updates (optional)

### 2. Feed Features

#### Feed Views
- Global feed (all community activity)
- Personalized feed (based on user interests)
- Category-specific feeds
- User's activity feed (their own activity)

#### Feed Filtering
- Filter by activity type
- Filter by category/topic
- Filter by date range
- Hide certain activity types

#### Feed Sorting
- Recent (newest first)
- Popular (most engagement)
- Trending (recent + popular)

### 3. Feed Display
- Activity cards with:
  - Activity type icon
  - User avatar and name
  - Activity description
  - Related content preview
  - Timestamp
  - Engagement metrics (views, likes, etc.)
- Infinite scroll or pagination
- Loading states
- Empty states

## Database Schema

```typescript
export const activity = pgTable("activity", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // 'content_published', 'forum_post', 'event_created', 'member_joined', etc.
  actorId: text("actor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  objectType: text("object_type").notNull(), // 'content', 'post', 'event', 'user'
  objectId: text("object_id").notNull(), // ID of related entity
  title: text("title").notNull(),
  description: text("description"),
  metadata: json("metadata").$type<Record<string, any>>(), // Additional data
  categoryId: text("category_id"), // For filtering
  tags: text("tags").array(),
  engagementScore: integer("engagement_score").$default(() => 0).notNull(), // For sorting
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Indexes for performance
export const activityIndexes = {
  typeIndex: index("activity_type_idx").on(activity.type),
  createdAtIndex: index("activity_created_at_idx").on(activity.createdAt),
  categoryIndex: index("activity_category_idx").on(activity.categoryId),
};
```

## Implementation Tasks

- [ ] Create activity table
- [ ] Create database migration
- [ ] Build activity logging service
- [ ] Add activity creation triggers:
  - On content publish
  - On forum post
  - On event create
  - On member join
- [ ] Create activity feed page (`/activity` or `/feed`)
- [ ] Build activity card component
- [ ] Implement feed filtering
- [ ] Add feed sorting
- [ ] Create personalized feed algorithm
- [ ] Add infinite scroll
- [ ] Build activity detail views
- [ ] Add activity engagement tracking
- [ ] Create "trending" algorithm
- [ ] Style activity feed UI

## Activity Service

```typescript
// src/utils/activity.ts
export async function logActivity(data: {
  type: ActivityType;
  actorId: string;
  objectType: string;
  objectId: string;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  categoryId?: string;
  tags?: string[];
}): Promise<Activity> {
  // Create activity record
  // Calculate engagement score
  // Update trending algorithms
}

export async function getActivityFeed(options: {
  userId?: string; // For personalized feed
  type?: string;
  categoryId?: string;
  limit?: number;
  offset?: number;
  sort?: "recent" | "popular" | "trending";
}): Promise<Activity[]> {
  // Query activities with filters
  // Apply sorting
  // Return paginated results
}
```

## Personalized Feed Algorithm

Consider factors:
- User's interests (from profile)
- Categories user follows
- Content user has engaged with
- Members user follows (if implemented)
- Recent activity patterns

## API Endpoints Needed

```
GET /api/activity/feed - Get activity feed
GET /api/activity/feed/personalized - Get personalized feed
GET /api/activity/types - Get activity types for filtering
GET /api/activity/trending - Get trending activities
```

## UI Components Needed

- `ActivityFeed` - Main feed component
- `ActivityCard` - Single activity card
- `ActivityFilters` - Filter sidebar
- `ActivityTypeIcon` - Icon for activity type
- `ActivityDetail` - Expanded activity view (optional)

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 004: Content Management (content activities)
- Feature 005: Community Forum (forum activities)
- Feature 007: Event Calendar (event activities)
- Feature 002: Member Directory (member activities)

## Notes
- Activity feed enhances discovery and engagement
- Consider caching for performance
- Personalized feeds improve relevance
- Engagement scoring helps surface quality content
- Activity logging should be non-blocking (consider queue)
- Consider activity retention (delete old activities)
- Trending algorithm can be simple (recent + engagement) or complex
- Activity feed can be optional - not critical for MVP but valuable

