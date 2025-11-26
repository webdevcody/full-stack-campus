import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Home, Users, MessageSquare, Clock, User } from "lucide-react";
import { Page } from "~/components/Page";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { postQueryOptions } from "~/queries/posts";
import { formatRelativeTime } from "~/utils/song";
import { getInitials } from "~/utils/user";

export const Route = createFileRoute("/community/post/$postId")({
  loader: async ({ context: { queryClient }, params: { postId } }) => {
    // Use prefetchQuery instead of ensureQueryData to avoid throwing on errors
    // The component will handle the error state
    await queryClient.prefetchQuery(postQueryOptions(postId));
  },
  component: PostDetail,
});

// Placeholder replies data
const PLACEHOLDER_REPLIES = [
  {
    id: "1",
    content:
      "This is a great discussion! I've been thinking about this topic for a while and I really appreciate you bringing it up.",
    user: {
      id: "user-1",
      name: "Alex Johnson",
      image: null,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "2",
    content:
      "I agree with your points. Here's my perspective: we should consider the broader implications and how this affects the community as a whole.",
    user: {
      id: "user-2",
      name: "Sarah Chen",
      image: null,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    content:
      "Has anyone tried implementing this approach? I'd love to hear about real-world experiences.",
    user: {
      id: "user-3",
      name: "Mike Williams",
      image: null,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "4",
    content:
      "Thanks for sharing this! I learned something new today. Looking forward to more discussions like this.",
    user: {
      id: "user-4",
      name: "Emily Davis",
      image: null,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

function getCategoryVariant(
  category: string | null
): "default" | "secondary" | "outline" {
  switch (category) {
    case "announcement":
      return "default";
    case "question":
      return "secondary";
    default:
      return "outline";
  }
}

function PostDetail() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, error } = useQuery(postQueryOptions(postId));

  const breadcrumbItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Community", href: "/community", icon: Users },
    { label: post?.title || "Post" },
  ];

  if (isLoading) {
    return (
      <Page>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </Page>
    );
  }

  if (error || !post) {
    return (
      <Page>
        <div className="text-center space-y-4 py-12">
          <h1 className="text-2xl font-bold text-destructive">
            Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/community"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Back to Community
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="space-y-8 max-w-4xl mx-auto">
        <AppBreadcrumb items={breadcrumbItems} />

        {/* Main Post */}
        <Card>
          <CardHeader className="space-y-4">
            {/* Category Badge */}
            {post.category && (
              <div>
                <Badge variant={getCategoryVariant(post.category)}>
                  {post.category}
                </Badge>
              </div>
            )}

            {/* Title */}
            {post.title && (
              <h1 className="text-3xl font-bold">{post.title}</h1>
            )}

            {/* Author and Timestamp */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {post.user.image ? (
                    <AvatarImage src={post.user.image} alt={post.user.name || "User"} />
                  ) : null}
                  <AvatarFallback>
                    {getInitials(post.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.user.name || "Anonymous"}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatRelativeTime(
                        new Date(post.createdAt).toISOString()
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Post Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {post.content}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              Replies ({PLACEHOLDER_REPLIES.length})
            </h2>
          </div>

          <div className="space-y-4">
            {PLACEHOLDER_REPLIES.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-8 w-8 shrink-0">
                      {reply.user.image ? (
                        <AvatarImage
                          src={reply.user.image}
                          alt={reply.user.name}
                        />
                      ) : null}
                      <AvatarFallback className="text-xs">
                        {getInitials(reply.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {reply.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{reply.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Placeholder for reply form */}
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="h-5 w-5" />
                <p className="text-sm">Reply functionality coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
}
