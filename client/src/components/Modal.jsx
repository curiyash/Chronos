import React, { useEffect, useRef } from 'react';
import styles from './Modal.css';

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
    const modalRef = useRef(null);
    useEffect(
        () => {
            if (show) {
                modalRef.current.classList.add(styles.visible);
            }
            else {
                modalRef.current.classList.remove(styles.visible);
            }
        },
        [
            show
        ]
    );
    return (
        <div ref={modalRef} style={backdropStyle} className={`${styles.modal__wrap}`}>
            <button
                onClick={onClose}
                style={{ width: 60, height: 40, position: 'absolute', top: 0, right: 0, margin: '1rem' }}
                className={styles.close__btn}
            ></button>
            <button height="20px" width="20px" className={styles.close__icon}>X</button>
            <div style={modalStyle} className={styles.modal}>
                {children}
            </div>
        </div>
    );
};

export default Modal;