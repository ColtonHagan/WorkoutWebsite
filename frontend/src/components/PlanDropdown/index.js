import PropTypes from "prop-types";
import { useEffect } from "react";
import Select from "react-select";
import "./index.scss";
import useWorkoutPlans from "../../hooks/useWorkoutPlans";

const PlanDropdown = ({ onSelect, selectedValue }) => {
    const { workoutPlans } = useWorkoutPlans();

    const formattedOptions = workoutPlans?.map((plan) => ({ value: plan.id, label: plan.name }));

    useEffect(() => {
        if (workoutPlans.length > 0 && !selectedValue) {
            onSelect(formattedOptions[0]?.value);
        }
    }, [formattedOptions, workoutPlans, selectedValue]);


    const handleChange = (selectedOption) => {
        onSelect(selectedOption?.value);
    };

    /*const customSingleValue = ({ data }) => (
        <div className="custom-single-value">
            <span>Workout Plan: </span>
            <span>{data.label}</span>
        </div>
    );*/

    return (
        <div className="dropdown-container">
            {/*<label> Workout Plan: </label>*/}
             <Select
                className="dropdown"
                options={formattedOptions}
                placeholder="Create a workout plan"
                value={formattedOptions.find(option => option.value === selectedValue)}
                onChange={handleChange}
            />
        </div>
    );
};

/*PlanDropdown.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedValue: PropTypes.any,
};*/

export default PlanDropdown;