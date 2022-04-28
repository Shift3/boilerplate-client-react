import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Logo } from './Logo';
import { VerticalNav } from './VerticalNav';

export const HorizontalNav: FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='d-flex justify-content-between p-3'>
        <Logo />
        <span role='button' tabIndex={0} aria-controls='offcanvas-navbar' onKeyDown={handleShow}>
          <FontAwesomeIcon icon='bars' />
        </span>
      </div>
      <Offcanvas id='offcanvas-navbar' className='w-auto' show={show} onHide={handleClose}>
        <VerticalNav />
      </Offcanvas>
    </div>
  );
};
