import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.optional(v.string()),
    username: v.string(),
    password: v.string(),
  })
    .index('by_username', ['username'])
    .index('by_email', ['email']),
});
