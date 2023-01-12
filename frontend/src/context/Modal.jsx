import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} id="Modal-Provider"/>
        </>
    );
}

export function FixedModal({ onModalClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="Fixed-Modal">
            <div id="modal-background" onClick={onModalClose} />
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}

export function ImageModal({ onModalClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="Image-Modal">
            <div id="Image-modal-background" onClick={onModalClose} />
            <div id="Image-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}

export function ScrollModal({ onModalClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="Scroll-Modal">
            <div id="modal-background" onClick={onModalClose} />
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}