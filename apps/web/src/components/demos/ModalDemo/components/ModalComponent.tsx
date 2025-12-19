'use client';

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import './ModalComponent.css';

interface ModalComponentProps {
    isModalOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
}

const ModalComponent = ({
    isModalOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
    closeOnEsc = true,
}: ModalComponentProps) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // ensure portal only renders on client
    useEffect(() => {
        setMounted(true);
    }, []);


    // scroll lock
    useEffect(() => {
        if (!isModalOpen || !mounted) return;


        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        }

    }, [isModalOpen, onClose, closeOnEsc, mounted])

    // focus modal content when it opens
    useEffect(() => {
        if (!isModalOpen || !mounted) return;
        modalRef.current?.focus();
    }, [isModalOpen, mounted]);


    const modalContent = (
        <div className="modal-root"
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            {/* prevent click outside to close on modal content */}
            <div className="modal-content"
                role='dialog'
                aria-modal='true'
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
            >
                {children}
            </div>
        </div>
    )


    if (!mounted || !isModalOpen) return null;

    return createPortal(
        modalContent,
        document.body
    );
}

export default ModalComponent