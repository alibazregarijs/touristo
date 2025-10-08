import { Grid } from '@mui/material';
import Image from 'next/image';
import { DOUBLE_IMAGE_HEIGHT, SINGLE_IMAGE_HEIGHT } from '@/constants';
import { ResponsiveValue } from '@/types';

export const ListImage = ({
  image,
  size,
  doubleImage = false,
}: {
  image: string;
  size: ResponsiveValue;
  doubleImage?: boolean;
}) => {
  const height = doubleImage ? DOUBLE_IMAGE_HEIGHT : SINGLE_IMAGE_HEIGHT;

  return (
    <Grid
      size={size}
      sx={{
        position: 'relative',
        height, // ✅ dynamic responsive height
      }}
    >
      <Image
        src={image}
        alt="trip"
        fill
        unoptimized
        loading="lazy"
        className="rounded-[16px] object-cover"
      />
    </Grid>
  );
};
