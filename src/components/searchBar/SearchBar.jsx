// import React from 'react'
import PropTypes from "prop-types";
import { useState } from "react";
import styles from './SearchBar.module.css';

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
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search track name"
        value={query}
        onChange={handleChange}
      />
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
