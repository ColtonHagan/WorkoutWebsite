import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useAxiosPrivate from '../../../../../../hooks/useAxiosPrivate';
import useWorkoutPlans from '../../../../../../hooks/useWorkoutPlans';
import "./index.scss";

const AddWorkoutPlanPopUp = ({ onClose }) => {
  const { setWorkoutPlans } = useWorkoutPlans();
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addPlan = async (name, description) => {
    const plan = {name, description}
    try {
      const response = await axiosPrivate.post("workouts/workoutPlans/", plan);
      const id = response.data.planId;
      console.log("Adding ", id);
      setWorkoutPlans(prevPlans => [...prevPlans, { id, name, description }]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleSave = async () => {
    await addPlan( name, description );
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="pop-up">
        <h1>Add Workout Plan</h1>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default AddWorkoutPlanPopUp;
