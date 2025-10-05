import type { Trip, tripDetailsObj, Itinerary } from '@/types';

export function decodeAndClean(str: string): string {
  // Step 1: Decode URL-encoded string (e.g., %20 → space)
  let decoded = decodeURIComponent(str);

  // Step 2: Replace multiple spaces with a single space
  let cleaned = decoded.replace(/\s+/g, ' ');

  // Step 3: Trim leading/trailing spaces
  return cleaned.trim();
}

export function parseMarkdownToJson(markdownText: string): unknown | null {
  // Try to capture ```json ... ``` or ``` ... ```
  const fenceRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const fenceMatch = markdownText.match(fenceRegex);

  let jsonString: string | null = null;

  if (fenceMatch && fenceMatch[1]) {
    jsonString = fenceMatch[1].trim();
  } else {
    // Fallback: try to find the first { ... } block
    const braceRegex = /{[\s\S]*}/;
    const braceMatch = markdownText.match(braceRegex);
    if (braceMatch) {
      jsonString = braceMatch[0];
    }
  }

  if (!jsonString) {
    console.error('No valid JSON found in text.');
    return null;
  }

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error, '\nRaw string:', jsonString);
    return null;
  }
}

export function parseTripData(jsonString: string): Trip | null {
  try {
    const data: Trip = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error('Failed to parse trip data:', error);
    return null;
  }
}

export const parseTripToTripDetails = (trips: tripDetailsObj[]): Trip[] => {
  const randomTrips = trips
    .map((t) => {
      const parsed = parseTripData(t.tripDetails);
      if (!parsed) return null;

      return {
        ...parsed,
        imageUrls: t.imageUrls,
        id: t.id,
      } as Trip;
    })
    .filter((t): t is Trip => t !== null);
  return randomTrips;
};

export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 6); // 0, 1, 2, 3, 4, or 5
};

export const convertItineraryToDisplayFormat = (
  itinerary: {
    day: number;
    location: string;
    activities: { description: string }[];
  }[]
) => {
  return itinerary.map((dayPlan) => ({
    title: `Day ${dayPlan.day}: ${dayPlan.location}`,
    description: dayPlan.activities.map((activity) => ({
      paragraph: activity.description,
    })),
  }));
};

export const extractInfo = (title: string, info: string[]) => {
  const obj: Itinerary[] = [
    {
      title,
      description: info.map((i) => ({
        paragraph: i,
      })),
    },
  ];
  return obj;
};
