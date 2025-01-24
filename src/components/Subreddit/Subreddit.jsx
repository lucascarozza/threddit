import { FaReddit } from "react-icons/fa";
import styles from "./Subreddit.module.css";

const subreddit = {
  name: "r/EvilCats",
  img: "./public/evil-smile.jpg",
}

const Subreddit = () => {
  return (
    <div className={styles.subreddit}>
      <img src={subreddit.img} className={styles.subredditImg} />
      <p className={styles.subredditName}>{subreddit.name}</p>
    </div>
  );
};

export default Subreddit;
