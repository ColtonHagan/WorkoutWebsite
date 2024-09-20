import { useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import './index.scss';

const SearchBar = ({ placeholder = 'Search...', onSearch }) => {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="searchBar"> {/*maybe replace with react-select*/}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="searchInput"
      />
      {query && (
        <button onClick={clearSearch} className="clearButton">
          <FaTimes />
        </button>
      )}
    </div>
  );
}

export default SearchBar