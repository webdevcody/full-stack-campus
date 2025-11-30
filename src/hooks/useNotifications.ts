import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  notificationsQueryOptions,
  unreadCountQueryOptions,
} from "~/queries/notifications";
import { markAsReadFn, markAllAsReadFn } from "~/fn/notifications";
import { getErrorMessage } from "~/utils/error";

// Query hooks
export function useNotifications(limit: number = 20, offset: number = 0) {
  return useQuery({
    ...notificationsQueryOptions(limit, offset),
  });
}

export function useUnreadCount() {
  return useQuery({
    ...unreadCountQueryOptions(),
  });
}

// Mutation hooks
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markAsReadFn({ data: { notificationId } }),
    onSuccess: () => {
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notification as read", {
        description: getErrorMessage(error),
      });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllAsReadFn(),
    onSuccess: (data) => {
      if (data.count > 0) {
        toast.success(`Marked ${data.count} notification${data.count > 1 ? "s" : ""} as read`);
      }
      // Invalidate notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
    onError: (error) => {
      toast.error("Failed to mark notifications as read", {
        description: getErrorMessage(error),
      });
    },
  });
}
