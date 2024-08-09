import { useState } from "react";
import RatingStars from "react-rating-stars-component";
import "./index.scss";

const PublicPlanTable = ({workoutPlans}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

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
            <tr key={plan.id} onClick={() => console.log(`Clicked on ${plan.name}`)}>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>
                <RatingStars
                  count={5}
                  value={parseFloat(plan.average_rating)}
                  onChange={(newRating) => console.log(`New rating for ${plan.name}: ${newRating}`)}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                />
              </td>
              <td>{new Date(plan.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublicPlanTable;
