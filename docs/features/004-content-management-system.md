# Feature 004: Content Management System (CMS)

## Priority: HIGH (Core Value Proposition)

## Dependencies: Feature 001 (Authentication), Feature 003 (Roles/Permissions)

## Status: 🔄 To Be Implemented

## Overview

A comprehensive content management system that allows administrators and authorized members to upload, organize, and share private videos, documents, and other assets with community members.

## Core Requirements

### 1. Content Types

#### Videos

- Upload video files (MP4, MOV, WebM)
- Video processing/transcoding (optional for MVP)
- Video streaming with presigned URLs
- Thumbnail generation
- Video metadata (title, description, duration, file size)
- Video categories/tags
- Access control (member-only, specific roles, etc.)

#### Documents

- Upload PDF, DOCX, PPTX, etc.
- Document preview (if possible)
- Download functionality
- Document metadata
- Categories/tags
- Access control

#### Assets (Images, Files)

- Upload images, code files, etc.
- File organization
- Categories/tags
- Access control

### 2. Content Organization

- Folders/categories for organizing content
- Tags for cross-category organization
- Search functionality
- Filter by:
  - Content type
  - Category
  - Tags
  - Date uploaded
  - Author
- Sort by:
  - Date (newest/oldest)
  - Title (A-Z)
  - Popularity (views/downloads)

### 3. Content Management

- Create/edit/delete content
- Bulk operations (delete multiple, move to folder)
- Content visibility settings:
  - Public (all members)
  - Members-only
  - Role-specific (e.g., pro members only)
  - Private (author only)
- Content status:
  - Draft
  - Published
  - Archived

### 4. Content Viewing

- Content library page (`/content` or `/library`)
- Individual content pages (`/content/:id`)
- Video player component
- Document viewer/download
- Related content suggestions
- Content metadata display

## Database Schema

```typescript
export const contentCategory = pgTable("content_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: text("parent_id").references(() => contentCategory.id),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const content = pgTable("content", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'video', 'document', 'asset'
  fileKey: text("file_key").notNull(), // Storage key
  thumbnailKey: text("thumbnail_key"), // For videos/images
  mimeType: text("mime_type"),
  fileSize: integer("file_size"), // Bytes
  duration: integer("duration"), // Seconds (for videos)
  categoryId: text("category_id").references(() => contentCategory.id),
  tags: text("tags").array(),
  status: text("status")
    .$default(() => "draft")
    .notNull(), // 'draft', 'published', 'archived'
  visibility: text("visibility")
    .$default(() => "members-only")
    .notNull(), // 'public', 'members-only', 'role-specific', 'private'
  allowedRoles: text("allowed_roles").array(), // If role-specific
  viewCount: integer("view_count")
    .$default(() => 0)
    .notNull(),
  downloadCount: integer("download_count")
    .$default(() => 0)
    .notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  publishedAt: timestamp("published_at"),
});

export const contentView = pgTable("content_view", {
  id: text("id").primaryKey(),
  contentId: text("content_id")
    .notNull()
    .references(() => content.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }), // Nullable for anonymous views
  viewedAt: timestamp("viewed_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create content and category tables
- [ ] Create database migration
- [ ] Build content upload component (drag & drop)
- [ ] Implement file upload to storage (R2/S3)
- [ ] Create content library page
- [ ] Build content detail/view page
- [ ] Create video player component
- [ ] Create document viewer/download component
- [ ] Implement content search
- [ ] Add filtering and sorting
- [ ] Build content management UI (create/edit/delete)
- [ ] Implement category management
- [ ] Add tag system
- [ ] Implement access control checks
- [ ] Add content view tracking
- [ ] Create presigned URL generation for secure access
- [ ] Add bulk operations
- [ ] Implement content status workflow
- [ ] Add thumbnail generation for videos (optional)
- [ ] Create content card component

## File Storage Integration

The application already uses R2/S3 storage. Extend it for content:

```typescript
// src/utils/storage/content.ts
export async function uploadContent(
  file: File,
  type: "video" | "document" | "asset"
): Promise<{ key: string; url: string }> {
  // Upload to storage and return key/URL
}

export async function getContentUrl(
  contentId: string,
  userId: string
): Promise<string> {
  // Check permissions and generate presigned URL
}
```

## API Endpoints Needed

```
GET /api/content - List all content (with filters)
GET /api/content/:id - Get content details
POST /api/content - Create content
PUT /api/content/:id - Update content
DELETE /api/content/:id - Delete content
GET /api/content/:id/url - Get presigned URL for viewing
POST /api/content/:id/view - Track view
GET /api/content/categories - List categories
POST /api/content/categories - Create category
```

## UI Components Needed

- `ContentLibrary` - Main content browsing page
- `ContentCard` - Card component for content items
- `ContentUpload` - Upload form with drag & drop
- `VideoPlayer` - Video playback component
- `DocumentViewer` - Document preview/download
- `ContentForm` - Create/edit content form
- `CategoryManager` - Category management UI

## Related Features

- Feature 001: User Authentication (prerequisite)
- Feature 003: User Roles and Permissions (for access control)
- Feature 015: Notifications (notify when new content published)
- Feature 016: Email Notifications (email when new content available)

## Notes

- Consider video transcoding for multiple quality levels (future enhancement)
- Large file uploads may need chunked uploads
- Presigned URLs should have expiration times
- Consider CDN for video delivery
- Document preview may require external services (e.g., Google Docs Viewer)
- Content should be searchable (consider full-text search)
- Respect visibility and role-based access controls
