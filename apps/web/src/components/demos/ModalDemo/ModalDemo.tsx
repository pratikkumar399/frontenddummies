'use client';

import React, { useState } from 'react'
import ModalComponent from './components/ModalComponent';
import './styles.css';

const ModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  }
  return (
    <div>
      <button className='open-modal-button'
        onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <ModalComponent isModalOpen={isModalOpen} onClose={onClose}
      >
        <div className="children-container">
          <h1>This is a Modal</h1>
          <p>This is the modal content. You can close the modal by clicking the close button or clicking outside the modal.</p>
          <button className='close-modal-button'
            onClick={() => setIsModalOpen(false)}>Close Modal</button>
        </div>
      </ModalComponent>
    </div>
  )
}

export default ModalDemo;