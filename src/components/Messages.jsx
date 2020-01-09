import React from "react";
import Message from "./Message.jsx";
import styles from "./Messages.module.scss";
const Messages = ({ messages, name }) => {
  const viewMessages = messages.map((message, index) => (
    <Message
      message={message.message}
      user={message.user}
      name={name}
      key={index}
    />
  ));
  return <div className={styles.messages}>{viewMessages}</div>;
};

export default Messages;
