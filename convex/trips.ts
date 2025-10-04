import { mutation } from './_generated/server';
import { v } from 'convex/values';

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
