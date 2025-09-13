import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { hash } from 'bcryptjs';

export const createUserIfNotExists = mutation({
  args: {
    email: v.string(),
    username: v.optional(v.string()),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(args.email, 'email');
    console.log(args.username, 'username');
    console.log(args.password, 'password');
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
