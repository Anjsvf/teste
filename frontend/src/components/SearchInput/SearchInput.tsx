import React from 'react';
import { FaSearch } from 'react-icons/fa'; 
import './SearchInput.css';

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <div className="search-icon">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchInput;