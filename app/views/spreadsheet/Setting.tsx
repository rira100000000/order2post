import React from 'react';
import useModal from '../../frontend/src/hooks/useModal';

export default function Setting() {
  const { Modal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
        onClick={openModal}
      >
        設定
      </button>
      <Modal>
        <button
          className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
          onClick={closeModal}
        >
          閉じる
        </button>
      </Modal>
    </>
  );
}
