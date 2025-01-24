import styles from "./Post.module.css";

const subreddit = {
  name: "r/EvilCats",
  time: "30 min ago",
  img: "/evil-smile.jpg",
  postText: "evil cat smiling",
  media: "/evil-smile.jpg",
};

const Post = () => {
  const hasMedia = true;

  return (
    <div className={styles.card}>
      <div className={styles.subredditInfo}>
        <img src={subreddit.img} className={styles.subredditImg} />
        <p className={styles.subredditName}>r/EvilCats • {subreddit.time}</p>
      </div>
      <div className={styles.textArea}>
        <p className={styles.postText}>{subreddit.postText}</p>
      </div>
      {hasMedia ? (
        <div className={styles.mediaArea}>
          <figure>
            <img src={subreddit.media} className={styles.media} />
          </figure>
          <figure>
            <img src={subreddit.media} className={styles.media} />
          </figure>
          <figure>
            <img src={subreddit.media} className={styles.media} />
          </figure>
          <figure>
            <img src={subreddit.media} className={styles.media} />
          </figure>
          <figure>
            <img src={subreddit.media} className={styles.media} />
          </figure>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
