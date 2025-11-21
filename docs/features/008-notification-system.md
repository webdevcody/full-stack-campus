# Feature 008: In-App Notification System

## Priority: MEDIUM-HIGH (User Engagement)
## Dependencies: Feature 001 (Authentication)
## Status: 🔄 To Be Implemented

## Overview
An in-app notification system that alerts users about important activities like new messages, replies to their posts, new content, upcoming events, and other community interactions.

## Core Requirements

### 1. Notification Types

#### Message Notifications
- New private message received
- New message in group conversation
- Message read receipt (optional)

#### Forum Notifications
- Reply to your post
- Reply to your comment
- Mention in post/comment (@username)
- Post accepted as answer
- Post upvoted (optional)

#### Content Notifications
- New content published
- Content you follow updated
- Comment on content (if implemented)

#### Event Notifications
- Event reminder (upcoming event)
- Event cancelled
- Event updated/changed
- New event in categories you follow

#### Community Notifications
- New member joined (optional)
- Someone followed you (if implemented)
- Profile view (optional)

#### System Notifications
- Account updates
- Subscription changes
- Admin announcements

### 2. Notification Features

#### Notification Display
- Notification bell icon with unread count badge
- Dropdown notification list
- Full notifications page (`/notifications`)
- Group similar notifications (e.g., "5 new replies")
- Mark as read/unread
- Mark all as read
- Delete notifications

#### Notification Preferences
- User can configure which notifications to receive
- Per-category preferences
- Per-type preferences (in-app, email, push)

#### Notification Delivery
- Real-time notifications (WebSocket/SSE)
- Polling fallback
- Notification persistence in database

## Database Schema

```typescript
export const notification = pgTable("notification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'message', 'forum_reply', 'forum_mention', 'content', 'event', 'system'
  title: text("title").notNull(),
  message: text("message").notNull(),
  link: text("link"), // URL to related content
  relatedId: text("related_id"), // ID of related entity (post, message, event, etc.)
  relatedType: text("related_type"), // Type of related entity
  isRead: boolean("is_read").$default(() => false).notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const notificationPreference = pgTable("notification_preference", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // Notification type
  inApp: boolean("in_app").$default(() => true).notNull(),
  email: boolean("email").$default(() => false).notNull(),
  push: boolean("push").$default(() => false).notNull(), // For future push notifications
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create notification tables
- [ ] Create database migration
- [ ] Build notification service/utilities
- [ ] Create notification bell component
- [ ] Build notification dropdown
- [ ] Create notifications page (`/notifications`)
- [ ] Implement notification creation helpers
- [ ] Add notification triggers throughout app:
  - On new message
  - On forum reply
  - On mention
  - On new content
  - On event reminders
- [ ] Implement mark as read functionality
- [ ] Add unread count badge
- [ ] Build notification preferences page
- [ ] Implement real-time notification delivery (WebSocket/SSE)
- [ ] Add notification grouping
- [ ] Create notification cleanup job (delete old notifications)
- [ ] Style notification UI

## Notification Service

```typescript
// src/utils/notifications.ts
export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  relatedId?: string;
  relatedType?: string;
}): Promise<Notification> {
  // Create notification in database
  // Send real-time notification if user is online
  // Queue email notification if user preference allows
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
): Promise<void> {
  // Mark notification as read
}

export async function getUnreadCount(userId: string): Promise<number> {
  // Get count of unread notifications
}
```

## Real-Time Implementation

### Option 1: Server-Sent Events (SSE)
- Simpler than WebSockets
- One-way (server to client)
- Good for notifications
- Built-in reconnection

### Option 2: WebSockets
- Full bidirectional communication
- More complex
- Better for real-time features

### Option 3: Polling (Fallback)
- Simple to implement
- Less efficient
- Good fallback option

## API Endpoints Needed

```
GET /api/notifications - Get user's notifications
GET /api/notifications/unread-count - Get unread count
PUT /api/notifications/:id/read - Mark as read
PUT /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id - Delete notification
GET /api/notifications/preferences - Get notification preferences
PUT /api/notifications/preferences - Update preferences
GET /api/notifications/stream - SSE endpoint for real-time notifications
```

## UI Components Needed

- `NotificationBell` - Bell icon with badge
- `NotificationDropdown` - Dropdown notification list
- `NotificationList` - Full notification list page
- `NotificationItem` - Single notification component
- `NotificationPreferences` - Preferences settings page
- `UnreadBadge` - Badge component for counts

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 005: Community Forum (notifications for replies)
- Feature 006: Private Messaging (notifications for messages)
- Feature 007: Event Calendar (notifications for events)
- Feature 009: Email Notifications (complementary system)

## Notes
- Notifications should be non-intrusive
- Consider notification grouping to avoid spam
- Old notifications should be cleaned up periodically
- Real-time delivery enhances UX significantly
- Notification preferences are important for user control
- Consider adding "Do Not Disturb" mode
- Notification sound/desktop notifications (future enhancement)
- Push notifications for mobile (future enhancement)

