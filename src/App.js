import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Join from "./components/Join.jsx";
import Chat from "./components/Chat.jsx";

const App = () => (
  <Router>
    <Switch>
      <Route path="/chat" component={Chat} />
      <Route exact path="/" component={Join} />
    </Switch>
  </Router>
);

export default App;
