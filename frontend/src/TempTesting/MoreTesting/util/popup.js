import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ onClose, workout, onUpdate }) => {
  const [reps, setReps] = useState(workout.reps);

  const handleSaveClick = () => {
    onUpdate(reps);
    onClose();
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="pop-up">
        <button onClick={onClose}>
          &times;
        </button>
        <h1>{workout.name}</h1>
        <form>
          <label>
            Reps:
            <input
              type="number"
              value={reps}
              onChange={handleRepsChange}
            />
          </label>
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('portal') // Assuming you added a div in index.html
  );
};

export default Popup;