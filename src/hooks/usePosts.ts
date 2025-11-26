import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  recentPostsQueryOptions,
  postQueryOptions,
  userPostsQueryOptions,
} from "~/queries/posts";
import { createPostFn } from "~/fn/posts";
import { getErrorMessage } from "~/utils/error";

// Query hooks
export function useRecentPosts(enabled = true) {
  return useQuery({
    ...recentPostsQueryOptions(),
    enabled,
  });
}

export function usePost(postId: string, enabled = true) {
  return useQuery({
    ...postQueryOptions(postId),
    enabled: enabled && !!postId,
  });
}

export function useUserPosts(enabled = true) {
  return useQuery({
    ...userPostsQueryOptions(),
    enabled,
  });
}

// Mutation hooks
export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Parameters<typeof createPostFn>[0]["data"]) =>
      createPostFn({ data }),
    onSuccess: () => {
      toast.success("Post created successfully!", {
        description: "Your post has been published to the community.",
      });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      navigate({ to: "/community" });
    },
    onError: (error) => {
      toast.error("Failed to create post", {
        description: getErrorMessage(error),
      });
    },
  });
}

// Combined hook for post management
export function usePostManagement() {
  const queryClient = useQueryClient();

  const invalidatePostsData = (postId?: string) => {
    queryClient.invalidateQueries({ queryKey: ["community-posts"] });

    if (postId) {
      queryClient.invalidateQueries({ queryKey: ["community-post", postId] });
    }
  };

  const refreshPosts = () => {
    queryClient.invalidateQueries({ queryKey: ["community-posts"] });
  };

  const refreshPost = (postId: string) => {
    queryClient.invalidateQueries({ queryKey: ["community-post", postId] });
  };

  return {
    posts: useRecentPosts(),
    invalidatePostsData,
    refreshPosts,
    refreshPost,
  };
}