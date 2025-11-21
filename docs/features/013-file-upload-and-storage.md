# Feature 013: Enhanced File Upload and Storage

## Priority: MEDIUM (Infrastructure)
## Dependencies: Feature 001 (Authentication)
## Status: ✅ Partially Implemented (needs enhancement)

## Overview
Enhanced file upload and storage system to support all content types including videos, documents, images, and attachments. The application already has storage infrastructure but needs enhancement for community features.

## Current Implementation
The application already uses:
- R2/S3 storage
- Presigned URLs
- File upload utilities

## Required Enhancements

### 1. File Type Support
- Videos (MP4, MOV, WebM, etc.)
- Documents (PDF, DOCX, PPTX, etc.)
- Images (JPG, PNG, GIF, WebP)
- Code files (for sharing)
- Archives (ZIP, RAR)

### 2. Upload Features
- Drag & drop upload
- Multiple file upload
- Progress indicators
- File size validation
- File type validation
- Image compression/resizing
- Video thumbnail generation (optional)
- Chunked uploads for large files

### 3. Storage Organization
- Organized folder structure:
  - `/content/videos/`
  - `/content/documents/`
  - `/content/images/`
  - `/attachments/`
  - `/avatars/`
- File naming conventions
- File versioning (optional)

### 4. File Management
- File metadata storage
- File access control
- File deletion
- File replacement/update
- Storage quota management (per user/plan)

## Database Schema

```typescript
// Extend existing storage or create file tracking table
export const file = pgTable("file", {
  id: text("id").primaryKey(),
  originalName: text("original_name").notNull(),
  storedName: text("stored_name").notNull(), // Storage key
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(), // Bytes
  type: text("type").notNull(), // 'video', 'document', 'image', 'attachment'
  storageProvider: text("storage_provider").$default(() => "r2").notNull(),
  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  relatedType: text("related_type"), // 'content', 'post', 'message', 'avatar'
  relatedId: text("related_id"), // ID of related entity
  metadata: json("metadata").$type<Record<string, any>>(), // Additional data (dimensions, duration, etc.)
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
```

## Implementation Tasks

- [ ] Enhance file upload component
- [ ] Add drag & drop support
- [ ] Implement multiple file upload
- [ ] Add progress indicators
- [ ] Implement file validation (size, type)
- [ ] Add image compression/resizing
- [ ] Create file organization system
- [ ] Build file management utilities
- [ ] Add storage quota checking
- [ ] Implement chunked uploads for large files
- [ ] Add file deletion functionality
- [ ] Create file metadata tracking
- [ ] Add video thumbnail generation (optional)
- [ ] Build file access control
- [ ] Style upload UI

## File Upload Component

```typescript
// src/components/FileUpload.tsx
export function FileUpload({
  accept,
  maxSize,
  multiple,
  onUpload,
}: FileUploadProps) {
  // Drag & drop handler
  // File validation
  // Upload progress
  // Error handling
}
```

## Storage Utilities Enhancement

```typescript
// src/utils/storage/index.ts
export async function uploadFile(
  file: File,
  options: {
    type: "video" | "document" | "image" | "attachment";
    relatedType?: string;
    relatedId?: string;
    compress?: boolean;
  }
): Promise<FileRecord> {
  // Validate file
  // Check storage quota
  // Compress if image
  // Upload to storage
  // Create file record
  // Return file info
}

export async function deleteFile(fileId: string): Promise<void> {
  // Delete from storage
  // Delete file record
}

export async function getFileUrl(
  fileId: string,
  expiresIn?: number
): Promise<string> {
  // Generate presigned URL
  // Check access permissions
  // Return URL
}
```

## Related Features
- Feature 001: User Authentication (prerequisite)
- Feature 004: Content Management (uses file upload)
- Feature 005: Community Forum (attachments in posts)
- Feature 006: Private Messaging (file attachments)
- Feature 002: Member Directory (avatar uploads)

## Notes
- File upload is critical for content creation
- Large files need chunked uploads
- Image compression saves storage
- File validation prevents issues
- Storage quotas prevent abuse
- Presigned URLs provide secure access
- File organization helps management
- Consider CDN for file delivery
- File versioning is optional but useful
- Video processing can be expensive (consider async processing)

