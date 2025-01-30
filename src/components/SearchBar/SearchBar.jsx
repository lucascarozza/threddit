import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../features/feedSlice";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    const sanitizedTerm = searchTerm.replace(/[^\w\s.,-]/gi, "").trim();
    dispatch(searchPosts(sanitizedTerm));
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <form
      className={styles.searchForm}
      name="Search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="search"
        placeholder="search"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      ></input>
      <button className={styles.searchButton}>
        <FaSearch className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
