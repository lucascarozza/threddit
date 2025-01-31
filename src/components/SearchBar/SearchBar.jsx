// Styles imports
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
// React imports
import { useState } from "react";
// Redux imports
import { useDispatch } from "react-redux";
import { searchPosts } from "../../features/feedSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    const sanitizedTerm = searchTerm.replace(/[^\w\s.,-]/gi, "").trim();
    if (sanitizedTerm) {
      dispatch(searchPosts(sanitizedTerm));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form className={styles.searchForm} name="Search" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="search"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      ></input>
      <button type="button" className={styles.searchButton} title="Search">
        <FaSearch className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
