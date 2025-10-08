import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const addProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrls: v.array(v.string()),
    price: v.number(),
    tripId: v.id('trips'), // Use v.string() if tripId is not a Convex document ID
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert('products', {
      name: args.name,
      description: args.description,
      imageUrls: args.imageUrls,
      price: args.price,
      tripId: args.tripId,
    });
    const product = await ctx.db.get(productId);
    return product;
  },
});
