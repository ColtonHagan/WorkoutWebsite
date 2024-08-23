import { useState } from "react";
import RatingStars from "react-rating-stars-component";
import ExercisePlanPopUp from "../ExercisePlanPopUp";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import "./index.scss";

const PublicPlanTable = ({ workoutPlans }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchExercises = async (planId) => {
    try {
      const response = await axiosPrivate.get(`workouts/${planId}/workout`); /* should be moved to seperate api file */
      setSelectedExercise(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlans = [...workoutPlans].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const updateRating = (newRating) => {
    //insert functionality later
  };

  return (
    <div className="public-plan-table">
      <table>
        <thead>
          <tr>
            <th
              className={sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('name')}
            >
              Name
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('description')}
            >
              Description
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'average_rating' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('average_rating')}
            >
              Rating
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('date')}
            >
              Date Updated
              <span className="sort-icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPlans.map((plan) => (
            <tr key={plan.id} onClick={
              () => {
                fetchExercises(plan.plan_id);
                setSelectedPlan(plan);
              }
            }>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>
                <div id="star-container">
                  <div
                    id="star-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RatingStars
                      count={5}
                      value={parseFloat(plan.average_rating)}
                      onChange={(newRating) => console.log(`New rating for ${plan.name}: ${newRating}`)}
                      size={24}
                      activeColor="#ffd700"
                      id="rating-stars"
                      isHalf={true}
                    />
                  </div>
                </div>
              </td>
              <td>{new Date(plan.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ExercisePlanPopUp plan={selectedPlan} exercises={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  );
};

export default PublicPlanTable;
