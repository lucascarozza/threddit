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

  if (status === "loading") {
    return <div className={styles.statusMessage}>Loading...</div>;
  }

  if (status === "failed") {
    return <div className={styles.statusMessage}>Error: {error}</div>;
  }

  return (
    <section className={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Feed;
