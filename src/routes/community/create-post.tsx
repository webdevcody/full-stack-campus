import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MessageSquarePlus, Users } from "lucide-react";
import { useCreatePost } from "~/hooks/usePosts";
import { POST_CATEGORIES } from "~/fn/posts";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { Button } from "~/components/ui/button";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const Route = createFileRoute("/community/create-post")({
  component: CreatePost,
});

const createPostSchema = z.object({
  title: z
    .string()
    .max(200, "Title must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters"),
  category: z.enum(POST_CATEGORIES),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

const CATEGORY_LABELS: Record<(typeof POST_CATEGORIES)[number], string> = {
  general: "General",
  question: "Question",
  discussion: "Discussion",
  announcement: "Announcement",
  feedback: "Feedback",
  showcase: "Showcase",
};

const CATEGORY_DESCRIPTIONS: Record<(typeof POST_CATEGORIES)[number], string> =
  {
    general: "General topics and conversations",
    question: "Ask the community for help",
    discussion: "Start a discussion on a topic",
    announcement: "Share important updates",
    feedback: "Share feedback or suggestions",
    showcase: "Show off your work",
  };

function CreatePost() {
  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "general",
    },
  });

  const createPostMutation = useCreatePost();

  const onSubmit = (data: CreatePostFormData) => {
    createPostMutation.mutate(data);
  };

  const isFormDisabled = createPostMutation.isPending;

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Community", href: "/community", icon: Users },
            { label: "Create Post" },
          ]}
        />
        <PageTitle
          title="Create Post"
          description="Share your thoughts with the community"
        />

        <div className="max-w-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isFormDisabled}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {POST_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            <div className="flex flex-col">
                              <span>{CATEGORY_LABELS[category]}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {CATEGORY_DESCRIPTIONS[field.value]}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Give your post a title (optional)"
                        className="h-11 text-base"
                        disabled={isFormDisabled}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/200 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Content *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[200px] text-base resize-none"
                        disabled={isFormDisabled}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/10000 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 pt-4 border-t border-border">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    disabled={isFormDisabled}
                    asChild
                  >
                    <Link to="/community">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isFormDisabled}
                  >
                    {createPostMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <MessageSquarePlus className="h-4 w-4 mr-2" />
                        Publish Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Page>
  );
}
