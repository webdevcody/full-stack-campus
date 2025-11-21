# Feature 003: User Roles and Permissions

## Priority: HIGH (Security Foundation)

## Dependencies: Feature 001 (User Authentication)

## Status: 🔄 To Be Implemented

## Overview

A role-based access control (RBAC) system to manage what users can do in the community. This is critical for security and community management.

## Core Requirements

### 1. Role Definitions

#### Admin

- Full system access
- Manage all content (videos, documents, posts)
- Manage users (suspend, ban, change roles)
- Configure system settings
- View analytics
- Manage events and calendar
- Moderate all discussions

#### Moderator

- Moderate community discussions
- Edit/delete posts and comments
- Manage events (create, edit, delete)
- View member profiles
- Cannot manage users or system settings

#### Member (Default)

- Access member-only content
- Create posts and comments
- Send private messages
- View member directory
- Attend events
- Upload content (if allowed by plan)

#### Guest/Unverified

- Limited access
- View public content only
- Cannot post or comment
- Cannot access member directory

### 2. Permission System

Permissions should be granular and checkable:

- `content.create` - Create content (videos, documents)
- `content.edit` - Edit own content
- `content.delete` - Delete own content
- `content.moderate` - Moderate all content
- `posts.create` - Create forum posts
- `posts.moderate` - Moderate all posts
- `events.create` - Create events
- `events.manage` - Manage all events
- `messages.send` - Send private messages
- `members.view` - View member directory
- `admin.access` - Access admin panel
- `users.manage` - Manage users

### 3. Role Assignment

- Default role: Member
- Admin can assign roles via admin panel
- Role changes should be logged
- Cannot remove last admin

## Database Schema

```typescript
export const role = pgTable("role", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(), // 'admin', 'moderator', 'member', 'guest'
  displayName: text("display_name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const permission = pgTable("permission", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(), // 'content.create', 'posts.moderate', etc.
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const rolePermission = pgTable("role_permission", {
  id: text("id").primaryKey(),
  roleId: text("role_id")
    .notNull()
    .references(() => role.id, { onDelete: "cascade" }),
  permissionId: text("permission_id")
    .notNull()
    .references(() => permission.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Add roleId to user table
export const user = pgTable("user", {
  // ... existing fields
  roleId: text("role_id")
    .notNull()
    .references(() => role.id)
    .$default(() => "member"), // Default role ID
});

export const roleChangeLog = pgTable("role_change_log", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  oldRoleId: text("old_role_id").references(() => role.id),
  newRoleId: text("new_role_id")
    .notNull()
    .references(() => role.id),
  changedBy: text("changed_by")
    .notNull()
    .references(() => user.id),
  reason: text("reason"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create role and permission tables
- [ ] Create database migration
- [ ] Seed default roles and permissions
- [ ] Add roleId to user table
- [ ] Create permission checking utility functions
- [ ] Create role checking middleware
- [ ] Build admin panel for role management
- [ ] Add role change logging
- [ ] Protect routes based on roles
- [ ] Protect API endpoints based on permissions
- [ ] Add role badges to UI
- [ ] Create permission denied error pages
- [ ] Add role assignment UI in admin panel
- [ ] Implement "cannot remove last admin" check

## Permission Checking Utilities

```typescript
// src/utils/permissions.ts
export async function hasPermission(
  userId: string,
  permission: string
): Promise<boolean> {
  // Check if user's role has the permission
}

export async function hasRole(
  userId: string,
  roleName: string
): Promise<boolean> {
  // Check if user has the role
}

export async function requirePermission(
  userId: string,
  permission: string
): Promise<void> {
  // Throw error if user doesn't have permission
}
```

## Middleware Integration

```typescript
// src/fn/middleware.ts
export const adminMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next, context }) => {
  await requirePermission(context.userId, "admin.access");
  return next();
});

export const moderatorMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next, context }) => {
  await requirePermission(context.userId, "posts.moderate");
  return next();
});
```

## Related Features

- Feature 001: User Authentication (prerequisite)
- Feature 004: Content Management System (needs permissions)
- Feature 005: Community Forum (needs moderation permissions)
- Feature 007: Event Calendar (needs event creation permissions)
- Feature 011: Admin Dashboard (needs admin access)

## Notes

- Start with simple role-based checks, can add more granular permissions later
- Consider caching permission checks for performance
- Log all permission-denied attempts for security
- Roles should be flexible enough to add new ones later
- Consider adding "plan-based" permissions (e.g., pro members can create more content)
