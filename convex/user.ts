import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';
import type { LatestUserSignupsType } from '@/types';

export const createUserIfNotExists = mutation({
  args: {
    email: v.string(),
    username: v.optional(v.string()),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Query for existing user by email
    const now = Date.now();
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
      dateJoined: now,
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

export const getLatestUsers = query({
  args: {},
  handler: async (ctx): Promise<LatestUserSignupsType[]> => {
    // Get the 4 newest users
    const latestUsers = await ctx.db
      .query('users')
      .withIndex('by_creation_time')
      .order('desc')
      .take(4);

    // For each user, count their trips
    const enriched = await Promise.all(
      latestUsers.map(async (user) => {
        const trips = await ctx.db
          .query('trips')
          .filter((q) => q.eq(q.field('userId'), user._id.toString()))
          .collect();

        return {
          _id: user._id,
          _creationTime: user._creationTime,
          imageUrl: user.imageUrl,
          email: user.email,
          username: user.username,
          lastSeen: user.lastSeen,
          online: user.online,
          countOfItineraryCreated: trips.length,
        };
      })
    );

    return enriched;
  },
});

export const getUserGrowth = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();

    // group by month
    const counts: Record<string, number> = {};

    users.forEach((u) => {
      const date = new Date(u._creationTime); // Convex gives ms timestamp
      const month = date.toLocaleString('en-US', { month: 'short' }); // "Jan", "Feb", ...
      counts[month] = (counts[month] || 0) + 1;
    });

    // turn into array
    const result = Object.entries(counts).map(([month, users]) => ({
      month,
      users,
    }));

    // sort by calendar order
    const monthOrder = [
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
    result.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    return result;
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all users
    const users = await ctx.db.query('users').collect();

    // For each user, also count their trips
    const results = await Promise.all(
      users.map(async (user) => {
        const trips = await ctx.db
          .query('trips')
          .filter((q) => q.eq(q.field('userId'), user._id))
          .collect();

        console.log(user._creationTime, 'creationTime');

        return {
          name: user.username,
          email_address: user.email,
          // ⚠️ You don’t have a `createdAt` field yet, so this uses `lastSeen` as a placeholder
          date_joined: new Date(user.dateJoined!).toISOString().split('T')[0],
          itinerary_created: trips.length.toString(),
          status: 'user', // static unless you add a role field
          image: user.imageUrl || '/images/user-profile.png',
        };
      })
    );

    return results;
  },
});
