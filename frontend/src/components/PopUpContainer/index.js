import React from 'react'
import CloseButton from "../CloseButton";
import ReactDOM from 'react-dom';

const PopUpContainer = ({ display, onClose, children }) => {
    if(!display) return null;
    return ReactDOM.createPortal(
        <div>
            <div className="popup-overlay" />
            <div className="card-pop-up">
                <CloseButton onClick={onClose} />
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    );
};

export default PopUpContainer;