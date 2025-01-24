import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import { FaRedditAlien } from "react-icons/fa6";
// import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const isLight = true;

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <FaRedditAlien className={styles.icon} />
        <h1 className={styles.logo}>threddit</h1>
      </div>
      <div className={styles.headerRight}>
        <SearchBar />
        {/* {isLight ? <MdLightMode className={styles.themeIcon} /> : <MdDarkMode className={styles.themeIcon} />} */}
      </div>
    </header>
  );
};

export default Header;
