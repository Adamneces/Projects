import React, { useEffect, useState } from "react";
import { sounds } from "./utilities/sounds.js";
import styles from "./TimerWidget.module.css";
import Button from "./UI/Button.jsx";

const Sounds = ({ setPickedSound, pickedSound, isTimerActive, isBreakActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    // Update the audio source when the picked sound changes
    setAudio(new Audio(pickedSound));
  }, [pickedSound]);

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleSoundChange(event) {
    setPickedSound(event.target.value);
  }

  // Generate soundNames dynamically based on sounds object
  const soundNames = Object.fromEntries(
    Object.entries(sounds).map(([soundKey]) => [sounds[soundKey], soundKey])
  );

  useEffect(() => {
    // Play the audio when the component mounts or when pickedSound changes
    audio.play().catch(error => console.error("Error playing audio: No audio selected"));

    // Cleanup function to pause the audio when the component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const soundOptions = Object.entries(sounds).map(([soundKey, soundValue]) => (
    <option key={soundKey} value={soundValue}>
      {soundKey}
    </option>
  ));

  const displaySoundName = soundNames[pickedSound] || "No sound";

  return (
    <div className={styles.sounds_container}>
      <h3 className={styles.sounds_heading}>Sound</h3>
      {isEditing ? (
        <select
          className={styles.sounds_selectSound}
          value={pickedSound ? pickedSound : ''}
          onChange={(event) => handleSoundChange(event)}
        >
          <option value="">Select a sound</option>
          {soundOptions}
        </select>
      ) : (
        <p className={styles.sounds_sound}>{displaySoundName}</p>
      )}
      <Button color="blue" disabled={isTimerActive || isBreakActive} onClick={handleEdit} >
      {isEditing ? "Save" : "Edit"}
      </Button>
    </div>
  );
};

export default Sounds;
