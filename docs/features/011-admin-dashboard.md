# Feature 011: Admin Dashboard

## Priority: MEDIUM (Management Tool)
## Dependencies: Feature 001 (Authentication), Feature 003 (Roles/Permissions)
## Status: 🔄 To Be Implemented

## Overview
A comprehensive admin dashboard that allows administrators to manage the community, view analytics, moderate content, and configure system settings.

## Core Requirements

### 1. Dashboard Overview
- Key metrics at a glance:
  - Total members
  - Active members (last 30 days)
  - Total content items
  - Total forum posts
  - Upcoming events
  - Recent activity
- Charts and graphs:
  - Member growth over time
  - Content creation trends
  - Forum activity
  - Event attendance

### 2. User Management
- List all users
- Search and filter users
- View user details
- Edit user profiles
- Change user roles
- Suspend/ban users
- View user activity
- Delete users (with confirmation)

### 3. Content Management
- List all content (videos, documents, assets)
- Search and filter content
- Edit/delete any content
- Moderate content
- View content analytics (views, downloads)
- Bulk operations

### 4. Forum Moderation
- View all posts
- Moderate posts (edit, delete, pin, lock)
- View reported posts
- Moderate comments
- Manage categories
- View forum analytics

### 5. Event Management
- View all events
- Edit/delete any event
- View event RSVPs
- Manage event categories
- View event analytics

### 6. System Settings
- General settings (site name, description, logo)
- Email settings
- Storage settings
- Feature toggles
- Maintenance mode
- Backup settings

### 7. Analytics & Reports
- Member analytics
- Content analytics
- Forum analytics
- Event analytics
- Engagement metrics
- Export reports (CSV, PDF)

## Database Schema

```typescript
// Most tables already exist, add admin-specific tables:

export const adminLog = pgTable("admin_log", {
  id: text("id").primaryKey(),
  adminId: text("admin_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  action: text("action").notNull(), // 'user_suspended', 'content_deleted', etc.
  targetType: text("target_type").notNull(), // 'user', 'content', 'post', etc.
  targetId: text("target_id").notNull(),
  details: json("details").$type<Record<string, any>>(),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const systemSetting = pgTable("system_setting", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  type: text("type").notNull(), // 'string', 'number', 'boolean', 'json'
  description: text("description"),
  updatedBy: text("updated_by")
    .notNull()
    .references(() => user.id),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create admin dashboard route (`/admin`)
- [ ] Build dashboard overview page
- [ ] Create user management page
- [ ] Build content management page
- [ ] Create forum moderation page
- [ ] Build event management page
- [ ] Create system settings page
- [ ] Add analytics charts (use Chart.js or similar)
- [ ] Implement admin logging
- [ ] Build search and filter components
- [ ] Add bulk operations
- [ ] Create admin navigation
- [ ] Add permission checks (admin only)
- [ ] Implement admin activity logging
- [ ] Build reports export functionality
- [ ] Style admin dashboard

## Analytics Library Options

- **Chart.js** - Popular, flexible
- **Recharts** - React-specific
- **Victory** - Feature-rich
- **ApexCharts** - Beautiful charts

## API Endpoints Needed

```
GET /api/admin/dashboard/stats - Get dashboard statistics
GET /api/admin/users - List users (with filters)
GET /api/admin/users/:id - Get user details
PUT /api/admin/users/:id - Update user
DELETE /api/admin/users/:id - Delete user
POST /api/admin/users/:id/suspend - Suspend user
GET /api/admin/content - List all content
GET /api/admin/posts - List all posts
GET /api/admin/events - List all events
GET /api/admin/analytics/:type - Get analytics data
GET /api/admin/settings - Get system settings
PUT /api/admin/settings - Update system settings
GET /api/admin/logs - Get admin activity logs
```

## UI Components Needed

- `AdminDashboard` - Main dashboard page
- `AdminNav` - Admin navigation
- `UserManagement` - User management page
- `ContentManagement` - Content management page
- `ForumModeration` - Forum moderation page
- `EventManagement` - Event management page
- `SystemSettings` - Settings page
- `AnalyticsCharts` - Chart components
- `AdminLogViewer` - Activity log viewer

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 003: User Roles and Permissions (admin access)
- Feature 004: Content Management (manage content)
- Feature 005: Community Forum (moderate forum)
- Feature 007: Event Calendar (manage events)

## Notes
- Admin dashboard should be secure (admin-only access)
- All admin actions should be logged
- Analytics help understand community health
- Bulk operations improve efficiency
- System settings allow customization
- Consider adding admin notifications for important events
- Export functionality helps with reporting
- Admin dashboard can be built incrementally
- Consider adding admin activity feed
- Mobile-responsive admin dashboard is useful

