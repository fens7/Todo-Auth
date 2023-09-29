import React from 'react';

import styles from './Modal.module.css';

export const Modal = ({ children, onClose, isOpen }) => {
    function closeModal(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={styles.overlay} onClick={closeModal}>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
};
