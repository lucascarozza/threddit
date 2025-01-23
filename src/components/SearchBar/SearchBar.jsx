import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <form className={styles.searchForm}>
      <input
        type="search"
        placeholder="search"
        className={styles.searchInput}
      ></input>
      <button className={styles.searchButton}>
        <FaSearch className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
