import { Link } from "@tanstack/react-router";
import { UserAvatar } from "~/components/UserAvatar";
import { Card, CardContent } from "~/components/ui/card";
import type { MemberWithUser } from "~/db/schema";
import { formatRelativeTime } from "~/utils/song";

interface MemberCardProps {
  member: MemberWithUser;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="hover:shadow-lg hover:border-border/60 transition-all duration-200 group">
      <Link
        to="/profile/$userId"
        params={{ userId: member.id }}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <UserAvatar
              imageKey={member.image}
              name={member.name}
              size="lg"
              className="shrink-0"
            />
            <div className="space-y-1 w-full">
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {member.name || "Anonymous"}
              </h3>
              <p className="text-muted-foreground text-xs">
                Joined {formatRelativeTime(new Date(member.createdAt).toISOString())}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

