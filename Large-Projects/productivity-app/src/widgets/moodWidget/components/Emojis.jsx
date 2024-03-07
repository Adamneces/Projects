import React from "react";
import styles from "../MoodWidget.module.css";
import { emojis } from "../utilities/utilitties.js"

const Emoji = ({ setSelectedEmoji }) => {
  return (
    <div className={styles.emojiContainer}>
      {Object.entries(emojis).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setSelectedEmoji(key)}
          className={styles.emoji}
          role="img"
          value={key}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Emoji;
