/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "assets/css/normalize.css";
import "assets/css/index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter path="/home">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
