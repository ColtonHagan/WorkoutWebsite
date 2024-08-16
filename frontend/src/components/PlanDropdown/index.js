import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "react-select";
import "./index.scss";
import CustomSingleValue from "./Components/CustomSingleValue";
import useWorkoutPlans from "../../hooks/useWorkoutPlans";
import EditDropDownPopUp from "./Components/EditDropDownPopUp";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PlanDropdown = ({ onSelect, selectedValue }) => {
    const { workoutPlans, setWorkoutPlans } = useWorkoutPlans();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const formattedOptions = workoutPlans?.map((plan) => ({ value: plan.id, label: plan.name }));
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (workoutPlans.length > 0 && !selectedValue) {
            console.log("firing ", selectedValue);
            onSelect(formattedOptions[0]?.value);
        }
    }, [formattedOptions, workoutPlans, selectedValue]);


    const handleChange = (selectedOption) => {
        onSelect(selectedOption?.value);
    };

    const handleEditClick = (value) => {
        setSelectedPlan(workoutPlans?.find(plan => plan?.id === value));
    };

    const deletePlan = async (id) => {
        try {
            const result = await axiosPrivate.delete(`workouts/workoutPlans/${id}`);
            const deletedId = Number(result?.data?.id);
            console.log(typeof deletedId);
            deletedId && setWorkoutPlans(prevPlans => prevPlans.filter(plan => plan.id !== deletedId));
            const firstValidOption = formattedOptions?.find(option => option.value !== deletedId);
            firstValidOption && onSelect(firstValidOption.value);

        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="dropdown-container">
            <Select
                id={workoutPlans.length}
                className="dropdown"
                options={formattedOptions}
                placeholder="Create a workout plan"
                value={formattedOptions.find(option => option.value === selectedValue)}
                components={{
                    SingleValue: (props) => (
                        <CustomSingleValue {...props} onEditClick={handleEditClick} formattedOptions={formattedOptions}/>
                    )
                }}
                onChange={handleChange}
            />
            {selectedPlan && (
                <EditDropDownPopUp
                    plan={selectedPlan}
                    onClose={() => setSelectedPlan(null)}
                    deletePlan={(id) => deletePlan(id)}
                />
            )}
        </div>
    );
};

/*PlanDropdown.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedValue: PropTypes.any,
};*/

export default PlanDropdown;