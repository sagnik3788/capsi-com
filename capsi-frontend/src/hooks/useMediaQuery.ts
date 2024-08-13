import { useLayoutEffect, useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = (): void => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addListener(updateMatches);
    updateMatches();

    return (): void => {
      mediaQuery.removeListener(updateMatches);
    };
  }, [query]);

  return matches;
};

const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 767px)');
};

// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//       if (typeof window !== 'undefined') {
//           // Your existing code that uses the `document` object goes here
//       }
//   }, []);

//   return isMobile;
// };

const useIsTablet = (): boolean => {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
};

// const useIsTablet = () => {
//   const [isTablet, setIsTablet] = useState(false);

//   useEffect(() => {
//       if (typeof window !== 'undefined') {
//           // Your existing code that uses the `document` object goes here
//       }
//   }, []);

//   return isTablet;
// };

const useIsLaptop = (): boolean => {
  return useMediaQuery('(min-width: 1024px)');
};

export { useIsMobile, useIsTablet, useIsLaptop };
