import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
  Divider,
  List,
} from '@mui/material';
import Header from '../../components/Header';
import Image from 'next/image';
import MButton from '@/components/Button';
import StarRating from '@/components/Star';
import Days from './components/Days';
import { itineraryData, bestTimeVisitData, weatherData } from '@/constants';
import ClientMap from './components/ClientMap';
import ListTrips from '../components/ListTrips';
import { fetchQuery } from 'convex/nextjs';
import { auth } from '@/auth';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { ListImage } from './components/ListImage';
import {
  parseTripToTripDetails,
  getRandomNumber,
  convertItineraryToDisplayFormat,
  extractInfo,
} from '@/lib';
import { Itinerary } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const id = params.id;

  const session = await auth();
  const userId = session?.user?.id;

  const tripQuery = await fetchQuery(api.trips.getTripById, {
    tripId: id as Id<'trips'>,
  });

  const popularTripsQuery = await fetchQuery(api.trips.getRandomTripDetails);
  const popularTrips = parseTripToTripDetails(popularTripsQuery);

  const tripDetails = tripQuery ? parseTripToTripDetails([tripQuery]) : [];
  const trip = tripDetails[0];
  const formattedItinerary = convertItineraryToDisplayFormat(trip.itinerary);

  const weatherInfo = extractInfo('Weather Info:', trip.weatherInfo);
  const bestTimeToVisit = extractInfo(
    'Best Time to Visit:',
    trip.bestTimeToVisit
  );

  const rating = getRandomNumber();

  return (
    <Box>
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        href="#"
        buttonTitle="Create Trip"
      />
      <Box>
        <Box
          sx={{
            px: {
              lg: 18,
            },
            mt: {
              xs: 2,
              md: 3,
              lg: 4,
            },
          }}
        >
          <Typography
            fontWeight={'600'}
            sx={{
              fontSize: {
                xs: '20px',
                sm: '24px',
                md: '28px',
                lg: '40px',
              },
              lineHeight: {
                xs: '32px',
                sm: '36px',
                md: '40px',
                lg: '44px',
              },
            }}
            className="text-black-1 font-semibold"
          ></Typography>
          <Stack direction={'row'} spacing={2} marginTop={2}>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction={'row'}
              spacing={0.5}
            >
              <Image
                src="/icons/calendar.png"
                alt="calendar"
                width={20}
                height={20}
              />
              <Typography
                fontWeight={'400'}
                fontSize={'14px'}
                lineHeight={'16px'}
                className="text-white-2"
              >
                {`${trip.duration} Day plan`}
              </Typography>
            </Stack>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction={'row'}
              spacing={0.5}
            >
              <Image
                src="/icons/location.png"
                alt="location"
                width={20}
                height={20}
              />
              <Typography
                fontWeight={'400'}
                fontSize={'14px'}
                lineHeight={'16px'}
                className="text-white-2"
              >
                {trip.country}
              </Typography>
            </Stack>
          </Stack>
          <Grid container mt={4} spacing={2}>
            {/* Left side */}
            <ListImage
              image={trip?.imageUrls[0]!}
              doubleImage={true}
              size={{ xs: 6, sm: 6, md: 8, lg: 8 }}
            />
            {/* Right side */}
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
              <Grid container spacing={1.5}>
                {trip?.imageUrls.slice(1, 3).map((image, index) => (
                  <ListImage key={index} image={image} size={{ xs: 12 }} />
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            <MButton title={trip.travelStyle} type={trip.travelStyle} />
            <MButton title={trip.budget} type={trip.budget} />
            <MButton title={trip.groupType} type={trip.groupType} />
            <StarRating value={rating} />
            <MButton title={`${rating} / 5.0`} type="Sport" />
          </Grid>
          <Grid container spacing={1} marginTop={4}>
            <Grid justifyContent={'space-between'} size={{ xs: 12, lg: 11 }}>
              <Typography
                className="text-black-1 font-semibold"
                fontWeight={'600'}
                fontSize={'24px'}
                lineHeight={'28px'}
              >
                {trip.name}
              </Typography>
            </Grid>
            <Grid justifyContent={'space-between'} size={{ xs: 12, lg: 1 }}>
              <Typography
                fontWeight={'600'}
                fontSize={'18px'}
                lineHeight={'30px'}
                className="text-black-1 font-semibold"
              >
                {trip.estimatedPrice}
              </Typography>
            </Grid>
            <Typography className="text-white-2">{trip.interests}</Typography>
            <Typography className="text-white-2">{trip.description}</Typography>

            {/* DAYS */}
            <Box mt={4}>
              {formattedItinerary.map((day) => (
                <Days key={day.title} data={day} />
              ))}
            </Box>

            <Divider sx={{ border: '1px #E3F1FF solid', width: '100%' }} />

            {/* BEST TIME VISIT */}
            <Box mt={4}>
              {bestTimeToVisit.map((bestTimeVisit) => (
                <Days key={bestTimeVisit.title} data={bestTimeVisit} />
              ))}
            </Box>

            <Divider sx={{ border: '1px #E3F1FF solid', width: '100%' }} />

            {/* WEATHER */}
            <Box mt={4}>
              {weatherInfo.map((weather: Itinerary, index: number) => (
                <Days key={index} data={weather} />
              ))}
            </Box>
          </Grid>
          <ClientMap
            lat={trip.location.coordinates[0]}
            lng={trip.location.coordinates[1]}
          />
          <Divider sx={{ border: '1px #E3F1FF solid', width: '100%', mt: 4 }} />
          <Box mt={4}>
            <Typography
              className="text-black-1 font-semibold"
              fontWeight={'600'}
              fontSize="24px"
              mb={2}
            >
              Popular Itineraries
            </Typography>
          </Box>
        </Box>
        <Box mt={4} px={{ lg: 18 }}>
          <ListTrips trips={popularTrips} isPaginated={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
