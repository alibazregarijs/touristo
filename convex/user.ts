import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createUserIfNotExists = mutation({
  args: {
    email: v.string(),
    username: v.optional(v.string()),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Query for existing user by email
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (existingUser !== null) {
      // User already exists, return their ID or handle as needed
      return {
        success: false,
        error: 'User already exists',
      };
    }

    // Create new user
    if (!args.username) {
      return {
        success: false,
        error: 'Username is required',
      };
    }

    const userId = await ctx.db.insert('users', {
      email: args.email,
      username: args.username,
      password: args.password,
    });
    return { success: true, userId };
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();
  },
});

export const storeOAuthUser = mutation({
  args: {
    email: v.string(),
    imageUrl: v.optional(v.string()),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists by email
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (user) {
      // Optionally update user info if needed
      await ctx.db.patch(user._id, {
        imageUrl: args.imageUrl,
        username: args.username,
      });
      return user._id;
    }

    // Insert new user (password is required by your schema, so use empty string)
    return await ctx.db.insert('users', {
      email: args.email,
      imageUrl: args.imageUrl,
      username: args.username,
      password: '',
    });
  },
});
