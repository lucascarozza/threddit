import styles from "./Subreddit.module.css";


const Subreddit = ({ subreddit }) => {
  return (
    <div className={styles.subreddit}>
      <img src="/evil-smile.jpg" className={styles.subredditImg} />
      <p className={styles.subredditName}>r/{subreddit.name}</p>
    </div>
  );
};

export default Subreddit;
