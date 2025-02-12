import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import { BrowserRouter } from "react-router";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
