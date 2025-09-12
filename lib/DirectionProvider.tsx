'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useParams } from 'next/navigation';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
  direction: Direction;
  setDirection: (direction: Direction) => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined
);

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};

interface DirectionProviderProps {
  children: ReactNode;
  initialDirection: Direction;
}

export const DirectionProvider: React.FC<DirectionProviderProps> = ({
  children,
  initialDirection,
}) => {
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const params = useParams();

  // Listen for locale changes and update direction accordingly
  useEffect(() => {
    const currentLocale = params?.locale || 'en';
    const newDirection = currentLocale === 'en' ? 'ltr' : 'rtl';

    if (newDirection !== direction) {
      setDirection(newDirection);
      document.documentElement.dir = newDirection;
    }
  }, [params?.locale, direction]);

  // Update document direction when direction state changes
  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};
