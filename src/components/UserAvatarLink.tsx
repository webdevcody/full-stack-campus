import { Link } from "@tanstack/react-router";
import { UserAvatar } from "./UserAvatar";

interface UserAvatarLinkProps {
  userId: string;
  imageKey: string | null;
  name: string | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatarLink({
  userId,
  imageKey,
  name,
  className = "",
  size = "md",
}: UserAvatarLinkProps) {
  return (
    <Link
      to="/profile/$userId"
      params={{ userId }}
      className={`inline-block hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full ${className}`}
    >
      <UserAvatar imageKey={imageKey} name={name} size={size} />
    </Link>
  );
}
