import {useState} from 'react'
import './index.scss';

const SearchBar = ({placeholder = 'Search...', onSearch}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className="searchBar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="searchInput"
      />
      {query && <button onClick={clearSearch} className="clearButton">X</button>} {/* Replace with icon */}
    </div>
  );
}

export default SearchBar