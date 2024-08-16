import ReactDOM from 'react-dom';
import CloseButton from '../../../CloseButton';
import { useState } from 'react';
import "./index.scss";

const EditDropDownPopUp = ({ onClose, plan, handleSave, deletePlan }) => {
    const [name, setName] = useState(plan?.name);
    const [description, setDescription] = useState(plan?.description);

    const handleSaveClick = () => {
        handleSave(plan?.id);
        //onClose();
    };

    const handleDeleteClick = () => {
        deletePlan(plan?.id);
        onClose();
    };

    return ReactDOM.createPortal(
        <>
            <div className='popup-overlay' />
            <div className='card-pop-up'>
                <div id="edit-plan-container">
                    <CloseButton onClick={onClose} />
                    <h1>Edit Workout Plan</h1>
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
                            <button id="save-button" onClick={handleSaveClick}>Save</button>
                            <button id="delete-button" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </ul>
                </div>
            </div>
        </>, document.getElementById('portal')
    );
}

export default EditDropDownPopUp;