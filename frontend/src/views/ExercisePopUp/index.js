import ReactDom from 'react-dom'
import "./index.scss";
const ExercisePopUp = ({exercise, onClose}) => {
    console.log(exercise);
    return ReactDom.createPortal(
        <>
            <div className='popup-overlay'/>
            <div className='pop-up'>
                <h1> {exercise.name} </h1>   
                <button onClick={onClose}> Close </button>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default ExercisePopUp