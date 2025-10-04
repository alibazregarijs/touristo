'use server';

import { TripFormValues } from '@/app/[locale]/(dashboard)/AI-trips/components/CreateTripForm';
import { parseMarkdownToJson, parseTripData } from '@/lib';
import OpenAI from 'openai';
import { api } from '@/convex/_generated/api';
import type { Trip } from '@/types';
import { Id } from '@/convex/_generated/dataModel';
import { ConvexHttpClient } from 'convex/browser';

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Initialize OpenRouter client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // ✅ Set in .env.local
  defaultHeaders: {
    'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000', // Optional
    'X-Title': process.env.SITE_NAME || 'Travel Planner',
  },
});

export const createTrip = async (
  prevState: TripFormValues | null,
  params: TripFormValues
) => {
  const {
    country,
    duration,
    travelStyle,
    interest,
    budget,
    groupType,
    userId,
    imageUrls,
  } = params;

  if (!country) {
    throw new Error('Country is required');
  }

  try {
    const prompt = `Generate a ${duration}-day travel itinerary for ${country.label} based on the following user information:
Budget: '${budget}'
Interests: '${interest}'
TravelStyle: '${travelStyle}'
GroupType: '${groupType}'
Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
{
  "name": "A descriptive title for the trip",
  "description": "A brief description of the trip and its highlights not exceeding 100 words",
  "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country.label}",
  "interests": "${interest}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 Season (from month to month): reason to visit",
    "☀️ Season (from month to month): reason to visit",
    "🍁 Season (from month to month): reason to visit",
    "❄️ Season (from month to month): reason to visit"
  ],
  "weatherInfo": [
    "☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)",
    "❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)"
  ],
  "location": {
    "city": "name of the city or region",
    "coordinates": [${country.lat}, ${country.lng}],
    "openStreetMap": "https://www.openstreetmap.org/#map=10/${country.lat}/${country.lng}"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    }
  ]
}`;

    // ✅ Call OpenRouter via OpenAI SDK
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o', // or 'anthropic/claude-3.5-sonnet' etc.
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error('Empty response from OpenRouter');
    }

    let trip;
    try {
      trip = parseMarkdownToJson(responseText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      throw new Error('Invalid AI response format');
    }

    const tripId = await convex.mutation(api.trips.addTrip, {
      tripDetails: JSON.stringify(trip),
      imageUrls,
      userId,
    });

    // Parse trip data to extract price
    const tripDetail = parseTripData(JSON.stringify(trip)) as Trip;
    const priceStr = tripDetail.estimatedPrice || '$0';
    const tripPrice = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;

    // Create product
    await convex.mutation(api.products.addProduct, {
      name: tripDetail.name || 'Untitled Trip',
      description: tripDetail.description || '',
      imageUrls,
      price: tripPrice,
      tripId: tripId?._id as Id<'trips'>,
    });

    return { success: true, tripId };
  } catch (e) {
    console.error('Error generating travel plan:', e);
    return { success: false, error: (e as Error).message };
  }
};
