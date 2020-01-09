import React from "react";
import styles from "./Message.module.scss";
import ReactEmoji from "react-emoji";
const Message = ({ message, name, user }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={styles.right}>
      <span className={styles.outcome}>
        <span className={styles.outcomeUser}>me: </span>
        {ReactEmoji.emojify(message)}
      </span>
    </div>
  ) : (
    <div className={styles.left}>
      <span className={styles.income}>
        <span className={styles.incomeUser}>{user + ":"} </span>
        {ReactEmoji.emojify(message)}
      </span>
    </div>
  );
};

export default Message;
