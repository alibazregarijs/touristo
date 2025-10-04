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

  trips: defineTable({
    tripDetails: v.string(),
    imageUrls: v.array(v.string()),
    userId: v.string(),
  }).index('by_tripDetails', ['tripDetails']),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrls: v.array(v.string()),
    price: v.number(),
    tripId: v.id('trips'), // If this is a Convex document ID, use v.id("trips")
  }),
});
