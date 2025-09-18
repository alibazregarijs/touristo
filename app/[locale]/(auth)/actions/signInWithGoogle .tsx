'use server';

import React from 'react';
import { signIn } from '@/auth';
import { Google } from '@mui/icons-material';
const GoogleOauth = () => {
  return (
    <div className="flex items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type="submit" className="mt-1 cursor-pointer">
          <Google />
        </button>
      </form>
    </div>
  );
};

export default GoogleOauth;
