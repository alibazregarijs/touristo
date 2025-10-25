'use server';

import { TripFormValues } from '@/types';
import { parseMarkdownToJson, parseTripData } from '@/lib';
import { api } from '@/convex/_generated/api';
import type { Trip } from '@/types';
import { Id } from '@/convex/_generated/dataModel';
import Groq from 'groq-sdk';
import { convex } from '@/lib/Convex';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

    // ✅ Call Groq instead of OpenAI
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Groq model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('Empty response from Groq');
    }

    // ✅ Parse AI response
    const trip = parseMarkdownToJson(responseText);
    if (!trip) {
      throw new Error('Invalid AI response format');
    }

    // ✅ Save trip in Convex
    const tripId = await convex.mutation(api.trips.addTrip, {
      tripDetails: JSON.stringify(trip),
      imageUrls,
      userId,
    });

    // ✅ Parse trip data to extract price
    const tripDetail = parseTripData(JSON.stringify(trip)) as unknown as Trip;
    const priceStr = tripDetail.estimatedPrice || '$0';
    const tripPrice = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;

    // ✅ Create product linked to trip
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
