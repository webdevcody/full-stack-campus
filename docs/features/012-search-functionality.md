# Feature 012: Global Search Functionality

## Priority: MEDIUM (User Experience)
## Dependencies: Feature 001 (Authentication), Feature 004 (CMS), Feature 005 (Forum), Feature 002 (Members)
## Status: 🔄 To Be Implemented

## Overview
A comprehensive search system that allows users to search across all content types including forum posts, content items, members, events, and more. This is essential for helping users find what they're looking for.

## Core Requirements

### 1. Search Scope
- Forum posts (title, content)
- Forum comments
- Content items (videos, documents)
- Members (name, bio, skills)
- Events (title, description)
- All content types combined

### 2. Search Features

#### Search Interface
- Global search bar (header)
- Search results page (`/search?q=query`)
- Advanced search filters
- Search suggestions/autocomplete
- Recent searches (optional)

#### Search Results
- Grouped by content type
- Highlighted search terms
- Relevance sorting
- Pagination
- Result counts per type
- "No results" handling

#### Advanced Search
- Filter by content type
- Filter by date range
- Filter by author
- Filter by category
- Sort by relevance, date, popularity

### 3. Search Performance
- Fast search results
- Full-text search capability
- Search indexing
- Search result caching (optional)

## Database Schema

```typescript
// Consider adding full-text search indexes
// PostgreSQL has built-in full-text search support

// Add search indexes to existing tables:
// - forum_post (title, content)
// - content (title, description)
// - user (name, bio)
// - event (title, description)

// Optional: Search history table
export const searchHistory = pgTable("search_history", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
  resultCount: integer("result_count"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Options

### Option 1: PostgreSQL Full-Text Search (Recommended for MVP)
- Built into PostgreSQL
- No additional services needed
- Good performance for moderate scale
- Supports ranking and relevance

### Option 2: External Search Service
- **Algolia** - Fast, hosted, expensive
- **Meilisearch** - Open source, self-hostable
- **Elasticsearch** - Powerful, complex
- **Typesense** - Fast, open source

### Option 3: Hybrid
- PostgreSQL for basic search
- External service for advanced features

## Implementation Tasks

- [ ] Set up full-text search indexes (PostgreSQL)
- [ ] Create search service/utilities
- [ ] Build global search bar component
- [ ] Create search results page
- [ ] Implement search across:
  - Forum posts
  - Content items
  - Members
  - Events
- [ ] Add search result highlighting
- [ ] Build advanced search filters
- [ ] Add search autocomplete/suggestions
- [ ] Implement search result grouping
- [ ] Add search history (optional)
- [ ] Style search UI
- [ ] Add search analytics (popular searches)

## Search Service Implementation

```typescript
// src/utils/search.ts
export async function search(query: string, options: {
  types?: string[]; // Content types to search
  limit?: number;
  offset?: number;
}): Promise<SearchResults> {
  // Search across all content types
  // Return grouped results
}

export async function searchPosts(query: string): Promise<Post[]> {
  // Full-text search on forum posts
}

export async function searchContent(query: string): Promise<Content[]> {
  // Full-text search on content
}

export async function searchMembers(query: string): Promise<User[]> {
  // Search members by name, bio, skills
}

export async function searchEvents(query: string): Promise<Event[]> {
  // Search events
}
```

## PostgreSQL Full-Text Search Example

```sql
-- Add full-text search column to forum_post
ALTER TABLE forum_post ADD COLUMN search_vector tsvector;

-- Create index
CREATE INDEX forum_post_search_idx ON forum_post USING gin(search_vector);

-- Update search vector on insert/update
CREATE TRIGGER forum_post_search_update BEFORE INSERT OR UPDATE ON forum_post
FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(search_vector, 'pg_catalog.english', title, content);

-- Search query
SELECT * FROM forum_post
WHERE search_vector @@ plainto_tsquery('english', 'search query')
ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'search query')) DESC;
```

## API Endpoints Needed

```
GET /api/search?q=query - Global search
GET /api/search/posts?q=query - Search posts
GET /api/search/content?q=query - Search content
GET /api/search/members?q=query - Search members
GET /api/search/events?q=query - Search events
GET /api/search/suggestions?q=query - Get search suggestions
GET /api/search/history - Get search history (optional)
```

## UI Components Needed

- `SearchBar` - Global search input
- `SearchResults` - Search results page
- `SearchResultGroup` - Grouped results by type
- `SearchResultItem` - Single result item
- `SearchFilters` - Advanced search filters
- `SearchSuggestions` - Autocomplete dropdown

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 004: Content Management (search content)
- Feature 005: Community Forum (search posts)
- Feature 002: Member Directory (search members)
- Feature 007: Event Calendar (search events)

## Notes
- Search is important for user experience
- Full-text search in PostgreSQL is good for MVP
- Consider external search service for scale
- Search suggestions improve UX
- Search analytics help understand user needs
- Highlighting search terms helps users find results
- Consider adding search filters for better results
- Search performance is critical
- Consider search result caching
- Mobile search should be easy to use

