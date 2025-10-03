import { Box, Typography, Stack, Grid } from '@mui/material';
import Header from '../../components/Header';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  console.log(params.slug[0]);
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
                className="text-white-1"
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
                className="text-white-1"
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
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
