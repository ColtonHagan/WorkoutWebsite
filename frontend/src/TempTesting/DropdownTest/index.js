import { useRef } from 'react';
import Select, { components } from 'react-select';
import './index.scss';

const CustomValueContainer = (props) => {
    const buttonRef = useRef(null);
    const handleEditClick = (e) => {
        e.stopPropagation();
        alert('Edit clicked');
    };

    return (
        <components.ValueContainer {...props}>
            <div className="test">
                {props.children}
                {
                    <button className="edit-button" onClick={handleEditClick} ref={buttonRef}>
                        Edit
                    </button>
                }
            </div>
        </components.ValueContainer>
    );
};

// Custom SingleValue component with Edit and Delete buttons
const CustomSingleValue = (props) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        console.log('Edit clicked:', props.data.value);
    };


    return (
        <components.SingleValue {...props}>
            <div className="test">
                <span>{props.children}</span>
                <div>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </components.SingleValue>
    );
};

// Custom Option component with Edit and Delete buttons
const CustomOption = (props) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        console.log('Edit clicked:', props.data.value);
    };


    return (
        <components.Option {...props}>
            <div className="test">
                <span>{props.children}</span>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </components.Option>
    );
};

const DropdownTest = () => {
    const option = [
        { value: "Spring", label: "Spring" },
        { value: "Summer", label: "Summer" },
        { value: "Autumn", label: "Autumn" },
        { value: "Winter", label: "Winter" }
    ];

    return (
        <div className="dropdown-container">
            <Select
                className="dropdown"
                options={option}
                components={{ SingleValue: CustomSingleValue, Option: CustomOption}}
            />
        </div>
    );
};

export default DropdownTest;