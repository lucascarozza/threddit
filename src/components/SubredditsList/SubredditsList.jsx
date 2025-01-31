import styles from "./SubredditsList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../../features/subredditsSlice";
import { setCurrentSubreddit } from "../../features/feedSlice";

const SubredditsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleClick = (subredditName) => {
    dispatch(setCurrentSubreddit(subredditName));
  };

  return (
    <aside className={styles.subreddits}>
      <h2 className={styles.listTitle}>subreddits</h2>
      <div className={styles.list}>
        {status === "pending" ? (
          <div className={styles.status}>
            <p className={styles.statusText}>
              Fetching popular subreddits for you... 🚀
            </p>
          </div>
        ) : status === "failed" ? (
          <div className={styles.status}>
            <p className={styles.statusText}>
              Oops! Something went wrong. 😔 Please try again later.
            </p>
            <p className={styles.statusError}>Error: {error}</p>
          </div>
        ) : (
          list.map((subreddit) => (
            <div
              key={subreddit.id}
              onClick={() => handleClick(subreddit.name)}
              className={styles.subredditItem}
            >
              <div className={styles.subreddit}>
                <img src={subreddit.icon} className={styles.subredditImg} />
                <p className={styles.subredditName}>r/{subreddit.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default SubredditsList;
