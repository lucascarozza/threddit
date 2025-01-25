import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import styles from "./Post.module.css";

const subreddit = {
  name: "r/EvilCats",
  time: "30 min ago",
  img: "/evil-smile.jpg",
  postTitle: "Evil orange car on Zoom call",
  postText:
    "My car just made an appearance on my Zoom call, looking like it's plotting world domination. Never seen an orange car look so mischievous with those back ears! 😂 #ZoomBomb #EvilFace",
  link: "https://en.wikipedia.org/wiki/Cat",
  media: [
    "/silly-orange.jpg",
    "/evil-smile2.gif",
    "/silly-cat2.jpg",
    "silly-cat3.jpg",
  ],
};

const Post = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSrc, setFullscreenSrc] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setFullscreenSrc(subreddit.media[index]);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextImage = (event) => {
    event.stopPropagation();
    const newIndex = (currentIndex + 1) % subreddit.media.length;
    setCurrentIndex(newIndex);
    setFullscreenSrc(subreddit.media[newIndex]);
  };

  const prevImage = (event) => {
    event.stopPropagation();
    const newIndex =
      (currentIndex - 1 + subreddit.media.length) % subreddit.media.length;
    setCurrentIndex(newIndex);
    setFullscreenSrc(subreddit.media[newIndex]);
  };

  return (
    <div className={styles.card}>
      {isFullscreen && (
        <div className={styles.fullscreen} onClick={closeFullscreen}>
          <img
            src={fullscreenSrc}
            alt="Full screen view"
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ×
          </button>
          {subreddit.media.length > 1 && (
            <>
              <button
                className={`${styles.navArrow} ${styles.leftArrow}`}
                onClick={prevImage}
              >
                ‹
              </button>
              <button
                className={`${styles.navArrow} ${styles.rightArrow}`}
                onClick={nextImage}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
      <div className={styles.subredditInfo}>
        <img src={subreddit.img} className={styles.subredditImg} />
        <p className={styles.subredditName}>r/EvilCats • {subreddit.time}</p>
      </div>
      <div className={styles.textArea}>
        <p className={styles.postTitle}>{subreddit.postTitle}</p>
        <p className={styles.postText}>{subreddit.postText}</p>
      </div>

      <div className={styles.linkArea}>
        <a href={subreddit.link} target="_blank" className={styles.link}>
          <FaLink /> {subreddit.link}
        </a>
      </div>

      <div className={styles.mediaArea}>
        {subreddit.media.map((src, index) => (
          <figure key={index}>
            <img
              src={src}
              className={styles.media}
              onClick={() => openFullscreen(index)}
            />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Post;
