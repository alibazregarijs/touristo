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
        error: 'signUpUserExistError',
      };
    }

    // Create new user
    if (!args.username) {
      return {
        success: false,
        error: 'usernameRequired',
      };
    }

    const userId = await ctx.db.insert('users', {
      email: args.email,
      username: args.username,
      password: args.password,
      lastSeen: Date.now(),
      online: true,
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
      lastSeen: Date.now(),
      online: true,
    });
  },
});

export const getUsersPerMonth = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all users
    const users = await ctx.db.query('users').collect();

    // Group by month (assuming _creationTime is available on each doc)
    const counts: Record<string, number> = {};

    for (const user of users) {
      const created = new Date(user._creationTime);
      const month = created.toLocaleString('en-US', { month: 'short' }); // "Jan", "Feb", etc.
      counts[month] = (counts[month] ?? 0) + 1;
    }

    // Return as an array in month order (example: Jan–Dec)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months.map((m) => counts[m] ?? 0);
  },
});

export const updateUserById = mutation({
  args: {
    userId: v.id('users'), // Convex doc ID for the "users" table
    email: v.optional(v.string()),
    online: v.optional(v.boolean()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...fields } = args;

    // Remove undefined values so we only patch provided fields
    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    // Apply the patch
    await ctx.db.patch(userId, updates);

    // Return the updated user
    return await ctx.db.get(userId);
  },
});

export const getOnlineUsersCount = query({
  args: {},
  handler: async (ctx) => {
    const onlineUsers = await ctx.db
      .query('users')
      .withIndex('by_online', (q) => q.eq('online', true))
      .collect();

    return onlineUsers.length; // just the number
  },
});
