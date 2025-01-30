import styles from "./SubredditsList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../../features/subredditsSlice";
import { setCurrentSubreddit } from "../../features/feedSlice";
import Subreddit from "../Subreddit/Subreddit";

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
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          list.map((subreddit) => (
            <div
              key={subreddit.id}
              onClick={() => handleClick(subreddit.name)}
              className={styles.subredditItem}
            >
              <Subreddit subreddit={subreddit} />
            </div>
          ))}
      </div>
    </aside>
  );
};

export default SubredditsList;
