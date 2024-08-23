import React from 'react'
import "./index.scss";
import { FaCirclePlus } from 'react-icons/fa6';
import { CapitalizeWords } from '../../../../../../../util/CapitalizeWords';

const AddExerciseCard = ({ exercise, onClick }) => {
  return (
    <div className='exercise' onClick={onClick}>
      {/* maybe set this once it is first recieved */}
      <img src={exercise.gifUrl} alt={exercise.name} loading='Lazy' />
      <div className='tags'>
        <p>{CapitalizeWords(exercise.bodyPart)}</p>
        <p>{CapitalizeWords(exercise.target)}</p>
      </div>
      <h1 className='ellipsis'>{CapitalizeWords(exercise.name)}</h1> 
      <button className='add-exercise-button'>
        <FaCirclePlus />
      </button>
    </div>
  )
}

export default AddExerciseCard