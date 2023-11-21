import React, { useState } from 'react';

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
      <div className='absolute top-0 left-0 right-0 bottom-0 flex md:ml-0 ml-10 md:justify-center items-center'>
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-50'></div>
        <div className='relative whitespace-pre-line bg-gray-200'>
          {children}
        </div>
      </div>
    );
  };

  return { Modal, openModal, closeModal };
};

export default useModal;
