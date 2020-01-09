import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "./Messages.jsx";
import styles from "./Chat.module.scss";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [chatroom, setChatroom] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, chatroom } = queryString.parse(location.search);
    socket = io.connect("https://chat-socket-react.herokuapp.com/");
    setName(name);
    setChatroom(chatroom);

    socket.emit("join", { name, chatroom });

    //On unmount
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("error", () => {
      window.location.replace("/");
    });
  });

  useEffect(() => {
    socket.on("chat-message", message => {
      setMessages([...messages, message]);
    });
  });

  const handleClick = e => {
    e.preventDefault();
    if (sendMessage) {
      socket.emit("chat-message", { message: sendMessage, user: name });
      setMessages([...messages, { message: sendMessage, user: name }]);
    } else {
      return;
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.output}>
        <h3>Welcome in chat room {chatroom}</h3>
        <Messages messages={messages} name={name} />
      </div>
      <div className={styles.input}>
        <Form.Control
          as="textarea"
          rows="3"
          className={styles.textarea}
          placeholder="Type your message..."
          value={sendMessage}
          onChange={e => setSendMessage(e.target.value)}
        />
        <Button
          variant="success"
          className={styles.button}
          onClick={handleClick}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
export default Chat;
