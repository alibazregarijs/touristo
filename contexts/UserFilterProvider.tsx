'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type FilterOption =
  | 'NAME'
  | 'EMAIL ADDRESS'
  | 'DATE JOINED'
  | 'ITINERARY CREATED'
  | 'STATUS';

export type FilterState = {
  sortOrder: 'asc' | 'desc';
  sortOption: FilterOption;
};

type FilterContextType = {
  filters: FilterState;
  setSort: (value: FilterState) => void;
};

const UserFilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export function UserFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    sortOrder: 'asc',
    sortOption: 'NAME',
  });

  const setSort = ({ sortOrder, sortOption }: FilterState) => {
    setFilters({ sortOrder, sortOption });
  };

  return (
    <UserFilterContext.Provider value={{ filters, setSort }}>
      {children}
    </UserFilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(UserFilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
