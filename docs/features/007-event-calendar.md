# Feature 007: Event Calendar

## Priority: MEDIUM-HIGH (Community Engagement)
## Dependencies: Feature 001 (Authentication), Feature 003 (Roles/Permissions)
## Status: 🔄 To Be Implemented

## Overview
A calendar system for scheduling and managing community events. Events can include Zoom links, descriptions, and allow members to RSVP. This helps build engagement through regular meetups, workshops, and community gatherings.

## Core Requirements

### 1. Event Management

#### Event Creation
- Create events with:
  - Title
  - Description (rich text)
  - Start date/time
  - End date/time
  - Timezone support
  - Location (physical or virtual)
  - Zoom/meeting link (for virtual events)
  - Event type (workshop, meetup, Q&A, etc.)
  - Max attendees (optional)
  - Event image/banner
  - Tags/categories

#### Event Types
- One-time events
- Recurring events (daily, weekly, monthly, custom)
- All-day events
- Multi-day events

#### Event Status
- Draft (not visible to members)
- Published (visible to all)
- Cancelled
- Completed

### 2. Calendar Views
- Month view (traditional calendar grid)
- Week view
- Day view
- List view (upcoming events)
- Agenda view

### 3. Event Features

#### RSVP System
- Members can RSVP (Yes, Maybe, No)
- RSVP count display
- Waitlist if event is full
- RSVP reminders (via Feature 016: Email Notifications)
- Check-in at event (optional)

#### Event Details
- Event detail page (`/events/:id`)
- Display:
  - Full description
  - Date/time with timezone
  - Location/Zoom link
  - Attendee list (if public)
  - Related events
  - Event organizer info

#### Event Actions
- RSVP/Change RSVP
- Add to personal calendar (iCal export)
- Share event
- Report event (for moderation)

### 4. Event Discovery
- Upcoming events list
- Past events archive
- Filter by:
  - Event type
  - Date range
  - Tags
  - Organizer
- Search events
- "My Events" page (events user is attending)

## Database Schema

```typescript
export const event = pgTable("event", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(), // Rich text
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  timezone: text("timezone").notNull(), // e.g., "America/New_York"
  location: text("location"), // Physical location
  locationType: text("location_type").$default(() => "virtual").notNull(), // 'virtual', 'physical', 'hybrid'
  meetingLink: text("meeting_link"), // Zoom, Google Meet, etc.
  meetingProvider: text("meeting_provider"), // 'zoom', 'google-meet', 'teams', etc.
  eventType: text("event_type").notNull(), // 'workshop', 'meetup', 'qna', 'webinar', etc.
  tags: text("tags").array(),
  imageKey: text("image_key"), // Event banner/image
  maxAttendees: integer("max_attendees"), // Null = unlimited
  status: text("status").$default(() => "draft").notNull(), // 'draft', 'published', 'cancelled', 'completed'
  isRecurring: boolean("is_recurring").$default(() => false).notNull(),
  recurrenceRule: text("recurrence_rule"), // iCal RRULE format
  organizerId: text("organizer_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const eventRSVP = pgTable("event_rsvp", {
  id: text("id").primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // 'yes', 'maybe', 'no'
  notes: text("notes"), // Optional notes for organizer
  checkedIn: boolean("checked_in").$default(() => false).notNull(),
  checkedInAt: timestamp("checked_in_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const eventReminder = pgTable("event_reminder", {
  id: text("id").primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  reminderType: text("reminder_type").notNull(), // 'email', 'notification'
  reminderTime: timestamp("reminder_time").notNull(), // When to send reminder
  sent: boolean("sent").$default(() => false).notNull(),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Create event and RSVP tables
- [ ] Create database migration
- [ ] Build calendar component (month/week/day views)
- [ ] Create event list page (`/events`)
- [ ] Build event detail page (`/events/:id`)
- [ ] Create event form (create/edit)
- [ ] Implement RSVP functionality
- [ ] Add recurring event support (optional for MVP)
- [ ] Build calendar view with event display
- [ ] Add event filtering and search
- [ ] Implement timezone handling
- [ ] Create "My Events" page
- [ ] Add iCal export functionality
- [ ] Build event reminder system
- [ ] Add event image upload
- [ ] Implement attendee list (if public)
- [ ] Add event sharing
- [ ] Create event moderation tools
- [ ] Add event analytics (attendance, etc.)
- [ ] Style calendar UI

## Calendar Library Options

Consider using a calendar library:
- **FullCalendar** - Popular, feature-rich
- **React Big Calendar** - Good for React
- **Calendar.js** - Lightweight
- **Custom implementation** - More control, more work

## API Endpoints Needed

```
GET /api/events - List events (with filters)
GET /api/events/:id - Get event details
POST /api/events - Create event
PUT /api/events/:id - Update event
DELETE /api/events/:id - Delete event
GET /api/events/:id/rsvps - Get RSVPs for event
POST /api/events/:id/rsvp - RSVP to event
PUT /api/events/:id/rsvp - Update RSVP
DELETE /api/events/:id/rsvp - Cancel RSVP
GET /api/events/my-events - Get user's events (attending/organizing)
GET /api/events/:id/ical - Export event as iCal
GET /api/events/calendar - Get events for calendar view (date range)
```

## UI Components Needed

- `EventCalendar` - Main calendar component
- `CalendarMonthView` - Month view
- `CalendarWeekView` - Week view
- `CalendarDayView` - Day view
- `EventList` - List of events
- `EventCard` - Event preview card
- `EventDetail` - Full event view
- `EventForm` - Create/edit event form
- `RSVPButton` - RSVP action button
- `AttendeeList` - List of attendees
- `EventFilters` - Filter sidebar

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 003: User Roles and Permissions (who can create events)
- Feature 015: Notifications (notify on event reminders, changes)
- Feature 016: Email Notifications (email reminders for events)

## Notes
- Timezone handling is critical - store events in UTC, display in user's timezone
- Recurring events can be complex - consider using iCal RRULE format
- Zoom link integration - validate links, auto-generate if possible
- Calendar views should be responsive
- Consider adding event templates for common event types
- Event reminders should be configurable (1 day before, 1 hour before, etc.)
- iCal export allows users to add events to their personal calendars
- Consider adding event waitlist if max attendees is reached
- Event check-in is optional but useful for tracking attendance

