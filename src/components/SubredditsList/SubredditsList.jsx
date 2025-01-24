import Subreddit from "../Subreddit/Subreddit";
import styles from "./SubredditsList.module.css";

const SubredditsList = () => {
  return (
    <aside className={styles.subredditsList}>
      <h2 className={styles.listTitle}>subreddits</h2>
      <Subreddit />
      <Subreddit />
      <Subreddit />
      <Subreddit />
    </aside>
  );
};

export default SubredditsList;
