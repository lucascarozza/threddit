import { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { FaHeart } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
      const hours = Math.round(diffInMinutes / 60);
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (diffInMinutes < 10080) {
      const days = Math.floor(diffInMinutes / 1440);
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (diffInMinutes < 43200) {
      const weeks = Math.floor(diffInMinutes / 10080);
      return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
    } else if (diffInMinutes < 525600) {
      const months = Math.floor(diffInMinutes / 43200);
      return months === 1 ? `${months} month ago` : `${months} months ago`;
    } else {
      const years = Math.floor(diffInMinutes / 525600);
      return years === 1 ? `${years} year ago` : `${years} years ago`;
    }
  };

  function formatScore(score) {
    if (score >= 1000000) {
      return (score / 1000000).toFixed(1) + "m";
    } else if (score >= 1000) {
      return (score / 1000).toFixed(1) + "k";
    } else {
      return score.toString();
    }
  }

  const formatUrl = (url) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  const markdownRenderers = {
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
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
          <img className={styles.subredditImg} src={"/evil-smile.jpg"} />
          <p className={styles.subredditName}>
            r/{post.subreddit} • {formatTime(post.created)}
          </p>
        </div>
        <div className={styles.score}>
          <FaHeart />
          <p>{formatScore(post.score)}</p>
        </div>
      </div>

      <div className={styles.textArea}>
        <p className={styles.postTitle}>{post.title}</p>
        {post.text ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownRenderers}
            className={styles.postText}
          >
            {post.text}
          </ReactMarkdown>
        ) : (
          ""
        )}
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
