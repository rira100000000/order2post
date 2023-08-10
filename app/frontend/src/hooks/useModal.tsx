import { useState } from 'react';

const useModal: any = () => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
    return true;
  };

  const closeModal = () => {
    setShow(false);
    return false;
  };

  const Modal = ({ children }: any) => {
    if (!show) return null;
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'gray',
            opacity: '0.5'
          }}
        ></div>
        <div style={{ position: 'relative', whiteSpace: 'pre-line' }}>
          {children}
        </div>
      </div>
    );
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
