import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  createNotification,
  findUserNotifications,
  countUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "~/data-access/notifications";
import type { CreateNotificationData } from "~/db/schema";

export const getNotificationsFn = createServerFn({
  method: "GET",
})
  .inputValidator(
    z.object({
      limit: z.number().optional().default(20),
      offset: z.number().optional().default(0),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    return await findUserNotifications(context.userId, data.limit, data.offset);
  });

export const getUnreadCountFn = createServerFn({
  method: "GET",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    return await countUnreadNotifications(context.userId);
  });

export const markAsReadFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      notificationId: z.string().min(1, "Notification ID is required"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const updated = await markNotificationAsRead(data.notificationId, context.userId);
    if (!updated) {
      throw new Error("Notification not found or unauthorized");
    }
    return updated;
  });

export const markAllAsReadFn = createServerFn({
  method: "POST",
})
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const count = await markAllNotificationsAsRead(context.userId);
    return { count };
  });

// Internal function to create notifications (called from other server functions)
export async function createNotificationInternal(
  data: Omit<CreateNotificationData, "id">
): Promise<void> {
  await createNotification({
    id: crypto.randomUUID(),
    ...data,
  });
}
