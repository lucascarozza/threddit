// Styles imports
import styles from "./Post.module.css";
// React imports
import React, { useState, useEffect, useMemo } from "react";
import FullscreenMediaViewer from "../FullscreenMediaViewer/FullscreenMediaViewer";
// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaLink } from "react-icons/fa6";
import { fetchSubreddits } from "../../features/subredditsSlice";
// Markdown support imports
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Formatters imports
import { formatTime, formatScore } from "../../utils/formatters";
import he from "he";

const markdownRenderers = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

const Post = ({ post }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.list);

  useEffect(() => {
    if (subreddits.length === 0) dispatch(fetchSubreddits());
  }, [dispatch, subreddits.length]);

  const getSubredditIcon = (name) => {
    const subreddit = subreddits.find((sub) => sub.name === name);
    return subreddit?.icon || "/default_icon.png";
  };

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => setIsFullscreen(false);

  const navigateMedia = (event, direction) => {
    event.stopPropagation();
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + post.media.length) % post.media.length;
      return newIndex;
    });
  };

  return (
    <div className={styles.card}>
      {isFullscreen && (
        <FullscreenMediaViewer
          media={post.media}
          currentIndex={currentIndex}
          onClose={closeFullscreen}
          onNavigate={navigateMedia}
        />
      )}

      <div className={styles.cardHeader}>
        <div className={styles.subredditInfo}>
          <img
            className={styles.subredditImg}
            src={getSubredditIcon(post.subreddit)}
            alt={`${post.subreddit} icon`}
          />
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
        {post.text && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownRenderers}
            className={styles.postText}
          >
            {post.text}
          </ReactMarkdown>
        )}
      </div>

      {post.link && (
        <div className={styles.linkArea}>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <FaLink />{" "}
            {post.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </div>
      )}

      {post.media && (
        <div className={styles.mediaArea}>
          {post.media.map((item, index) => (
            <figure key={index}>
              {item.type === "image" ? (
                <img
                  src={item.url}
                  className={styles.media}
                  onClick={() => openFullscreen(index)}
                  alt={post.media}
                />
              ) : (
                <video
                  src={item.url}
                  className={styles.media}
                  onClick={() => openFullscreen(index)}
                  controls
                />
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
