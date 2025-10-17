import React, { useEffect } from 'react';
import usePagination from '@mui/material/usePagination';
import { Box, Stack, Button } from '@mui/material';

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
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <Stack direction="row" spacing={1}>
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
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default Pagination;
