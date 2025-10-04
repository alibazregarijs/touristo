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
import { decodeAndClean } from '@/lib';
import ClientMap from './components/ClientMap';
import ListTrips from '../components/ListTrips';
import { popularTrips } from '@/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lat: string; lng: string }>;
}

const BUTTONS = ['Luxury', 'Beach', 'Mountain', 'Budget'];

const Page = async (props: PageProps) => {
  const params = await props.params;
  const location = decodeAndClean(params.slug[0]);
  const sp = await props.searchParams;
  const lat = parseFloat(sp.lat);
  const lng = parseFloat(sp.lng);
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
          >
            5-Day Japan Highlights: Culture, Food and Adventure
          </Typography>
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
                5 Day plan
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
                Tokyo, Kyoto, Osaka
              </Typography>
            </Stack>
          </Stack>
          <Grid container mt={4} spacing={2}>
            {/* Left side */}
            <Grid
              size={{ xs: 6, sm: 6, md: 8, lg: 8 }}
              sx={{
                position: 'relative',
                height: { xs: '207px', sm: '255px', md: '308px', lg: '308px' },
              }}
            >
              <Image
                src="/images/trip-1.png"
                alt="trip-1"
                fill
                className="rounded-[16px] object-cover"
              />
            </Grid>

            {/* Right side */}
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
              <Grid container spacing={1.5}>
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    position: 'relative',
                    height: {
                      xs: '96px',
                      sm: '120px',
                      md: '147px',
                      lg: '147px',
                    },
                  }}
                >
                  <Image
                    src="/images/trip-1.png"
                    alt="trip-1"
                    fill
                    className="rounded-[16px] object-cover"
                  />
                </Grid>
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    position: 'relative',
                    height: {
                      xs: '96px',
                      sm: '120px',
                      md: '147px',
                      lg: '147px',
                    },
                  }}
                >
                  <Image
                    src="/images/trip-1.png"
                    alt="trip-1"
                    fill
                    className="rounded-[16px] object-cover"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            {/* Category buttons */}
            {BUTTONS.map((button) => (
              <Grid size={{ xs: 6, sm: 4, lg: 2 }} key={button}>
                <MButton title={button} type={button} />
              </Grid>
            ))}

            {/* Star rating and text as two separate grid items (or combine if needed) */}
            <Grid alignContent={'center'} size={{ xs: 6, sm: 4, lg: 2 }}>
              <StarRating value={4} />
            </Grid>

            <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
              <MButton title="4.9 / 5.0" type="Sport" />
            </Grid>
          </Grid>
          <Grid container spacing={1} marginTop={4}>
            <Grid justifyContent={'space-between'} size={{ xs: 12, lg: 11 }}>
              <Typography
                className="text-black-1 font-semibold"
                fontWeight={'600'}
                fontSize={'24px'}
                lineHeight={'28px'}
              >
                5-Day Japan Adventure
              </Typography>
            </Grid>
            <Grid justifyContent={'space-between'} size={{ xs: 12, lg: 1 }}>
              <Typography
                fontWeight={'600'}
                fontSize={'18px'}
                lineHeight={'30px'}
                className="text-black-1 font-semibold"
              >
                $604
              </Typography>
            </Grid>
            <Typography className="text-white-2">
              Luxury, Diversity, and Harmony
            </Typography>
            <Typography className="text-white-2">
              Experience the best of Japan in 5 unforgettable days, traveling
              through Tokyo, Kyoto, and Osaka. From the bustling streets of
              Shibuya to the historic temples of Kyoto and the vibrant food
              scene in Osaka, this itinerary blends culture, sightseeing, and
              local flavors.
            </Typography>
            <Typography mt={2} className="text-white-2">
              Relax in a Hakone onsen, explore ancient shrines, and indulge in
              authentic Japanese cuisine—all while enjoying seamless travel on
              the Shinkansen. 🚄✨
            </Typography>

            {/* DAYS */}
            <Box mt={4}>
              {itineraryData.map((day) => (
                <Days key={day.title} data={day} />
              ))}
            </Box>

            <Divider sx={{ border: '1px #E3F1FF solid', width: '100%' }} />

            {/* BEST TIME VISIT */}
            <Box mt={4}>
              {bestTimeVisitData.map((bestTimeVisit) => (
                <Days key={bestTimeVisit.title} data={bestTimeVisit} />
              ))}
            </Box>

            <Divider sx={{ border: '1px #E3F1FF solid', width: '100%' }} />

            {/* WEATHER */}
            <Box mt={4}>
              {weatherData.map((weather) => (
                <Days key={weather.title} data={weather} />
              ))}
            </Box>
          </Grid>
          <ClientMap lat={lat} lng={lng} />
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
