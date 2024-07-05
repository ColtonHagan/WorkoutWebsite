import PropTypes from "prop-types";
import Select from "react-select";
import "./index.scss";

const PlanDropdown = ({ options, onSelect, onCreate}) => {
    const formattedOptions = options.map((option) => ({
        value: option.id,
        label: option.name,
    }));

    return (
        <Select
            className="dropdown"
            options={formattedOptions}
            onChange={(selectedOption) => onSelect(selectedOption.value)}
            placeholder="Select a workout plan"
        />
    );
}

PlanDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default PlanDropdown