import { string, z } from "zod";

// requiredString is a string that is required and has leading/trailing whitespace removed
const requiredString = z.string().trim().min(1, "Required");

// signupSchema is a schema for sign up values
export const signupSchema = z.object({
  email: requiredString.email("Invalid email address").transform((val) => val.toLowerCase()),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, underscores, and hyphens are allowed",
  ).transform((val) => val.toLowerCase()),
  password: requiredString.min(4, "Password must be at least 4 characters"),
  confirmPassword: requiredString.min(4, "Password must be at least 4 characters"),
});

// SignUpValues is the type of values that signupSchema accepts
export type SignUpValues = z.infer<typeof signupSchema>;

// loginSchema is a schema for login values
export const loginSchema = z.object({
  email: requiredString.transform((val) => val.toLowerCase()),
  password: requiredString,
});

// LoginValues is the type of values that loginSchema accepts
export type LoginValues = z.infer<typeof loginSchema>;

// createPostSchema is a schema for creating a post
export const createPostSchema = z.object({
  content: string(),
  mediaIds: z.array(z.string()).max(3, "Cannot have more than 3 attachments"),
});

// CreatePostValues is the type of values that createPostSchema accepts
export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  profileHeadline: z.string().max(100, "Profile headline must be at most 100 characters"),
  location: z.string().max(100, "Location must be at most 100 characters"),
  bio: z.string().max(1000, "Bio must be at most 1000 characters"),
});

// UpdateUserProfileValues is the type of values that updateUserProfileSchema accepts
export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

// CreateCommentValues is the type of values that createCommentSchema accepts
export const createCommentSchema = z.object({
  content: requiredString,
})
