import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styles from "./Join.module.scss";
const Join = () => {
  const [name, setName] = useState("");
  const [chatroom, setChatroom] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/getUsersInRoom", { name, room: chatroom })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          alert("Username is taken");
          return;
        } else {
          window.location.replace(`/chat?name=${name}&chatroom=${chatroom}`);
        }
      })
      .catch(err => {
        console.log("Server error: " + err); //status code
      });
  };
  return (
    <div className={styles.Join}>
      <div className={styles.container}>
        <h1>Join the chat room !</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <br />
          <Form.Label>Chatroom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Chatroom you want to join"
            value={chatroom}
            onChange={e => setChatroom(e.target.value)}
            required
          />
          <br />
          <Button type="submit" variant="success">
            Join Us!
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Join;
