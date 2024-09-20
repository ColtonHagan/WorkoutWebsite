import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "react-select";
import CustomSingleValue from "./Components/CustomSingleValue";
import useWorkoutPlans from "../../hooks/useWorkoutPlans";
import EditDropDownPopUp from "./Components/EditDropDownPopUp";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PopUpContainer from "../PopUpContainer";
import "./index.scss";

const PlanDropdown = ({ onSelect, selectedValue }) => {
    const { workoutPlans, setWorkoutPlans } = useWorkoutPlans();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const formattedOptions = workoutPlans?.map((plan) => ({ value: plan.id, label: plan.name }));
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (workoutPlans.length > 0 && !selectedValue) {
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
            deletedId && setWorkoutPlans(prevPlans => prevPlans.filter(plan => plan.id !== deletedId));
            const firstValidOption = formattedOptions?.find(option => option.value !== deletedId);
            firstValidOption && onSelect(firstValidOption.value);
        } catch (error) {
            console.error("Error deleting plan:", error);
        }
    };

    const handleSave = async (name, description) => {
        console.log(selectedPlan.id);
        try {
            const result = await axiosPrivate.put(`workouts/workoutPlans/${selectedPlan.id}`, { name, description });
            const newId = Number(result?.data?.id);
            console.log(result);
            newId && setWorkoutPlans(prevPlans => prevPlans.map(plan => plan.id === newId ? { ...plan, name, description } : plan));
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

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
                        <CustomSingleValue {...props} onEditClick={handleEditClick} formattedOptions={formattedOptions} />
                    )
                }}
                onChange={handleChange}
            />
            <PopUpContainer display={selectedPlan} onClose={() => setSelectedPlan(null)}>
                <EditDropDownPopUp
                    plan={selectedPlan}
                    onClose={() => setSelectedPlan(null)}
                    deletePlan={deletePlan}
                    handleSave={handleSave}
                    isEditing={true}
                />
            </PopUpContainer>
        </div>
    );
};

/*PlanDropdown.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedValue: PropTypes.any,
};*/

export default PlanDropdown;