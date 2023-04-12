import { useCallback, useEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Breakpoints and Responsiveness
export const useBreakpoint = () => {
  const [size, setSize] = useState<Breakpoint>('md');
  useEffect(() => {
    const determineSize = () => {
      const width = window.innerWidth;
      if (width >= 1400) {
        setSize('xl');
      } else if (width >= 1200) {
        setSize('lg');
      } else if (width >= 992) {
        setSize('md');
      } else if (width >= 768) {
        setSize('sm');
      } else {
        setSize('xs');
      }
    };

    determineSize();

    const listener = () => {
      determineSize();
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [setSize]);

  const isLessThan = useCallback((a: Breakpoint, b: Breakpoint) => {
    const hiearchy: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return hiearchy.indexOf(a) < hiearchy.indexOf(b);
  }, []);

  return {
    breakpoint: size,
    isLessThan,
  };
};
