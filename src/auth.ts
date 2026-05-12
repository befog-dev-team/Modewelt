import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic"; // import the Google class from the Arctic library
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./lib/prisma";
import { Role } from "@prisma/client";

// Create a new Prisma adapter
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Create a new Lucia instance
export const lucia = new Lucia(adapter, {
  sessionCookie: { // session cookie configuration
    expires: false, // session cookie never expires
    attributes: { // session cookie attributes
      secure: process.env.NODE_ENV === "production", // secure cookie in production
    },
  },

  // Get the user attributes from the database user attributes
  getUserAttributes(databaseUserAttributes) {
    return { // return the user attributes
      id: databaseUserAttributes.id, // user id
      username: databaseUserAttributes.username, // username
      email: databaseUserAttributes.email, // email
      displayName: databaseUserAttributes.displayName, // display name
      phone: databaseUserAttributes.phone, // phone number
      backgroundImageUrl: databaseUserAttributes.backgroundImageUrl, // background image URL
      avatarUrl: databaseUserAttributes.avatarUrl, // avatar URL
      googleId: databaseUserAttributes.googleId, // Google ID
      profileHeadline: databaseUserAttributes.profileHeadline, // profile headline
      profileHeadlineLink: databaseUserAttributes.profileHeadlineLink, // profile headline link
      bio: databaseUserAttributes.bio, // bio
      totalProfileViews: databaseUserAttributes.totalProfileViews, // total profile views
      totalLikes: databaseUserAttributes.totalLikes, // total likes
      totalComments: databaseUserAttributes.totalComments, // total comments
      totalShares: databaseUserAttributes.totalShares, // total shares
      totalFollowers: databaseUserAttributes.totalFollowers, // total followers
      totalFollowing: databaseUserAttributes.totalFollowing, // total following
      totalPosts: databaseUserAttributes.totalPosts, // total posts
      totalSearchAppearances: databaseUserAttributes.totalSearchAppearances, // total search appearances
      role: databaseUserAttributes.role, // role
    };
  },
});

// Extend the Register interface
declare module "lucia" { // declare module for Lucia
  interface Register { // Register interface
    Lucia: typeof lucia; // add the Lucia instance to the Register interface
    DatabaseUserAttributes: DatabaseUserAttributes; // add the DatabaseUserAttributes interface to the Register interface
  }
}

// Database user attributes
interface DatabaseUserAttributes {
  id: string; // user id
  email: string | null; // email
  username: string; // username
  displayName: string; // display name
  backgroundImageUrl: string | null; // background image URL
  avatarUrl: string | null; // avatar URL
  phone: string | null; // phone number
  googleId: string | null; // Google ID
  profileHeadline: string | null; // profile headline
  bio: string | null; // bio
  profileHeadlineLink: string | null; // profile headline link
  totalProfileViews: number; // total profile views
  totalFollowers: number; // total followers
  totalFollowing: number; // total following
  totalLikes: number; // total likes
  totalComments: number; // total comments
  totalShares: number; // total shares
  totalPosts: number; // total posts
  totalSearchAppearances: number; // total search appearances
  role: Role; // role
}

// Google OAuth configuration
export const google = new Google( // create a new Google instance
  process.env.GOOGLE_CLIENT_ID!, // Google client ID
  process.env.GOOGLE_CLIENT_SECRET!, // Google client secret
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`, // Google callback URL
);

export const validateRequest = cache(async (): Promise<
  { user: User & { role: Role }; session: Session } | { user: null; session: null }
> => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch { }

  if (result.user) {
    const user = await prisma.user.findUnique({
      where: { id: result.user.id },
      select: { role: true }, // Fetch the role
    });

    if (!user) return { user: null, session: null };

    return {
      user: { ...result.user, role: user.role }, // Include the role
      session: result.session,
    };
  }

  return result;
});