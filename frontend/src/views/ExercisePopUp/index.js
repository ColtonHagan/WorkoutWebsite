import React from 'react'
import ReactDom from 'react-dom'
import "./index.scss";
const ExercisePopUp = ({exercise, onClose}) => {
    return ReactDom.createPortal(
        <>
            <div className='popup-overlay'/>
            <div className='pop-up'>
                <button onClick={onClose}> Close </button>
                <h1> {exercise.name} </h1>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default ExercisePopUp