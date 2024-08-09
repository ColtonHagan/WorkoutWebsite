import Select from "react-select";
import "./index.scss";

const DropdownTest = () => {
    const fruitOptions = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'fig', label: 'Fig' }
    ];

    const customSingleValue = ({ data }) => (
        <div className="custom-single-value">
            <span> {data.label} </span>
            <button>Click me</button>
        </div>
    );

    return (
        <div className="dropdown-container">
            <Select
                className="dropdown"
                options={fruitOptions}
            />
        </div>
    );
};
export default DropdownTest;