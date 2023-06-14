import React from "react";

const SearchBar = ({ searchText, onSearchChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="searchInput" className="form-label">
        Search:
      </label>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        onChange={onSearchChange}
        className="form-control"
      />
    </div>
  );
};

export default SearchBar;
