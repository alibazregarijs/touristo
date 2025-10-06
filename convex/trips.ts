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

export const getNewestTripDetails = query({
  handler: async (ctx) => {
    const trips = await ctx.db.query('trips').order('desc').take(4);

    return trips.map((trip) => ({
      id: trip._id,
      tripDetails: trip.tripDetails,
      imageUrls: trip.imageUrls,
      creationTime: trip._creationTime,
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

export const getTripsPerMonth = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all trips
    const trips = await ctx.db.query('trips').collect();

    // Group by month using _creationTime
    const counts: Record<string, number> = {};

    for (const trip of trips) {
      const created = new Date(trip._creationTime);
      const month = created.toLocaleString('en-US', { month: 'short' }); // "Jan", "Feb", etc.
      counts[month] = (counts[month] ?? 0) + 1;
    }

    // Return as an array in month order (Jan–Dec)
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
