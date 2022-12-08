import React from 'react';

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const CustomToggle = React.forwardRef((props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
  <a
    className='p-3 d-flex justify-content-center align-items-center'
    href=''
    ref={ref}
    onClick={e => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
    }}
  >
    {props.children}
  </a>
));
