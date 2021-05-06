import { FC, useState } from 'react';

export const Modal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <label htmlFor="toggle">Hello, This is a modal</label>
      <input id="toggle" onChange={(e) => setShowModal(e.target.checked)} checked={showModal} />
    </div>
  );
};
