import { FaReddit } from "react-icons/fa";
import styles from "./Subreddit.module.css";

const Subreddit = () => {
  return (
    <div className={styles.subreddits}>
      <FaReddit />
      <p>Subreddit</p>
    </div>
  );
};

export default Subreddit;
