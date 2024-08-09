import { useState } from "react";
import useWorkoutPlans from "../hooks/useWorkoutPlans";
import PlanDropdown from "../components/PlanDropdown";
import AddWorkoutPlanPopUp from "../views/Exercise/components/WorkoutPlans/components/AddWorkoutPlanPopUp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFetchWorkoutPlans from "../hooks/useFetchWorkoutPlans";

const TempTesting = () => {
    const { workoutPlans, setWorkoutPlans } = useWorkoutPlans();
    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    const handleAddPlan = async () => {
        if (name && description) {
            const plan = { name, description };
            try {
                const response = await axiosPrivate.post("workouts/workoutPlans/", plan);
                const id = response.data.planId;
                console.log("Adding ", id);
                setWorkoutPlans(prevPlans => [...prevPlans, { id, name, description }]);
            } catch (error) {
                console.error("Error sending data:", error);
            }
            setName(""); // Clear the input fields
            setDescription("");
        } else {
            alert("Please enter both name and description.");
        }
    };

    return (
        <div>
            <h1>Workout Plans</h1>
            <PlanDropdown />
            <ul>
                {workoutPlans.map(plan => (
                    <li key={plan.id}>{plan.name}: {plan.description}</li>
                ))}
            </ul>
            <div>
                <h2>Add New Workout Plan</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Plan Name"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Plan Description"
                />
                <button onClick={handleAddPlan}>Add Plan</button>
            </div>
            <button onClick={() => setIsPopUpVisible(true)}>popup</button>
            {isPopUpVisible && (
                <AddWorkoutPlanPopUp
                    onClose={() => {
                        setIsPopUpVisible(false);
                    }}
                />
            )}
        </div>
    );
};

export default TempTesting;
