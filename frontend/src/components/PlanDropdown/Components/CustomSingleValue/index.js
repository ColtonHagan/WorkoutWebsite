import { components } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";

const CustomSingleValue = (props) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        props.onEditClick && props.onEditClick(props.data.value);
    };

    return (
        <components.SingleValue {...props}>
            <div id="singleValueDropdown">
                {props.formattedOptions.length > 0 ? (
                    <span>Workout Plan: {props.children}</span>
                ) : (
                    <span>Create a workout plan...</span>
                )}
                {props.formattedOptions.length > 0 && <FontAwesomeIcon icon={faPenToSquare} onMouseDown={handleEdit} id="editButton" />}
            </div>
        </components.SingleValue>
    );
};

export default CustomSingleValue;