import React, { useEffect, memo } from "react";
import styles from "./FullscreenMediaViewer.module.css";

const FullscreenMediaViewer = memo(
  ({ media, currentIndex, onClose, onNavigate }) => {
    const { url, type } = media[currentIndex];

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        } else if (event.key === "ArrowLeft") {
          onNavigate(event, -1);
        } else if (event.key === "ArrowRight") {
          onNavigate(event, 1);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose, onNavigate]);

    return (
      <div className={styles.fullscreen} onClick={onClose}>
        {type === "image" ? (
          <img
            src={url}
            alt="Fullscreen"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        {media.length > 1 && (
          <>
            <button
              className={`${styles.navArrow} ${styles.leftArrow}`}
              onClick={(e) => onNavigate(e, -1)}
            >
              ‹
            </button>
            <button
              className={`${styles.navArrow} ${styles.rightArrow}`}
              onClick={(e) => onNavigate(e, 1)}
            >
              ›
            </button>
          </>
        )}
      </div>
    );
  }
);

export default FullscreenMediaViewer;
