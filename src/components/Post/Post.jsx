import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { FaHeart } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";

const Post = ({ post }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenSrc, setFullscreenSrc] = useState("");
  const [fullscreenType, setFullscreenType] = useState("");
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
    setFullscreenSrc(post.media[index].url);
    setFullscreenType(post.media[index].type);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextImage = (event) => {
    event.stopPropagation();
    const newIndex = (currentIndex + 1) % post.media.length;
    setCurrentIndex(newIndex);
    setFullscreenSrc(post.media[newIndex].url);
    setFullscreenType(post.media[newIndex].type);
  };

  const prevImage = (event) => {
    event.stopPropagation();
    const newIndex = (currentIndex - 1 + post.media.length) % post.media.length;
    setCurrentIndex(newIndex);
    setFullscreenSrc(post.media[newIndex].url);
    setFullscreenType(post.media[newIndex].type);
  };

  const formatTime = (created) => {
    const now = new Date();
    const postDate = new Date(created * 1000);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const formatUrl = (url) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <div className={styles.card}>
      {isFullscreen && (
        <div className={styles.fullscreen} onClick={closeFullscreen}>
          {fullscreenType === "image" ? (
            <img
              src={fullscreenSrc}
              alt="Full screen view"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={fullscreenSrc}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button className={styles.closeBtn} onClick={closeFullscreen}>
            ×
          </button>
          {post.media?.length > 1 && (
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

      <div className={styles.cardHeader}>
        <div className={styles.subredditInfo}>
          <img className={styles.subredditImg} src={"/evil-smile.jpg"}/>
          <p className={styles.subredditName}>
            r/{post.subreddit} • {formatTime(post.created)}
          </p>
        </div>
        <div className={styles.score}>
          <FaHeart />
          <p>{post.score}</p>
        </div>
      </div>

      <div className={styles.textArea}>
        <p className={styles.postTitle}>{post.title}</p>
        {post.text ? <p className={styles.postText}>{post.text}</p> : ""}
      </div>

      {post.link ? (
        <div className={styles.linkArea}>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <FaLink /> {formatUrl(post.link)}
          </a>
        </div>
      ) : (
        ""
      )}

      {post.media ? (
        <div className={styles.mediaArea}>
          {post.media.map((media, index) => (
            <figure key={index}>
              {media.type === "image" ? (
                <img
                  src={media.url}
                  className={styles.media}
                  onClick={() => openFullscreen(index)}
                  alt=""
                />
              ) : (
                <video
                  src={media.url}
                  className={styles.media}
                  onClick={() => openFullscreen(index)}
                  controls
                />
              )}
            </figure>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
