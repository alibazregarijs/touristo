import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface StarRatingProps {
  value: number; // 0 to 5
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  // Ensure value is between 0 and 5
  const clampedValue = Math.max(0, Math.min(5, value));
  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.5;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={i} sx={{ color: '#FFC542', fontSize: '20px' }} />
      ))}

      {/* Half star (if needed) */}
      {hasHalfStar && (
        <Box sx={{ position: 'relative', width: '20px', height: '20px' }}>
          <StarBorderIcon sx={{ color: '#E0E0E0', fontSize: '20px' }} />
          <StarIcon
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#FFC542',
              fontSize: '20px',
              clipPath: 'inset(0 50% 0 0)', // fills left half
            }}
          />
        </Box>
      )}

      {/* Empty stars */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
        (_, i) => (
          <StarBorderIcon
            key={i + fullStars + (hasHalfStar ? 1 : 0)}
            sx={{ color: '#E0E0E0', fontSize: '20px' }}
          />
        )
      )}
    </Box>
  );
};

export default StarRating;
