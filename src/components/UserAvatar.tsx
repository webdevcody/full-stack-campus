import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useAvatarImage } from "~/hooks/useAvatarImage";
import { getInitials } from "~/utils/user";

interface UserAvatarProps {
  imageKey: string | null;
  name: string | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-24 w-24",
};

export function UserAvatar({
  imageKey,
  name,
  className = "",
  size = "md",
}: UserAvatarProps) {
  const { avatarUrl } = useAvatarImage(imageKey);

  return (
    <Avatar className={`${sizeMap[size]} ${className}`}>
      <AvatarImage src={avatarUrl || undefined} alt={name || "User"} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
