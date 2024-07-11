import React from 'react'
import "./index.scss";

const AddExerciseCard = ({ exercise }) => {
  return (
    <div className='exercise'>
      <h4>{exercise.name}</h4>
      <img src={exercise.gifUrl}  alt={exercise.name} loading='Lazy'/>
      <button> AddExercise </button>
    </div>
  )
}

export default AddExerciseCard