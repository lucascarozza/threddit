import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import { FaRedditAlien } from "react-icons/fa6";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <FaRedditAlien className={styles.icon} />
        <h1 className={styles.logo}>threddit</h1>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
