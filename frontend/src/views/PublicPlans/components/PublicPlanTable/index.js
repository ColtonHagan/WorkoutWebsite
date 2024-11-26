import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import RatingStars from "react-rating-stars-component";
import ExercisePlanPopUp from "../ExercisePlanPopUp";
import CustomPaginate from "../../../../components/CustomPaginate";
import useWorkoutService from "../../../../services/useWorkoutService";
import "./index.scss";

/**
 * PublicPlanTable Component displays a table of public workout plans with sorting and pagination.
 * Users can rate plans, view exercise details, and download plans.
 * 
 * @param {Array} workoutPlans - List of workout plans to display.
 * @param {Function} setRating - Function to set the user's rating for a plan.
 * @param {Function} downloadPlan - Function to download the selected plan.
 */
const PublicPlanTable = ({ workoutPlans, setRating, downloadPlan }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { fetchWorkouts } = useWorkoutService();
  const itemsPerPage = 10;

  const fetchExercises = async (planId) => {
    try {
      const response = await fetchWorkouts(planId);
      setSelectedExercise(response);
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

  // Sorts plans either accending or decending based on user input
  const sortedPlans = useMemo(() => {
    return [...workoutPlans].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [workoutPlans, sortConfig]);

  const paginatedPlans = useMemo(() => {
    const startIndex = pageNumber * itemsPerPage;
    return sortedPlans.slice(startIndex, startIndex + itemsPerPage);
  }, [pageNumber, sortedPlans]);

  const updateRating = (id, newRating) => {
    setRating(id, newRating);
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
          {paginatedPlans.map((plan) => (
            <tr key={plan.id} onClick={() => {
              fetchExercises(plan.plan_id);
              setSelectedPlan(plan);
            }}>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>
                <div className="star-container" onClick={(e) => e.stopPropagation()}>
                  <RatingStars
                    count={5}
                    value={parseFloat(plan.user_rating || plan.average_rating)}
                    onChange={(newRating) => updateRating(plan.id, newRating)}
                    activeColor="#ffd700"
                    isHalf={true}
                  />
                </div>
              </td>
              <td>{new Date(plan.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {workoutPlans.length > itemsPerPage && <CustomPaginate
        pageCount={Math.ceil(sortedPlans.length / itemsPerPage)}
        changePage={changePage}
      />}
      <ExercisePlanPopUp plan={selectedPlan} exercises={selectedExercise} onClose={() => setSelectedExercise(null)} downloadPlan={downloadPlan} />
    </div>
  );
};

// PropTypes validation
PublicPlanTable.propTypes = {
  workoutPlans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired,
      plan_id: PropTypes.number.isRequired,
    })
  ),
  setRating: PropTypes.func.isRequired,
  downloadPlan: PropTypes.func.isRequired,
};

export default PublicPlanTable;
