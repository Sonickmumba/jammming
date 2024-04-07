// import React from 'react'
import PropTypes from "prop-types";
import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
    setQuery("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
