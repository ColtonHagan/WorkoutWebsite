//duel functionality
import { useState } from 'react';
import "./index.scss";

const EditDropDownPopUp = ({ onClose, plan, handleSave, deletePlan, isEditing }) => {
    const [name, setName] = useState(plan?.name || '');
    const [description, setDescription] = useState(plan?.name || '');

    const handleSaveClick = () => {
        //need to check if it is empty or not
        if (isEditing) {
            handleSave(/*need to implement*/);
        } else {
            handleSave(name, description); // Assumes ID is generated elsewhere
        }
        onClose();
    };

    const handleDeleteClick = () => {
        deletePlan(plan?.id);
        onClose();
    };

    return (
        <div id="edit-plan-container">
            <h1>{isEditing ? 'Edit Workout Plan' : 'Add Workout Plan'}</h1>
            <ul>
                <li>
                    <label> Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li>
                    <label> Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </li>
                <div id="edit-buttons">
                    <button id="save-button" onClick={handleSaveClick}>{isEditing ? 'Save' : 'Create'}</button>
                    {isEditing && <button id="delete-button" onClick={handleDeleteClick}>Delete</button>}
                </div>
            </ul>
        </div>
    );
}

export default EditDropDownPopUp;