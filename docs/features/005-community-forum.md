# Feature 005: Community Forum (Q&A)

## Priority: HIGH (Core Community Feature)

## Dependencies: Feature 001 (Authentication), Feature 003 (Roles/Permissions)

## Status: 🔄 To Be Implemented

## Overview

A public Q&A forum where community members can post questions, share knowledge, and help each other. This is a key engagement feature for building an active community.

## Core Requirements

### 1. Forum Structure

#### Categories/Topics

- Organize posts by categories (e.g., "General", "Technical Questions", "Project Help", "Career Advice")
- Categories can have subcategories
- Category descriptions and icons
- Category-specific permissions (optional)

#### Posts

- Create new posts with:
  - Title
  - Content (rich text editor)
  - Category selection
  - Tags
  - Attachments (optional)
- Post status:
  - Published
  - Draft (save for later)
  - Closed (question answered)
  - Pinned (by moderators)
- Post metadata:
  - Author
  - Created/updated dates
  - View count
  - Reply count
  - Upvotes/likes (optional)

#### Comments/Replies

- Reply to posts
- Reply to comments (nested threads)
- Rich text editor
- Edit/delete own comments
- Mark as "accepted answer" (for Q&A)
- Upvote/downvote comments (optional)

### 2. Forum Features

#### Search and Discovery

- Full-text search across posts
- Filter by:
  - Category
  - Tags
  - Author
  - Date range
  - Status (answered/unanswered)
- Sort by:
  - Recent activity
  - Most replies
  - Most views
  - Most upvoted
  - Oldest/newest

#### Post Actions

- Like/upvote posts
- Bookmark/favorite posts
- Share posts
- Report posts (for moderation)
- Follow posts (get notifications on new replies)

#### Moderation

- Moderators can:
  - Edit/delete any post
  - Pin/unpin posts
  - Close/open posts
  - Move posts between categories
  - Mark comments as accepted answers
- Flag/report system
- Moderation queue

### 3. User Experience

- Recent posts sidebar
- Popular posts
- Unanswered questions highlight
- User's posts/comments page
- Post activity feed
- Rich text editor with markdown support
- Code syntax highlighting
- Image uploads in posts

## Database Schema

```typescript
export const forumCategory = pgTable("forum_category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"), // Icon name or URL
  parentId: text("parent_id").references(() => forumCategory.id),
  order: integer("order").$default(() => 0),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const forumPost = pgTable("forum_post", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(), // Rich text/HTML
  categoryId: text("category_id")
    .notNull()
    .references(() => forumCategory.id),
  tags: text("tags").array(),
  status: text("status")
    .$default(() => "published")
    .notNull(), // 'published', 'draft', 'closed', 'archived'
  isPinned: boolean("is_pinned")
    .$default(() => false)
    .notNull(),
  isLocked: boolean("is_locked")
    .$default(() => false)
    .notNull(), // Prevent new replies
  viewCount: integer("view_count")
    .$default(() => 0)
    .notNull(),
  replyCount: integer("reply_count")
    .$default(() => 0)
    .notNull(),
  upvoteCount: integer("upvote_count")
    .$default(() => 0)
    .notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  acceptedAnswerId: text("accepted_answer_id").references(
    () => forumComment.id
  ),
  lastActivityAt: timestamp("last_activity_at")
    .$defaultFn(() => new Date())
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const forumComment = pgTable("forum_comment", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => forumPost.id, { onDelete: "cascade" }),
  parentId: text("parent_id").references(() => forumComment.id), // For nested replies
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  isAcceptedAnswer: boolean("is_accepted_answer")
    .$default(() => false)
    .notNull(),
  upvoteCount: integer("upvote_count")
    .$default(() => 0)
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const forumPostView = pgTable("forum_post_view", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => forumPost.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const forumPostUpvote = pgTable("forum_post_upvote", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => forumPost.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const forumPostBookmark = pgTable("forum_post_bookmark", {
  id: text("id").primaryKey(),
  postId: text("post_id")
    .notNull()
    .references(() => forumPost.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create forum tables (categories, posts, comments)
- [ ] Create database migration
- [ ] Build forum home page (`/forum`)
- [ ] Create category listing page
- [ ] Build post list component (with filters/sort)
- [ ] Create post detail page (`/forum/:id`)
- [ ] Build post creation form
- [ ] Build comment/reply component
- [ ] Implement rich text editor (Tiptap or similar)
- [ ] Add markdown support
- [ ] Implement code syntax highlighting
- [ ] Add image uploads in posts
- [ ] Build search functionality
- [ ] Add filtering and sorting
- [ ] Implement upvoting system
- [ ] Add bookmark functionality
- [ ] Create moderation tools
- [ ] Build flag/report system
- [ ] Add "accepted answer" feature
- [ ] Implement post following/notifications
- [ ] Add view tracking
- [ ] Create user's posts/comments page
- [ ] Build recent/popular posts sidebar
- [ ] Add pagination

## API Endpoints Needed

```
GET /api/forum/categories - List categories
GET /api/forum/posts - List posts (with filters)
GET /api/forum/posts/:id - Get post details
POST /api/forum/posts - Create post
PUT /api/forum/posts/:id - Update post
DELETE /api/forum/posts/:id - Delete post
POST /api/forum/posts/:id/upvote - Upvote post
POST /api/forum/posts/:id/bookmark - Bookmark post
GET /api/forum/posts/:id/comments - Get comments
POST /api/forum/posts/:id/comments - Create comment
PUT /api/forum/comments/:id - Update comment
DELETE /api/forum/comments/:id - Delete comment
POST /api/forum/comments/:id/accept - Mark as accepted answer
GET /api/forum/search?q=query - Search posts
```

## UI Components Needed

- `ForumHome` - Main forum page
- `CategoryList` - Category navigation
- `PostList` - List of posts with filters
- `PostCard` - Post preview card
- `PostDetail` - Full post view
- `PostForm` - Create/edit post form
- `CommentList` - Comments thread
- `CommentForm` - Comment/reply form
- `RichTextEditor` - WYSIWYG editor component
- `ModerationTools` - Moderation actions

## Related Features

- Feature 001: User Authentication (prerequisite)
- Feature 003: User Roles and Permissions (for moderation)
- Feature 015: Notifications (notify on replies, mentions)
- Feature 016: Email Notifications (email on replies to followed posts)

## Notes

- Consider using a rich text editor library (Tiptap, Quill, or Draft.js)
- Markdown support is highly recommended for technical communities
- Code syntax highlighting is essential for coding communities
- Search should be performant (consider full-text search or external service)
- Nested comments can get complex - consider limiting depth
- Moderation tools should be easy to use
- Consider adding post templates for common question types
- "Accepted answer" feature helps with Q&A format
