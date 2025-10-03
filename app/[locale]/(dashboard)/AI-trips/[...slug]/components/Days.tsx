// Days.tsx
import React from 'react';
import { ListItem, ListItemText, Box, Typography } from '@mui/material';

interface Itinerary {
  title: string;
  description: {
    paragraph: string;
  }[];
}

interface DaysProps {
  data: Itinerary; // Accept one itinerary object
}

const Days = ({ data }: DaysProps) => {
  return (
    <Box mt={2}>
      <Typography
        className="text-black-1"
        fontWeight={600}
        fontSize="18px"
        mb={2}
      >
        {data.title}
      </Typography>

      {data.description.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{ py: 0.5, alignItems: 'center' }}>
            <Box
              sx={{
                minWidth: 6,
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#141627',
                mt: 0.75,
                mr: 2,
                flexShrink: 0,
              }}
            />
            <ListItemText
              className="text-[#2E2C48]"
              primary={item.paragraph}
              primaryTypographyProps={{
                fontSize: '14px',
                lineHeight: '20px',
                whiteSpace: 'pre-line',
              }}
            />
          </ListItem>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Days;

// Keep your mock data as-is (array of one itinerary)
