import { eq, desc, and, sql } from "drizzle-orm";
import { database } from "~/db";
import {
  notification,
  type Notification,
  type CreateNotificationData,
} from "~/db/schema";

export async function createNotification(
  data: CreateNotificationData
): Promise<Notification> {
  const [newNotification] = await database
    .insert(notification)
    .values({
      ...data,
    })
    .returning();

  return newNotification;
}

export async function findNotificationById(
  id: string
): Promise<Notification | null> {
  const [result] = await database
    .select()
    .from(notification)
    .where(eq(notification.id, id))
    .limit(1);

  return result || null;
}

export async function findUserNotifications(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<Notification[]> {
  const results = await database
    .select()
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

export async function countUnreadNotifications(userId: string): Promise<number> {
  const [result] = await database
    .select({ count: sql<number>`count(*)::int` })
    .from(notification)
    .where(
      and(
        eq(notification.userId, userId),
        eq(notification.isRead, false)
      )
    );

  return result?.count || 0;
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
): Promise<Notification | null> {
  const [updated] = await database
    .update(notification)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notification.id, notificationId),
        eq(notification.userId, userId)
      )
    )
    .returning();

  return updated || null;
}

export async function markAllNotificationsAsRead(
  userId: string
): Promise<number> {
  const result = await database
    .update(notification)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notification.userId, userId),
        eq(notification.isRead, false)
      )
    )
    .returning({ id: notification.id });

  return result.length;
}

export async function deleteNotification(
  notificationId: string,
  userId: string
): Promise<boolean> {
  const result = await database
    .delete(notification)
    .where(
      and(
        eq(notification.id, notificationId),
        eq(notification.userId, userId)
      )
    )
    .returning({ id: notification.id });

  return result.length > 0;
}
