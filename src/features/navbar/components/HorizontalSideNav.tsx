import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import { Logo } from './Logo';
import { VerticalNav } from './VerticalNav';

const Hamburger = styled(Button)`
  color: ${props => props.theme.textColor} !important;

  &:hover {
    color: ${props => props.theme.textColor};
  }
`;

export const HorizontalNav: FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='pt-4'>
      <div className='container d-flex justify-content-between'>
        <Logo />
        <Hamburger variant='link' aria-controls='offcanvas-navbar' onClick={handleShow}>
          <span>
            <FontAwesomeIcon icon='bars' size='2x' />
          </span>
        </Hamburger>
      </div>
      <Offcanvas id='offcanvas-navbar' className='w-auto' show={show} onHide={handleClose}>
        <VerticalNav closeVerticalNav={handleClose} />
      </Offcanvas>
    </div>
  );
};
