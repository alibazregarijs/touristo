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

export const latestTripsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('trips')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .order('desc')
      .take(4);
  },
});

export const getRandomTripDetails = query({
  handler: async (ctx) => {
    // Fetch a batch of trips (e.g., 20 for randomness)
    const trips = await ctx.db.query('trips').take(20);

    // Shuffle and select 4 random trips
    const shuffled = trips.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Return id, tripDetails, and imageUrls fields
    return shuffled.map((trip) => ({
      id: trip._id,
      tripDetails: trip.tripDetails,
      imageUrls: trip.imageUrls,
    }));
  },
});
