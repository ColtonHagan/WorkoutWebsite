import { components } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Can't find react-icon that has what I want
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";

/**
 * Custom Single Value component for react-select.
 *
 * This component displays the selected value in the dropdown
 * and provides an option to edit it using an edit button.
 */
const CustomSingleValue = (props) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        props.onEditClick && props.onEditClick(props.data.value);
    };

    return (
        <components.SingleValue {...props}>
            <div id="singleValueDropdown">
                {props.formattedOptions.length > 0 ? (
                    <span className="ellipsis">Workout Plan: {props.children}</span>
                ) : (
                    <span>Create a workout plan...</span>
                )}
                {props.formattedOptions.length > 0 && <FontAwesomeIcon icon={faPenToSquare} onMouseDown={handleEdit} id="editButton" aria-label="Edit workout plan"/>}
            </div>
        </components.SingleValue>
    );
};

export default CustomSingleValue;