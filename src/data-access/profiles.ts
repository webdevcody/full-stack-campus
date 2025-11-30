import { eq } from "drizzle-orm";
import { database } from "~/db";
import {
  userProfile,
  user,
  portfolioItem,
  type UserProfile,
  type CreateUserProfileData,
  type UpdateUserProfileData,
  type User,
  type PortfolioItem,
} from "~/db/schema";

export type ProfileWithUser = UserProfile & {
  user: Pick<User, "id" | "name" | "image" | "createdAt">;
};

export type PublicProfile = {
  user: Pick<User, "id" | "name" | "image" | "createdAt">;
  profile: UserProfile | null;
  portfolioItems: PortfolioItem[];
};

/**
 * Get user profile by user ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const [result] = await database
    .select()
    .from(userProfile)
    .where(eq(userProfile.id, userId))
    .limit(1);

  return result || null;
}

/**
 * Get or create user profile - ensures profile exists
 */
export async function getOrCreateUserProfile(userId: string): Promise<UserProfile> {
  const existing = await getUserProfile(userId);
  if (existing) {
    return existing;
  }

  // Create new profile
  const [newProfile] = await database
    .insert(userProfile)
    .values({
      id: userId,
      isPublic: true,
      updatedAt: new Date(),
    })
    .returning();

  return newProfile;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<UserProfile> {
  // First ensure profile exists
  await getOrCreateUserProfile(userId);

  // Then update it
  const [updated] = await database
    .update(userProfile)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userProfile.id, userId))
    .returning();

  return updated;
}

/**
 * Update user bio
 */
export async function updateUserBio(userId: string, bio: string | null): Promise<UserProfile> {
  return updateUserProfile(userId, { bio });
}

/**
 * Update user skills
 */
export async function updateUserSkills(userId: string, skills: string[]): Promise<UserProfile> {
  return updateUserProfile(userId, { skills });
}

/**
 * Get public profile with user info and portfolio items
 */
export async function getPublicProfile(userId: string): Promise<PublicProfile | null> {
  // Get user first
  const [userData] = await database
    .select({
      id: user.id,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!userData) {
    return null;
  }

  // Get profile (may not exist)
  const profile = await getUserProfile(userId);

  // Check if profile is private
  if (profile && !profile.isPublic) {
    return null;
  }

  // Get portfolio items
  const portfolioItems = await database
    .select()
    .from(portfolioItem)
    .where(eq(portfolioItem.userId, userId))
    .orderBy(portfolioItem.createdAt);

  return {
    user: userData,
    profile,
    portfolioItems,
  };
}

/**
 * Toggle profile visibility
 */
export async function toggleProfileVisibility(
  userId: string,
  isPublic: boolean
): Promise<UserProfile> {
  return updateUserProfile(userId, { isPublic });
}
