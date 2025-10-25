'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sidebarItems } from '@/constants';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

const SidebarItems = ({ isDrawer }: { isDrawer?: boolean }) => {
  const isRtl = useLocale() === 'fa';
  const pathname = usePathname();
  const t = useTranslations();
  let isDrawerClass;
  if (isDrawer) {
    isDrawerClass = 'bg-[#70243c] text-white hover:bg-[#5a1d30]';
  } else {
    isDrawerClass = 'text-white-2';
  }

  return (
    <Box>
      {sidebarItems.map((item, index) => {
        const isActive = pathname === item.enHref || pathname === item.faHref;
        return (
          <Box key={item.name} sx={{ marginX: '0.5rem', paddingY: '0.5rem' }}>
            <Link
              href={item.enHref}
              className={`flex h-[50px] items-center gap-2 rounded-[10px] px-2 py-2 transition-colors ${isRtl ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'} ${
                isActive
                  ? 'bg-[#70243c] text-white hover:bg-[#5a1d30]'
                  : isDrawer
                    ? 'text-white'
                    : 'text-white-2'
              } `}
            >
              <Image
                src={
                  isDrawer
                    ? item.icon_hover
                    : isActive
                      ? item.icon_hover
                      : item.icon
                }
                alt={item.name}
                width={20}
                height={20}
              />
              <Typography
                className="text-[14px] leading-[24px] font-semibold lg:text-[16px]"
                component="span"
              >
                {t(`Sidebar.${item.name}`)}
              </Typography>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default SidebarItems;
