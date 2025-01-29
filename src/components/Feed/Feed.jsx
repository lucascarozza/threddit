import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../../features/feedSlice";
import Post from "../Post/Post";
import styles from "./Feed.module.css";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, status, error, currentSubreddit } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed(currentSubreddit));
  }, [dispatch, currentSubreddit]);

  return (
    <section className={styles.container}>
      {status === "loading" ? (
        <div className={styles.status}>
          <p className={styles.statusText}>
            Hang tight! We're fetching posts for you... 🚀
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
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </section>
  );
};

export default Feed;
