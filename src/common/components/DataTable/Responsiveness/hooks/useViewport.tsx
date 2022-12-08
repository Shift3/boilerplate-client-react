import React, { useEffect } from 'react';

export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const getCurrentBootstrapBreakpoint = (width: number): string => {
    let breakpoint = '';

    if (width < 576) {
      breakpoint = 'xs';
    } else if (width <= 767) {
      breakpoint = 'sm';
    } else if (width <= 991) {
      breakpoint = 'md';
    } else if (width <= 1199) {
      breakpoint = 'lg';
    } else if (width <= 1399) {
      breakpoint = 'xl';
    } else {
      breakpoint = 'xxl';
    }

    return breakpoint;
  };

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width, height, breakpoint: getCurrentBootstrapBreakpoint(width) };
};
