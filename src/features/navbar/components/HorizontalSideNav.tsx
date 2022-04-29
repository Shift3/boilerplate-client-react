import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Logo } from './Logo';
import { VerticalNav } from './VerticalNav';

export const HorizontalNav: FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <Logo />
        <Button aria-controls='offcanvas-navbar' onKeyDown={handleShow}>
          <span>
            <FontAwesomeIcon icon='bars' />
          </span>
        </Button>
      </div>
      <Offcanvas id='offcanvas-navbar' className='w-auto' show={show} onHide={handleClose}>
        <VerticalNav />
      </Offcanvas>
    </div>
  );
};
