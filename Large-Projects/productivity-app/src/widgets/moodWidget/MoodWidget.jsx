import React, { useState } from "react";
import styles from "./MoodWidget.module.css";

import Emojis from "./components/Emojis";
import SelectedEmoji from "./components/SelectedEmoji";
import { returnIcon } from "./utilities/utilitties";

const MoodWidget = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const backgroundColor = {
    meltdown: "rgb(60,30,30)",
    sad: "rgb(60,45,30)",
    neutral: "rgb(30,30,60)",
    happy: "rgb(30,60,30)",
    cheerful: "rgb(25,70,70)",
  };

  return (
    <div
      style={{
        background: selectedEmoji
          ? backgroundColor[selectedEmoji]
          : "rgb(37,37,37)",
      }}
      className={styles.container}
    >
        {selectedEmoji ? (
          <>
            <SelectedEmoji selectedEmoji={selectedEmoji} />
            <button className={styles.return} onClick={() => setSelectedEmoji(null)}>{returnIcon}</button>
          </>
        ) : (
          <>
            <h1 className={styles.heading}>How are you feeling today?</h1>
            <Emojis setSelectedEmoji={setSelectedEmoji} />
          </>
        )}
    </div>
  );
};

export default MoodWidget;
