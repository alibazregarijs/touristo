import React, { useEffect } from 'react';
import usePagination from '@mui/material/usePagination';
import { Box, Stack, Button } from '@mui/material';
import { useTranslations, useLocale } from 'next-intl';

type PaginationProps<T> = {
  setItemsToShow: React.Dispatch<React.SetStateAction<T[]>>;
  dataItems: T[];
  pageSize?: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

// Arrow function with generic
const Pagination = <T,>({
  setItemsToShow,
  dataItems,
  pageSize,
  page,
  setPage,
}: PaginationProps<T>) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const PER_PAGE = pageSize ? pageSize : 4; // Default to 4 if pageSize is not provided

  const count = Math.ceil(dataItems.length / PER_PAGE);

  const { items } = usePagination({
    count,
    page,
    onChange: (_e, value) => setPage(value),
  });

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const itemsToShow = dataItems.slice(start, end);

  useEffect(() => {
    setItemsToShow(itemsToShow);
  }, [page, dataItems, setItemsToShow]);

  return (
    <Box>
      <Stack
        direction={isRTL ? 'row-reverse' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {t('Pagination.previous')}
        </Button>

        <Stack direction={isRTL ? 'row-reverse' : 'row'} spacing={1}>
          {items.map(({ page: p, type, selected, ...item }, index) => {
            if (type === 'page') {
              return (
                <Button
                  key={index}
                  variant={selected ? 'contained' : 'outlined'}
                  {...item}
                >
                  {p}
                </Button>
              );
            }
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              return (
                <span key={index} style={{ padding: '0 8px' }}>
                  …
                </span>
              );
            }
            return null;
          })}
        </Stack>

        <Button
          variant="outlined"
          disabled={page === count}
          onClick={() => setPage((prev) => prev + 1)}
        >
          {t('Pagination.next')}
        </Button>
      </Stack>
    </Box>
  );
};

// Wrap with React.memo and preserve generic type
export default React.memo(Pagination) as typeof Pagination;
