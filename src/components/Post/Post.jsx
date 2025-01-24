import { FaLink } from "react-icons/fa";
import styles from "./Post.module.css";

const subreddit = {
  name: "r/EvilCats",
  time: "30 min ago",
  img: "/evil-smile.jpg",
  postTitle: "Evil cat smiling",
  postText:
    "Whiskers McSneaky's Evil Cat Smile has the whole neighborhood on edge—who knows what mischievous plot he's cooking up this time? That gleam in his eye and that up-to-no-good grin can only mean one thing: Whiskers is back at it again! #EvilCatSmile #MischiefMonday #CatPranks 😼",
  link: "https://en.wikipedia.org/wiki/Cat",
  media: "/evil-smile.jpg",
};

const Post = () => {
  const hasMedia = true;
  const hasText = true;
  const hasLink = true;

  return (
    <div className={styles.card}>
      <div className={styles.subredditInfo}>
        <img src={subreddit.img} className={styles.subredditImg} />
        <p className={styles.subredditName}>r/EvilCats • {subreddit.time}</p>
      </div>
      <div className={styles.textArea}>
        <p className={styles.postTitle}>{subreddit.postTitle}</p>
        {hasText ? <p className={styles.postText}>{subreddit.postText}</p> : ""}
      </div>

      {hasLink ? (
        <div className={styles.linkArea}>
          <a href={subreddit.link} target="_blank" className={styles.link}>
            <FaLink /> {subreddit.link}
          </a>
        </div>
      ) : (
        ""
      )}

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
