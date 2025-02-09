import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);


    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, setSearchQuery]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search repositories..."
        className={styles.search__input}
      />
    </div>
  );
};


export default Search;
