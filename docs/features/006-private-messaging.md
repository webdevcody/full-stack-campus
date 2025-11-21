# Feature 006: Private Messaging System

## Priority: MEDIUM-HIGH (Community Engagement)
## Dependencies: Feature 001 (Authentication), Feature 002 (Member Directory)
## Status: 🔄 To Be Implemented

## Overview
A private messaging system that allows community members to communicate one-on-one or in small groups. This enables members to connect, collaborate, and build relationships.

## Core Requirements

### 1. Direct Messages (1-on-1)
- Send messages to other members
- View conversation threads
- Real-time or near-real-time message delivery
- Read receipts (optional for MVP)
- Message status indicators (sent, delivered, read)
- Search messages within conversations
- Delete messages (own messages only)

### 2. Group Messages (Optional for MVP)
- Create group conversations
- Add/remove members from groups
- Group name and description
- Group admin controls

### 3. Messaging Features
- Rich text formatting (bold, italic, links)
- File attachments (images, documents)
- Emoji support
- Message reactions (optional)
- Forward messages (optional)
- Block users (prevent receiving messages)

### 4. User Experience
- Inbox view showing all conversations
- Unread message count badge
- Conversation list sorted by most recent activity
- Message input with character counter
- Typing indicators (optional for MVP)
- Online/offline status (optional)
- Message notifications (Feature 015)

## Database Schema

```typescript
export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  type: text("type").$default(() => "direct").notNull(), // 'direct', 'group'
  name: text("name"), // For group conversations
  description: text("description"), // For group conversations
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  lastMessageAt: timestamp("last_message_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const conversationMember = pgTable("conversation_member", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").$default(() => "member").notNull(), // 'admin', 'member' (for groups)
  joinedAt: timestamp("joined_at")
    .$defaultFn(() => new Date())
    .notNull(),
  lastReadAt: timestamp("last_read_at"), // For read receipts
  leftAt: timestamp("left_at"), // If user left group
});

export const message = pgTable("message", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  type: text("type").$default(() => "text").notNull(), // 'text', 'file', 'system'
  fileKey: text("file_key"), // If type is 'file'
  fileName: text("file_name"), // Original filename
  fileSize: integer("file_size"), // Bytes
  mimeType: text("mime_type"),
  isEdited: boolean("is_edited").$default(() => false).notNull(),
  editedAt: timestamp("edited_at"),
  isDeleted: boolean("is_deleted").$default(() => false).notNull(),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const messageReaction = pgTable("message_reaction", {
  id: text("id").primaryKey(),
  messageId: text("message_id")
    .notNull()
    .references(() => message.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  emoji: text("emoji").notNull(), // Unicode emoji or emoji code
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const blockedUser = pgTable("blocked_user", {
  id: text("id").primaryKey(),
  blockerId: text("blocker_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  blockedId: text("blocked_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create messaging tables
- [ ] Create database migration
- [ ] Build inbox/conversation list page (`/messages`)
- [ ] Create conversation view page (`/messages/:id`)
- [ ] Build message input component
- [ ] Implement message sending
- [ ] Add file attachment support
- [ ] Build message list component
- [ ] Implement read receipts (optional)
- [ ] Add unread message count
- [ ] Create "new message" flow (select recipient)
- [ ] Add search within conversations
- [ ] Implement message deletion
- [ ] Add message editing (optional)
- [ ] Build block user functionality
- [ ] Create group conversation UI (optional)
- [ ] Add typing indicators (optional)
- [ ] Implement real-time updates (WebSockets or polling)
- [ ] Add message reactions (optional)
- [ ] Style messaging UI (chat-like interface)

## Real-Time Implementation Options

### Option 1: Polling (Simpler for MVP)
- Poll for new messages every few seconds
- Simpler to implement
- Less real-time feel

### Option 2: WebSockets (Better UX)
- Real-time message delivery
- Typing indicators
- Online status
- More complex to implement
- Consider using libraries like Socket.io or native WebSocket

### Option 3: Server-Sent Events (SSE)
- Simpler than WebSockets
- One-way communication (server to client)
- Good for notifications

## API Endpoints Needed

```
GET /api/messages/conversations - List user's conversations
GET /api/messages/conversations/:id - Get conversation details
POST /api/messages/conversations - Create new conversation (direct or group)
GET /api/messages/conversations/:id/messages - Get messages in conversation
POST /api/messages/conversations/:id/messages - Send message
PUT /api/messages/messages/:id - Edit message
DELETE /api/messages/messages/:id - Delete message
POST /api/messages/conversations/:id/read - Mark as read
POST /api/messages/conversations/:id/members - Add member to group
DELETE /api/messages/conversations/:id/members/:userId - Remove member
POST /api/messages/block - Block user
DELETE /api/messages/block/:userId - Unblock user
GET /api/messages/unread-count - Get unread message count
```

## UI Components Needed

- `MessagesInbox` - Conversation list page
- `ConversationList` - List of conversations
- `ConversationItem` - Single conversation preview
- `ConversationView` - Active conversation view
- `MessageList` - Messages in conversation
- `MessageItem` - Single message component
- `MessageInput` - Message composition input
- `FileAttachment` - File attachment preview
- `NewMessageDialog` - Start new conversation dialog
- `BlockUserDialog` - Block user confirmation

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 002: Member Directory (for selecting message recipients)
- Feature 015: Notifications (notify on new messages)
- Feature 016: Email Notifications (email on new messages, optional)

## Notes
- Consider rate limiting to prevent spam
- File attachments should have size limits
- Blocked users should not be able to send messages
- Consider message retention policies (delete old messages)
- Privacy: users should only see their own conversations
- Real-time features enhance UX but add complexity
- Group messages are optional for MVP but valuable
- Consider adding message search across all conversations
- Mobile-responsive design is crucial for messaging

