import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Home, Users, Plus, MessageSquare, Pin } from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { EmptyState } from "~/components/EmptyState";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { recentPostsQueryOptions } from "~/queries/posts";
import { formatRelativeTime } from "~/utils/song";
import { getInitials } from "~/utils/user";
import type { PostWithUser } from "~/data-access/posts";

export const Route = createFileRoute("/community/")({
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.ensureQueryData(recentPostsQueryOptions());
  },
  component: Community,
});

function PostCard({ post }: { post: PostWithUser }) {
  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case "question":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "discussion":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "announcement":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "feedback":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "showcase":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength).trim() + "...";
  };

  return (
    <article className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg hover:border-border/60 transition-all duration-200 group">
      <Link
        to="/community/post/$postId"
        params={{ postId: post.id }}
        className="block p-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
      >
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            {post.user.image ? (
              <AvatarImage src={post.user.image} alt={post.user.name} />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials(post.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-medium text-sm">{post.user.name}</span>
              <span className="text-muted-foreground text-xs">
                {formatRelativeTime(new Date(post.createdAt).toISOString())}
              </span>
              {post.isPinned && (
                <Badge
                  variant="secondary"
                  className="text-xs px-1.5 py-0 gap-1"
                >
                  <Pin className="h-3 w-3" />
                  Pinned
                </Badge>
              )}
            </div>

            {post.title && (
              <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
            )}

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
              {truncateContent(post.content)}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {post.category && (
                <Badge
                  variant="outline"
                  className={`text-xs capitalize ${getCategoryColor(post.category)}`}
                >
                  {post.category}
                </Badge>
              )}
              {post.isQuestion && (
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                >
                  Question
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-xl border border-border overflow-hidden shadow-sm p-5"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                <div className="h-3 bg-muted rounded w-16 animate-pulse" />
              </div>
              <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full animate-pulse" />
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 bg-muted rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Community() {
  const { data: posts, isLoading } = useQuery(recentPostsQueryOptions());

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/", icon: Home },
            { label: "Community", icon: Users },
          ]}
        />

        <div className="flex items-center justify-between">
          <PageTitle
            title="Recent Posts"
            description="Stay connected with the community"
          />
          <Button asChild>
            <Link
              to="/community/create-post"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>

        <section className="space-y-4" aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">
            Community Posts
          </h2>

          {isLoading ? (
            <PostListSkeleton count={5} />
          ) : posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MessageSquare className="h-10 w-10 text-primary/60" />}
              title="No posts yet"
              description="Be the first to share something with the community. Start a discussion, ask a question, or showcase your work."
              actionLabel="Create First Post"
              onAction={() => {
                window.location.href = "/community/create-post";
              }}
            />
          )}
        </section>
      </div>
    </Page>
  );
}
