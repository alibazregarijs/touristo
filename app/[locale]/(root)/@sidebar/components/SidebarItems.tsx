'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sidebarItems } from '@/constants';
const SidebarItems = () => {
  const pathname = usePathname();
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Box key={item.name} sx={{ mx: '10px', mt: '30px' }}>
            <Link
              href={item.href}
              className={`flex h-[50px] items-center gap-2 rounded-[10px] ${isActive ? 'bg-[#70243c] text-white hover:bg-[#5a1d30]' : 'text-white-2'} px-2! py-2 transition-colors`}
            >
              <Image
                src={isActive ? item.icon_hover : item.icon}
                alt={item.name}
                width={20}
                height={20}
              />
              <Typography
                className="text-[14px]! leading-[24px] font-semibold lg:text-[16px]!"
                component="span"
              >
                {item.name}
              </Typography>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default SidebarItems;
