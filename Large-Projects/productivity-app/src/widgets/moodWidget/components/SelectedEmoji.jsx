import {emojis} from "../utilities/utilitties.js"
import styles from "../MoodWidget.module.css"

const SelectedEmoji = ({selectedEmoji}) => {
  return (
    <div className={styles.selectedEmojiContainer}>
      <p className={styles.selectedEmoji_emoji}>{emojis[selectedEmoji]}</p>
      <p className={styles.selectedEmojiParagraph}>{selectedEmoji}</p>
    </div>
  )
}

export default SelectedEmoji
