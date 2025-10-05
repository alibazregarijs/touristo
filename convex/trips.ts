import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { query } from './_generated/server';

export const addTrip = mutation({
  args: {
    tripDetails: v.string(),
    imageUrls: v.array(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const tripId = await ctx.db.insert('trips', {
      tripDetails: args.tripDetails,
      imageUrls: args.imageUrls,
      userId: args.userId,
    });
    const trip = await ctx.db.get(tripId);
    return trip;
  },
});

export const allTripsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query('trips')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();

    return trips.map((trip) => ({
      id: trip._id,
      tripDetails: trip.tripDetails,
      imageUrls: trip.imageUrls,
    }));
  },
});

export const getRandomTripDetails = query({
  handler: async (ctx) => {
    const trips = await ctx.db.query('trips').take(20);
    const shuffled = trips.sort(() => 0.5 - Math.random()).slice(0, 3);

    return shuffled.map((trip) => ({
      id: trip._id,
      tripDetails: trip.tripDetails,
      imageUrls: trip.imageUrls,
    }));
  },
});

export const getTripById = query({
  args: { tripId: v.id('trips') },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.tripId);
    if (!trip) return null;
    return {
      id: trip._id,
      tripDetails: trip.tripDetails,
      imageUrls: trip.imageUrls,
    };
  },
});
