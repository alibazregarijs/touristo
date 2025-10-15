import { action } from './_generated/server';
import Groq from 'groq-sdk';
import { v, Infer } from 'convex/values';
import { convex } from '@/lib/Convex';
import { api } from '@/convex/_generated/api';
import type { Trip } from '@/types';
import { Id } from '@/convex/_generated/dataModel';
import { getTripJson } from '@/lib';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export type TripRecord = {
  _id: Id<'trips'>;
  _creationTime: number;
  tripDetails: string;
  imageUrls: string[];
  userId: string;
};

const countryValidator = v.object({
  code: v.string(),
  label: v.string(),
  lat: v.number(),
  lng: v.number(),
});

export type CountryOption = Infer<typeof countryValidator>;

export async function getGroqChatCompletion({ prompt }: { prompt: string }) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a professional travel planner. Respond ONLY with a valid JSON object. Do not include any markdown, code blocks, explanations, or extra text.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama-3.3-70b-versatile', // ✅ REAL Groq model
    temperature: 0.2,
    max_tokens: 3000,
  });
}

export const getTripsAction = action({
  args: {
    duration: v.number(),
    country: countryValidator,
    interest: v.string(),
    travelStyle: v.string(),
    groupType: v.string(),
    budget: v.string(),
    imageUrls: v.array(v.string()),
    userId: v.string(),
  },
  handler: async (_, args) => {
    const { duration, country, budget, interest, travelStyle, groupType } =
      args;

    // ✅ PROMPT THAT MIRRORS YOUR TARGET OUTPUT EXACTLY
    const enPrompt = `Generate a ${duration}-day travel itinerary for ${country.label}.

User preferences:
- Budget: ${budget}
- Interests: ${interest}
- Travel Style: ${travelStyle}
- Group Type: ${groupType}

Output ONLY a valid JSON object with this exact structure and style:

{
  "name": "Elegance and Art: A Luxury Cultural Journey in Iran",
  "description": "Dive into Iran's rich cultural tapestry with this luxury solo journey, exploring world-class museums and exquisite art galleries, while enjoying fine dining and opulent accommodations.",
  "estimatedPrice": "$5000",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country.label}",
  "interests": "${interest}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 Spring (March to May): Pleasant weather for exploring cultural sites and outdoor events",
    "☀️ Summer (June to August): Experience local festivals and vibrant city life",
    "🍁 Autumn (September to November): Mild temperatures and beautiful foliage, ideal for sightseeing",
    "❄️ Winter (December to February): Quiet museums and galleries with fewer crowds"
  ],
  "weatherInfo": [
    "☀️ Summer: 25-40°C (77-104°F)",
    "🌦️ Spring: 15-25°C (59-77°F)",
    "🌧️ Autumn: 10-20°C (50-68°F)",
    "❄️ Winter: 0-10°C (32-50°F)"
  ],
  "location": {
    "city": "Tehran",
    "coordinates": [${country.lat}, ${country.lng}],
    "openStreetMap": "https://www.openstreetmap.org/#map=10/${country.lat}/${country.lng}"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "Tehran",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the Golestan Palace, a UNESCO World Heritage Site"},
        {"time": "Afternoon", "description": "🖼️ Explore the Tehran Museum of Contemporary Art"},
        {"time": "Evening", "description": "🍷 Dine at Divan, a luxurious Persian restaurant"}
      ]
    }
    // ... continue with ${duration - 1} more days in the same detailed style
  ]
}

Now generate the full JSON for ${duration} days using the same tone, structure, and emoji style as above. Do not add any extra text.`;

    const faPrompt = `یک برنامه سفر ${duration} روزه برای ${country.label} ایجاد کن.

ترجیحات کاربر:
- بودجه: ${budget}
- علایق: ${interest}
- سبک سفر: ${travelStyle}
- نوع گروه: ${groupType}

خروجی باید فقط یک شیء JSON معتبر با این ساختار و سبک باشد:

{
  "name": "ظرافت و هنر: یک سفر فرهنگی لوکس در ایران",
  "description": "در این سفر لوکس انفرادی، در تار و پود فرهنگی ایران غوطه‌ور شوید، از موزه‌های جهانی و گالری‌های هنری دیدن کنید و از غذاهای عالی و اقامتگاه‌های مجلل لذت ببرید.",
  "estimatedPrice": "$5000",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country.label}",
  "interests": "${interest}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 بهار (مارس تا مه): هوای مطبوع برای بازدید از مکان‌های فرهنگی و رویدادهای فضای باز",
    "☀️ تابستان (ژوئن تا اوت): تجربه جشنواره‌های محلی و زندگی پرجنب‌وجوش شهری",
    "🍁 پاییز (سپتامبر تا نوامبر): دمای معتدل و برگ‌ریزان زیبا، مناسب برای گردش",
    "❄️ زمستان (دسامبر تا فوریه): موزه‌ها و گالری‌های خلوت با جمعیت کمتر"
  ],
  "weatherInfo": [
    "☀️ تابستان: 25-40°C (77-104°F)",
    "🌦️ بهار: 15-25°C (59-77°F)",
    "🌧️ پاییز: 10-20°C (50-68°F)",
    "❄️ زمستان: 0-10°C (32-50°F)"
  ],
  "location": {
    "city": "تهران",
    "coordinates": [${country.lat}, ${country.lng}],
    "openStreetMap": "https://www.openstreetmap.org/#map=10/${country.lat}/${country.lng}"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "تهران",
      "activities": [
        {"time": "صبح", "description": "🏰 بازدید از کاخ گلستان، یک میراث جهانی یونسکو"},
        {"time": "بعدازظهر", "description": "🖼️ بازدید از موزه هنرهای معاصر تهران"},
        {"time": "عصر", "description": "🍷 شام در دیوان، یک رستوران لوکس ایرانی"}
      ]
    }
    // ... ادامه ${duration - 1} روز دیگر به همین سبک
  ]
}

اکنون JSON کامل برای ${duration} روز را با همان لحن، ساختار و سبک ایموجی بالا تولید کن. هیچ متن اضافی اضافه نکن.`;

    const enTripsCompletion = await getGroqChatCompletion({ prompt: enPrompt });
    const faTripsCompletion = await getGroqChatCompletion({ prompt: faPrompt });

    const enTextResult =
      enTripsCompletion.choices[0]?.message?.content?.trim() || '';

    const faTextResult =
      faTripsCompletion.choices[0]?.message?.content?.trim() || '';

    if (!enTextResult || !faTextResult) {
      throw new Error('Empty response from Groq');
    }

    const enTrip = getTripJson(enTextResult);
    const faTrip = getTripJson(faTextResult);
    const trips = [enTrip, faTrip];
    // Save to Convex
    const tripId = (await convex.mutation(api.trips.addTrip, {
      tripDetails: JSON.stringify(trips),
      imageUrls: args.imageUrls,
      userId: args.userId,
    })) as TripRecord;

    const priceStr = enTrip.estimatedPrice || '$0';
    const tripPrice = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;

    await convex.mutation(api.products.addProduct, {
      name: enTrip.name || 'Untitled Trip',
      description: enTrip.description || '',
      imageUrls: args.imageUrls,
      price: tripPrice,
      tripId: tripId?._id as Id<'trips'>,
    });

    return { success: true, tripId };
  },
});
