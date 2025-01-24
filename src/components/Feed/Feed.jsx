import Post from "../Post/Post";
import styles from "./Feed.module.css";

const Feed = () => {
  return (
    <section className={styles.container}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  );
};

export default Feed;
