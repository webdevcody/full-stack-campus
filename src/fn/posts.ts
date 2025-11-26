import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticatedMiddleware } from "./middleware";
import {
  createPost,
  findPostById,
  findPostByIdWithUser,
  findRecentPosts,
  findPostsByUserId,
} from "~/data-access/posts";

export const POST_CATEGORIES = [
  "general",
  "question",
  "discussion",
  "announcement",
  "feedback",
  "showcase",
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const createPostFn = createServerFn({
  method: "POST",
})
  .inputValidator(
    z.object({
      title: z
        .string()
        .max(200, "Title must be less than 200 characters")
        .optional()
        .or(z.literal("")),
      content: z
        .string()
        .min(1, "Content is required")
        .max(10000, "Content must be less than 10000 characters"),
      category: z.enum(POST_CATEGORIES).optional().default("general"),
    })
  )
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    const postData = {
      id: crypto.randomUUID(),
      title: data.title || null,
      content: data.content,
      category: data.category,
      userId: context.userId,
    };

    const newPost = await createPost(postData);
    return newPost;
  });

export const getPostByIdFn = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ id: z.string() }))
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const post = await findPostByIdWithUser(data.id);
    if (!post || post.deletedAt) {
      throw new Error("Post not found");
    }
    return post;
  });

export const getRecentPostsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    return await findRecentPosts(20);
  });

export const getUserPostsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    return await findPostsByUserId(context.userId);
  });
