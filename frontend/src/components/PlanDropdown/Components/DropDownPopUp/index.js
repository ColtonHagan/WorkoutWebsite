import { useState } from 'react';
import PropTypes from 'prop-types'; 
import "./index.scss";
import ErrorMessage from '../../../ErrorMessage';

/**
 * DropDownPopUp component allows the user to edit or create a workout plan.
 * The component provides functionality to handle save and delete operations.
 * 
 * @param {function} onClose - Function to close the popup.
 * @param {object} plan - The workout plan object, containing name and description.
 * @param {function} handleSave - Function to handle saving/editing the workout plan.
 * @param {function} deletePlan - Function to handle deleting the workout plan.
 * @param {boolean} isEditing - Boolean to determine whether it's edit or create mode.
 */
const DropDownPopUp = ({ onClose, plan, handleSave, deletePlan, isEditing = false }) => {
    const [name, setName] = useState(plan?.name || '');
    const [description, setDescription] = useState(plan?.name || '');
    const [errors, setErrors] = useState({});

    /**
     * Validate form input fields to ensure name and description are provided.
     */
    const validateForm = () => {
        const validationErrors = {};
        if (!name.trim()) {
            validationErrors.name = "Name is required.";
        }
        if (!description.trim()) {
            validationErrors.description = "Description is required.";
        }
        return validationErrors;
    };

    /**
     * Handle the save button click, validate the forming, and closing.
     */
    const handleSaveClick = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        handleSave(name, description);
        onClose();
    };

    const handleDeleteClick = () => {
        deletePlan(plan?.id);
        onClose();
    };

    return (
        <div className="edit-plan-container small-pop-up">
            <h1>{isEditing ? 'Edit Workout Plan' : 'Add Workout Plan'}</h1>
            <ul>
                <li>
                    <label> Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <ErrorMessage message={errors.name} />}
                </li>
                <li>
                    <label> Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <ErrorMessage message={errors.description} /> }
                </li>
                <div className="edit-buttons">
                    <button className="save-button button" onClick={handleSaveClick}>{isEditing ? 'Save' : 'Create'}</button>
                    {isEditing && <button className="delete-button button" onClick={handleDeleteClick}>Delete</button>}
                </div>
            </ul>
        </div>
    );
}

// PropTypes for type checking
DropDownPopUp.propTypes = {
    onClose: PropTypes.func.isRequired,
    plan: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
    }),
    handleSave: PropTypes.func.isRequired,
    deletePlan: PropTypes.func,
    isEditing: PropTypes.bool,
};

export default DropDownPopUp;