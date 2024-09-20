import { useEffect } from 'react'
import CloseButton from "../CloseButton";
import ReactDOM from 'react-dom';
import "./index.scss";

const PopUpContainer = ({ display, onClose, children }) => {

    // Hides scroll wheel of "background" when pop-up is mounted
    useEffect(() => {
        if (display) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => document.body.classList.remove('no-scroll');
    }, [display])

    if(!display) return null;

    return ReactDOM.createPortal(
        <div>
            <div className="popup-overlay" />
            <div className="pop-up">
                <CloseButton onClick={onClose} />
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    );
};

export default PopUpContainer;