import React from 'react';
import { Box } from '@mui/material';
import CreateTripForm from './CreateTripForm';

const CreateTrip = () => {
  return (
    <Box
      mt={4}
      sx={{
        maxHeight: '100%', // full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '80%',
          maxWidth: 600, // optional: cap the width
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
          p: 3, // padding inside
        }}
      >
        <CreateTripForm />
      </Box>
    </Box>
  );
};

export default CreateTrip;
