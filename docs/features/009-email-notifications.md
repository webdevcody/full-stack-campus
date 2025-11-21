# Feature 009: Email Notification System

## Priority: MEDIUM (Complementary to In-App)
## Dependencies: Feature 001 (Authentication), Feature 008 (Notification System)
## Status: 🔄 To Be Implemented

## Overview
An email notification system that sends automated emails to users for important events, reminders, and updates. This complements the in-app notification system and ensures users stay engaged even when not actively using the platform.

## Core Requirements

### 1. Email Types

#### Event Emails
- Event reminder (X hours/days before event)
- Event cancelled
- Event updated/changed
- RSVP confirmation
- Event starting soon (15 minutes before)

#### Forum Emails
- New reply to your post
- New reply to your comment
- Mention in post/comment (@username)
- Post accepted as answer
- Weekly digest of forum activity (optional)

#### Message Emails
- New private message received
- Daily digest of unread messages (optional)

#### Content Emails
- New content published (if user follows category)
- Content you bookmarked updated

#### Community Emails
- Welcome email (on registration)
- Weekly community digest (optional)
- Monthly activity summary (optional)

#### System Emails
- Account verification
- Password reset
- Subscription updates
- Admin announcements

### 2. Email Features

#### Email Preferences
- User can control which emails they receive
- Per-category preferences
- Frequency settings (immediate, daily digest, weekly digest)
- Unsubscribe link in all emails

#### Email Templates
- Professional, branded email templates
- Responsive HTML emails
- Plain text fallback
- Customizable branding (logo, colors)

#### Email Delivery
- Reliable email delivery service (SendGrid, Resend, AWS SES, etc.)
- Email queue system for reliability
- Retry logic for failed sends
- Bounce handling
- Unsubscribe management

## Database Schema

```typescript
// Extend notification_preference table from Feature 008
// Add email-specific preferences

export const emailLog = pgTable("email_log", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // Email type
  subject: text("subject").notNull(),
  to: text("to").notNull(),
  status: text("status").notNull(), // 'pending', 'sent', 'failed', 'bounced'
  providerId: text("provider_id"), // ID from email service
  error: text("error"), // Error message if failed
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const emailUnsubscribe = pgTable("email_unsubscribe", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type"), // Null = unsubscribe from all
  token: text("token").notNull().unique(), // For unsubscribe links
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Choose email service provider (Resend, SendGrid, AWS SES, etc.)
- [ ] Set up email service account and API keys
- [ ] Create email template system
- [ ] Design email templates (HTML + plain text)
- [ ] Build email sending service/utilities
- [ ] Create email queue system (optional, for reliability)
- [ ] Implement email sending for:
  - Event reminders
  - Forum replies
  - New messages
  - New content
  - Welcome emails
- [ ] Build email preferences page
- [ ] Add unsubscribe functionality
- [ ] Implement email logging
- [ ] Add bounce handling
- [ ] Create email digest system (daily/weekly)
- [ ] Add email preview/testing
- [ ] Style email templates

## Email Service Options

### Resend (Recommended)
- Modern, developer-friendly
- Good free tier
- React Email support
- Easy to use

### SendGrid
- Established, reliable
- Good free tier
- Comprehensive features

### AWS SES
- Very cost-effective
- Requires more setup
- Good for high volume

### Postmark
- Great deliverability
- Transactional emails focus
- More expensive

## Email Template System

Consider using:
- **React Email** - Write emails as React components
- **MJML** - HTML email framework
- **Handlebars** - Template engine
- **Plain HTML** - Simple but effective

## Email Service Implementation

```typescript
// src/utils/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  // Check user preferences
  // Send email via service
  // Log email
}

export async function sendEventReminder(
  userId: string,
  event: Event
): Promise<void> {
  // Get user preferences
  // Check if user wants event emails
  // Generate email content
  // Send email
}
```

## Email Templates Needed

- `WelcomeEmail` - Welcome new users
- `EventReminderEmail` - Event reminder
- `EventCancelledEmail` - Event cancelled
- `ForumReplyEmail` - Reply to post
- `NewMessageEmail` - New private message
- `NewContentEmail` - New content published
- `WeeklyDigestEmail` - Weekly activity digest
- `UnsubscribeEmail` - Unsubscribe confirmation

## API Endpoints Needed

```
POST /api/email/send - Send email (internal)
GET /api/email/preferences - Get email preferences
PUT /api/email/preferences - Update preferences
GET /api/email/unsubscribe/:token - Unsubscribe page
POST /api/email/unsubscribe/:token - Process unsubscribe
```

## Email Preferences UI

Create a settings page (`/settings/notifications`) with:
- Toggle switches for each email type
- Frequency settings (immediate, daily, weekly)
- Preview of email templates
- Unsubscribe all option

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 007: Event Calendar (event reminder emails)
- Feature 005: Community Forum (reply notification emails)
- Feature 006: Private Messaging (message notification emails)
- Feature 008: In-App Notifications (complementary system)

## Notes
- Email deliverability is critical - use reputable service
- Always include unsubscribe link
- Respect user preferences
- Email templates should be mobile-responsive
- Consider email rate limiting to avoid spam
- Test emails across different email clients
- Plain text fallback is important
- Email logging helps with debugging
- Bounce handling prevents sending to invalid addresses
- Consider email digests to reduce email volume
- Welcome emails improve onboarding
- Event reminder emails are crucial for attendance

