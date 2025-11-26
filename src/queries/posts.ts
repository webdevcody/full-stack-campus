import { queryOptions } from "@tanstack/react-query";
import {
  getRecentPostsFn,
  getPostByIdFn,
  getUserPostsFn,
} from "~/fn/posts";

export const recentPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["community-posts", "recent"],
    queryFn: () => getRecentPostsFn(),
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["community-post", postId],
    queryFn: () => getPostByIdFn({ data: { id: postId } }),
  });

export const userPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["community-posts", "user"],
    queryFn: () => getUserPostsFn(),
  });